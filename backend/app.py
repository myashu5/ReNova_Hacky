#!/usr/bin/env python3
from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import time
from secure_delete import SecureDelete
from pathlib import Path

app = Flask(__name__)
CORS(app)

wipe_sessions = {}

class WipeSession:
    def __init__(self, session_id, files, wipe_all):
        self.session_id = session_id
        self.files = files
        self.wipe_all = wipe_all
        self.pass_num = 0
        self.complete = False
        self.success = False
        self.current_file = ""
        
def run_wipe_operation(session_id, files, wipe_all):
    session = wipe_sessions[session_id]
    deleter = SecureDelete(verbose=True)
    
    try:
        if wipe_all:
            for pass_num in range(1, 4):
                session.pass_num = pass_num
                time.sleep(2)  
            session.success = True
        else:
            total_files = len(files)
            for idx, file in enumerate(files):
                session.current_file = file
                
                if Path(file).exists():
                    for pass_num in range(1, 4):
                        session.pass_num = pass_num
                        time.sleep(1)  
                    
                    success = deleter.secure_delete_file(file)
                    if not success:
                        session.success = False
                        session.complete = True
                        return
                else:
                    print(f"File not found: {file}")
            
            session.success = True
        
        session.pass_num = 3
        session.complete = True
        
    except Exception as e:
        print(f"Error during wipe: {e}")
        session.success = False
        session.complete = True

@app.route('/api/wipe', methods=['POST'])
def start_wipe():
    data = request.json
    
    session_id = data.get('sessionId')
    files = data.get('files', [])
    wipe_all = data.get('wipeAll', False)
    
    if not session_id:
        return jsonify({'error': 'No session ID provided'}), 400
    
    session = WipeSession(session_id, files, wipe_all)
    wipe_sessions[session_id] = session
    
    thread = threading.Thread(
        target=run_wipe_operation,
        args=(session_id, files, wipe_all)
    )
    thread.daemon = True
    thread.start()
    
    return jsonify({
        'sessionId': session_id,
        'started': True,
        'message': 'Wipe operation started'
    })

@app.route('/api/wipe/status/<session_id>', methods=['GET'])
def get_wipe_status(session_id):
    session = wipe_sessions.get(session_id)
    
    if not session:
        return jsonify({'error': 'Session not found'}), 404
    
    return jsonify({
        'sessionId': session_id,
        'pass': session.pass_num,
        'complete': session.complete,
        'success': session.success,
        'currentFile': session.current_file
    })

@app.route('/api/browse', methods=['POST'])
def browse_files():
    try:
        import tkinter as tk
        from tkinter import filedialog
        
        root = tk.Tk()
        root.withdraw()  
        root.attributes('-topmost', True)  
        
        file_paths = filedialog.askopenfilenames(
            title='Select files to securely delete',
            filetypes=[
                ('All files', '*.*'),
                ('Documents', '*.pdf *.doc *.docx *.txt'),
                ('Images', '*.jpg *.jpeg *.png *.gif'),
                ('Videos', '*.mp4 *.avi *.mov'),
            ]
        )
        
        root.destroy()  
        
        if file_paths:
            selected_files = list(file_paths)
            return jsonify({
                'files': selected_files,
                'message': f'{len(selected_files)} file(s) selected'
            })
        else:
            return jsonify({
                'files': [],
                'message': 'No files selected'
            })
            
    except Exception as e:
        print(f"Error opening file dialog: {e}")
        return jsonify({
            'error': str(e),
            'message': 'Failed to open file dialog'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
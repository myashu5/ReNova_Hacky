import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, FileX, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import RobotMascot from "@/components/RobotMascot";

const DataWiping = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [wipingPass, setWipingPass] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleBrowseFiles = () => {
    // Simulate file selection
    const mockFiles = ["Document1.pdf", "Photo.jpg", "Video.mp4", "Database.db"];
    setSelectedFiles(mockFiles);
    toast.success("Files selected successfully");
  };

  const handleWipeAll = () => {
    setSelectedFiles(["All system data"]);
    toast.info("Selected: All system data");
  };

  const handleProceed = async () => {
    if (!agreed) {
      toast.error("Please agree to proceed with data deletion");
      return;
    }

    setIsWiping(true);
    setWipingPass(0);

    // Simulate 3-pass deletion
    for (let i = 1; i <= 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setWipingPass(i);
    }

    setIsWiping(false);
    setIsComplete(true);
    toast.success("Data wiped successfully!");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Secure Data Wiping</h1>
          <p className="text-muted-foreground">Military-grade data destruction for your peace of mind</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - DoD Info Box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel rounded-2xl p-8 glow-soft"
          >
            <div className="flex items-start space-x-4 mb-6">
              <Shield className="w-12 h-12 text-accent flex-shrink-0 animate-glow-pulse" />
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">DoD 5220.22-M Standard</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We use the Department of Defense data sanitization method, which performs 
                  a 3-pass overwrite to ensure your data is completely irrecoverable. Each pass 
                  writes a different pattern over your data, making recovery impossible even with 
                  advanced forensic tools.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Pass 1: Overwrite with a character</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Pass 2: Overwrite with its complement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Pass 3: Overwrite with random characters</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4 border-2 border-destructive/50 mt-6">
              <div className="flex items-center space-x-2 text-destructive">
                <FileX className="w-5 h-5" />
                <span className="font-semibold">Important Disclaimer</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Data once deleted cannot be recovered. Please ensure you have backed up any important 
                files before proceeding with the wiping process.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel rounded-2xl p-6 space-y-6"
          >
            <h3 className="text-xl font-semibold gradient-text-accent">Wipe Your Data Securely</h3>

            <div className="space-y-3">
              <Button 
                onClick={handleWipeAll}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                disabled={isWiping}
              >
                Wipe All Data
              </Button>
              <Button 
                onClick={handleBrowseFiles}
                variant="outline"
                className="w-full border-accent/50 hover:bg-accent/10"
                disabled={isWiping}
              >
                Browse for Files
              </Button>
            </div>

            {/* Selected Files Display */}
            {selectedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="glass-panel rounded-xl p-4 space-y-2"
              >
                <p className="text-sm font-semibold text-muted-foreground">Selected Files:</p>
                <div className="space-y-1 max-h-32 overflow-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm text-foreground/80 flex items-center space-x-2">
                      <FileX className="w-3 h-3 text-accent" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="agree" 
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                disabled={isWiping}
              />
              <label
                htmlFor="agree"
                className="text-sm leading-relaxed text-foreground/80 cursor-pointer"
              >
                I understand that this action is irreversible and agree to proceed with data deletion
              </label>
            </div>

            {/* Proceed Button */}
            <Button 
              onClick={handleProceed}
              disabled={selectedFiles.length === 0 || !agreed || isWiping}
              className="w-full bg-primary hover:bg-primary/90 glow-primary"
            >
              {isWiping ? "Processing..." : "Proceed"}
            </Button>
          </motion.div>
        </div>

        {/* Wiping Progress Animation */}
        <AnimatePresence>
          {isWiping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center"
            >
              <div className="glass-panel rounded-3xl p-12 text-center space-y-6 glow-primary">
                <Loader2 className="w-16 h-16 text-accent mx-auto animate-spin" />
                <h2 className="text-3xl font-bold gradient-text">Wiping Data</h2>
                <div className="text-6xl font-bold text-primary">{wipingPass}/3</div>
                <p className="text-muted-foreground">
                  Pass {wipingPass} of 3 - {wipingPass === 1 ? "Overwriting" : wipingPass === 2 ? "Double-checking" : "Finalizing"}
                </p>
                <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(wipingPass / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Screen */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center"
            >
              <div className="glass-panel rounded-3xl p-12 text-center space-y-6 glow-accent max-w-md">
                <div className="flex justify-center">
                  <RobotMascot size="md" expression="happy" />
                </div>
                <CheckCircle2 className="w-20 h-20 text-accent mx-auto animate-glow-pulse" />
                <h2 className="text-3xl font-bold gradient-text-accent">Complete!</h2>
                <p className="text-muted-foreground">
                  Your data has been securely wiped using DoD standards. It is now completely irrecoverable.
                </p>
                <Button 
                  onClick={() => {
                    setIsComplete(false);
                    setSelectedFiles([]);
                    setAgreed(false);
                    setWipingPass(0);
                  }}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataWiping;

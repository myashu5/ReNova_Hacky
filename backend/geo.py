from flask import Flask, jsonify, render_template, request, abort
import csv, math, os

app = Flask(__name__)
CSV_PATH = os.path.join(os.path.dirname(__file__), "centers_recycling.csv")

def load_centers():
    centers=[]
    if not os.path.exists(CSV_PATH):
        return centers
    with open(CSV_PATH, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            try:
                centers.append({
                    "id": int(r.get("id") or 0),
                    "name": r.get("name",""),
                    "address": r.get("address",""),
                    "lat": float(r.get("lat") or 0.0),
                    "lng": float(r.get("lng") or 0.0)
                })
            except:
                continue
    return centers

CENTERS = load_centers()

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0
    phi1 = math.radians(lat1); phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1); dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2.0)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2.0)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

def bbox_from_radius(lat, lng, km):
    lat_delta = km / 111.0
    lon_delta = km / (111.0 * max(0.0001, math.cos(math.radians(lat))))
    return lat - lat_delta, lat + lat_delta, lng - lon_delta, lng + lon_delta

@app.route('/')
def index():
    return render_template('map.html')

@app.route('/api/nearby')
def api_nearby():
    try:
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))
    except:
        abort(400, "Missing or invalid 'lat' or 'lng' parameters.")

    radius_km = float(request.args.get('radius', 5.0))
    limit = int(request.args.get('limit', 30))

    minlat, maxlat, minlng, maxlng = bbox_from_radius(lat, lng, radius_km)
    candidates = [c for c in CENTERS if c['lat'] is not None and minlat <= c['lat'] <= maxlat and minlng <= c['lng'] <= maxlng]

    features = []
    for c in candidates:
        dist = haversine_distance(lat, lng, c['lat'], c['lng'])
        if dist <= radius_km:
            features.append({
                "type": "Feature",
                "properties": {"id": c["id"], "name": c["name"], "address": c["address"], "distance_km": round(dist,3)},
                "geometry": {"type": "Point", "coordinates": [c["lng"], c["lat"]]}
            })

    features.sort(key=lambda f: f["properties"]["distance_km"])
    return jsonify({"type": "FeatureCollection", "features": features[:limit]})

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Post the temperatures data from the incoming request and return the same data in the response
@app.route('/temperatures', methods=['POST'])
def post_temperatures():
    data = request.get_json()
    return jsonify({"data": data})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)
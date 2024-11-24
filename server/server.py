from flask import Flask, request, jsonify

app = Flask(__name__)

# Post the temperatures data from the incoming request and return the same data in the response
@app.route('/temperatures', methods=['POST'])
def post_temperatures():
    data = request.get_json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False)
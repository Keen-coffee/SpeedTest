from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-speedtest', methods=['GET'])
def run_speedtest():
    try:
        result = subprocess.run(["/usr/local/bin/speedtest", "--json"], capture_output=True, text=True, check=True)
        return jsonify(result=result.stdout)
    except subprocess.CalledProcessError as e:
        return jsonify(error="Failed to run speed test", details=str(e)), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

from flask import Flask, render_template, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_speedtest')
def run_speedtest():
    try:
        # Run the Cloudflare speedtest command.
        # Adjust the timeout if needed.
        result = subprocess.run(['speedtest'], capture_output=True, text=True, timeout=60)
        # If speedtest exits with 0 return the stdout, else stderr.
        output = result.stdout if result.returncode == 0 else result.stderr
    except Exception as e:
        output = str(e)
    return jsonify({'result': output})

if __name__ == '__main__':
    # Listen on all interfaces, port 5000.
    app.run(host='0.0.0.0', port=5000)

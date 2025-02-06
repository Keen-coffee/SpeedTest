from flask import Flask, render_template, jsonify
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('speedtest.html')

@app.route('/run-speedtest')
def run_speedtest():
    try:
        result = subprocess.run(['speedtest-cli', '--json'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        output = result.stdout.decode('utf-8')
        error = result.stderr.decode('utf-8')

        if not output:
            return jsonify({'error': 'No output from speedtest-cli'}), 500

        try:
            speedtest_data = json.loads(output)
            return jsonify(speedtest_data)
        except json.JSONDecodeError as e:
            return jsonify({'error': f"Error decoding JSON: {e}"}), 500

    except subprocess.CalledProcessError as e:
        return jsonify({'error': f"Error running speedtest-cli: {e.stderr.decode('utf-8')}"})
    except Exception as e:
        return jsonify({'error': f"Unexpected error: {str(e)}"}), 500

if __name__ == '__main__':
    # Set host to '0.0.0.0' and specify a port (default is 5000)
    app.run(host='0.0.0.0', port=5000, debug=True)

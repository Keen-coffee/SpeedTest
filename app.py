from flask import Flask, jsonify, render_template_string
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def index():
    # The simple HTML page with the "Test" button
    return render_template_string("""
    <html>
    <head>
        <title>Speedtest</title>
        <script>
            function runSpeedTest() {
                fetch('/run-speedtest')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
                    });
            }
        </script>
    </head>
    <body>
        <h1>Speedtest</h1>
        <button onclick="runSpeedTest()">Test</button>
        <pre id="result"></pre>
    </body>
    </html>
    """)

@app.route('/run-speedtest')
def run_speedtest():
    try:
        # Run the speedtest-cli command with --json flag to get JSON output
        result = subprocess.run(['speedtest-cli', '--json'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)

        # Capture the output from the command
        output = result.stdout.decode('utf-8')

        # Check if the output is empty
        if not output:
            return jsonify({'error': 'No output from speedtest-cli'}), 500

        # Attempt to parse the JSON result
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
    app.run(host='0.0.0.0', port=5000)

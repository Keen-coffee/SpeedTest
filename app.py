from flask import Flask, render_template, jsonify, request, redirect, url_for, session
import subprocess
import json

app = Flask(__name__)

# Set a password for the speedtest
PASSWORD = "yourpassword"  # Replace this with your desired password
app.secret_key = "your_secret_key"  # Needed for session management

@app.route('/')
def index():
    # If the user is not logged in, redirect to login page
    if 'logged_in' not in session:
        return redirect(url_for('login'))
    
    return render_template('speedtest.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Check the password from the form
        password = request.form.get('password')

        if password == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('index'))  # Redirect to the main page after successful login
        else:
            # Invalid password, show an error message
            return render_template('login.html', error="Incorrect password")

    return render_template('login.html')  # Show the login page

@app.route('/run-speedtest', methods=['POST'])
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
    app.run(host='0.0.0.0', port=5000, debug=True)

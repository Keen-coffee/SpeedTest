# Use the official Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port the app will run on
EXPOSE 5000

# Set environment variables for the password and secret key (you can override them at runtime)
ENV SPEEDTEST_PASSWORD=yourpassword
ENV FLASK_SECRET_KEY=your_secret_key

# Run the Flask app
CMD ["python", "app.py"]

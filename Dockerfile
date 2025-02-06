# Use Python 3 as the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && pip install --no-cache-dir speedtest-cli Flask

# Copy the app files into the container
COPY . /app

# Expose the port for the web server
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
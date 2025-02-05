FROM python:3.9

# Install dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://github.com/cloudflare/speedtest/releases/latest/download/speedtest-linux-amd64 -o /usr/local/bin/speedtest
RUN chmod +x /usr/local/bin/speedtest

# Set up the working directory
WORKDIR /app

# Copy application files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Flask and CORS
RUN pip install flask flask-cors

# Copy application files
COPY . .

# Copy frontend files
COPY index.html /app/templates/index.html

# Expose port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
# Stage 1: Build/Install Cloudflare speedtest CLI using Go.
FROM golang:alpine AS builder
# Install git if needed.
RUN apk add --no-cache git
# Install the Cloudflare speedtest binary.
RUN go install github.com/cloudflare/speedtest@latest
# The binary will be in /go/bin/speedtest

# Stage 2: Build the final image with Python and the speedtest binary.
FROM python:3.9-slim
# (Optional) Update packages and install CA certificates.
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Set the working directory.
WORKDIR /app

# Copy the speedtest binary from the builder stage.
COPY --from=builder /go/bin/speedtest /usr/local/bin/speedtest

# Copy and install Python dependencies.
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code.
COPY . .

# Expose port 5000.
EXPOSE 5000

# Run the Flask app.
CMD ["python", "app.py"]

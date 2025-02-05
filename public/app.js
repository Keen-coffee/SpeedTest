document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('speedTestBtn');
    const resultDiv = document.getElementById('result');

    btn.addEventListener('click', async () => {
        resultDiv.textContent = 'Testing speed...';

        try {
            const response = await fetch('/speed-test');
            const data = await response.json();
            resultDiv.textContent = `Speed Test Results: ${data}`;
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    });
});
import './index.css';

// Assuming Node integration is enabled, import necessary Node modules
const { ipcRenderer } = require('electron');
const path = require('path');
const os = require('os');

// Define the default documents path
const documentsPath = path.join(os.homedir(), 'Documents');
console.log(documentsPath);

// Set up an event listener on the search box
document.getElementById('search-box').addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && event.target.value.trim()) {
        const query = event.target.value.trim();
        // Send the search query to the main process
        ipcRenderer.send('search-files', documentsPath, query);
        event.target.value = ''; // Clear the input after search
    }
});

// Receive search results from the main process
ipcRenderer.on('search-results', (event, data) => {
    if (data.error) {
        console.error('Search Error:', data.message);
        displayError(data.message);
    } else {
        displayResults(data.results);
    }
});

// Function to display results
function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.textContent = file;
        fileElement.className = 'result-item'; // Add a class for styling if needed
        resultsContainer.appendChild(fileElement);
    });
}

// Function to display errors
function displayError(message) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `<div class='error'>Error: ${message}</div>`; // Display the error in the results container
}

console.log('👋 This message is being logged by "renderer.js", included via Vite');

// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('search-box');
    searchBox.focus();
  
    searchBox.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        let query = event.target.value;
        console.log('Search Query:', query);
        event.target.value = ''; // Clear the input after search
      }
    });
  });
  
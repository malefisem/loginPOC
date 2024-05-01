// Event handling and application logic
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('offline-form');
    const offlineMessage = document.getElementById('offline-message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      if (navigator.onLine) {
        // Handle online data submission (replace this with your server logic)
        const formData = {
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('last-name').value,
          age: document.getElementById('age').value,
          address: document.getElementById('address').value,
        };
        // For simplicity, we'll log the data to the console here.
        console.log('Online - Data submitted to server', formData);
      } else {
        // Handle offline data storage (you should implement local storage or other offline data storage mechanisms)
        const formData = {
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('last-name').value,
          age: document.getElementById('age').value,
          address: document.getElementById('address').value,
        };
        // For simplicity, we'll log the data to the console here.
        console.log('Offline - Data stored locally', formData);
        offlineMessage.style.display = 'block';
      }
    });
  });
  
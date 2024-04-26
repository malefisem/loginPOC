document.addEventListener('DOMContentLoaded', function() {
    // Create the modal and its content
    var modal = document.createElement('div');
    modal.id = 'statusModal';
    modal.className = 'modal';

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Close button
    var closeButton = document.createElement('span');
    closeButton.textContent = '×';
    closeButton.className = 'close-button';
    closeButton.addEventListener('click', closeModal); // Close modal when Close button clicked

    var statusMessage = document.createElement('p');
    statusMessage.id = 'statusMessage';

    var tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = 'Try Again';
    tryAgainButton.className = 'try-again-button';
    tryAgainButton.addEventListener('click', function() {
        // Add functionality to the "Try Again" button
        if (navigator.onLine) {
            window.location.href = '#';
        } else {
            alert("You are currently offline. Please connect to the internet and try again.");
        }
    });

    var offlineModeButton = document.createElement('button');
    offlineModeButton.textContent = 'Offline Mode';
    offlineModeButton.className = 'offline-mode-button';
    offlineModeButton.addEventListener('click', closeModal); // Close modal when Offline Mode button clicked

    modalContent.appendChild(closeButton);
    modalContent.appendChild(statusMessage);
    
    var buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center'; // Center the buttons horizontally
    buttonsContainer.style.padding = '0'; // Set padding to zero
    buttonsContainer.style.margin = '0'; // Set margin to zero
    buttonsContainer.appendChild(tryAgainButton);
    buttonsContainer.appendChild(offlineModeButton);
    modalContent.appendChild(buttonsContainer);
    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Function to display the modal after login
    function displayModalAfterLogin() {
        var modal = document.getElementById('statusModal');
        var statusMessage = document.getElementById('statusMessage');

        // Display whatever message you want here
        statusMessage.innerHTML = 'You are currently in offline mode';

        // Show the modal
        modal.style.display = 'block';

        // Add event listeners for online and offline events
        window.addEventListener('online', updateTryAgainButton);
        window.addEventListener('offline', updateTryAgainButton);

        // Update Try Again button initially
        updateTryAgainButton();
    }

    // Call the function to display modal after login
    displayModalAfterLogin();

    function updateTryAgainButton() {
        var tryAgainButton = document.querySelector('.try-again-button');
        if (navigator.onLine) {
            tryAgainButton.classList.add('online');
            tryAgainButton.disabled = false;
        } else {
            tryAgainButton.classList.remove('online');
            tryAgainButton.disabled = true;
        }
    }

    function closeModal() {
        var modal = document.getElementById('statusModal');
        modal.style.display = 'none';
    }
});

// document.addEventListener('DOMContentLoaded', function() {
//     // Create the modal and its content
//     var modal = document.createElement('div');
//     modal.id = 'statusModal';
//     modal.className = 'modal';

//     var modalContent = document.createElement('div');
//     modalContent.className = 'modal-content';

//     var statusMessage = document.createElement('p');
//     statusMessage.id = 'statusMessage';

//     var okButton = document.createElement('button');
//     okButton.textContent = 'OK';
//     okButton.className = 'ok-button';
//     okButton.addEventListener('click', closeModal);

//     modalContent.appendChild(statusMessage);
//     modalContent.appendChild(okButton);

//     modal.appendChild(modalContent);

//     // Append the modal to the body
//     document.body.appendChild(modal);

//     // Function to display the modal after login
//     function displayModalAfterLogin() {
//         var modal = document.getElementById('statusModal');
//         var statusMessage = document.getElementById('statusMessage');

//         // Display whatever message you want here
//         statusMessage.innerHTML = 'You are currently in offline mode';

//         // Show the modal
//         modal.style.display = 'block';
//     }

//     // Call the function to display modal after login
//     displayModalAfterLogin();

//     function closeModal() {
//         var modal = document.getElementById('statusModal');
//         modal.style.display = 'none';
//     }
// });


// document.addEventListener('DOMContentLoaded', function() {
//     // Create the modal and its content
//     var modal = document.createElement('div');
//     modal.id = 'statusModal';
//     modal.className = 'modal';

//     var modalContent = document.createElement('div');
//     modalContent.className = 'modal-content';

//     var statusMessage = document.createElement('p');
//     statusMessage.id = 'statusMessage';

//     var okButton = document.createElement('button');
//     okButton.textContent = 'OK';
//     okButton.className = 'ok-button';
//     okButton.addEventListener('click', closeModal);

//     modalContent.appendChild(statusMessage);
//     modalContent.appendChild(okButton);

//     modal.appendChild(modalContent);

//     // Append the modal to the body
//     document.body.appendChild(modal);

//     // Initialize previous online status
//     var prevOnlineStatus = window.navigator.onLine;

//     // Check online status when the window loads
//     checkAndDisplayOnlineStatus();

//     // Listen for online/offline events
//     window.addEventListener('online', checkAndDisplayOnlineStatus);
//     window.addEventListener('offline', checkAndDisplayOnlineStatus);

//     function checkAndDisplayOnlineStatus() {
//         var modal = document.getElementById('statusModal');
//         var statusMessage = document.getElementById('statusMessage');

//         if (window.navigator.onLine !== prevOnlineStatus) {
//             if (window.navigator.onLine) {
//                 // Online
//                 statusMessage.innerHTML = '<span style="color: green;">&#9888;</span><span style="font-weight: bold;"> You are currently in online mode.</span>';
//             } else {
//                 // Offline
//                 statusMessage.innerHTML = '<span style="color: red;">&#9888;</span><span style="font-weight: bold;"> You are currently in offline mode.</span><span style="font-size: smaller;"><br>You may proceed with the onboarding using available offline forms.</span>';
//             }

//             // Show the modal only if it's not already displayed
//             if (modal.style.display !== 'block') {
//                 modal.style.display = 'block';
//             }

//             // Hide the modal after 5 seconds (adjust as needed)
//             setTimeout(function() {
//                 modal.style.display = 'none';
//             }, 5000);
//         }

//         // Update previous online status
//         prevOnlineStatus = window.navigator.onLine;
//     }

//     function closeModal() {
//         var modal = document.getElementById('statusModal');
//         modal.style.display = 'none';
//     }
// });
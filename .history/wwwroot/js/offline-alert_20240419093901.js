document.addEventListener('DOMContentLoaded', function() {
    // Create the modal and its content
    var modal = document.createElement('div');
    modal.id = 'statusModal';
    modal.className = 'modal';

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    var statusMessage = document.createElement('p');
    statusMessage.id = 'statusMessage';

    var okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.className = 'ok-button';
    okButton.addEventListener('click', closeModal);

    modalContent.appendChild(statusMessage);
    modalContent.appendChild(okButton);

    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Initialize previous online status
    var prevOnlineStatus = window.navigator.onLine;

    // Check online status when the window loads
    checkAndDisplayOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', checkAndDisplayOnlineStatus);
    window.addEventListener('offline', checkAndDisplayOnlineStatus);

    function checkAndDisplayOnlineStatus() {
        var modal = document.getElementById('statusModal');
        var statusMessage = document.getElementById('statusMessage');

        if (window.navigator.onLine !== prevOnlineStatus) {
            if (window.navigator.onLine) {
                // Online
                statusMessage.innerHTML = '<span style="color: green;">&#9888;</span><span style="font-weight: bold;"> You are currently in online mode.</span>';
            } else {
                // Offline
                statusMessage.innerHTML = '<span style="color: red;">&#9888;</span><span style="font-weight: bold;"> You are currently in offline mode.</span><span style="font-size: smaller;"><br>You may proceed with the onboarding using available offline forms.</span>';
            }

            // Show the modal only if it's not already displayed
            if (modal.style.display !== 'block') {
                modal.style.display = 'block';
            }

            // Hide the modal after 5 seconds (adjust as needed)
            setTimeout(function() {
                modal.style.display = 'none';
            }, 5000);
        }

        // Update previous online status
        prevOnlineStatus = window.navigator.onLine;
    }

    function closeModal() {
        var modal = document.getElementById('statusModal');
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize previous online status
    var prevOnlineStatus = window.navigator.onLine;

    // Check online status when the window loads
    checkAndDisplayOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', checkAndDisplayOnlineStatus);
    window.addEventListener('offline', checkAndDisplayOnlineStatus);

    function checkAndDisplayOnlineStatus() {
        var statusBar = document.getElementById('statusBar');
        var statusMessage = document.getElementById('statusMessage');

        if (window.navigator.onLine !== prevOnlineStatus) {
            if (window.navigator.onLine) {
                // Online
                statusMessage.textContent = 'You are currently in online mode.';
                statusBar.style.backgroundColor = '#d4edda'; // Greenish color for online status
            } else {
                // Offline
                statusMessage.textContent = 'You are currently in offline mode. You may proceed with the onboarding using available offline forms.';
                statusBar.style.backgroundColor = '#f8d7da'; // Reddish color for offline status
            }

            // Show the status bar
            statusBar.style.display = 'block';
        }

        // Update previous online status
        prevOnlineStatus = window.navigator.onLine;
    }
});
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

    // Check online status when the window loads
    checkOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
});

function checkOnlineStatus() {
    var modal = document.getElementById('statusModal');
    var statusMessage = document.getElementById('statusMessage');

    if (window.navigator.onLine) {
        // Online
        statusMessage.innerHTML = '<span style="color: green;">&#9888;</span><span style="font-weight: bold;"> You are currently in online mode.</span>';
    } else {
        // Offline
        statusMessage.innerHTML = '<span style="color: red;">&#9888;</span><span style="font-weight: bold;"> You are currently in offline mode.</span><span style="font-size: smaller;"><br>You may proceed with the onboarding using available offline forms.</span>';
    }

    // Show the modal
    modal.style.display = 'block';

    // Hide the modal after 5 seconds (adjust as needed)
    setTimeout(function() {
        modal.style.display = 'none';
    }, 5000);
}

function closeModal() {
    var modal = document.getElementById('statusModal');
    modal.style.display = 'none';
}
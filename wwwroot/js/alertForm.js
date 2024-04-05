let formModified = false;

        window.addEventListener('beforeunload', function (e) {
            if (formModified) {
                const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
                (e || window.event).returnValue = confirmationMessage; // Standard for most browsers
                return confirmationMessage; // For some older browsers
            }
        });

        document.addEventListener('DOMContentLoaded', function () {
            const form = document.querySelector('form');

            form.addEventListener('input', function () {
                formModified = true;
            });

            form.addEventListener('submit', function () {
                formModified = false;
            });
        });
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.querySelector('.signature-pad');
    var signaturePad = new SignaturePad(canvas);

    var clearButton = document.querySelector('.clear-signature');
    var signatureInput = document.querySelector('.customer-signature');

    clearButton.addEventListener('click', function() {
        signaturePad.clear();
        updateSignatureInput();
    });

    signaturePad.onEnd = function() {
        updateSignatureInput();
    };

    function updateSignatureInput() {
        signatureInput.value = signaturePad.toDataURL();
    }
});
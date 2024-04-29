function saveForm(event) {
  console.log("saveForm testing");
  // event.preventDefault(); // Prevent the default form submission behavior

  // Get all input fields from the form
  var inputs = document.querySelectorAll(
    "#contactDetails input, #contactDetails select"
  );

  // Create an empty object to store the form data
  var formData = {};

  // Loop through each input field and add its name and value to the formData object
  inputs.forEach(function (input) {
    formData[input.name] = input.value;
  });

  // Convert the formData object to JSON
  var jsonData = JSON.stringify(formData);

  // Example: Display the JSON data in the console
  console.log("saveForm testing formData", formData);
  console.log("saveForm testing jsonData", jsonData);

  // Create a Blob containing the JSON data
  var blob = new Blob([jsonData], { type: "application/json" });

  // Create a link element
  var filledForm = document.createElement("filledForm");
  filledForm.style.display = "none";
  console.log("blob", blob);
  console.log("filledForm", filledForm);
  console.log("document", document);
  console.log(
    "document.createElement('filledForm')",
    document.createElement("filledForm")
  );

  // Set the link's href attribute to the Blob object
  filledForm.href = URL.createObjectURL(blob);
  console.log("filledForm.href", filledForm.href);

  // Set the filename for the downloaded file
  filledForm.download = "test.json"; // Change 'formData.json' to the desired filename

  // Append the link to the document body
  document.body.appendChild(filledForm);
  console.log("documentbody", document.body.appendChild(filledForm));

  // Display a message indicating that the download is in progress
  console.log("Downloading file...");

  // Click the link programmatically to trigger the download
  // filledForm.click();
  try {
    filledForm.click();
    // filledForm.showPopover();

    console.log("filledForm.click()", filledForm.click(), "why undefine");
    // console.log("filledForm.showPopover()", filledForm.showPopover());
    console.log("filledForm.title", filledForm.title, "test");
  } catch (e) {
    console.log("error", e);
  }

  console.log(
    "document.getElementById(saveButton).addEventListener(click, saveForm)",
    document.getElementById("saveButton").addEventListener("click", saveForm)
  );
  console.log("document.getElementById(saveButton)", document.getElementById("saveButton"));

  // Clean up: remove the link from the document body
  // document.body.removeChild(filledForm);

  //     // Example: Make an AJAX request to submit the JSON data to the server
  //     var xhr = new XMLHttpRequest();
  //     xhr.open('POST', '/your-server-endpoint', true);
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.onload = function () {
  //         // Handle the response from the server
  //         if (xhr.status >= 200 && xhr.status < 300) {
  //             // Success
  //             console.log('Form submitted successfully');
  //         } else {
  //             // Error
  //             console.error('Form submission failed');
  //         }
  //     };
  //     xhr.onerror = function () {
  //         // Handle errors
  //         console.error('Request failed');
  //     };
  //     xhr.send(jsonData);
}

// Add an event listener to the Save button
try {
  console.log("document.getElementById before");
  document.getElementById("saveButton").addEventListener("click", saveForm);
  console.log("document.getElementById after");
} catch (e) {
  console.log("test addeventlistener", e);
}

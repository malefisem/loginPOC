document.addEventListener('DOMContentLoaded', function () {
    var onlineLink = document.getElementById('onlineLink');

    // Function to handle click event
    function handleClick(event) {
        if (!navigator.onLine) {
            event.preventDefault(); // Prevent the default behavior of the link if offline
            return;
        }

        console.log("Clicked onlineLink"); // Debug message to check if the event listener is triggered

        // Show a confirmation dialog
        var userConfirmation = confirm("You are about to leave offline DBOS Support Centre. Do you want to continue???");
        console.log("User confirmation:", userConfirmation); // Debug message to log the user's choice

        // Check the user's choice
        if (!userConfirmation) {
            event.preventDefault(); // Prevent link redirection if user cancels
            console.log("User canceled. Stay on the current page."); // Debug message for cancellation
            // You can add additional logic here if needed
        }
    }

    onlineLink.addEventListener('click', handleClick);

    // Check online status on DOMContentLoaded event
    if (navigator.onLine) {
        onlineLink.classList.add('connected');
    } else {
        onlineLink.classList.remove('connected');
    }
});

window.addEventListener('online', function() {
    var onlineLink = document.getElementById('onlineLink');
    onlineLink.classList.add('connected');
    onlineLink.addEventListener('click', handleClick); // Re-add event listener when online
});

window.addEventListener('offline', function() {
    var onlineLink = document.getElementById('onlineLink');
    onlineLink.classList.remove('connected');
    onlineLink.removeEventListener('click', handleClick); // Remove event listener when offline
});

function filterForms() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();

    // Get all form links
    const formLinks = document.querySelectorAll('.menu-card_link');

    formLinks.forEach(link => {
        const formTitle = link.querySelector('.menu-card_title').innerText.toLowerCase();
        if (formTitle.includes(filter)) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });
}

function setSelectedOption(option) {
    // Set the selected dropdown option
    document.getElementById('selectedOptionText').innerText = option;
}

function performSearch() {
    // Get the selected dropdown option
    var selectedOptionText = document.getElementById('selectedOptionText').innerText;

    // Get the input value
    var searchInputValue = document.getElementById('searchInput').value;
    console.log('Selected Option:', selectedOptionText);
    console.log('Search Input Value:', searchInputValue);

    // Check if the selected option is "ID Number - MyKad"
    if (selectedOptionText === 'ID Number - MyKad') {
        // If the selected option is "ID Number - MyKad," check if the input is a 12-digit number
        if (/^\d{12}$/.test(searchInputValue)) {
            // If conditions are met, perform the search and pass the ID number to the destination page
            window.location.href = `../../pages/profile.html?id=${searchInputValue}`;
        } else {
            // Provide feedback for invalid input
            alert('Please enter a 12-digit IC number for "ID Number - MyKad".');
        }
    } else {
        window.location.href = `../../pages/profile.html?id=${searchInputValue}`;
    }
}

// Function to toggle navigation
function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    var main = document.getElementById("main");
    // var mainpage = document.getElementById("main-page");
    if (sidenav.style.width === "250px") {
        sidenav.style.width = "0";
        main.style.marginLeft = "0";
        // mainpage.style.marginLeft = "0";
    } else {
        sidenav.style.width = "250px";
        main.style.marginLeft = "250px";
        // mainpage.style.marginLeft = "250px";
    }
}

// Function to close navigation
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("main-page").style.marginLeft = "0";
}

// Function to load form content using AJAX
function loadForm(formName) {
    fetch(`${formName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.innerHTML = data;
            initializePage(); // Reinitialize the page after loading new content
        })
        .catch(error => console.error('Error:', error));
}

function getStatusButton(data) {
    let colorClass = '';
    let statusText = '';

    switch (data.StatusOrRemark.toLowerCase()) {
        case 'incomplete form':
            colorClass = 'btn-status-incomplete';
            statusText = 'Incomplete Form';
            break;
        case 'pending synchronization':
            colorClass = 'btn-status-pending';
            statusText = 'Pending Synchronization';
            break;
        default:
            colorClass = 'btn-secondary'; // Default color for other statuses
            statusText = data.status;
            break;
    }

    return `<button type="button" class="btn ${colorClass} btn-sm btn-block" style="font-size: small;">${statusText}</button>`;
}

// Function to parse raw dummy data into an array of objects
function parseDummyData(rawData) {
    const lines = rawData.trim().split('\n');

    return lines.map((line) => {
        const values = line.split(',');
        return {
            CustomerNameOrID: values[0].trim(),
            StartDate: values[1].trim(),
            FormCategory: values[2].trim(),
            FormName: values[3].trim(),
            StatusOrRemark: values[4].trim(),
            LastUpdateDateTime: values[5].trim()
        };
    });
}

// Function to fetch data from the dummy data file
async function fetchData() {
    try {
        const response = await fetch('dummydata.txt');
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.text();
        return parseDummyData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to parse and populate the table with dummy data using DataTables
function populateTable(dummyData) {
    const table = $('#application-table').DataTable({
        data: dummyData,
        columns: [
            { 
                data: null,
                render: function (data, type, row) {
                    const maskedID = row.CustomerNameOrID.split('/')[1].replace(/(\d{6})(\d+)/, '$1XXXXXX');
                    return `
                        <a href="#">
                            <div>${row.CustomerNameOrID.split('/')[0]}</div> <!-- Displaying the name -->
                            <div>${maskedID}</div> <!-- Displaying the ID -->
                        </a>
                    `;
                }
            },
            { data: 'StartDate' },
            { data: 'FormCategory' },
            { data: 'FormName' },
            { 
                data: null,
                render: function (data, type, row) {
                    return getStatusButton(row);
                }
            },
            { data: 'LastUpdateDateTime' },
            { 
                data: null, 
                render: function (data, type, row) {
                    return `<button class="btn btn-danger btn-sm delete-button" onclick="confirmDelete('${row.CustomerNameOrID.split('/')[0]}')"><i class="bi bi-trash"></i></button>`;
                }
            }
        ],
        destroy: true, // Destroy existing DataTable instance, if any
        responsive: true, // Enable responsive design
        scrollX: false, // Disable horizontal scrolling
        createdRow: function (row, data, dataIndex) {
            // Optionally, you can apply additional customizations to each row
        }
    });
}

function confirmDelete(customerName) {
    const isConfirmed = confirm(`Are you sure you want to delete the application for ${customerName}?`);
    if (isConfirmed) {
        // Call your deleteRow function here or perform deletion logic
        console.log(`Deleting application for ${customerName}`);
    }
}

// Main function to orchestrate the page initialization
async function initializePage() {
    try {
        const rawData = await fetchData();
        dummyData = rawData; // Assuming the data is already in JSON format
        populateTable(dummyData);
    } catch (error) {
        console.error('Page initialization error:', error);
    }

    // Attach event listener for "View All Applications" button after DOMContentLoaded
    document.getElementById('show-all-button').addEventListener('click', showAllData);
}

// Function to show all data
function showAllData() {
    const table = $('#application-table').DataTable();

    // Destroy the DataTable instance
    table.destroy();

    // Display all rows
    table.rows().every(function () {
        this.nodes().to$().show();
        return true;
    });

    // Reinitialize the DataTable
    $('#application-table').DataTable({
        paging: false, // Disable paging
        // Add other DataTable options if needed
    });
}

// Function to handle logout
async function handleLogout() {
    try {
        const response = await fetch('/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Redirect to the login page after successful logout
            window.location.href = '/';
        } else {
            console.error('Failed to logout:', response.statusText);
            // Handle error scenario here if needed
        }
    } catch (error) {
        console.error('Error during logout:', error);
        // Handle error scenario here if needed
    }
}

// Add the logout function to the logout button click event
document.getElementById('logoutButton').addEventListener('click', handleLogout);

// Add the logout-related JavaScript snippet to prevent caching and disable the back button
window.onload = function () {
    // Prevent caching of pages after logout
    window.history.replaceState({}, document.title, "/");
};

// Disable back button
window.history.pushState(null, "", "/");
window.addEventListener("popstate", function (event) {
    window.history.pushState(null, "", "/");
});

// Function to toggle the visibility of the logout dropdown
function toggleLogout(event) {
    event.stopPropagation();
    var dropdownContent = document.getElementById('logout-dropdown-content');
    dropdownContent.classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    var logoutButton = document.getElementById('logout-icon');
    var dropdownContent = document.getElementById('logout-dropdown-content');
    
    if (!event.target.matches('.logout-dropdown') && !event.target.matches('.fa-file-lines') && 
        !event.target.matches('.logout-button') && !event.target.parentElement.matches('.logout-button')) {
        dropdownContent.classList.remove('show');
    }
}


document.addEventListener('DOMContentLoaded', initializePage);
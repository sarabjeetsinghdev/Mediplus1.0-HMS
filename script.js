// Function to show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById(sectionId).style.display = 'block'; // Show the selected section

    // Toggle active class on sidebar links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
    });
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active'); // Add active class to the clicked link
    }
}

// Show the dashboard by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');

    // Initialize dummy data
    initializeDummyData();
});

let patients = [];
let patientIdCounter = 1; // To keep track of patient IDs

// Function to register a new patient
function registerPatient(name, age, contact, address, bloodGroup) {
    const patient = {
        id: patientIdCounter++,
        name: name,
        age: age,
        contact: contact,
        address: address,
        bloodGroup: bloodGroup
    };
    patients.push(patient);
    displayPatients();
}

// Function to display patients in the table
function displayPatients() {
    const tableBody = document.getElementById('patientTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.contact}</td>
            <td>${patient.address}</td>
            <td>${patient.bloodGroup}</td>
            <td>
                <span class="icon patient-icon-view" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon patient-icon-edit" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon patient-icon-delete" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for the icons
        row.querySelector('.patient-icon-view').addEventListener('click', () => displayPatientDetails(patient));
        row.querySelector('.patient-icon-edit').addEventListener('click', () => editPatient(patient.id));
        row.querySelector('.patient-icon-delete').addEventListener('click', () => deletePatient(patient.id));
    });
}

// Function to handle form submission for adding patients
document.getElementById('addPatientForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const contact = document.getElementById('patientContact').value;
    const address = document.getElementById('patientAddress').value;
    const bloodGroup = document.getElementById('patientBloodGroup').value;

    registerPatient(name, age, contact, address, bloodGroup); // Call the function to register patient

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addPatientModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search patients by name or ID
function searchPatients() {
    const searchValue = document.getElementById('searchPatient').value.toLowerCase();
    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchValue) || 
        patient.id.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('patientTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredPatients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.contact}</td>
            <td>${patient.address}</td>
            <td>${patient.bloodGroup}</td>
            <td>
                <span class="icon" onclick="editPatient(${patient.id})">Edit</span>
                <span class="icon" onclick="deletePatient(${patient.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a patient
function deletePatient(id) {
    patients = patients.filter(patient => patient.id !== id);
    displayPatients();
}

// Function to edit a patient
function editPatient(id) {
    const patient = patients.find(patient => patient.id === id);
    if (patient) {
        document.getElementById('patientName').value = patient.name;
        document.getElementById('patientAge').value = patient.age;
        document.getElementById('patientContact').value = patient.contact;
        document.getElementById('patientAddress').value = patient.address;
        document.getElementById('patientBloodGroup').value = patient.bloodGroup;

        // Show the modal
        $('#addPatientModal').modal('show');
    }
}

let personnel = [];
let billingRecords = [];
let personnelIdCounter = 1; // To keep track of personnel IDs
let billingIdCounter = 1; // To keep track of billing IDs

// Function to register a new personnel
function registerPersonnel(name, position, contact) {
    const person = {
        id: personnelIdCounter++,
        name: name,
        position: position,
        contact: contact
    };
    personnel.push(person);
    displayPersonnel();
}

// Function to display personnel in the table
function displayPersonnel() {
    const tableBody = document.getElementById('personnelTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    personnel.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.position}</td>
            <td>${person.contact}</td>
            <td>
                <span class="icon patient-icon-view" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon patient-icon-edit" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon patient-icon-delete" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for the icons
        row.querySelector('.patient-icon-view').addEventListener('click', () => displayPersonnelDetails(person));
        row.querySelector('.patient-icon-edit').addEventListener('click', () => editPersonnel(person.id));
        row.querySelector('.patient-icon-delete').addEventListener('click', () => deletePersonnel(person.id));
    });
}

// Function to handle form submission for adding personnel
document.getElementById('addPersonnelForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('personnelName').value;
    const position = document.getElementById('personnelPosition').value;
    const contact = document.getElementById('personnelContact').value;

    registerPersonnel(name, position, contact); // Call the function to register personnel

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addPersonnelModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search personnel by name or ID
function searchPersonnel() {
    const searchValue = document.getElementById('searchPersonnel').value.toLowerCase();
    const filteredPersonnel = personnel.filter(person =>
        person.name.toLowerCase().includes(searchValue) ||
        person.id.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('personnelTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredPersonnel.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.position}</td>
            <td>${person.contact}</td>
            <td>
                <span class="icon" onclick="editPersonnel(${person.id})">Edit</span>
                <span class="icon" onclick="deletePersonnel(${person.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a personnel
function deletePersonnel(id) {
    personnel = personnel.filter(person => person.id !== id);
    displayPersonnel();
}

// Function to edit a personnel
function editPersonnel(id) {
    const person = personnel.find(person => person.id === id);
    if (person) {
        document.getElementById('personnelName').value = person.name;
        document.getElementById('personnelPosition').value = person.position;
        document.getElementById('personnelContact').value = person.contact;

        // Show the modal
        $('#addPersonnelModal').modal('show');
    }
}

// Function to register a new billing record
function registerBilling(patientId, amount, date, description) {
    const billing = {
        id: billingIdCounter++,
        patientId: patientId,
        amount: amount,
        date: date,
        description: description
    };
    billingRecords.push(billing);
    displayBilling();
}

// Function to display billing records in the table
function displayBilling() {
    const tableBody = document.getElementById('billingTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    billingRecords.forEach(billing => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${billing.id}</td>
            <td>${billing.patientId}</td>
            <td>$${billing.amount}</td>
            <td>${billing.date}</td>
            <td>${billing.description}</td>
            <td>
                <span class="icon patient-icon-view" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon patient-icon-edit" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon patient-icon-delete" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for the icons
        row.querySelector('.patient-icon-view').addEventListener('click', () => displayBillingDetails(billing));
        row.querySelector('.patient-icon-edit').addEventListener('click', () => editBilling(billing.id));
        row.querySelector('.patient-icon-delete').addEventListener('click', () => deleteBilling(billing.id));
    });
}

// Function to handle form submission for adding billing
document.getElementById('addBillingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const amount = document.getElementById('billingAmount').value;
    const date = document.getElementById('billingDate').value;
    const description = document.getElementById('billingDescription').value;

    registerBilling(1, amount, date, description); // Call the function to register billing

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addBillingModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search billing records by patient ID or amount
function searchBilling() {
    const searchValue = document.getElementById('searchBilling').value.toLowerCase();
    const filteredBilling = billingRecords.filter(billing =>
        billing.patientId.toString().includes(searchValue) ||
        billing.amount.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('billingTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredBilling.forEach(billing => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${billing.id}</td>
            <td>${billing.patientId}</td>
            <td>${billing.amount}</td>
            <td>${billing.date}</td>
            <td>${billing.description}</td>
            <td>
                <span class="icon" onclick="editBilling(${billing.id})">Edit</span>
                <span class="icon" onclick="deleteBilling(${billing.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a billing record
function deleteBilling(id) {
    billingRecords = billingRecords.filter(billing => billing.id !== id);
    displayBilling();
}

// Function to edit a billing record
function editBilling(id) {
    const billing = billingRecords.find(billing => billing.id === id);
    if (billing) {
        document.getElementById('billingAmount').value = billing.amount;
        document.getElementById('billingDate').value = billing.date;
        document.getElementById('billingDescription').value = billing.description;

        // Show the modal
        $('#addBillingModal').modal('show');
    }
}

let reports = [];
let reportIdCounter = 1; // To keep track of report IDs

// Function to register a new report
function registerReport(patientId, description, date) {
    const report = {
        id: reportIdCounter++,
        patientId: patientId,
        description: description,
        date: date
    };
    reports.push(report);
    displayReports();
}

// Function to display reports in the table
function displayReports() {
    const tableBody = document.getElementById('reportsTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    reports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.patientId}</td>
            <td>${report.description}</td>
            <td>${report.date}</td>
            <td>
                <span class="icon patient-icon-view" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon patient-icon-edit" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon patient-icon-delete" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for the icons
        row.querySelector('.patient-icon-view').addEventListener('click', () => displayReportDetails(report));
        row.querySelector('.patient-icon-edit').addEventListener('click', () => editReport(report.id));
        row.querySelector('.patient-icon-delete').addEventListener('click', () => deleteReport(report.id));
    });
}

// Function to handle form submission for adding reports
document.getElementById('addReportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const description = document.getElementById('reportDescription').value;
    const date = document.getElementById('reportDate').value;

    registerReport(1, description, date); // Call the function to register report

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addReportModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search reports by patient ID or description
function searchReports() {
    const searchValue = document.getElementById('searchReports').value.toLowerCase();
    const filteredReports = reports.filter(report =>
        report.patientId.toString().includes(searchValue) ||
        report.description.toLowerCase().includes(searchValue)
    );

    const tableBody = document.getElementById('reportsTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredReports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.patientId}</td>
            <td>${report.description}</td>
            <td>${report.date}</td>
            <td>
                <span class="icon" onclick="editReport(${report.id})">Edit</span>
                <span class="icon" onclick="deleteReport(${report.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a report
function deleteReport(id) {
    reports = reports.filter(report => report.id !== id);
    displayReports();
}

// Function to edit a report
function editReport(id) {
    const report = reports.find(report => report.id === id);
    if (report) {
        document.getElementById('reportDescription').value = report.description;
        document.getElementById('reportDate').value = report.date;

        // Show the modal
        $('#addReportModal').modal('show');
    }
}

// Function to initialize dummy data
function initializeDummyData() {
    // Dummy Patients
    registerPatient("John Doe", 30, "123-456-7890", "123 Main St", "A+");
    registerPatient("Jane Smith", 25, "987-654-3210", "456 Elm St", "B-");
    registerPatient("Alice Johnson", 40, "555-123-4567", "789 Oak St", "O-");

    // Dummy Personnel
    registerPersonnel("Dr. Emily Brown", "Doctor", "555-987-6543");
    registerPersonnel("Nurse Sarah Connor", "Nurse", "555-321-0987");
    registerPersonnel("Receptionist Mike Lee", "Receptionist", "555-654-3210");

    // Dummy Billing Records
    registerBilling(1, 200, "2023-10-01", "Consultation Fee");
    registerBilling(2, 150, "2023-10-02", "X-Ray Fee");
    registerBilling(3, 300, "2023-10-03", "Blood Test Fee");

    // Dummy Reports
    registerReport(1, "Blood Test Results", "2023-10-01");
    registerReport(2, "X-Ray Results", "2023-10-02");
    registerReport(3, "Consultation Summary", "2023-10-03");
}

// Function to display patient details
function displayPatientDetails(patient) {
    document.getElementById('patientNameDetail').innerText = `Name: ${patient.name}`;
    document.getElementById('patientAgeDetail').innerText = `Age: ${patient.age}`;
    document.getElementById('patientContactDetail').innerText = `Contact: ${patient.contact}`;
    document.getElementById('patientAddressDetail').innerText = `Address: ${patient.address}`;
    document.getElementById('patientBloodGroupDetail').innerText = `Blood Group: ${patient.bloodGroup}`;

    // Example data for medical history, records, and medications
    const medicalHistory = "No significant medical history.";
    const medicalRecords = "All tests normal.";
    const medicationsGiven = "Aspirin, Ibuprofen";

    document.getElementById('medicalHistoryDetail').innerText = medicalHistory;
    document.getElementById('medicalRecordsDetail').innerText = medicalRecords;
    document.getElementById('medicationsDetail').innerText = medicationsGiven;

    // Example chances of survival data
    const survivalData = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
            label: 'Chances of Survival',
            data: [20, 50, 30], // Example data
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    const ctx = document.getElementById('survivalChart').getContext('2d');
    const survivalChart = new Chart(ctx, {
        type: 'pie',
        data: survivalData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chances of Survival'
                }
            }
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            survivalChart.destroy();
        });
    });


    // Hide the main content and show patient details
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById('patientDetails').style.display = 'block'; // Show patient details

    document.getElementById('backToPatientsButton').addEventListener('click', function () {
        document.getElementById('patientDetails').style.display = 'none'; // Hide patient details
        survivalChart.destroy(); // Destroy the chart instance
        showSection('patients'); // Show patients section
    });
}

// Function to display personnel details
function displayPersonnelDetails(personnel) {
    document.getElementById('personnelNameDetail').innerText = `Name: ${personnel.name}`;
    document.getElementById('personnelPositionDetail').innerText = `Position: ${personnel.position}`;
    document.getElementById('personnelContactDetail').innerText = `Contact: ${personnel.contact}`;
    document.getElementById('personnelAddressDetail').innerText = `Address: ${personnel.address}`;

    // Example data for medical history and records
    const medicalHistory = "No significant medical history.";
    const medicalRecords = "All tests normal.";

    document.getElementById('personnelMedicalHistoryDetail').innerText = medicalHistory;
    document.getElementById('personnelMedicalRecordsDetail').innerText = medicalRecords;

    // Hide the main content and show personnel details
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById('personnelDetails').style.display = 'block'; // Show personnel details

    document.getElementById('backToPersonnelButton').addEventListener('click', function () {
        document.getElementById('personnelDetails').style.display = 'none'; // Hide personnel details
        showSection('personnel'); // Show personnel section
    });
}

// Function to display billing details
function displayBillingDetails(billing) {
    document.getElementById('billingIdDetail').innerText = billing.id;
    document.getElementById('billingPatientIdDetail').innerText = billing.patientId;
    document.getElementById('billingAmountDetail').innerText = `$${billing.amount}`;
    document.getElementById('billingDateDetail').innerText = billing.date;
    document.getElementById('billingDescriptionDetail').innerText = billing.description;

    // Calculate the breakdown
    const subtotal = billing.amount;
    const taxRate = 0.10; // 10% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Display the breakdown in the single card
    document.getElementById('billingSubtotalDetail').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('billingTaxDetail').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('billingTotalDetail').innerText = `$${total.toFixed(2)}`;

    // Hide the main content and show billing details
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById('billingDetails').style.display = 'block'; // Show billing details

    document.getElementById('backToBillingButton').addEventListener('click', function () {
        document.getElementById('billingDetails').style.display = 'none'; // Hide billing details
        showSection('billing'); // Show billing section
    });
}

// Function to display report details
function displayReportDetails(report) {
    document.getElementById('reportIdDetail').innerText = report.id;
    document.getElementById('reportPatientIdDetail').innerText = report.patientId;
    document.getElementById('reportDateDetail').innerText = report.date;
    document.getElementById('reportDescriptionDetail').innerText = report.description;

    // Hide the main content and show report details
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById('reportDetails').style.display = 'block'; // Show report details

    document.getElementById('backToReportsButton').addEventListener('click', function () {
        document.getElementById('reportDetails').style.display = 'none'; // Hide report details
        showSection('reports'); // Show reports section
    });
}

let socialLinks = []; // Array to hold social media links

const f = fetch('https://credits-api.vercel.app')
f.then(response => response.json())
.then(data => {
    socialLinks = data; // Store the fetched data
    const socialContainer = document.createElement('div');
    socialContainer.className = 'social-icons text-center'; // Add a class for styling

    socialLinks.names.forEach((link, index) => {
        const icon = document.createElement('a');
        icon.href = data.links[index]; // Set the link
        icon.target = '_blank'; // Open in a new tab
        icon.innerHTML = `<i class="fab fa-${link.toLowerCase()} social-icon"></i>`; // Create the icon using Font Awesome
        icon.className = 'social-icon'; // Add a class for styling
        socialContainer.appendChild(icon); // Append the icon to the container
    });

    // Append the social icons to the footer or any desired location
    document.querySelector('footer .social-icons').appendChild(socialContainer);
})
.catch(error => console.error('Error:', error));
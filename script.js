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

    // Dummy Doctors
    registerDoctor("Dr. Emily Brown", "Cardiologist", "555-987-6543", "10 years", "MD from Harvard University", "New York, NY");
    registerDoctor("Dr. Michael Smith", "Neurologist", "555-321-0987", "8 years", "MD from Stanford University", "Los Angeles, CA");
    registerDoctor("Dr. Sarah Connor", "Pediatrician", "555-654-3210", "5 years", "MD from Yale University", "Chicago, IL");

    // Dummy Nurses
    registerNurse("Nurse Jessica Jones", "Pediatrics", "555-111-2222", "3 years", "BSN from University of California", "San Francisco, CA");
    registerNurse("Nurse Bruce Wayne", "Emergency", "555-333-4444", "6 years", "BSN from Johns Hopkins University", "Gotham City, NY");
    registerNurse("Nurse Diana Prince", "Surgery", "555-555-6666", "4 years", "BSN from University of Washington", "Metropolis, NY");

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

    // Dummy Appointments
    registerAppointment("John Doe", "Dr. Emily Brown", "09:00 AM", "Done");
    registerAppointment("Jane Smith", "Dr. Michael Smith", "10:30 AM", "Cancelled");
    registerAppointment("Alice Johnson", "Dr. Sarah Connor", "01:00 PM", "Done");

    // Dummy Past Appointments
    registerPastAppointment("John Doe", "Dr. Emily Brown", "2023-10-01", "09:00 AM", "Done");
    registerPastAppointment("Jane Smith", "Dr. Michael Smith", "2023-09-15", "Cancelled");
    registerPastAppointment("Alice Johnson", "Dr. Sarah Connor", "2023-09-20", "Done");
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

let doctors = [];
let nurses = [];
let doctorIdCounter = 1; // To keep track of doctor IDs
let nurseIdCounter = 1; // To keep track of nurse IDs

// Function to register a new doctor
function registerDoctor(name, specialization, contact, experience, education, location) {
    const doctor = {
        id: doctorIdCounter++,
        name: name,
        specialization: specialization,
        contact: contact,
        experience: experience,
        education: education,
        location: location
    };
    doctors.push(doctor);
    displayDoctors();
}

// Function to display doctors in the table
function displayDoctors() {
    const tableBody = document.getElementById('doctorTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    doctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.contact}</td>
            <td>
                <span class="icon" onclick="viewDoctor(${doctor.id})" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon" onclick="editDoctor(${doctor.id})" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon" onclick="deleteDoctor(${doctor.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle form submission for adding/editing doctors
document.getElementById('addDoctorForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('doctorName').value;
    const specialization = document.getElementById('doctorSpecialization').value;
    const contact = document.getElementById('doctorContact').value;

    // Check if editing or adding
    if (this.dataset.editing) {
        const doctorId = this.dataset.editing; // Get the ID of the doctor being edited
        const doctorIndex = doctors.findIndex(doctor => doctor.id == doctorId);
        if (doctorIndex > -1) {
            doctors[doctorIndex] = { id: doctorId, name, specialization, contact }; // Update the doctor
        }
    } else {
        registerDoctor(name, specialization, contact); // Call the function to register doctor
    }

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addDoctorModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search doctors by name or ID
function searchDoctors() {
    const searchValue = document.getElementById('searchDoctor').value.toLowerCase();
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchValue) ||
        doctor.id.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('doctorTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredDoctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.contact}</td>
            <td>
                <span class="icon" onclick="editDoctor(${doctor.id})">Edit</span>
                <span class="icon" onclick="deleteDoctor(${doctor.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a doctor
function deleteDoctor(id) {
    doctors = doctors.filter(doctor => doctor.id !== id);
    displayDoctors();
}

// Function to edit a doctor
function editDoctor(id) {
    const doctor = doctors.find(doctor => doctor.id === id);
    if (doctor) {
        document.getElementById('doctorName').value = doctor.name;
        document.getElementById('doctorSpecialization').value = doctor.specialization;
        document.getElementById('doctorContact').value = doctor.contact;

        // Show the modal
        $('#addDoctorModal').modal('show');
    }
}

// Similar functions for nurses
function registerNurse(name, department, contact, experience, education, location) {
    const nurse = {
        id: nurseIdCounter++,
        name: name,
        department: department,
        contact: contact,
        experience: experience,
        education: education,
        location: location
    };
    nurses.push(nurse);
    displayNurses();
}

function displayNurses() {
    const tableBody = document.getElementById('nurseTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    nurses.forEach(nurse => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nurse.id}</td>
            <td>${nurse.name}</td>
            <td>${nurse.department}</td>
            <td>${nurse.contact}</td>
            <td>
                <span class="icon" onclick="viewNurse(${nurse.id})" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon" onclick="editNurse(${nurse.id})" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon" onclick="deleteNurse(${nurse.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle form submission for adding/editing nurses
document.getElementById('addNurseForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('nurseName').value;
    const department = document.getElementById('nurseDepartment').value;
    const contact = document.getElementById('nurseContact').value;

    // Check if editing or adding
    if (this.dataset.editing) {
        const nurseId = this.dataset.editing; // Get the ID of the nurse being edited
        const nurseIndex = nurses.findIndex(nurse => nurse.id == nurseId);
        if (nurseIndex > -1) {
            nurses[nurseIndex] = { id: nurseId, name, department, contact }; // Update the nurse
        }
    } else {
        registerNurse(name, department, contact); // Call the function to register nurse
    }

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addNurseModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search nurses by name or ID
function searchNurses() {
    const searchValue = document.getElementById('searchNurse').value.toLowerCase();
    const filteredNurses = nurses.filter(nurse =>
        nurse.name.toLowerCase().includes(searchValue) ||
        nurse.id.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('nurseTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredNurses.forEach(nurse => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nurse.id}</td>
            <td>${nurse.name}</td>
            <td>${nurse.department}</td>
            <td>${nurse.contact}</td>
            <td>
                <span class="icon" onclick="editNurse(${nurse.id})">Edit</span>
                <span class="icon" onclick="deleteNurse(${nurse.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a nurse
function deleteNurse(id) {
    nurses = nurses.filter(nurse => nurse.id !== id);
    displayNurses();
}

// Function to edit a nurse
function editNurse(id) {
    const nurse = nurses.find(nurse => nurse.id === id);
    if (nurse) {
        document.getElementById('nurseName').value = nurse.name;
        document.getElementById('nurseDepartment').value = nurse.department;
        document.getElementById('nurseContact').value = nurse.contact;

        // Show the modal
        $('#addNurseModal').modal('show');
    }
}

// Function to view a doctor's details
function viewDoctor(id) {
    const doctor = doctors.find(doctor => doctor.id === id);
    if (doctor) {
        document.getElementById('doctorNameDetail').innerText = doctor.name;
        document.getElementById('doctorSpecializationDetail').innerText = doctor.specialization;
        document.getElementById('doctorContactDetail').innerText = doctor.contact;
        document.getElementById('doctorExperienceDetail').innerText = doctor.experience;
        document.getElementById('doctorEducationDetail').innerText = doctor.education;
        document.getElementById('doctorLocationDetail').innerText = doctor.location;

        // Hide all sections and show doctor details
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
        document.getElementById('doctorDetails').style.display = 'block'; // Show doctor details
    }
}

// Function to view a nurse's details
function viewNurse(id) {
    const nurse = nurses.find(nurse => nurse.id === id);
    if (nurse) {
        document.getElementById('nurseNameDetail').innerText = nurse.name;
        document.getElementById('nurseDepartmentDetail').innerText = nurse.department;
        document.getElementById('nurseContactDetail').innerText = nurse.contact;
        document.getElementById('nurseExperienceDetail').innerText = nurse.experience;
        document.getElementById('nurseEducationDetail').innerText = nurse.education;
        document.getElementById('nurseLocationDetail').innerText = nurse.location;

        // Hide all sections and show nurse details
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
        document.getElementById('nurseDetails').style.display = 'block'; // Show nurse details
    }
}

// Event listener for back to doctors button
document.getElementById('backToDoctorsButton').addEventListener('click', function () {
    document.getElementById('doctorDetails').style.display = 'none'; // Hide doctor details
    showSection('doctors'); // Show doctors section
});

// Event listener for back to nurses button
document.getElementById('backToNursesButton').addEventListener('click', function () {
    document.getElementById('nurseDetails').style.display = 'none'; // Hide nurse details
    showSection('nurses'); // Show nurses section
});

let appointments = [];
let appointmentIdCounter = 1; // To keep track of appointment IDs

// Function to register a new appointment
function registerAppointment(patientName, doctorName, time, status = "Done") {
    const appointment = {
        id: appointmentIdCounter++,
        patientName: patientName,
        doctorName: doctorName,
        time: time,
        status: status // Add status
    };
    appointments.push(appointment);
    displayAppointments();
}

// Function to display appointments in the table
function displayAppointments() {
    const tableBody = document.getElementById('appointmentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctorName}</td>
            <td>${appointment.time}</td>
            <td>${appointment.status}</td>
            <td>
                <span class="icon" onclick="editAppointment(${appointment.id})" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="icon" onclick="deleteAppointment(${appointment.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle form submission for adding appointments
document.getElementById('addAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const patientName = document.getElementById('appointmentPatientName').value;
    const doctorName = document.getElementById('appointmentDoctorName').value;
    const time = document.getElementById('appointmentTime').value;

    registerAppointment(patientName, doctorName, time); // Call the function to register appointment

    // Clear form fields
    this.reset(); // Reset the form fields after submission

    // Close the modal
    $('#addAppointmentModal').modal('hide'); // Use jQuery to hide the modal
});

// Function to search appointments by patient name or ID
function searchAppointments() {
    const searchValue = document.getElementById('searchAppointment').value.toLowerCase();
    const filteredAppointments = appointments.filter(appointment =>
        appointment.patientName.toLowerCase().includes(searchValue) ||
        appointment.id.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('appointmentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredAppointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctorName}</td>
            <td>${appointment.time}</td>
            <td>${appointment.status}</td>
            <td>
                <span class="icon" onclick="editAppointment(${appointment.id})">Edit</span>
                <span class="icon" onclick="deleteAppointment(${appointment.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete an appointment
function deleteAppointment(id) {
    appointments = appointments.filter(appointment => appointment.id !== id);
    displayAppointments();
}

// Function to edit an appointment
function editAppointment(id) {
    const appointment = appointments.find(appointment => appointment.id === id);
    if (appointment) {
        document.getElementById('appointmentPatientName').value = appointment.patientName;
        document.getElementById('appointmentDoctorName').value = appointment.doctorName;
        document.getElementById('appointmentTime').value = appointment.time;

        // Show the modal
        $('#addAppointmentModal').modal('show');
    }
}

let pastAppointments = [];
let pastAppointmentIdCounter = 1; // To keep track of past appointment IDs

// Function to register a new past appointment
function registerPastAppointment(patientName, doctorName, date, time, status = "Done") {
    const pastAppointment = {
        id: pastAppointmentIdCounter++,
        patientName: patientName,
        doctorName: doctorName,
        date: date,
        time: time,
        status: status // Add status
    };
    pastAppointments.push(pastAppointment);
    displayPastAppointments();
}

// Function to display past appointments in the table
function displayPastAppointments() {
    const tableBody = document.getElementById('pastAppointmentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    pastAppointments.forEach(pastAppointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pastAppointment.id}</td>
            <td>${pastAppointment.patientName}</td>
            <td>${pastAppointment.doctorName}</td>
            <td>${pastAppointment.date}</td>
            <td>${pastAppointment.time}</td>
            <td>${pastAppointment.status}</td>
            <td>
                <span class="icon" onclick="viewPastAppointment(${pastAppointment.id})" title="View">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="icon" onclick="deletePastAppointment(${pastAppointment.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to search past appointments by patient name or ID
function searchPastAppointments() {
    const searchValue = document.getElementById('searchPastAppointment').value.toLowerCase();
    const filteredPastAppointments = pastAppointments.filter(pastAppointment =>
        pastAppointment.patientName.toLowerCase().includes(searchValue) ||
        pastAppointment.id.toString().includes(searchValue)
    );

    const tableBody = document.getElementById('pastAppointmentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredPastAppointments.forEach(pastAppointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pastAppointment.id}</td>
            <td>${pastAppointment.patientName}</td>
            <td>${pastAppointment.doctorName}</td>
            <td>${pastAppointment.date}</td>
            <td>${pastAppointment.time}</td>
            <td>${pastAppointment.status}</td>
            <td>
                <span class="icon" onclick="viewPastAppointment(${pastAppointment.id})">View</span>
                <span class="icon" onclick="deletePastAppointment(${pastAppointment.id})">Delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a past appointment
function deletePastAppointment(id) {
    pastAppointments = pastAppointments.filter(pastAppointment => pastAppointment.id !== id);
    displayPastAppointments();
}

// Function to view a past appointment's details
function viewPastAppointment(id) {
    const pastAppointment = pastAppointments.find(pastAppointment => pastAppointment.id === id);
    if (pastAppointment) {
        // Display the past appointment details in a modal or a dedicated section
        alert(`Past Appointment Details:\nPatient: ${pastAppointment.patientName}\nDoctor: ${pastAppointment.doctorName}\nDate: ${pastAppointment.date}\nTime: ${pastAppointment.time}`);
    }
}
// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('Username').value; // username field added
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically
    var resumeHtml = "\n    <h2> <b>Editable Resume</b> </h2>\n    <h3>Personal Information</h3>\n    <p><b>Username:</b><span contenteditable=\"true\"> ".concat(username, "</span></p>\n    <p><b>Name:</b><span contenteditable=\"true\"> ").concat(name, "</span></p>\n    <p><b>Email:</b><span contenteditable=\"true\"> ").concat(email, "</span></p>\n    <p><b>Phone:</b><span contenteditable=\"true\"> ").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n  ");
    // Display the generated resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHtml;
    }
    else {
        console.error('The resume display element is missing.');
    }
    // Show the shareable link container
    shareableLinkContainer.style.display = 'block';
    // Generate a unique link (simplified here for demonstration purposes)
    var shareableLink = "https://my-resume-app.com/".concat(username);
    shareableLinkElement.href = shareableLink;
    shareableLinkElement.textContent = shareableLink;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    var jsPDF = window.jspdf.jsPDF;
    // Create a new jsPDF instance
    var doc = new jsPDF();
    // Add resume content to PDF
    var resumeContent = resumeDisplayElement.innerText || resumeDisplayElement.textContent || '';
    doc.text(resumeContent, 10, 10);
    // Save the PDF
    doc.save('resume.pdf');
});

// Get references to the form and display area
let form = document.getElementById('resume-form') as HTMLFormElement;
let resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;

const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page reload

  // Collect input values
  const username = (document.getElementById('Username') as HTMLInputElement).value; // username field added
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

  // Save form data in localStorage with the username as the key
  const resumeData = {
    name,
    email,
    phone,
    education,
    experience,
    skills,
  };
  localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

  // Generate the resume content dynamically
  const resumeHtml = `
    <h2> <b>Editable Resume</b> </h2>
    <h3>Personal Information</h3>
    <p><b>Username:</b><span contenteditable="true"> ${username}</span></p>
    <p><b>Name:</b><span contenteditable="true"> ${name}</span></p>
    <p><b>Email:</b><span contenteditable="true"> ${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true"> ${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
  `;

  // Display the generated resume
  if (resumeDisplayElement) {
    resumeDisplayElement.innerHTML = resumeHtml;
  } else {
    console.error('The resume display element is missing.');
  }

  // Show the shareable link container
  shareableLinkContainer.style.display = 'block';

  // Generate a unique link (simplified here for demonstration purposes)
  const shareableLink = `https://my-resume-app.com/${username}`;
  shareableLinkElement.href = shareableLink;
  shareableLinkElement.textContent = shareableLink;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add resume content to PDF
  const resumeContent = resumeDisplayElement.innerText || resumeDisplayElement.textContent || '';
  doc.text(resumeContent, 10, 10);

  // Save the PDF
  doc.save('resume.pdf');
});

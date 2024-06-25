const projectContainer = document.getElementById('projects');


function navigate(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const section = document.getElementById(hash);
        if (section) {
            section.scrollIntoView();
        }
    }
});


const projects = [
    {
        "title": "Productivity Ninja",
        "githubLink": "https://github.com/ChadBowler/Productivity-Ninja",
        "deployedLink": "https://productivity-ninja-d6cc6908ff4d.herokuapp.com/",
        "screenshot": "",
        "description": "The Productivity Ninja is an interactive front end with a back-end Restful API that can track the progress of Projects and their tasks. This API utilizes SQL databases to store Users, Tasks, Projects and dynamic Javascript and Handlebars to add/edit and delete Projects and their respective tasks.",
        "id": 1
    },
    {
        "title": "Employ Me Now",
        "githubLink": "https://github.com/ChadBowler/employ-me-now",
        "deployedLink": "https://employ-me-now-d264f478796e.herokuapp.com/",
        "screenshot": "",
        "description": "Employ Me Now is a simple, user-friendly job board web application utilizing dynamic React, and deployed through Heroku. Users are able to create and edit profiles, view and create job postings, and apply to jobs. The goal of this application is to simplify the task of searching for jobs/candidates for both prospective recruiters and job-seekers.",
        "id": 2
    },
    {
        "title": "Eazy Mealz",
        "githubLink": "https://github.com/Mateocassidy/Meal-Planner-Project",
        "deployedLink": "https://mateocassidy.github.io/Meal-Planner-Project/",
        "screenshot": "",
        "description": "This meal planner gets a calculated daily calorie goal, then gives you the option to search for different foods to meet those goals. This was a collaborative group project.",
        "id": 3
    }
]

for (const project of projects) {
    console.log(project.title);
    const newProject = document.createElement('div')
    newProject.classList.add("project")
    newProject.setAttribute("id", `project-${project.id}`)
    newProject.innerHTML = `
        <h2 class="project-title">${project.title}</h2>
        <a class="project-image" href="${project.deployedLink}">
            <div id="project-image-${project.id}"></div>
        </a>
        
        <p class="project-description">${project.description}</p>
        <div class="gh-link">
            
            <a href="${project.githubLink}">
                <div class="gh-logo"></div>
            </a>
            Github
        </div>
    `
    projectContainer.appendChild(newProject)
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Email sent successfully!');
            document.getElementById('email-form').style.display = 'none';
        }, (err) => {
            alert('Failed to send email. Please try again.');
            console.log(JSON.stringify(err));
        });
});

function openEmailForm() {
document.getElementById('email-form').style.display = 'block';
}
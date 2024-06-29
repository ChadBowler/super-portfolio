const projectContainer = document.getElementById('projects');
const menuList = document.getElementById('menu-list');

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
    const newProject = document.createElement('div')
    newProject.classList.add("project")
    newProject.setAttribute("id", `project-${project.id}`)
    newProject.innerHTML = `
        <h2 class="project-title">${project.title}</h2>
        <a class="project-image" href="${project.deployedLink}" target="_blank">
            <div id="project-image-${project.id}"></div>
        </a>
        
        <p class="project-description">${project.description}</p>
        <div class="gh-link">
            <a href="${project.githubLink}" target="_blank">
                <div class="gh-logo"></div>
            </a>
        </div>
    `
    projectContainer.appendChild(newProject)
}

document.getElementById('email-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const thankYouMessage = document.getElementById('thank-you-message');
    const errorMessage = document.getElementById('error-message');
    thankYouMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const userId = 's03Pqhhh-bJcuwiEW';
    const serviceId = 'service_5n4fh5s';
    const templateId = 'template_dj8bqok';
    const emailParams = {
        from_name: data.name,
        user_email: data.email,
        message: data.message,
        };
        try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: emailParams,
            }),
        });
    
        if (response.ok) {
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            thankYouMessage.style.display = 'block';
            nameField.value = "";
            emailField.value = "";
            messageField.value = "";
        } else {
            const error = await response.json();
            errorMessage.style.display = 'block';
            console.log(error);
        }
        } catch (error) {
            console.log(error);
        }

});

// Intersection Observer to highlight active section
const sections = document.querySelectorAll('.section');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
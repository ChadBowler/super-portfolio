const serviceID = process.env.SERVICE_ID;
const templateID = process.env.TEMPLATE_ID;

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // const serviceID = env.SERVICE_ID;
    // const templateID = env.TEMPLATE_ID;

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Email sent successfully!');
            document.getElementById('email-form').style.display = 'none';
        }, (err) => {
            alert('Failed to send email. Please try again.');
            console.log(JSON.stringify(err));
        });
});
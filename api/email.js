// import { env } from 'node:process';

// const serviceID = env.SERVICE_ID;
// const templateID = env.TEMPLATE_ID;

// document.getElementById('contact-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // const serviceID = env.SERVICE_ID;
//     // const templateID = env.TEMPLATE_ID;

//     emailjs.sendForm(serviceID, templateID, this)
//         .then(() => {
//             alert('Email sent successfully!');
//             // document.getElementById('email-form').style.display = 'none';
//         }, (err) => {
//             alert('Failed to send email. Please try again.');
//             console.log(JSON.stringify(err));
//         });
// });
import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { from_name, email, message } = req.body;

    const userId = process.env.PUBLIC_ID;
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;

    const emailParams = {
      from_name: from_name,
      user_email: email,
      message: message,
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
        res.status(200).json({ message: 'Email sent successfully!' });
      } else {
        const error = await response.json();
        res.status(500).json({ message: 'Failed to send email', error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

import express from 'express'
import nodemailer from 'nodemailer';

var app = express()

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server failed')
  })
  
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

// app.get("/student/all", (req, res) => {
//     getAll((err, notes) => {
//         if (err) {
//             console.error('Error fetching data:', err)
//             res.status(500).send('Error fetching data from database.')
//             return;
//         }
//         res.send(notes);
//     });
// });

// app.get('/email', (req, res) => {

//   let mailOptions = {
//       from: 'glookup340@gmail.com',
//       to: 'usmanzia371@gmail.com',
//       subject: 'Email using ExpressJS',
//       text: 'This email is sent from localhost:8080 by ExpressJS using NodeJS'
//   };

// // Create a transporter object using SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'glookup340@gmail.com',
//         pass: 'pdqnofpejzuapxrp'
//     }
// });

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log('Error sending email:', error);
//         res.status(500).send('Error sending email');
//     } else {
//         console.log('Email sent:', info.response);
//         res.status(200).send('Email sent successfully');
//     }
// });
// });
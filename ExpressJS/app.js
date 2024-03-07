import express from 'express'
import pkg from 'pg';
const { Client } = pkg;
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



app.get("/test", (req, res) => {
  const response = {
    'id': 1,
    'first_name': 'Usman',
    'last_name': 'Zia',
    'age': 21
  }

  res.json(response);
});

app.get("/all", async (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: '173.230.140.95',
    database: 'testing',
    password: 'devpatel',
    port: 5432
  });
try {
    await client.connect(); // Connect to the PostgreSQL database
    console.log('DB Connection Successful')
    const query = 'SELECT * FROM users'; // Your SQL query
    const result = await client.query(query); // Execute the query

    // Send the query result as JSON response
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end(); // Close the database connection
  }
});

app.post("/add", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  if (!first_name || !last_name || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await client.connect(); // Connect to the PostgreSQL database

    const query = `
      INSERT INTO users (first_name, last_name, username, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    
    const result = await client.query(query, [first_name, last_name, username, password]); // Execute the query

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).send('Error adding user');
  } finally {
    await client.end(); // Close the database connection
  }
});


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

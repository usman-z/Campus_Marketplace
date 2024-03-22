import express from 'express'
import pkg from 'pg';
import nodemailer from 'nodemailer';
import cors from 'cors';

const { Client } = pkg;
var app = express()

app.use(cors());
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server failed')
  })
  
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


const dbConfig = {
  host: '173.230.140.95',
  user: 'postgres',
  database: 'testing',
  password: 'devpatel',
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'campus.marketplaces@gmail.com',
      pass: 'oofk rdys wzvf ckqx'
    }
});

app.get("/any", async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM Message');
    // const result = await client.query('SELECT * FROM Listing');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.get("/all", async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect(); // Connect to the PostgreSQL database
    const result = await client.query('SELECT * FROM Personnel');
    res.json(result.rows);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM Personnel WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) {
      res.json(result.rows);
    }
    else {
      res.status(404).send('No such user');
    }

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/register", async (req, res) => {
  const { full_name, email, password, role } = req.body;
  let rating, total_ratings = 0;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const atIndex = email.indexOf('@'); // gets index of '@"
  if(atIndex === -1 || email.substring(atIndex+1).toLowerCase() !== 'uncg.edu'){  // if no index of '@' OR if after '@' it doesn't end w 'uncg.edu'
    return res.status(400).json({error: "You must use your UNCG email"});
  }

  const client = new Client(dbConfig);
  try {
    await client.connect(); // Connect to the PostgreSQL database

    const user = await client.query('SELECT * FROM Personnel WHERE email= $1', [email]);
    if(user.rows[0]){
      return res.status(400).json({ error: "User already exists with the same email"})
    }

    const result = await client.query(`
      INSERT INTO Personnel (full_name, email, password, role, rating, total_ratings)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [full_name, email, password, role, rating, total_ratings]);

    const newUserId = await client.query(`SELECT user_id FROM Personnel WHERE email = $1`,[email]);
    const mailOptions = {
      from: 'campus.marketplaces@gmail.com',
      to: email,
      subject: 'Action Required | Verify your Marketplace account',
      text: "Dear "+full_name+",\n\nWelcome to UNCG Marketplace! We are thrilled to have you as a new member of our community.\nPlease using this given link, http://173.230.140.95:4200/verify?userId="+newUserId.rows[0].user_id+", verify your account.\n\nBest regards,\nUNCG Marketplace Team"
    }

    transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
         console.log('Error sending email:', error);

     } else {
         console.log('Email sent:', info.response);
     }
    });

    res.json(result.rows[0]);

  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).send('Error adding user');
  } finally {
    await client.end(); // Close the database connection
  }

});

app.post("/inbox", async (req, res) => {
  const { userId } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
  const result = await client.query(`
  SELECT sender_id AS other_id FROM Message WHERE receiver_id = $1
  UNION
  SELECT receiver_id AS other_id FROM Message WHERE sender_id = $1
`, [userId]);
  res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/info", async (req, res) => {
  const { userId } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM Personnel WHERE user_id = $1', [userId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/messages", async(req, res) => {
  const { activeUser,otherUser } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query(`
    SELECT * FROM Message WHERE sender_id = $1 AND receiver_id = $2
    UNION
    SELECT * FROM Message WHERE sender_id = $2 AND receiver_id = $1
    `, [activeUser, otherUser]);
    res.json(result.rows);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/sendMessage", async(req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  const client = new Client(dbConfig);
  try { 
    await client.connect();
    await client.query('INSERT INTO Message(sender_id,receiver_id,message,message_time) VALUES($1,$2,$3,CURRENT_TIMESTAMP)', [sender_id, receiver_id, message]);
    const result = await client.query('SELECT * FROM Message');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/verify", async (req, res) =>  {
  const { userId } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    await client.query(`
      UPDATE Personnel
      SET email_verified = true
      WHERE user_id = $1`, [userId]);
    const result = await client.query('SELECT * FROM Personnel');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    await client.end();
  }
});

app.post("/rate", async (req, res) =>  {
  const { userId, newRating } = req.body;
    const client = new Client(dbConfig);

    try {
        await client.connect();

        // Check if the user exists and retrieve current ratings
        const userResult = await client.query('SELECT * FROM Personnel WHERE user_id = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUser = userResult.rows[0];
        const prevRating = existingUser.rating;
        const totalRatings = existingUser.total_ratings;
        const updatedRating = (prevRating * totalRatings + newRating) / (totalRatings + 1);

        // Update user rating in the database
        await client.query(`
            UPDATE Personnel
            SET rating = $1, total_ratings = $2
            WHERE user_id = $3
        `, [updatedRating, totalRatings + 1, userId]);

        // Fetch updated user data
        const updatedUserResult = await client.query('SELECT * FROM Personnel WHERE user_id = $1', [userId]);
        res.json(updatedUserResult.rows[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
    } finally {
        await client.end();
    }
}); 

app.get("/send", (req, res) => {
  const mailOptions = {
    from: 'campus.marketplaces@gmail.com',
    to: 'd_patel5@uncg.edu',
    subject: 'UNCG Marketplace debug',
    text: "UNCG Marketplace!"
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Success');
    }
  });
});

//add listing
app.post('/addListing', async (req, res) => {
  const { title, condition, price, description, seller_id, images_folder_path } = req.body;
  const client = new Client(dbConfig);
  try {
      await client.connect();
      const result = await client.query(`
          INSERT INTO Listing (title, condition, price, description, seller_id, images_folder_path)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING listing_id`, 
          [title, condition, price, description, seller_id, images_folder_path]);
      
      const listingId = result.rows[0].listing_id; // Assuming 'listing_id' is returned
      res.send({ success: true, message: 'Product added successfully', listingId: listingId });
  } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
  } finally {
      await client.end();
  }
});

app.post('/removeUser', async (req, res) => {
  const { userId } = req.body;
  const client = new Client(dbConfig);
  try {
      await client.connect();
      const result = await client.query(`DELETE FROM Personnel WHERE user_id = $1`,[userId]);
      res.json(result.rows);
  } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
  } finally {
      await client.end();
  }
});

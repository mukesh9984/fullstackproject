const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
let loggedInUserEmail = '';
const db = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6683165',
  password: 'qkwTYgtU2k',
  database: 'sql6683165'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');

  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS sql6683165.users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      dob DATE NOT NULL,
      contact VARCHAR(20) NOT NULL
    )
  `;
  
  db.query(createUserTableQuery, (error, results) => {
    if (error) {
      console.error('Error creating users table:', error);
    } else {
      console.log('Users table created successfully');
    }
  });
});


app.get('/userDetails',  (req, res) => {
  const userEmail = loggedInUserEmail;

  db.query('SELECT username, email, age, dob, contact FROM users WHERE email = ?', [userEmail], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

 
    return res.status(200).json(results[0]);
  });
});

app.put('/editUserDetails', (req, res) => {
  const userEmail = loggedInUserEmail;
 const { username, age, dob, contact } = req.body;


  db.query('UPDATE users SET username = ?, age = ?, dob = ?, contact = ? WHERE email = ?', [username, age, dob, contact, userEmail], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }


    return res.status(200).json({ message: 'User details updated successfully' });
  });
});

app.post('/signup', (req, res) => {
  const { username, email, password, age, dob, contact } = req.body;

  if (!username || !email || !password || !age || !dob || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

  
    db.query('INSERT INTO users (username, email, password, age, dob, contact) VALUES (?, ?, ?, ?, ?, ?)', [username, email, password, age, dob, contact], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

app.post('/login', (req, res) => {
  
  const { email, password } = req.body;
  loggedInUserEmail = email;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    return res.status(200).json({ message: 'Login successful' });
  });
});
app.get('/signup', (req, res) => {
  res.send('Sign up page');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



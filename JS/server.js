const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',   // Change if using a remote server
    user: 'root',        // Your MySQL username
    password: 'zyegan@14',        // Your MySQL password (leave blank if no password)
    database: 'object_reports' // The database name we created
});

// Check database connection
db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
    }
});

// ✅ API to handle object reports
app.post('/report-object', (req, res) => {
    const { objectName } = req.body;

    if (!objectName) {
        return res.status(400).json({ error: 'Object name is required' });
    }

    // Insert into MySQL
    const query = 'INSERT INTO reports (object_name) VALUES (?)';
    db.query(query, [objectName], (err, result) => {
        if (err) {
            console.error('❌ Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Object reported successfully', id: result.insertId });
    });
});

// ✅ Get all reported objects (for debugging)
app.get('/get-reports', (req, res) => {
    db.query('SELECT * FROM reports', (err, results) => {
        if (err) {
            console.error('❌ Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

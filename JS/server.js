const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zyegan@14',
    database: 'object_reports'
});

// Check database connection
db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
    }
});

// 1. Add a report (POST endpoint)
app.post('/report-object', (req, res) => {
    const { objectName } = req.body;

    if (!objectName) {
        return res.status(400).json({ error: 'Object name is required' });
    }

    const query = 'INSERT INTO reports (object_name) VALUES (?)';
    db.query(query, [objectName], (err, result) => {
        if (err) {
            console.error('❌ Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Object reported successfully', id: result.insertId });
    });
});

// 2. Fetch active reports (GET endpoint)
app.get('/get-reports', (req, res) => {
    db.query('SELECT * FROM reports', (err, results) => {
        if (err) {
            console.error('❌ Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.get('/get-barchartdata', (req, res) => {
    db.query('select object_name, time_difference from reports_log', (err, results) => {
        if(err) {
            console.error('fetching chart data error', err);
            return res.status(500).json({error: 'Database error' });
        }
        res.json(results);
});
});

// DELETE endpoint to log deletion details and remove from "reports"
app.delete('/delete-report/:id', (req, res) => {
    const reportId = req.params.id;

    // Step 1: Retrieve the report details from "reports" using the correct column name
    const fetchQuery = 'SELECT object_name, reported_at FROM reports WHERE id = ?';
    db.query(fetchQuery, [reportId], (err, results) => {
        if (err) {
            console.error('❌ Error fetching report:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        // Use reported_at directly
        const { object_name, reported_at } = results[0];

        if (!reported_at) {
            console.error("❌ reported_at is null for report id:", reportId);
            return res.status(500).json({ error: 'Report timestamp is missing' });
        }

        const delete_time = new Date(); // Current time
        const time_difference = (delete_time - new Date(reported_at)) / 1000; // In seconds

        // Step 2: Log deletion details into "reports_log"
        const logQuery = `
            INSERT INTO reports_log (object_name, reported_at, delete_time, time_difference)
            VALUES (?, ?, ?, ?);
        `;
        db.query(logQuery, [object_name, reported_at, delete_time, time_difference], (err, logResult) => {
            if (err) {
                console.error('❌ Error logging deletion:', err);
                return res.status(500).json({ error: 'Database error on logging deletion' });
            }

            // Step 3: Delete the report from "reports"
            const deleteQuery = 'DELETE FROM reports WHERE id = ?';
            db.query(deleteQuery, [reportId], (err, deleteResult) => {
                if (err) {
                    console.error('❌ Error deleting report:', err);
                    return res.status(500).json({ error: 'Database error on deletion' });
                }
                res.json({ message: 'Report deleted and logged successfully' });
            });
        });
    });
});


// Start the server
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

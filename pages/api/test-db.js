// pages/api/test-db.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection({
           
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT, 
            password: process.env.DB_PASS,
            database: process.env.DB_NAME, // Replace with your DB name
        });

        // Execute a simple query
        const [rows] = await connection.execute('SELECT 1 + 1 AS result');
        
        // Send a success response
        res.status(200).json({ success: true, data: rows });
        
        // Close the connection
        await connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Database connection failed' });
    }
}

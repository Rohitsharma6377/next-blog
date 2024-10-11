import query from "@/lib/db";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Handle GET request - Fetch all records

    try {
      const results = await query("SELECT * FROM contacts");
      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        message: "Error accessing the database",
        error: error.message,
      });
    }
  } else if (req.method === "POST") {
    // Handle POST request - Create a new record
    const { name, email, phone, message } = req.body;

    try {

      // //Ensures table exists
      // const createTableSQL = `
      //   CREATE TABLE contacts (
      //   id INT AUTO_INCREMENT PRIMARY KEY,
      //   name VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
      //   email VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
      //   phone BIGINT NOT NULL,
      //   message MEDIUMTEXT COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
      //   admin_remarks VARCHAR(255) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
      //   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      //   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      //   );
      // `;
      // await query(createTableSQL);

      const sql = "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";
      const result = await query(sql, [name, email, phone, message]);

      // Sending an email to the admin
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // SMTP Host
        port: process.env.SMTP_PORT, // SMTP Port (typically 587 for TLS)
        secure: true, // True for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, // Generated SMTP user
          pass: process.env.SMTP_PASSWORD, // Generated SMTP password
        },
      });

      const mailOptions = {
        from: '"AmitKK" <quote@aryaagency.com>', // Sender address
        to: "nakeaway@gmail.com", // List of recipients
        subject: "New Contact Form Submission", // Subject line
        text: `You have a new contact form submission from ${name}. Here are the details:
                       Name: ${name}
                       Email: ${email}
                       Phone: ${phone}
                       Message: ${message}`, // Plain text body
        html: `<h4>You have a new contact form submission from ${name}.</h4>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Phone:</strong> ${phone}</p>
                       <p><strong>Message:</strong> ${message}</p>`, // HTML body
      };

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ message: "Form submission successful", data: result });
    } catch (error) {
      console.error("Error handling form submission:", error);
      res.status(500).json({
        message: "Error handling form submission",
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    // Handle PUT request - Update an existing record
    const { id, name, email, phone, message, admin_remarks } = req.body;

    // // console.log(req.body);
    try {
      const sql =
        "UPDATE contacts SET name = ?, email = ?, phone = ?, message = ?, admin_remarks = ? WHERE id = ?";
      const result = await query(sql, [
        name,
        email,
        phone,
        message,
        admin_remarks,
        id,
      ]);

      res
        .status(200)
        .json({ message: "Contact updated successfully", data: req.body });

      // if (result.affectedRows === 0) {
      //     res.status(404).json({ message: 'No contact found with the given ID' });
      // } else {
      // }
    } catch (error) {
      console.error("Error updating contact:", error);
      res
        .status(500)
        .json({ message: "Error updating the contact", error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
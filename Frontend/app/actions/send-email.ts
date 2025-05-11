"use server"

import nodemailer from "nodemailer"

export async function sendEmail(formData: FormData) {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.error("Missing environment variables: SMTP_EMAIL or SMTP_PASSWORD")
        return { success: false, message: "Email service is not configured properly" }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate input
    if (!name || !email || !message) {
        return { success: false, message: "Please fill in all fields" }
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        debug: true, // Enable debug logs
    })

    try {
        // Test the connection
        await transporter.verify()
        console.log("SMTP connection verified successfully")

        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.SMTP_EMAIL}>`,
            to: process.env.SMTP_EMAIL,
            subject: `New Contact Form Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
            html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `,
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Message sent successfully:", info.messageId)

        return {
            success: true,
            message: "Message sent successfully! We'll get back to you soon.",
        }
    } catch (error) {
        console.error("Detailed error:", error)
        return {
            success: false,
            message: "Sorry, there was an error sending your message. Please try again later.",
        }
    }
}
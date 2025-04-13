// app/api/email/confirm/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // 1. Parse the incoming data
    const { name, email, phone, tier } = await request.json();

    // 2. Create a Nodemailer transporter using Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send a confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "TrashAid Sponsorship Application Received",
      text: `Dear ${name},

Thank you for your interest in becoming a TrashAid sponsor! We have received your application for the ${tier} tier sponsorship.

Application Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Selected Tier: ${tier}

Our team will review your application and contact you shortly to discuss the next steps.

Thank you for supporting our mission to create a cleaner planet through smart waste management.

Best regards,
The TrashAid Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #166534;">Thank you for your interest in TrashAid!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in becoming a TrashAid sponsor! We have received your application for the ${tier} tier sponsorship.</p>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">Application Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li>📝 <strong>Name:</strong> ${name}</li>
              <li>📧 <strong>Email:</strong> ${email}</li>
              <li>📱 <strong>Phone:</strong> ${phone}</li>
              <li>⭐ <strong>Selected Tier:</strong> ${tier}</li>
            </ul>
          </div>
          
          <p>Our team will review your application and contact you shortly to discuss the next steps.</p>
          
          <p>Thank you for supporting our mission to create a cleaner planet through smart waste management.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The TrashAid Team</strong>
          </p>
        </div>
      `,
    });

    // 4. Return a success response
    return NextResponse.json(
      {
        message:
          "Sponsorship application received and confirmation email sent!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // 5. Return an error response
    return NextResponse.json(
      { error: "Failed to send confirmation email." },
      { status: 500 }
    );
  }
}

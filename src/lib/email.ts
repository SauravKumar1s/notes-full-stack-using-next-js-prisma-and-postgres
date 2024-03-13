// lib/email.ts
import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    // Configure your email sending provider (e.g., SMTP or API key for a service like SendGrid).
    // Example for sending through SMTP:
    host: 'your-smtp-host',
    port: 587,
    secure: false,
    auth: {
      user: 'your-smtp-username',
      pass: 'your-smtp-password',
    },
  });

  const verificationLink = `https://yourwebsite.com/verify-email?email=${email}&token=${verificationToken}`;

  await transporter.sendMail({
    from: 'your@example.com',
    to: email,
    subject: 'Email Verification',
    html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
  });
}


import { NextRequest, NextResponse } from "next/server";

import prisma from '../../../../../lib/prisma';
import nodemailer from 'nodemailer';

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Check if the email exists in your database
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate a token for password reset (you can use a library like crypto)
      const resetToken = 'generateYourResetTokenHere';

      // Update the user record in the database with the reset token
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetToken,
        },
      });

      // Send the password reset email
      const transporter = nodemailer.createTransport({
        // configure your email transport options here
        // For example, you can use a SMTP server or a service like SendGrid
      });

      const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: 
               https://your-website.com/reset-password/${resetToken}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
      console.error('Error during password reset:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
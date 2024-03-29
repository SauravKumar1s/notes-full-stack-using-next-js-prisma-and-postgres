'use server';

import prisma from '../../../../lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '../email/sendEmail';
import { ResetPasswordEmailTemplate } from '@/app/email-templates/reset-password-email';

export const resetPassword = async (email: string) => {
    console.log('Resetting password for ' + email);

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(!user) {
        throw new Error('User not found');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiry: expiryDate
        }
    })

  const res =  await sendEmail({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Reset your password',
        react: ResetPasswordEmailTemplate({email, resetPasswordToken}) as React.ReactElement
    });
    console.log(res)

    return "Password reset email sent"
};
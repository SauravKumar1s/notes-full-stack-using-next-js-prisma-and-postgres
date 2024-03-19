"use server";

import { hash } from 'bcrypt';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs'

export const changePassword = async (resetPasswordToken: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            resetPasswordToken
        }
    })

    if(!user) {
        throw new Error('User not found');
    }

    const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
    if(!resetPasswordTokenExpiry) {
        throw new Error('Token expired');
    }

    const today = new Date();

    if(today > resetPasswordTokenExpiry) {
        throw new Error('Token expired');
    }
    

    const hashedPassword = await hash(password, 10);


    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password : hashedPassword,
            resetPasswordToken: null,
            resetPasswordTokenExpiry: null,
        }
    })

    return "Password changed successfully"
}
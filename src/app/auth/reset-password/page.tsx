
import ResetPasswordForm from '@/components/ResetPasswordForm';
import prisma from '../../../../lib/prisma';
import React from 'react';
import ChangePasswordForm from '@/components/ChangePasswordForm';

interface ResetPasswordPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
    console.log(searchParams)
    if (searchParams.token) {
        const user = await prisma.user.findUnique({
            where: {
                resetPasswordToken: searchParams.token as string,
            },
        });
        if (!user) {
            return <div>Invalid token</div>;
        }

        return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
    } else {
        return <ResetPasswordForm />;
    }
};

export default ResetPasswordPage;
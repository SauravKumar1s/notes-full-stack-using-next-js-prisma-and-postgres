"use server";

import { Resend } from "resend";
import { CreateEmailOptions, CreateEmailRequestOptions } from "resend/build/src/emails/interfaces";

const resend = new Resend('re_hV4fjLkj_NwYhsrZt4hJwaeoEuz2ht6rR');

export const sendEmail = async (payload: CreateEmailOptions, options?: CreateEmailRequestOptions | undefined) => {
    const data = await resend.emails.send(payload, options);
    console.log("Email sent successfully")
    return data;
}
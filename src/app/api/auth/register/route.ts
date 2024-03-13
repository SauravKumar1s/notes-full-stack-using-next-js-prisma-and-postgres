// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          // Fetch user from your Prisma database
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          // If user does not exist or password is incorrect, return null
          if (!user || !(await compare(credentials.password, user.password))) {
            return Promise.resolve(null);
          }

          // If credentials are valid, return the user object
          return Promise.resolve(user);
        } catch (error) {
          console.error('Error during user authentication:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    // Customize the URLs for the sign-in and sign-out pages
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    // After sign-up, redirect to the user's dashboard or any desired page
    async jwt(token, user) {
      if (user) {
        token.id = user.id; // Include user id in the token
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id; // Attach user id to the session
      return session;
    },
  },
});

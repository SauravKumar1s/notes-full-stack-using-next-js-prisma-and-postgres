import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../lib/prisma"

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "766369810615-i3poq95euievo6vj0vgsked5e9nt4lfl.apps.googleusercontent.com",
      clientSecret: "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"
      // clientId: process.env.GOOGLE_CLIENT_ID!,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}
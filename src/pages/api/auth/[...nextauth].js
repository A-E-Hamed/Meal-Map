import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Please enter a vaild email and password.");
        }

        client.close();
        return { id: user._id, email: user.email };
      },
    }),
  ],
});

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from "../../../src/lib/mongodb";

export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials

        if(email !== 'test@test.com' || password !== 'password123') {
          throw new Error('User does not exists. Please make sure you insert the correct email & password.')
        }

        return {
          id: 1,
          name: 'Tester',
          email: 'test@test.com'
        }
      }
    })
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl
    }
  }
})

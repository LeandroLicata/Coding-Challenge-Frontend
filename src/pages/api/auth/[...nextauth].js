import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          credentials
        );
        // console.log(credentials);

        let userFound = null;

        if (response.status === 200) {
          userFound = response.data;
        }

        if (!userFound) throw new Error("Invalid credentials");

        // console.log(userFound);

        return userFound;
      },
    }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

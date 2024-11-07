import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    // pages: {
    //     signIn: "/login"
    // },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            authorization: {
              params: {
                scope: 'read:user repo', // Required to get access_token
              },
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                scope: 'openid email profile',
                },
            },
        }),
    ],
    callbacks: {
        async session({token, session}){
            if(token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image
            }

            return session
        },
        async jwt({token}) {
            return token
        }
    }
}
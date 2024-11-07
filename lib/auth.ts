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
            let newsession = {...session} as any
            if(token) {
                newsession.user.id = token.id
                newsession.user.name = token.name
                newsession.user.email = token.email
                newsession.user.image = token.image
            }

            return newsession
        },
        async jwt({token}) {
            return token
        }
    }
}
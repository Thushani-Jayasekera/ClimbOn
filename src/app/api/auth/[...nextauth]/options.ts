import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import getConfig from "next/config";
import { useEffect } from "react";



const prisma = new PrismaClient();

// const {publicRuntimeConfig} = getConfig();

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        /*
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        */
    ],
    session: {
        strategy: "jwt",    
    },
    secret: process.env.NEXTAUTH_SECRET,
    theme: {
        colorScheme: "light",
        brandColor: "white"
    },
    pages: {
        signIn: "/signin"
    }
    
}
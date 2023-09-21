/** @type {import('next').NextConfig} */
const nextConfig = {

    output: 'standalone',
    env:{
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        BASE_URL: process.env.BASE_URL,
    }
}

module.exports = nextConfig

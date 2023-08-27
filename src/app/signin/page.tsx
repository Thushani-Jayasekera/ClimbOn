'use client'

import { useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"
import logo2 from 'src/assets/logo2.png'

export default function Signin() {
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/profile')
            toast.success('Signed In Successfully')
        }
        
    })

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-12 lg:px-8 bg-gray-50">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <Image className="rounded-full mx-auto"
                            src={logo2}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="relative mt-10">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white px-6 text-gray-900">Sign in with OAuth Providers</span>
                        </div>
                </div>

                    <div className="mt-6">
                        <button 
                            onClick={() => signIn('github')} 
                            className="py-2 text-medium font-medium border border-gray-200 flex items-center justify-center mb-4 bg-slate-950 text-white hover:bg-slate-800  w-full rounded-lg p-2 transition"
                        >
                            <FaGithub size='1.75rem' className="mr-2" />
                            Continue With GitHub
                        </button>

                        <button 
                            onClick={() => signIn('google')} 
                            className="py-2 text-medium font-medium border border-gray-200 flex items-center justify-center bg-blue-500 text-white hover:opacity-90  w-full rounded-lg p-2 transition"
                        >
                            <FcGoogle size='1.75rem' className="mr-2" />
                            Continue With Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

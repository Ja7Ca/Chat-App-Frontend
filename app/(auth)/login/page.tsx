"use client"

import { Button, Card } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginPage = () => {
    const {data} = useSession()
    console.log(data)
    if(data) {
        redirect('/dashboard')
    }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Card className="max-w-sm">
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl-3xl mb-4">Login To Chat App</h1>
            <Button pill color="blue" 
            onClick={() => signIn()}
            >
                Login
            </Button>
        </Card>
    </div>
  );
}

export default LoginPage

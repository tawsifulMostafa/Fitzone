"use server"
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const sessionCheck = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session || null;
}

export const getUser =async() => {
    const session = await sessionCheck()
    const user = session?.user
    return user || <div className="text-center">No user Found</div>;    
}
export const getUserToken = async() => {
    const {session} = await sessionCheck()
    const token  = session?.token
    return token;
}

export const requireRole = async (role) => {
    const session = await sessionCheck()
    const user = session?.user
    if (!user) {
        redirect('/auth/signin')
    }
    if (user?.role !== role) {
        redirect('/unauthorized')
    }
    return user;
}
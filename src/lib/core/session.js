
import { headers } from "next/headers";
import { auth } from "../auth";

export const sessionCheck = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
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
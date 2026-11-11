"use server"
import { headers } from "next/headers"
import { auth } from "../auth";

// import { getJWT } from "../api/auth";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// export const authHeader = async () => {
//     const token = await getJWT()
//     const header = token ? {
//         authorization: `bearer ${token}`
//     } : {};
//     return header;
// }

export const authHeader = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    return token;
}

export const serverMutation = async (path, data, method = "POST") => {

    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${await authHeader()}`
        },
        body: JSON.stringify(data)
    })
    return res.json();
}


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}


export const serverProtectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            Authorization: `Bearer ${await authHeader()}`
        }
    });
    return res.json()
}


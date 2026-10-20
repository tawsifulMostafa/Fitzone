"use server"
import { getUserToken } from "./session";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authHeader = async() =>{
    const token = await getUserToken()
    const header = token ? {
        authorization : `bearer ${token}`
    } : {};
    return header;
}

export const serverMutation = async (path , data , method = "POST") => {
 
    const res = await fetch(`${baseUrl}${path}` , {
        method , 
        headers :{
            "Content-Type" : "Application/json" , 
            ...await authHeader()
        },
        body : JSON.stringify(data)
    })
    return res.json();
}

 
export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}


export const serverProtectedFetch = async(path) => {
    const res = await fetch(`${baseUrl}${path}` , {
        headers:await authHeader()
    })
    return res.json();
}

 
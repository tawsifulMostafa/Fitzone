
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverMutation = async (path , data , method = "POST") => {


    const res = await fetch(`${baseUrl}${path}` , {
        method , 
        headers :{
            "Content-Type" : "Application/json"
        },
        body : JSON.stringify(data)
    })
    return res.json();
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}


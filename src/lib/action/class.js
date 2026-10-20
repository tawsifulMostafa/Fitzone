import { serverMutation } from "../core/server"

export const postClass = async(classData) => {
    const data = await serverMutation("/api/create/class" , classData)
    return data;
}
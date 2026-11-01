import { serverMutation } from "../core/server"

export const userStatus = async (userId , status) => {
    const result = await serverMutation(`/api/user/status/${userId}`, { status } , "PATCH")
    return result;
}
export const userRole = async(userId , newRole)=> {
    const result = await serverMutation(`/api/user/role/${userId}` , {newRole} , "PATCH")
        return result;
}
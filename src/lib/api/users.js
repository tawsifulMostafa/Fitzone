import { serverProtectedFetch } from "../core/server"

export const users = async() => {
           const users = await serverProtectedFetch("/api/all/users")
           return users;
}
import { serverFetch, serverProtectedFetch } from "../core/server"

export const forum = async () => {
    const forums = await serverFetch("/api/get/forum")
    return forums;
}
export const forumDetails = async (id) => {
    const res = await serverProtectedFetch(`/api/forum/${id}`)
    return res;
}
export const forumsComment = async (forumId) => {
    const comments = await serverProtectedFetch(`/api/post/forum/comment/${forumId}`)
    return comments;
}
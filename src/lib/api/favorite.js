import { serverProtectedFetch } from "../core/server"

export const getFavorite = async (classId) => {
    return await serverProtectedFetch(`/api/favorites/${classId}`) 
}

export const favoriteCollection = async (classId) => {
    const favorite = await serverProtectedFetch("/api/dashboard/favorites")
    return favorite;
}
import { serverProtectedFetch } from "../core/server"

export const getFavorite = async(classId) =>{
    const favorite = await serverProtectedFetch(`/api/favorites/${classId}`)
    return favorite;
}

export const favoriteCollection = async(classId) => {
    const favorite = await serverProtectedFetch(`/api/dashboard/favorites/${classId}`)
    return favorite;
}
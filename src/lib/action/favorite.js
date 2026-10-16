"use server"
import { serverMutation } from "../core/server"

export const postFavorite = async (classId) => {
    const favorite = await serverMutation("/api/favorites", { classId })
    return favorite;
}

export const deleteFavorite = async (classId) => {
    return await serverMutation(
        `/api/remove/favorite/${classId}`,
        {},
        "DELETE"
    );
};
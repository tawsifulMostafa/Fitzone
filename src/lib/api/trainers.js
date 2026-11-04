import { serverProtectedFetch } from "../core/server"

export const getTrainers = async () => {
    return await serverProtectedFetch("/api/manage/trainers")
}
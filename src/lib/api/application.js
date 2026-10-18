"use server"
import { serverProtectedFetch } from "../core/server"

export const getApplication = async() => {
    const application = await serverProtectedFetch("/api/apply/trainer")
    return application
} 
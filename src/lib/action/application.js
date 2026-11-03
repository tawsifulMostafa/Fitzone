"use server"
import { serverMutation } from "../core/server"

export const applyAsTrainer = async (applicationData) => {
    const apply = await serverMutation("/api/apply/trainer", applicationData)
    return apply;
}
export const reviewApplication = async (applicationId, { status, adminFeedback }) => {
    return await serverMutation(`/api/review/application/${applicationId}`, { status, adminFeedback }, "PATCH")
}

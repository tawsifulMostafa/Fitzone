"use server"
import { serverMutation } from "../core/server"

export const applyAsTrainer = async(applicationData) => {
    const apply = await serverMutation("/api/apply/trainer" , applicationData)
    return apply;
}

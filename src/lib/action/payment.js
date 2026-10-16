"use server"

import { serverMutation } from "../core/server"

export const PostPayment = async (classId) => {
    const paymentStatus = await serverMutation("/api/checkout", { classId })
    return paymentStatus;
}
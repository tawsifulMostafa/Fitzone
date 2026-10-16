import {serverProtectedFetch } from "../core/server"

export const getUserPaymentStatus = async(classId) => {
    const getPayment = await serverProtectedFetch(`/api/bookings/check/${classId}`)
    return getPayment
}
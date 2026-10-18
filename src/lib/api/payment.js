import {serverProtectedFetch } from "../core/server"

export const getUserPaymentStatus = async(classId) => {
    const getPayment = await serverProtectedFetch(`/api/bookings/check/${classId}`)
    return getPayment
}
export const getUserBookings = async() => {
    const bookings = await serverProtectedFetch("/api/member/bookings")
    return bookings
}

 
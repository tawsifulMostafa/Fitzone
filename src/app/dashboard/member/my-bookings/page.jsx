import { getUserBookings } from "@/lib/api/payment";

const MyBookingsMember = async() => {
    const bookings = await getUserBookings()
    return (
        <div>
            {
                bookings.length
            }
        </div>
    );
};

export default MyBookingsMember;

import Link from "next/link";
import Image from "next/image";
import { getUserBookings } from "@/lib/api/payment";
import { Clock3, ArrowUpRight } from "lucide-react";

const MyBookingsMember = async () => {
    const bookings = await getUserBookings();

    if (!bookings?.length) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">No Bookings Found</h2>
                <p className="mt-2 text-gray-500">
                    You haven&apos;t booked any classes yet.
                </p>
                <Link
                    href="/all-classes"
                    className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 text-white"
                >
                    Explore Classes
                </Link>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Bookings
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your booked classes.
                    </p>
                </div>

                <span className="rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                    Total: {bookings.length}
                </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {bookings.map((booking) => {
                    const cls = booking.classData;

                    if (!cls) return null;

                    return (
                        <div
                            key={booking._id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
                        >
                            <div className="relative h-40">
                                <Image
                                    src={cls.image}
                                    alt={cls.className}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                    className="object-cover"
                                />
                                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-700">
                                    {cls.category}
                                </span>
                            </div>

                            <div className="space-y-3 p-4">
                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        {cls.className}
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {cls.trainerName}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-1.5 text-gray-500">
                                        <Clock3 size={15} />
                                        {cls.duration} min
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        ৳{booking.amount}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium capitalize text-green-700">
                                        {booking.status}
                                    </span>

                                    <Link
                                        href={`/all-classes/${booking.classId}`}
                                        className="flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800"
                                    >
                                        View Details
                                        <ArrowUpRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default MyBookingsMember;

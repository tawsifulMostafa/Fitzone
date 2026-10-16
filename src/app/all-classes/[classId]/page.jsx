import { getClassById } from "@/lib/api/classes";
import { ArrowLeft, Clock, Dumbbell, Users, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClassDetailsActions from "../ClassDetailsActions";
import { getUserToken } from "@/lib/core/session";
import { getUserPaymentStatus } from "@/lib/api/payment";
import { getFavorite } from "@/lib/api/favorite";

const ClassDetailsPage = async ({ params }) => {

    const { classId } = await params;
    const isFavorite = await getFavorite(classId)
    const classDetail = await getClassById(classId)
    const token = await getUserToken();
    const payment = await getUserPaymentStatus(classId)

    if (!classDetail) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <h1 className="text-3xl font-black text-gray-950">
                    Class Not Found
                </h1>

                <Link
                    href="/all-classes"
                    className="mt-5 font-bold text-purple-700"
                >
                    Back to Classes
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">

            {/* Hero */}
            <section className="bg-gray-950 px-5 py-12 sm:py-16 lg:px-16">
                <div className="mx-auto max-w-7xl">

                    <Link
                        href="/all-classes"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-purple-300"
                    >
                        <ArrowLeft size={17} />
                        Back to Classes
                    </Link>

                    <div className="grid items-center gap-10 lg:grid-cols-2">

                        <div>
                            <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-300">
                                {classDetail.category} Training
                            </span>

                            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                                {classDetail.className}
                            </h1>

                            <p className="mt-5 max-w-xl leading-8 text-gray-400">
                                {classDetail.description}
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <Dumbbell className="text-purple-400" size={22} />

                                    <p className="mt-3 text-sm text-gray-400">
                                        Trainer
                                    </p>

                                    <p className="mt-1 font-bold text-white">
                                        {classDetail.trainerName}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <Clock className="text-purple-400" size={22} />

                                    <p className="mt-3 text-sm text-gray-400">
                                        Duration
                                    </p>

                                    <p className="mt-1 font-bold text-white">
                                        {classDetail.duration} minutes
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <Users className="text-purple-400" size={22} />

                                    <p className="mt-3 text-sm text-gray-400">
                                        Total Bookings
                                    </p>

                                    <p className="mt-1 font-bold text-white">
                                        {classDetail.bookingCount}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <CalendarDays className="text-purple-400" size={22} />

                                    <p className="mt-3 text-sm text-gray-400">
                                        Class Status
                                    </p>

                                    <p className="mt-1 font-bold capitalize text-white">
                                        {classDetail.status}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Class Image */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
                            <div className="relative h-72 overflow-hidden rounded-xl sm:h-96">

                                <Image
                                    src={classDetail.image}
                                    alt={classDetail.className}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />

                                <div className="absolute bottom-5 left-5">
                                    <p className="text-xs font-bold tracking-widest text-purple-300">
                                        FITZONE EXPERIENCE
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black text-white">
                                        Train. Improve. Repeat.
                                    </h2>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Details and Booking */}
            <section className="px-5 py-14 lg:px-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

                    {/* Schedule */}
                    <div className="space-y-6 lg:col-span-2">

                        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
                            <p className="text-sm font-bold uppercase tracking-widest text-purple-700">
                                Class Information
                            </p>

                            <h2 className="mt-3 text-2xl font-black text-gray-950">
                                About This Class
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                {classDetail.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                                    {classDetail.category}
                                </span>

                                <span className="rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                                    {classDetail.duration} minutes
                                </span>

                                <span className="rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                                    {classDetail.status}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                                    <CalendarDays size={23} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-black text-gray-950">
                                        Class Schedule
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Sample schedule
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                <div className="rounded-xl bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Available Days
                                    </p>

                                    <p className="mt-2 font-bold text-gray-950">
                                        Saturday – Thursday
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Training Hours
                                    </p>

                                    <p className="mt-2 font-bold text-gray-950">
                                        8:00 AM – 8:00 PM
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Session Duration
                                    </p>

                                    <p className="mt-2 font-bold text-gray-950">
                                        {classDetail.duration} minutes
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Trainer
                                    </p>

                                    <p className="mt-2 font-bold text-gray-950">
                                        {classDetail.trainerName}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Booking Card */}
                    <aside>
                        <div className="sticky top-24 rounded-2xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-900/5 sm:p-7">

                            <p className="text-sm font-bold uppercase tracking-widest text-purple-700">
                                Start Your Journey
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-gray-950">
                                ৳{classDetail.price}
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Per class · {classDetail.duration} minutes
                            </p>

                            <div className="my-6 h-px bg-gray-100" />

                            <div className="space-y-4 text-sm text-gray-600">
                                <p className="flex items-center gap-3">
                                    <Dumbbell size={18} className="text-purple-600" />
                                    Professional trainer
                                </p>

                                <p className="flex items-center gap-3">
                                    <Clock size={18} className="text-purple-600" />
                                    Structured training session
                                </p>

                                <p className="flex items-center gap-3">
                                    <CalendarDays size={18} className="text-purple-600" />
                                    Flexible training hours
                                </p>
                            </div>

                            <ClassDetailsActions
                                payment={payment}
                                classId={classId}
                                isFavorite =  {isFavorite}

                            />

                            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                                Booking is subject to availability and payment confirmation.
                            </p>

                        </div>
                    </aside>

                </div>
            </section>

        </main>
    );
};

export default ClassDetailsPage;
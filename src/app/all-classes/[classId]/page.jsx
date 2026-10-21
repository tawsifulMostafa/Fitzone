import { getClassById } from "@/lib/api/classes";
import {
    ArrowLeft,
    Clock,
    Dumbbell,
    Users,
    CalendarDays,
    CalendarClock,
    BarChart3,
    CheckCircle2,
    Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClassDetailsActions from "../../../Components/Dashboard/Classes/ClassDetailsActions";
import { getUserPaymentStatus } from "@/lib/api/payment";
import { getFavorite } from "@/lib/api/favorite";
import { getUser } from "@/lib/core/session";
import { Button } from "@heroui/react";
import EditClass from "@/Components/Dashboard/Classes/EditClass";

const ClassDetailsPage = async ({ params }) => {
    const { classId } = await params;
    const user = await getUser()
    const role = user?.role

    const [classDetail, isFavorite, payment] = await Promise.all([
        getClassById(classId),
        getFavorite(classId),
        getUserPaymentStatus(classId),
    ]);

    if (!classDetail) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-5">
                <Dumbbell size={48} className="text-purple-300" />

                <h1 className="mt-5 text-3xl font-bold text-gray-900">
                    Class Not Found
                </h1>

                <p className="mt-2 text-gray-500">
                    The class you are looking for does not exist.
                </p>

                <Link
                    href="/all-classes"
                    className="mt-6 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
                >
                    Back to Classes
                </Link>
            </div>
        );
    }

    const {
        name,
        category,
        difficultyLevel,
        description,
        image,
        scheduleDate,
        scheduleTime,
        duration,
        price,
        trainerName,
        bookingCount,
        status,
    } = classDetail;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-950 px-5 py-10 text-white sm:py-14 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/all-classes"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        Back to Classes
                    </Link>

                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm font-semibold text-purple-300">
                                    {category}
                                </span>

                                <span className="rounded-full border border-white/15 px-4 py-2 text-sm capitalize text-gray-300">
                                    {difficultyLevel}
                                </span>
                            </div>

                            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                                {name}
                            </h1>

                            <p className="mt-5 max-w-xl leading-8 text-gray-400">
                                {description}
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-gray-300">
                                <span className="flex items-center gap-2">
                                    <Clock size={18} className="text-purple-400" />
                                    {duration} minutes
                                </span>

                                <span className="flex items-center gap-2">
                                    <Users size={18} className="text-purple-400" />
                                    {bookingCount} bookings
                                </span>
                            </div>
                        </div>

                        <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 sm:h-96">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6">
                                <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
                                    FITZONE TRAINING
                                </p>

                                <p className="mt-2 text-2xl font-bold">
                                    Train With Purpose
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-5 py-12 lg:px-16 lg:py-16">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        {/* About Class */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                                    <Dumbbell size={23} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-purple-700">
                                        CLASS OVERVIEW
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                        About This Class
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-6 leading-8 text-gray-600">
                                {description}
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <Tag size={20} className="text-purple-700" />

                                    <p className="mt-3 text-sm text-gray-500">
                                        Training Category
                                    </p>

                                    <p className="mt-1 font-bold text-gray-900">
                                        {category}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <BarChart3 size={20} className="text-purple-700" />

                                    <p className="mt-3 text-sm text-gray-500">
                                        Difficulty Level
                                    </p>

                                    <p className="mt-1 font-bold text-gray-900">
                                        {difficultyLevel}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <Clock size={20} className="text-purple-700" />

                                    <p className="mt-3 text-sm text-gray-500">
                                        Session Duration
                                    </p>

                                    <p className="mt-1 font-bold text-gray-900">
                                        {duration} minutes
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <CheckCircle2
                                        size={20}
                                        className="text-purple-700"
                                    />

                                    <p className="mt-3 text-sm text-gray-500">
                                        Class Status
                                    </p>

                                    <p className="text-red-300">
                                        <span className="mt-1 font-bold capitalize text-gray-900">{status} </span>

                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Schedule */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                                    <CalendarDays size={23} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-purple-700">
                                        PLAN YOUR SESSION
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                        Class Schedule
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
                                    <CalendarDays
                                        size={22}
                                        className="mt-1 shrink-0 text-purple-700"
                                    />

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Scheduled Date
                                        </p>

                                        <p className="mt-1 font-bold text-gray-900">
                                            {scheduleDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
                                    <CalendarClock
                                        size={22}
                                        className="mt-1 shrink-0 text-purple-700"
                                    />

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Starting Time
                                        </p>

                                        <p className="mt-1 font-bold text-gray-900">
                                            {scheduleTime}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
                                    <Clock
                                        size={22}
                                        className="mt-1 shrink-0 text-purple-700"
                                    />

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Total Duration
                                        </p>

                                        <p className="mt-1 font-bold text-gray-900">
                                            {duration} minutes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Trainer */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <p className="text-sm font-semibold text-purple-700">
                                YOUR INSTRUCTOR
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                Meet Your Trainer
                            </h2>

                            <div className="mt-6 flex items-center gap-4 rounded-xl bg-gray-50 p-5">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                                    <Dumbbell size={26} />
                                </div>

                                <div>
                                    <p className="font-bold text-gray-900">
                                        {trainerName || "Assigned Trainer"}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {category} Instructor
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Booking Card */}
                    <aside>
                        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                            <p className="text-sm font-semibold uppercase tracking-wider text-purple-700">
                                ENROLL IN THIS CLASS
                            </p>

                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold text-gray-950">
                                    ৳{price}
                                </span>

                                <span className="text-sm text-gray-500">
                                    / session
                                </span>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Join this training session and work toward your
                                fitness goals with structured guidance.
                            </p>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="space-y-5">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Dumbbell size={18} />
                                        Category
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {category}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Clock size={18} />
                                        Duration
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {duration} minutes
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Users size={18} />
                                        Bookings
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {bookingCount}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <CalendarDays size={18} />
                                        Date
                                    </span>

                                    <span className="text-right font-semibold text-gray-900">
                                        {scheduleDate || "Not scheduled"}
                                    </span>
                                </div>
                            </div>

                            <div className="my-6 border-t border-gray-100" />

                            <div>
                                {status === "pending" ?  <EditClass/> : <ClassDetailsActions
                                    payment={payment}
                                    classId={classId}
                                    isFavorite={isFavorite}
                                />}
                            </div>

                            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                                Your booking is confirmed after successful
                                payment.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default ClassDetailsPage;

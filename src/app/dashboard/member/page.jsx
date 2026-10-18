
import Link from "next/link";
import { getAllClasses } from "@/lib/api/classes";
import { favoriteCollection } from "@/lib/api/favorite";
import { getUserBookings } from "@/lib/api/payment";
import {
    CalendarCheck,
    Heart,
    Dumbbell,
    ArrowUpRight,
    Compass,
    MessageSquare,
    Bookmark,
} from "lucide-react";

const UserDashBoard = async () => {
    const [userBookings, userTotalFavorites, totalClasses] =
        await Promise.all([
            getUserBookings(),
            favoriteCollection(),
            getAllClasses(),
        ]);

    const bookingsCount = Array.isArray(userBookings)
        ? userBookings.length
        : 0;

    const favoritesCount = Array.isArray(userTotalFavorites)
        ? userTotalFavorites.length
        : 0;

    const classesCount = Array.isArray(totalClasses)
        ? totalClasses.length
        : 0;

    const stats = [
        {
            title: "My Bookings",
            count: bookingsCount,
            description: "Your booked fitness classes",
            icon: CalendarCheck,
            color: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
        },
        {
            title: "My Favorites",
            count: favoritesCount,
            description: "Classes saved for later",
            icon: Heart,
            color: "bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
        },
        {
            title: "Available Classes",
            count: classesCount,
            description: "Explore fitness opportunities",
            icon: Dumbbell,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        },
    ];

    const quickActions = [
        {
            title: "Explore Classes",
            description: "Find your next favorite workout.",
            href: "/all-classes",
            icon: Compass,
        },
        {
            title: "My Bookings",
            description: "View your booked classes.",
            href: "/dashboard/my-bookings",
            icon: CalendarCheck,
        },
        {
            title: "My Favorites",
            description: "Revisit your saved classes.",
            href: "/dashboard/favorites",
            icon: Bookmark,
        },
        {
            title: "Community Forum",
            description: "Connect with the FitZone community.",
            href: "/community-forum",
            icon: MessageSquare,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 to-purple-950 p-6 text-white sm:p-8">
                <div className="relative z-10 max-w-xl">
                    <p className="text-sm font-medium text-purple-200">
                        MEMBER DASHBOARD
                    </p>

                    <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                        Your Fitness Journey Starts Here
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-purple-100 sm:text-base">
                        Track your bookings, manage your favorite classes,
                        and keep moving toward your fitness goals.
                    </p>

                    <Link
                        href="/all-classes"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-800 transition hover:bg-purple-50"
                    >
                        Explore Classes
                        <ArrowUpRight size={17} />
                    </Link>
                </div>

                <Dumbbell
                    size={180}
                    className="absolute -bottom-10 -right-8 rotate-[-20deg] text-white/10"
                />
            </section>

            {/* Statistics */}
            <section>
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-foreground">
                        Overview
                    </h2>
                    <p className="mt-1 text-sm text-default-500">
                        A quick look at your FitZone activity.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-default-200 bg-background p-5 transition hover:border-purple-300 hover:shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-default-500">
                                            {stat.title}
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold text-foreground">
                                            {stat.count}
                                        </h3>
                                    </div>

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                                    >
                                        <Icon size={23} />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-default-500">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Actions */}
            <section>
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-foreground">
                        Quick Actions
                    </h2>
                    <p className="mt-1 text-sm text-default-500">
                        Everything you need, just one click away.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {quickActions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="group flex items-center gap-4 rounded-2xl border border-default-200 bg-background p-5 transition hover:border-purple-300 hover:shadow-sm"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-500/10 dark:text-purple-400">
                                    <Icon size={22} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-foreground">
                                        {action.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-default-500">
                                        {action.description}
                                    </p>
                                </div>

                                <ArrowUpRight
                                    size={18}
                                    className="shrink-0 text-default-400 transition group-hover:text-purple-600"
                                />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default UserDashBoard;

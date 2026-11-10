import {
    Activity,
    CalendarCheck,
    CreditCard,
    Dumbbell,
    Mail,
    ShieldCheck,
    Users as UsersIcon,
    UserRound,
    TrendingUp,
} from "lucide-react";

import { getAllClasses } from "@/lib/api/classes";
import { getPaymentHistory } from "@/lib/api/payment";
import { users } from "@/lib/api/users";
import { getUser } from "@/lib/core/session";

const AdminOverView = async () => {
    const [classesData, paymentsData, usersData, currentUser] =
        await Promise.all([
            getAllClasses(),
            getPaymentHistory(),
            users(),
            getUser(),
        ]);
  

    const classes = Array.isArray(classesData) ? classesData : [];
    const payments = Array.isArray(paymentsData) ? paymentsData : [];
    const allUsers = Array.isArray(usersData) ? usersData : [];

    const paidPayments = payments.filter(
        (payment) => payment.status === "paid"
    );

    const totalUsers = allUsers.length;
    const totalClasses = classes.length;
    const totalBookings = paidPayments.length;

    const activeUsers = allUsers.filter(
        (user) => user.status === "active"
    ).length;

    const totalTrainers = allUsers.filter(
        (user) => user.role === "trainer"
    ).length;

    const recentTransactions = [...paidPayments]
        .sort(
            (a, b) =>
                new Date(b.paidAt || b.createdAt) -
                new Date(a.paidAt || a.createdAt)
        )
        .slice(0, 5);

    const recentClasses = [...classes]
        .sort(
            (a, b) =>
                new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0)
        )
        .slice(0, 4);

    const stats = [
        {
            title: "Total Users",
            value: totalUsers,
            icon: UsersIcon,
            description: "Registered platform users",
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            title: "Total Classes",
            value: totalClasses,
            icon: Dumbbell,
            description: "Available fitness classes",
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            title: "Booked Classes",
            value: totalBookings,
            icon: CalendarCheck,
            description: "Successfully paid bookings",
            color: "bg-green-500/10 text-green-500",
        },
    ];

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="m-3 space-y-7">

            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-purple-700 to-purple-950 p-6 text-white sm:p-8">
                <div className="relative z-10 max-w-2xl">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">
                        Admin Dashboard
                    </p>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Welcome back, {currentUser?.name || "Admin"}!
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-purple-100">
                        Here&apos;s a quick overview of your FitZone platform.
                        Monitor users, classes and booking activities from here.
                    </p>
                </div>

                <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border-[35px] border-white/5" />
                <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full border-[30px] border-white/5" />
            </section>

            {/* Main Statistics */}
            <section>
                <div className="mb-4 flex items-center gap-2">
                    <TrendingUp size={19} className="text-purple-600" />
                    <h2 className="text-lg font-semibold">
                        Platform Overview
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-default-200 bg-background p-5 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-default-500">
                                            {stat.title}
                                        </p>

                                        <h3 className="mt-2 text-3xl font-bold">
                                            {stat.value}
                                        </h3>
                                    </div>

                                    <div className={`rounded-xl p-3 ${stat.color}`}>
                                        <Icon size={22} />
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

            {/* Platform Insights */}
            <section className="rounded-2xl border border-default-200 bg-background p-5">
                <div className="mb-5 flex items-center gap-2">
                    <Activity size={19} className="text-purple-600" />
                    <h2 className="text-lg font-semibold">
                        Platform Insights
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-xl bg-default-50 p-4">
                        <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
                            <UsersIcon size={22} />
                        </div>

                        <div>
                            <p className="text-2xl font-bold">{activeUsers}</p>
                            <p className="text-sm text-default-500">
                                Active Users
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-default-50 p-4">
                        <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
                            <Dumbbell size={22} />
                        </div>

                        <div>
                            <p className="text-2xl font-bold">{totalTrainers}</p>
                            <p className="text-sm text-default-500">
                                Total Trainers
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transactions and Admin Profile */}
            <section className="grid gap-5 xl:grid-cols-3">

                {/* Recent Transactions */}
                <div className="rounded-2xl border border-default-200 bg-background p-5 xl:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Recent Transactions
                            </h2>
                            <p className="mt-1 text-xs text-default-500">
                                Latest successful payments
                            </p>
                        </div>

                        <CreditCard className="text-purple-600" size={21} />
                    </div>

                    <div className="space-y-4">
                        {recentTransactions.length > 0 ? (
                            recentTransactions.map((payment) => (
                                <div
                                    key={payment._id}
                                    className="flex flex-wrap items-center justify-between gap-3 border-b border-default-200 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="rounded-full bg-green-500/10 p-2.5 text-green-500">
                                            <CreditCard size={17} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {payment.className || "Fitness Class"}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-default-500">
                                                {payment.userEmail}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ৳{payment.amount}
                                        </p>
                                        <p className="mt-1 text-xs text-default-500">
                                            {formatDate(
                                                payment.paidAt || payment.createdAt
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-sm text-default-500">
                                No transactions available.
                            </p>
                        )}
                    </div>
                </div>

                {/* Admin Profile */}
                <div className="rounded-2xl border border-default-200 bg-background p-5">
                    <div className="mb-5 flex items-center gap-2">
                        <UserRound size={19} className="text-purple-600" />
                        <h2 className="text-lg font-semibold">
                            Admin Profile
                        </h2>
                    </div>

                    <div className="flex flex-col items-center rounded-xl bg-default-50 px-4 py-6 text-center">
                        {currentUser?.image ? (
                            <img
                                src={currentUser.image}
                                alt={currentUser.name || "Admin"}
                                className="h-20 w-20 rounded-full border-4 border-background object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white">
                                {currentUser?.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                        )}

                        <h3 className="mt-3 text-lg font-semibold">
                            {currentUser?.name || "Admin"}
                        </h3>

                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600">
                            <ShieldCheck size={14} />
                            Admin
                        </span>

                        <div className="mt-5 flex w-full items-center gap-2 border-t border-default-200 pt-4 text-left">
                            <Mail size={16} className="shrink-0 text-default-500" />
                            <p className="truncate text-sm text-default-500">
                                {currentUser?.email || "No email available"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Classes */}
            <section className="rounded-2xl border border-default-200 bg-background p-5">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Recent Classes
                        </h2>
                        <p className="mt-1 text-xs text-default-500">
                            A quick look at classes on FitZone
                        </p>
                    </div>

                    <Dumbbell size={21} className="text-purple-600" />
                </div>

                {recentClasses.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {recentClasses.map((item) => (
                            <div
                                key={item._id}
                                className="overflow-hidden rounded-xl border border-default-200 transition hover:shadow-md"
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name || item.className || "Class"}
                                        className="h-36 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-36 items-center justify-center bg-default-100">
                                        <Dumbbell size={30} className="text-default-400" />
                                    </div>
                                )}

                                <div className="p-3">
                                    <h3 className="truncate text-sm font-semibold">
                                        {item.name || item.className || "Fitness Class"}
                                    </h3>

                                    <p className="mt-2 text-sm font-medium text-purple-600">
                                        ৳{item.price ?? 0}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="py-8 text-center text-sm text-default-500">
                        No classes available.
                    </p>
                )}
            </section>
        </div>
    );
};

export default AdminOverView;

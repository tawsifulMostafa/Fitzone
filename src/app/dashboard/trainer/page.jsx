
import Link from "next/link";
import Image from "next/image";
import {
  Dumbbell,
  Users,
  Wallet,
  BookOpen,
  Plus,
  ArrowUpRight,
  CalendarDays,
  Clock,
  TrendingUp,
  CheckCircle2,
  Clock3,
  XCircle,
  Activity,
  ChartNoAxesCombined,
  ChevronRight
} from "lucide-react";

import { trainersClass } from "@/lib/api/classes";
import { getUser } from "@/lib/core/session";

const TrainerOverview = async () => {
  const [classes, user] = await Promise.all([
    trainersClass(),
    getUser()
  ]);
  const role = await user.role;


  const classList = Array.isArray(classes) ? classes : [];

  const approvedClasses = classList.filter(
    cls => cls.status === "approved"
  );

  const pendingClasses = classList.filter(
    cls => cls.status === "pending"
  );

  const rejectedClasses = classList.filter(
    cls => cls.status === "rejected"
  );

  const totalBookings = classList.reduce(
    (total, cls) => total + (Number(cls.bookingCount) || 0),
    0
  );

  const totalClasses = classList.length;

  const popularClasses = [...classList]
    .sort(
      (a, b) =>
        (Number(b.bookingCount) || 0) -
        (Number(a.bookingCount) || 0)
    )
    .slice(0, 4);

  const recentClasses = [...classList]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  const maxBookings = Math.max(
    ...popularClasses.map(cls => Number(cls.bookingCount) || 0),
    1
  );

  const stats = [
    {
      title: "Total Classes",
      value: totalClasses,
      description: "Classes created by you",
      icon: Dumbbell,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      description: "Bookings across your classes",
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Approved Classes",
      value: approvedClasses.length,
      description: "Currently available classes",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Pending Classes",
      value: pendingClasses.length,
      description: "Waiting for admin approval",
      icon: Clock3,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen space-y-8 bg-gray-50/70 p-4 sm:p-6 lg:p-8">

      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 p-6 text-white sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-purple-100">
              TRAINER DASHBOARD
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome back, {user?.name || "Trainer"}!
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-purple-100">
              Track your classes, monitor bookings and
              manage your fitness training activities.
            </p>

            <Link
              href={`/dashboard/${role}/create-class`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              <Plus size={17} />
              Create New Class
            </Link>
          </div>

          <div className="hidden h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:flex">
            <Dumbbell size={65} className="text-white" />
          </div>
        </div>

        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-30 border-white/5" />
        <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-white/5" />
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your training performance at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-gray-300"
                  />
                </div>

                <h3 className="mt-5 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>

                <p className="mt-1 font-semibold text-gray-700">
                  {stat.title}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Class Status */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="font-bold text-gray-900">
            Class Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your class approval summary.
          </p>

          <div className="mt-6 space-y-5">
            {[
              {
                title: "Approved",
                value: approvedClasses.length,
                icon: CheckCircle2,
                color: "bg-green-500"
              },
              {
                title: "Pending",
                value: pendingClasses.length,
                icon: Clock3,
                color: "bg-orange-400"
              },
              {
                title: "Rejected",
                value: rejectedClasses.length,
                icon: XCircle,
                color: "bg-red-500"
              }
            ].map(item => {
              const Icon = item.icon;

              return (
                <div key={item.title}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Icon size={17} />
                      {item.title}
                    </div>

                    <span className="font-bold text-gray-900">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: totalClasses
                          ? `${(item.value / totalClasses) * 100}%`
                          : "0%"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Classes */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">
                Popular Classes
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your most booked classes.
              </p>
            </div>

            <TrendingUp className="text-purple-600" size={22} />
          </div>

          {popularClasses.length > 0 ? (
            <div className="mt-5 space-y-5">
              {popularClasses.map(cls => (
                <div key={cls._id}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {cls.className || cls.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {cls.category || "Fitness"}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-bold text-purple-700">
                      {Number(cls.bookingCount) || 0} bookings
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{
                        width: `${((Number(cls.bookingCount) || 0) / maxBookings) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-gray-400">
              No class data available yet.
            </div>
          )}
        </div>
      </section>

      {/* Recent Classes */}
      <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-gray-900">
              Recent Classes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Recently created fitness classes.
            </p>
          </div>

          <Link
            href= {`/dashboard/${role}/classes`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800"
          >
            View All <ChevronRight size={17} />
          </Link>
        </div>

        {recentClasses.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentClasses.map(cls => (
              <div
                key={cls._id}
                className="flex flex-col gap-4 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:px-5"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {cls.image && (
                    <Image
                      src={cls.image}
                      alt={cls.className || cls.name || "Fitness class"}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-900">
                    {cls.className || cls.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Activity size={13} />
                      {cls.category || "Fitness"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {cls.duration || 0} min
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays size={13} />
                      {formatDate(cls.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="text-sm font-semibold text-gray-700">
                    {Number(cls.bookingCount) || 0} bookings
                  </span>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(cls.status)}`}>
                    {cls.status || "Unknown"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <BookOpen
              size={35}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-3 font-semibold text-gray-700">
              No classes yet
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Create your first fitness class to get started.
            </p>

            <Link
              href="/dashboard/create-class"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
            >
              <Plus size={16} />
              Create Class
            </Link>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Link
            href={`/dashboard/${role}/create-class`}
            className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-purple-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Plus size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                Create Class
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Add a new fitness class.
              </p>
            </div>

            <ChevronRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-purple-600"
            />
          </Link>

          <Link
            href={`/dashboard/${role}/classes`}
            className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-purple-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen size={22} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                Manage Classes
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Update or remove your classes.
              </p>
            </div>

            <ChevronRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-purple-600"
            />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default TrainerOverview;

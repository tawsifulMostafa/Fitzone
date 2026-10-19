
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Dumbbell,
    CalendarCheck,
    Heart,
    FileText,
    UserCheck,
    CreditCard,
    PlusCircle,
    X,
    Settings,
} from "lucide-react";

const dashboardMenus = {
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Manage Classes", href: "/dashboard/admin/classes", icon: Dumbbell },
        { label: "Trainer Applications", href: "/dashboard/admin/applications", icon: UserCheck },
        { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
        { label: "Forum", href: "/dashboard/admin/forum", icon: FileText },
    ],
    trainer: [
        { label: "Overview", href: "/dashboard/trainer", icon: LayoutDashboard },
        { label: "My Classes", href: "/dashboard/trainer/classes", icon: Dumbbell },
        { label: "Create Class", href: "/dashboard/trainer/create-class", icon: PlusCircle },
        { label: "Bookings", href: "/dashboard/trainer/bookings", icon: CalendarCheck },
        { label: "My Forum Posts", href: "/dashboard/trainer/forum", icon: FileText },
    ],
    member: [
        { label: "Overview", href: "/dashboard/member", icon: LayoutDashboard },
        { label: "My Bookings", href: "/dashboard/member/my-bookings", icon: CalendarCheck },
        { label: "Favorites", href: "/dashboard/member/favorites", icon: Heart },
        { label: "Apply as trainer", href: "/dashboard/member/apply-trainer", icon: UserCheck },
    ],
};

const DashboardSidebar = ({ userRole, isOpen = false, onClose }) => {
    const pathname = usePathname();
    const menu = dashboardMenus[userRole] || [];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(18rem,85vw)] flex-col border-r border-white/10 bg-[#111118] text-white transition-transform duration-300 ease-in-out
                lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:w-72 lg:shrink-0 lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Header */}
                <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
                    <Link href="/" className="text-2xl font-black tracking-tight">
                        <span className="text-purple-500">Fit</span>Zone
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Role */}
                <div className="mx-4 mt-5 shrink-0 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Dashboard
                    </p>
                    <p className="mt-1 truncate text-lg font-bold capitalize text-purple-300">
                        {userRole}
                    </p>
                </div>

                {/* Navigation */}
                <nav className="min-h-0 flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-4 py-5">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Menu
                    </p>

                    {menu.map(({ label, href, icon: Icon }) => {
                        const isActive =
                            pathname === href ||
                            (href !== `/dashboard/${userRole}` &&
                                pathname.startsWith(`${href}/`));

                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                className={`group flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-950/30"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <Icon
                                    size={19}
                                    className={`shrink-0 ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-500 group-hover:text-purple-400"
                                    }`}
                                />

                                <span className="min-w-0 flex-1 break-words">
                                    {label}
                                </span>

                                {isActive && (
                                    <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="shrink-0 border-t border-white/10 p-4">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <Settings size={19} />
                        Settings
                    </Link>

                    <p className="mt-3 px-3 text-xs text-gray-600">
                        FitZone © 2026
                    </p>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;

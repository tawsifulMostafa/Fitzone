import UserStatusManagement from "@/Components/Dashboard/Users/User";
import { users } from "@/lib/api/users";
import { Button } from "@heroui/react";
import Image from "next/image";

const ManageUsersPage = async () => {
    const allUsers = await users()

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-foreground dark:text-white">
                    Manage Users
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and monitor all registered FitZone users.
                </p>
            </div>

            <div className="rounded-xl border border-default bg-background shadow-sm dark:border-gray-800 dark:bg-gray-900">

                <div className="flex items-center justify-between border-b border-default px-5 py-4 dark:border-gray-800">
                    <div>
                        <h2 className="font-semibold text-gray-800 dark:text-white">
                            All Users
                        </h2>
                        <p className="text-sm text-gray-500">
                            {allUsers.length} registered users
                        </p>
                    </div>
                </div>

                <div className="hidden grid-cols-12 gap-4 border-b border-default bg-gray-50 px-5 py-3 text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 md:grid">
                    <p className="col-span-4">User</p>
                    <p className="col-span-3">Email</p>
                    <p className="col-span-2">Role</p>
                    <p className="col-span-1">Status</p>
                    <p className="col-span-2 text-right">Action</p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {allUsers.map((user) => (
                        <div
                            key={user._id}
                            className="grid grid-cols-1 items-center gap-4 px-5 py-4 transition hover:bg-gray-50 dark:hover:bg-gray-800/40 md:grid-cols-12"
                        >
                            <div className="flex items-center gap-3 md:col-span-4">
                                <Image
                                    alt={user.name}
                                    src={user.image}
                                    height={44}
                                    width={44}
                                    className="h-11 w-11 rounded-full border border-default object-cover"
                                />
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-gray-800 dark:text-white capitalize">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ID: {user._id.slice(-6)}
                                    </p>
                                </div>
                            </div>

                            <p className="truncate text-sm text-gray-600 dark:text-gray-300 md:col-span-3">
                                {user.email}
                            </p>

                            <div className="md:col-span-2">
                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize
                                    ${user.role === "admin"
                                        ? "bg-background-secondary text-purple-700"
                                        : user.role === "trainer"
                                            ? "bg-background-secondary text-blue-700"
                                            : "bg-background-secondary text-yellow-700"
                                    }`}>
                                    {user.role}
                                </span>
                            </div>

                            <div className="md:col-span-1">
                                <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize
                                    ${user.status === "blocked"
                                        ? "bg-background-secondary text-red-600"
                                        : "bg-background-secondary text-green-700"
                                    }`}>
                                    {user.status}
                                </span>
                            </div>
                            <div className="flex justify-start md:col-span-2 md:justify-end">
                                <UserStatusManagement user={user} />
                            </div>

                        </div>
                    ))}

                    {allUsers.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="font-medium text-gray-500">
                                No users found.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUsersPage;
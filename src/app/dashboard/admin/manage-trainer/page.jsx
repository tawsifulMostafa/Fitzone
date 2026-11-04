import { getTrainers } from "@/lib/api/trainers";
import { Button } from "@heroui/react";
import Image from "next/image";
import { Users, Mail, Dumbbell, UserRound } from "lucide-react";
import ManageTrainerAction from "@/Components/Dashboard/ManageTrainerAction";

const ManageTrainerPage = async () => {
    const res = await getTrainers();
    const trainers = Array.isArray(res) ? res : [];

    return (
        <div className="space-y-6 m-3">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Manage Trainers
                </h1>
                <p className="text-sm text-default-500 mt-1">
                    View and manage all registered trainers.
                </p>
            </div>

            {/* Summary */}
            <div className="flex items-center gap-4 rounded-xl border border-default-200 bg-background p-5">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-sm text-default-500">Total Trainers</p>
                    <h2 className="text-2xl font-bold text-foreground">
                        {trainers.length}
                    </h2>
                </div>
            </div>

            {/* Trainers List */}
            <div className="space-y-3">
                {trainers.length > 0 ? (
                    trainers.map((trainer) => (
                        <div
                            key={trainer._id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-default-200 bg-background p-4 sm:p-5 transition hover:border-purple-300 hover:shadow-sm"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-purple-50 dark:bg-purple-500/10">
                                    {trainer.image ? (
                                        <Image
                                            alt="Trainer Image"
                                            src={trainer.image}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-purple-500">
                                            <UserRound size={28} />
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-foreground truncate">
                                        {trainer.name}
                                    </h3>

                                    <p className="flex items-center gap-1.5 text-sm text-default-500 mt-1">
                                        <Mail size={14} />
                                        <span className="truncate">
                                            {trainer.email}
                                        </span>
                                    </p>

                                    <p className="flex items-center gap-1.5 text-xs text-default-400 mt-1">
                                        <Dumbbell size={14} />
                                        Fitness Trainer
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3">
                                <span
                                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${trainer.status === "active"
                                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                        }`}
                                >
                                    {trainer.status || "Unknown"}
                                </span>

                                <ManageTrainerAction trainer={trainer} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-xl border border-default-200 bg-background py-16 text-center">
                        <Users size={32} className="mx-auto text-default-400" />
                        <h3 className="mt-3 font-semibold text-foreground">
                            No Trainers Found
                        </h3>
                        <p className="mt-1 text-sm text-default-500">
                            Approved trainers will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTrainerPage;
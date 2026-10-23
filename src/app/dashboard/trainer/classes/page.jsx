 
import DeleteClass from "@/Components/Dashboard/Classes/DeleteClass";
import EditClass from "@/Components/Dashboard/Classes/EditClass";
import { trainersClass } from "@/lib/api/classes";
import { Card } from "@heroui/react";
import {  BookOpen } from "lucide-react";
import Image from "next/image";

const TrainerClassesPage = async () => {
    const cls = await trainersClass();
    console.log(cls);
 
    return (
        <div className="min-h-screen space-y-6 p-4 md:p-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    My Classes
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your classes and track their approval status.
                </p>
            </div>

            {/* Classes List */}
            {cls.length === 0 ? (
                <Card className="flex flex-col items-center justify-center gap-3 p-10 text-center">
                    <BookOpen size={36} className="text-purple-400" />
                    <h2 className="text-lg font-semibold">
                        No classes found
                    </h2>
                    <p className="text-sm text-gray-500">
                        Your classes will appear here once you create one.
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {cls.map((cs) => {
                        const isApproved =
                            cs.status?.toLowerCase() === "approved";

                        return (
                            <Card
                                key={cs._id}
                                className="border border-purple-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 md:p-5"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    {/* Class Info */}
                                    <div className="flex min-w-0 items-center gap-4">
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-purple-50 dark:bg-purple-950">
                                            <Image
                                                alt={cs.name}
                                                fill
                                                sizes="64px"
                                                src={cs.image}
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                                                {cs.name}
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {cs.category}
                                            </p>

                                            {/* Status Badge */}
                                            <span
                                                className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    isApproved
                                                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800"
                                                        : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800"
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        isApproved
                                                            ? "bg-emerald-500"
                                                            : "bg-amber-500"
                                                    }`}
                                                />
                                                {isApproved
                                                    ? "Approved"
                                                    : "Pending"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 gap-2"> 
                                        
                                        <EditClass cls = {cs}/>  
                                        <DeleteClass cls = {cs}/>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TrainerClassesPage;
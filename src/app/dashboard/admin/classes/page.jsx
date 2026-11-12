
import ClassManagementAction from '@/Components/Dashboard/Classes/ClassManagementAction';
import { pendingClasses } from '@/lib/api/classes';
import Image from 'next/image';
import React from 'react';

const AdminClassManagement = async () => {
    const classes = await pendingClasses();

    return (
        <div className="space-y-4">
            <div className='flex justify-between'>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                    All Classes
                </h2>
                <p>Total <span className='text-md text-gray-950 dark:text-gray-300'>{classes.length}</span> classes Found</p>
            </div>

            {classes?.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center py-10">
                    No classes found.
                </p>
            ) : (
                classes?.map((cls) => (
                    <div
                        key={cls._id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-default bg-background shadow-sm"
                    >
                        <div className="relative w-full sm:w-40 h-36 shrink-0">
                            <Image
                                src={cls.image}
                                alt={cls.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col flex-1 justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-purple-600">
                                    {cls.category}
                                </p>

                                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                                    Trainer Name : {cls.trainerName}
                                </h3>

                                <p className="text-lg text-bold text-gray-500 dark:text-gray-400 mt-2">
                                    {cls.name}
                                </p>

                                <p className="text-lg font-bold text-gray-800 mt-2">
                                    ৳{cls.price}
                                </p>
                            </div>
                            <div className='justify-end flex'>
                                <span className={cls.status === "approved" ? "text-green-500" : "text-red-500"}>
                                    {cls.status}
                                </span>
                            </div>

                            <ClassManagementAction cls={cls} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminClassManagement;

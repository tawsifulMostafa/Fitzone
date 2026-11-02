
import ClassManagementAction from '@/Components/Dashboard/Classes/ClassManagementAction';
import { pendingClasses } from '@/lib/api/classes';
import Image from 'next/image';
import React from 'react';

const AdminClassManagement = async () => {
    const classes = await pendingClasses();

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
                Pending Classes
            </h2>

            {classes?.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                    No pending classes found.
                </p>
            ) : (
                classes?.map((cls) => (
                    <div
                        key={cls._id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
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

                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cls.trainerName}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    Class Name: {cls.name}
                                </p>

                                <p className="text-lg font-bold text-gray-800 mt-2">
                                    ৳{cls.price}
                                </p>
                            </div>

                            <ClassManagementAction cls = {cls}/>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminClassManagement;

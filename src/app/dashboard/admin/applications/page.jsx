import { getAllApplications } from '@/lib/api/application';
import { getUser } from '@/lib/core/session';
import { Button } from '@heroui/react';
import { CalendarDays, Clock, FileText, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ApplicationsReview = async () => {
    const applications = await getAllApplications();
    const user = await getUser()
    const role = user.role
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Trainer Applications
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Review and manage trainer applications from members.
                </p>
            </div>

            {/* Summary */}
            <div className="bg-background border border-default rounded-xl p-5 flex items-center gap-4">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Applications</p>
                    <h2 className="text-2xl font-bold text-foreground">
                        {applications.length}
                    </h2>
                </div>
            </div>

            {/* Application List */}
            <div className="bg-background border border-default rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-default">
                    <h2 className="font-semibold text-gray-800">
                        Pending Applications
                    </h2>
                </div>

                {applications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {applications.map((application) => (
                            <div
                                key={application._id}
                                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        alt="Applicant image"
                                        src={application.applicantImage}
                                        width={52}
                                        height={52}
                                        className="w-13 h-13 rounded-full object-cover border border-default"
                                    />

                                    <div>
                                        <h3 className="capitalize font-semibold text-foreground">
                                            {application.applicantName}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Applied to become a trainer
                                        </p>

                                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                                            <CalendarDays size={14} />
                                            {application.createdAt
                                                ? new Date(application.createdAt).toLocaleDateString()
                                                : 'Date unavailable'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:justify-end">
                                    <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 text-amber-700">
                                        Pending
                                    </span>

                                    <Link href={`/dashboard/${role}/applications/${application._id}`}>
                                        <Button
                                            size="sm"
                                            className="bg-purple-600 text-white font-medium"
                                        >
                                            <FileText size={15} />
                                            Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <div className="mx-auto w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <FileText size={25} />
                        </div>
                        <h3 className="font-semibold text-gray-800 mt-4">
                            No Pending Applications
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            New trainer applications will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationsReview;
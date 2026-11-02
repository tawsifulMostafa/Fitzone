import { getAllApplications } from "@/lib/api/application";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    Mail,
    BriefcaseBusiness,
    Dumbbell,
    UserRound,
    FileText
} from "lucide-react";
import { Button, TextArea, Label } from "@heroui/react";
import { getUser } from "@/lib/core/session";
import AdminReview from "@/Components/Dashboard/Application/AdminReview";

const ApplicationsDetails = async ({ params }) => {
    const { applicationId } = await params;
    const applications = await getAllApplications();
    const user = await getUser()
    const role = user?.role

    const application = applications.find(
        (item) => item._id === applicationId
    );

    if (!application) notFound();

    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* Header */}
            <div>
                <Link href={`/dashboard/${role}/applications`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 mb-4">

                    <ArrowLeft size={16} />
                    Back to Applications
                </Link>

                <h1 className="text-2xl font-bold text-gray-900">
                    Application Details
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Review the applicant&apos;s information before making a decision.
                </p>
            </div>

            {/* Applicant Profile */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <Image
                        src={application.applicantImage}
                        alt={application.applicantName}
                        width={90}
                        height={90}
                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-100"
                    />

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900">
                                {application.applicantName}
                            </h2>

                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                                {application.status}
                            </span>
                        </div>

                        <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <Mail size={15} />
                            {application.applicantEmail}
                        </p>
                    </div>
                </div>
            </div>

            {/* Application Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                <div>
                    <h2 className="font-bold text-gray-900">
                        Application Information
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Professional details provided by the applicant.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <BriefcaseBusiness size={17} />
                            Experience
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                            {application.experience} Years
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Dumbbell size={17} />
                            Specialty
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                            {application.specialty}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <CalendarDays size={17} />
                            Applied Date
                        </div>
                        <p className="font-semibold text-gray-900 mt-2">
                            {new Date(application.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                }
                            )}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock size={17} />
                            Applied Time
                        </div>
                        <p className="font-semibold text-gray-900 mt-2">
                            {new Date(application.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            )}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                        <FileText size={17} />
                        About Applicant
                    </h3>
                    <p className="text-sm text-gray-600 leading-7 bg-gray-50 rounded-lg p-4">
                        {application.description}
                    </p>
                </div>
            </div>

            {/* Admin Review */}
            <AdminReview />
        </div>
    );
};

export default ApplicationsDetails;
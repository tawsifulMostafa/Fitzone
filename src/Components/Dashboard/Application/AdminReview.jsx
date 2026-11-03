"use client"

import { reviewApplication } from '@/lib/action/application';
import { Button, Label, TextArea } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const AdminReview = ({ application }) => {
    const router = useRouter()
    const [feedback, setFeedback] = useState(" ")
    const handleAction = async (newStatus) => {
        if (!feedback.trim()) {
            return toast.error("Please write your feedback first");
        }

        const data = {
            adminFeedback: feedback,
            status: newStatus
        };

        const review = await reviewApplication(application._id, data);
        if (review.success) {
            toast.success(review.success)
            router.push("/dashboard/admin/applications")
        }
    };
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
                <h2 className="font-bold text-gray-900">
                    Review Application
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Write feedback before approving or rejecting this application.
                </p>
            </div>

            <div className="space-y-2">
                <Label>Admin Feedback</Label>
                <br />
                <TextArea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} className={"w-full border border-purple-300"} required></TextArea>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
                <Button onClick={() => handleAction("rejected")}
                    variant="outline"
                    className="border-red-200 text-red-600"
                >
                    Reject Application
                </Button>

                <Button onClick={() => handleAction("approved")} className="bg-purple-600 text-white">
                    Approve Application
                </Button>
            </div>
        </div>
    );
};

export default AdminReview;
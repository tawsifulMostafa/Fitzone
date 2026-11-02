import { Button, Label, TextArea } from '@heroui/react';
import React from 'react';

const AdminReview = () => {
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
                <TextArea
                    placeholder="Write your feedback here..."
                    rows={4}
                />
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
                <Button
                    variant="outline"
                    className="border-red-200 text-red-600"
                >
                    Reject Application
                </Button>

                <Button className="bg-purple-600 text-white">
                    Approve Application
                </Button>
            </div>
        </div>
    );
};

export default AdminReview;
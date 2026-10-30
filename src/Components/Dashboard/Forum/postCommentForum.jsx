"use client"

import { PostComment } from '@/lib/action/forum';
import { Button, Form, Label, TextArea, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const CommentForum = ({ forumId }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleComment = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const commentText = formData.get("Comment");

        if (!commentText?.trim()) {
            return toast.error("Comment cannot be empty");
        }

        try {
            setLoading(true);

            const newComment = {
                Comment: commentText.trim()
            };

            const comment = await PostComment(newComment, forumId);

            if (comment.insertedId) {
                form.reset();
                toast.success("Comment posted successfully");
                router.refresh();
            }

        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
                Join the Discussion
            </h2>

            <Form onSubmit={handleComment}>
                <TextField name="Comment" className="w-full">
                    <Label className="mb-2 text-sm font-medium text-gray-700">
                        Your Comment
                    </Label>

                    <TextArea
                        placeholder="Write a comment and join the discussion..."
                        variant="secondary"
                        className="min-h-32 w-full"
                    />
                </TextField>

                <div className="mt-4 flex justify-end">
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="bg-purple-600 px-6 text-white hover:bg-purple-700"
                    >
                        {loading ? "Posting..." : "Post Comment"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CommentForum;
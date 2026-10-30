"use client"
import { PostComment } from '@/lib/action/forum';
import { Button, Form, Label, TextArea, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const CommentForum = ({ forumId  }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleComment = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData(e.currentTarget)
            const newComment = Object.fromEntries(formData.entries())
            const comment = await PostComment(newComment, forumId)
            if (comment.insertedId) {
                router.refresh()
                toast.success("commented", {
                    style: {
                        color: "green"
                    }
                })
            }
        } catch {
            return toast.error("something went wrong", {
                style: {
                    color: "red"
                }
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="mb-5 text-xl font-semibold text-gray-900">
                    Join the Discussion
                </h2>
                <Form onSubmit={handleComment}>
                    <TextField name="Comment" className="w-full" >
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
                        <Button type='submit' className="bg-purple-600 px-6 text-white hover:bg-purple-700">
                            {
                                loading ? "posting..." : " Post Comment"
                            }
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CommentForum;
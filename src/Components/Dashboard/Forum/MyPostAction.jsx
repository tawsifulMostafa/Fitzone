"use client"
import { deleteForum } from '@/lib/action/forum';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React, { useState } from 'react';

const MyPostAction = ({ forumId }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)

            const forum = await deleteForum(forumId)

            if (forum?.deletedCount > 0) {
                toast.success("Post deleted successfully")
                router.refresh()
            } else {
                toast.error("Failed to delete post")
            }

        } catch (error) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <AlertDialog>
                <Button variant="danger">Delete Post</Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                    Delete post permanently?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete this post.
                                    This action cannot be undone.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>

                                <Button
                                    onClick={handleDelete}
                                    isDisabled={loading}
                                    className="rounded-lg bg-danger px-5 py-2 text-sm font-semibold text-white transition hover:bg-danger-600"
                                >
                                    {loading ? "Deleting..." : "Delete"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default MyPostAction;
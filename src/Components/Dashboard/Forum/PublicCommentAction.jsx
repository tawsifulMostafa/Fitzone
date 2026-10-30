"use client"

import { editComment } from '@/lib/action/forum';
import {
    Button,
    Modal,
    TextField,
    Label,
    Input
} from '@heroui/react';
import { Reply, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PublicCommentAction = ({ user, comment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.Comment);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEdit = async () => {
        if (!updatedComment.trim()) {
            return toast.error("Comment cannot be empty");
        }

        try {
            setLoading(true);

            const result = await editComment(
                updatedComment,
                comment._id
            );

            if (result.message) {
                setIsOpen(false);
                router.refresh();

                toast.success("Comment updated successfully");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <Button
                variant="secondary"
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-purple-700"
            >
                <Reply size={15} />
                Reply
            </Button>

            {user.id === comment.commentedBy && (
                <Button
                    variant="secondary"
                    type="button"
                    onPress={() => {
                        setUpdatedComment(comment.Comment);
                        setIsOpen(true);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600"
                >
                    <Pencil size={15} />
                    Edit
                </Button>
            )}

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog>
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading>
                                    Edit Comment
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <TextField className="w-full">
                                    <Label>Comment</Label>

                                    <Input
                                        value={updatedComment}
                                        onChange={(value) => setUpdatedComment(value.target.value)}
                                        placeholder="Edit your comment..."
                                    />
                                </TextField>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onPress={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onPress={handleEdit}
                                    isDisabled={loading}
                                    className="bg-purple-600 text-white"
                                >
                                    {loading ? "Updating..." : "Save Changes"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default PublicCommentAction;
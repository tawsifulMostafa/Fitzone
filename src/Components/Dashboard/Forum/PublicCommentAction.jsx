"use client"

import { deleteComment, editComment } from '@/lib/action/forum';
import {
    Button,
    Modal,
    TextField,
    Label,
    Input,
    AlertDialog
} from '@heroui/react';
import { Reply, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PublicCommentAction = ({ user, comment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.Comment);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        try {
            setDeleting(true);

            const result = await deleteComment(comment._id);

            if (result.deletedCount === 1) {
                toast.success("Comment deleted successfully");
                router.refresh();
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete comment");
        } finally {
            setDeleting(false);
        }
    };

    const handleEdit = async () => {
        if (!updatedComment.trim()) {
            return toast.error("Comment cannot be empty");
        }

        try {
            setLoading(true);

            const result = await editComment(updatedComment, comment._id);

            if (result.message) {
                setIsOpen(false);
                toast.success("Comment updated successfully");
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const isOwner = user.id === comment.commentedBy;

    return (
        <div className="mt-3 flex items-center gap-2">

            {/* Reply */}
            <Button
                variant="tertiary"
                size="sm"
                className="text-gray-500 hover:text-purple-700"
            >
                <Reply size={15} />
                Reply
            </Button>

            {isOwner && (
                <>
                    {/* Edit */}
                    <Button
                        variant="tertiary"
                        size="sm"
                        onPress={() => {
                            setUpdatedComment(comment.Comment);
                            setIsOpen(true);
                        }}
                        className="text-gray-500 hover:bg-purple-50 hover:text-purple-700"
                    >
                        <Pencil size={15} />
                        Edit
                    </Button>

                    {/* Delete */}
                    <AlertDialog>
                        <Button
                            variant="tertiary"
                            size="sm"
                            className="text-gray-500 hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash size={15} />
                            Delete
                        </Button>

                        <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-100">
                                    <AlertDialog.CloseTrigger />

                                    <AlertDialog.Header>
                                        <AlertDialog.Icon status="danger" />
                                        <AlertDialog.Heading>
                                            Delete this comment?
                                        </AlertDialog.Heading>
                                    </AlertDialog.Header>

                                    <AlertDialog.Body>
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this comment?
                                            This action cannot be undone.
                                        </p>
                                    </AlertDialog.Body>

                                    <AlertDialog.Footer>
                                        <Button
                                            slot="close"
                                            variant="tertiary"
                                            isDisabled={deleting}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            onPress={handleDelete}
                                            variant="danger"
                                            isDisabled={deleting}
                                        >
                                            {deleting ? "Deleting..." : "Delete Comment"}
                                        </Button>
                                    </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                            </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                    </AlertDialog>

                    {/* Edit Modal */}
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
                                            <Label className="mb-2">
                                                Your Comment
                                            </Label>

                                            <Input
                                                value={updatedComment}
                                                onChange={(value) =>
                                                    setUpdatedComment(value.target.value)
                                                }
                                                placeholder="Edit your comment..."
                                            />
                                        </TextField>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button
                                            variant="tertiary"
                                            onPress={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            onPress={handleEdit}
                                            isDisabled={loading}
                                            className="bg-purple-600 text-white hover:bg-purple-700"
                                        >
                                            {loading ? "Updating..." : "Save Changes"}
                                        </Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default PublicCommentAction;
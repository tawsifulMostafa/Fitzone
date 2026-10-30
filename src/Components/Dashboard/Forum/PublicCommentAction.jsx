
"use client";

import { deleteComment, editComment, PostComment } from "@/lib/action/forum";
import { Button } from "@heroui/react";
import { Reply, Pencil, Trash, X, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const PublicCommentAction = ({ user, comment }) => {
    const [showReply, setShowReply] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [updatedComment, setUpdatedComment] = useState(comment.Comment);
    const [replyText, setReplyText] = useState("");

    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [replyLoading, setReplyLoading] = useState(false);

    const router = useRouter();

    const isOwner = user.id === comment.commentedBy;

    const handleDelete = async () => {
        try {
            setDeleting(true);

            const result = await deleteComment(comment._id);

            if (result.deletedCount === 1) {
                toast.success("Comment deleted successfully");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete comment");
        } finally {
            setDeleting(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!updatedComment.trim()) {
            return toast.error("Comment cannot be empty");
        }

        try {
            setLoading(true);

            const result = await editComment(
                updatedComment.trim(),
                comment._id
            );

            if (result.message) {
                setShowEdit(false);
                toast.success("Comment updated successfully");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();

        if (!replyText.trim()) {
            return toast.error("Reply cannot be empty");
        }

        try {
            setReplyLoading(true);

            const newComment = {
                Comment: replyText.trim()
            };

            const result = await PostComment(
                newComment,
                comment.forumId,
                comment._id
            );

            if (result.insertedId) {
                setReplyText("");
                setShowReply(false);

                toast.success("Reply posted successfully");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to post reply");
        } finally {
            setReplyLoading(false);
        }
    };

    return (
        <div className="mt-3">
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    variant="tertiary"
                    size="sm"
                    onPress={() => {
                        setShowReply(!showReply);
                        setShowEdit(false);
                    }}
                >
                    <Reply size={15} />
                    Reply
                </Button>

                {isOwner && (
                    <>
                        <Button
                            variant="tertiary"
                            size="sm"
                            onPress={() => {
                                setUpdatedComment(comment.Comment);
                                setShowEdit(!showEdit);
                                setShowReply(false);
                            }}
                        >
                            <Pencil size={15} />
                            Edit
                        </Button>

                        <Button
                            variant="tertiary"
                            size="sm"
                            onPress={handleDelete}
                            isDisabled={deleting}
                        >
                            <Trash size={15} />
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    </>
                )}
            </div>

            {/* Reply Form */}
            <AnimatePresence>
                {showReply && (
                    <motion.form
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleReply}
                        className="mt-3 overflow-hidden"
                    >
                        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write your reply..."
                                rows={3}
                                className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                            />

                            <div className="mt-2 flex items-center justify-end gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="tertiary"
                                    onPress={() => {
                                        setShowReply(false);
                                        setReplyText("");
                                    }}
                                    isDisabled={replyLoading}
                                >
                                    <X size={14} />
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    size="sm"
                                    isDisabled={replyLoading}
                                >
                                    <Send size={14} />
                                    {replyLoading ? "Sending..." : "Send Reply"}
                                </Button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Edit Form */}
            <AnimatePresence>
                {showEdit && (
                    <motion.form
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleEdit}
                        className="mt-3 overflow-hidden"
                    >
                        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3">
                            <textarea
                                value={updatedComment}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                placeholder="Edit your comment..."
                                rows={3}
                                className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                            />

                            <div className="mt-2 flex items-center justify-end gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="tertiary"
                                    onPress={() => {
                                        setShowEdit(false);
                                        setUpdatedComment(comment.Comment);
                                    }}
                                    isDisabled={loading}
                                >
                                    <X size={14} />
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    size="sm"
                                    isDisabled={loading}
                                >
                                    <Send size={14} />
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PublicCommentAction;

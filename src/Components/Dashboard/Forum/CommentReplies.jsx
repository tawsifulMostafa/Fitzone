
"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import PublicCommentAction from "./PublicCommentAction";

const CommentReplies = ({ replies, user }) => {
    const [showReplies, setShowReplies] = useState(false);

    if (!replies.length) return null;
    return (
        <div className="mt-3">
            <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-800"
            >
                <MessageCircle size={15} />

                {showReplies
                    ? "Hide replies"
                    : `View ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`}

                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${showReplies ? "rotate-180" : ""
                        }`}
                />
            </button>

            <AnimatePresence initial={false}>
                {showReplies && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 ml-6 space-y-4 border-l-2 border-purple-200 pl-4">
                            {replies.map((reply) => (
                                <div
                                    key={reply._id}
                                    className="flex items-start gap-3"
                                >
                                    <Image
                                        alt="Commenter image"
                                        src={reply.userImage}
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-gray-900">
                                            {reply.userName}
                                        </p>

                                        <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-600">
                                            {reply.Comment}
                                        </p>

                                        <PublicCommentAction
                                            comment={reply}
                                            user={user}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommentReplies;

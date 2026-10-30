
import Image from 'next/image';
import React from 'react';
import { MessageCircle } from 'lucide-react';
import PublicCommentAction from './PublicCommentAction';
import { getUser } from '@/lib/core/session';
import CommentReplies from './CommentReplies';

const PublicComments = async ({ forumId, comments }) => {
    const currentUser = await getUser();

    const mainComments = comments.filter(
        comment => !comment.parentCommentId
    );

    const replies = comments.filter(
        comment => comment.parentCommentId
    );

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <MessageCircle size={22} />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Comments
                    </h2>
                    <p className="text-sm text-gray-500">
                        Join the conversation
                    </p>
                </div>

                <span className="ml-auto rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                    {mainComments.length}
                </span>
            </div>

            <div className="space-y-4">
                {mainComments.length > 0 ? (
                    mainComments.map((comment) => {
                        const commentReplies = replies.filter(
                            reply =>
                                reply.parentCommentId.toString() ===
                                comment._id.toString()
                        );

                        return (
                            <div
                                key={comment._id}
                                className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 transition-colors hover:border-purple-200"
                            >
                                {/* Main Comment */}
                                <div className="flex items-start gap-3">
                                    <Image
                                        alt="Commenter image"
                                        src={comment.userImage}
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-gray-900">
                                            {comment.userName}
                                        </p>

                                        <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-600">
                                            {comment.Comment}
                                        </p>

                                        <PublicCommentAction
                                            comment={comment}
                                            user={currentUser}
                                        />
                                        <CommentReplies
                                            replies={commentReplies}
                                            user={currentUser}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-10 text-center">
                        <MessageCircle
                            size={32}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-3 font-semibold text-gray-700">
                            No comments yet
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Be the first to share your thoughts.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicComments;

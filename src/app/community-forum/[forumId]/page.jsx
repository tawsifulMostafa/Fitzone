import CommentForum from "@/Components/Dashboard/Forum/CommentForum";
import LikeDislike from "@/Components/Dashboard/Forum/LikeDislike";
import PublicComments from "@/Components/Dashboard/Forum/PublicComments";
import { forumDetails, forumsComment } from "@/lib/api/forum";
import Image from "next/image";

const ForumDetailsPage = async ({ params }) => {
    const { forumId } = await params;
    const details = await forumDetails(forumId);
    const poster = details?.poster;
    const comments = await forumsComment(forumId)

    console.log(details);
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <p className="mb-2 text-sm font-semibold text-purple-700">
                    FitZone Community
                </p>

                <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {details.title}
                </h1>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="p-4 sm:p-7">
                        <div className="relative mx-auto mb-8 h-64 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-96 lg:h-[450px]">
                            <Image
                                alt="Forum post image"
                                src={details.image}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h2 className="mb-3 text-xl font-semibold text-gray-900">
                            About this post
                        </h2>

                        <p className="whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                            {details.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-5 sm:px-7">
                        <div className="flex items-center gap-3">
                            <Image
                                alt="Poster"
                                src={poster.image}
                                height={48}
                                width={48}
                                className="h-12 w-12 rounded-full border border-gray-200 object-cover"
                            />

                            <div>
                                <p className="text-xs text-gray-500">
                                    Posted by
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {poster.name} <br /> <span className="border bg-purple-300 rounded-2xl">{poster.role}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <LikeDislike forumId={forumId} forum={details} />
                </div>
                <CommentForum forumId={forumId}/>
                <PublicComments forumId = {forumId} comments= {comments}/>
            </div>
        </div>
    );
};

export default ForumDetailsPage;

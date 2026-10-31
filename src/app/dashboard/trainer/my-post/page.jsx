import MyPostAction from "@/Components/Dashboard/Forum/MyPostAction";
import { postersForum } from "@/lib/api/forum";
import Image from "next/image";
const TrainersPostPage =async () => {
    const myForum = await postersForum();
    return (
        <div className="space-y-6 p-4 sm:p-6">

            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Manage Forum Posts
                </h1>
                <p className="mt-1 text-sm text-default-500">
                    Manage all community forum posts.
                </p>
            </div>

            <div className="space-y-3">
                {myForum?.length > 0 ? (
                    myForum.map((forum) => (
                        <div
                            key={forum._id}
                            className="flex flex-col gap-4 rounded-xl border border-default-200 bg-background p-4 sm:flex-row sm:items-center"
                        >
                            {/* Image */}
                            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg sm:w-32">
                                <Image
                                    src={forum.image}
                                    alt="Post image"
                                    fill
                                    sizes="128px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Title & Reaction */}
                            <div className="min-w-0 flex-1 space-y-3">
                                <h2 className="font-semibold text-foreground">
                                    {forum.title}
                                </h2>

                                <div className="flex items-center gap-5 text-sm text-default-500">
                                    <span>
                                        Like: {forum.likes?.length || 0}
                                    </span>

                                    <span>
                                        Dislike: {forum.dislikes?.length || 0}
                                    </span>
                                </div>
                            </div>

                            {/* Delete */}
                           <MyPostAction forumId = {forum._id}/>
                        </div>
                    ))
                ) : (
                    <p className="py-16 text-center text-default-500">
                        No forum posts found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default TrainersPostPage;

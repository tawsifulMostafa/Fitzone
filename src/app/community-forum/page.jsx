import { forum } from "@/lib/api/forum";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const CommunityForum = async () => {
    const forums = await forum();
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
                            FitZone Community
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Community Forum
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
                            Share your fitness journey, exchange ideas, and
                            learn from a community that grows stronger together.
                        </p>
                    </div>

                    <div className="w-fit rounded-xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs text-gray-500">Community Posts</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {forums.length}
                        </p>
                    </div>
                </div>

                {/* Forum Grid */}
                {forums.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {forums.map((post) => (
                            <Card
                                key={post._id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                            >
                                {/* Image */}
                                <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {post.image ? (
                                        <Image
                                            alt={post.title || "Forum post"}
                                            src={post.image}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            No image available
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full text-purple-600 px-3 py-1 text-xs font-semibold shadow">
                                        Community
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    <h2 className="line-clamp-2 text-xl font-bold leading-7 text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white">
                                        {post.title}
                                    </h2>

                                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        {post.description}
                                    </p>


                                    <Link href={`/community-forum/${post._id}`}>
                                        <Button className={"text-purple-400 hover:text-purple-900 border m-4 mx-auto"} variant="secondary">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-20 text-center dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            No posts yet
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Be the first to share something with the community.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CommunityForum;
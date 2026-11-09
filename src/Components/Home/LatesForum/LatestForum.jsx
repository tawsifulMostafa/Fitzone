import { featuredForum } from '@/lib/api/forum';
import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const LatestForum = async () => {
    const res = await featuredForum()
    console.log(res);
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 rounded-2xl">
            <div className="flex justify-between mb-8 items-center gap-4 sm:flex-row">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Latest Forum Discussions
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Stay updated with the latest discussions in our community forum.
                    </p>
                </div>
                <div>
                    <Link href="/community-forum" className="shrink-0">
                        <Button
                            variant="bordered"
                            className="border-purple-300 dark:border-purple-800 border  font-bold text-purple-700 transition-all hover:bg-purple-700 hover:text-white"
                        >
                            View All Discussions
                        </Button>
                    </Link> 
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {res.map((post) => (
                    <Card
                        key={post._id}
                        className="group overflow-hidden rounded-2xl border border-default bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800"
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
                            <h2 className="line-clamp-2 text-xl font-bold leading-7 text-foreground transition-colors group-hover:text-purple-900 dark:text-white">
                                {post.title}
                            </h2>

                            <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {post.description}
                            </p>


                            <Link href={`/community-forum/${post._id}`}>
                                <Button className={"text-purple-400 hover:text-purple-900 border m-4 mx-auto"} variant="secondary">
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LatestForum;
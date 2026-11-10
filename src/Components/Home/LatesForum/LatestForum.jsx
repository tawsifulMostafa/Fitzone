
import { featuredForum } from '@/lib/api/forum';
import { Button, Card } from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LatestForum = async () => {
    const res = await featuredForum();

    return (
        <section className="bg-gray-100 px-5 py-16 dark:bg-gray-950 sm:px-6 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <span className="mb-3 inline-block rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            FitZone Community
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Latest Forum Discussions
                        </h1>

                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                            Stay updated with the latest discussions in our community forum.
                        </p>
                    </div>

                    <Link href="/community-forum" className="shrink-0">
                        <Button
                            variant="bordered"
                            className="border-gray-400 font-semibold text-gray-800 transition-all hover:border-purple-600 hover:bg-purple-600 hover:text-white dark:border-gray-700 dark:text-gray-200 dark:hover:border-purple-700 dark:hover:bg-purple-700 button"
                        >
                            View All Discussions <ArrowRight/>
                        </Button>
                    </Link>
                </div>

                {/* Forum Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {res?.map((post) => (
                        <Card
                            key={post._id}
                            shadow="none"
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:shadow-black/20"
                        >
                            {/* Image */}
                            <div className="relative h-52 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                                {post.image ? (
                                    <Image
                                        alt={post.title || "Forum post"}
                                        src={post.image}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                                        No image available
                                    </div>
                                )}

                                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                    Community
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-5">
                                <h2 className="line-clamp-2 text-xl font-bold leading-7 text-gray-900 transition-colors group-hover:text-purple-700 dark:text-gray-100 dark:group-hover:text-purple-400">
                                    {post.title}
                                </h2>

                                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    {post.description}
                                </p>

                                <div className="mt-5 border-t border-gray-200 pt-4 dark:border-gray-800">
                                    <Link href={`/community-forum/${post._id}`}>
                                        <Button
                                            variant="bordered"
                                            className="border-gray-300 font-semibold text-gray-800 transition-all hover:border-purple-600 hover:bg-purple-600 hover:text-white dark:border-gray-700 dark:text-gray-200 dark:hover:border-purple-700 dark:hover:bg-purple-700"
                                        >
                                            Read More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LatestForum;

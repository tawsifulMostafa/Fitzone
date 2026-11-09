
import { featuredForum } from '@/lib/api/forum';
import { Button, Card } from '@heroui/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LatestForum = async () => {
    const res = await featuredForum();

    return (
        <section className="relative overflow-hidden bg-background px-5 py-20 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div className="max-w-2xl">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300">
                            <MessageCircle size={16} />
                            FitZone Community
                        </span>

                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Latest Forum <span className="text-purple-600">Discussions</span>
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-7 text-default-500">
                            Connect with fitness enthusiasts, share your experiences
                            and discover new ideas to keep your fitness journey moving.
                        </p>
                    </div>

                    <Link href="/community-forum" className="shrink-0">
                        <Button
                            variant="bordered"
                            className="h-12 border-purple-300 px-6 font-semibold text-purple-700 transition-all hover:bg-purple-600 hover:text-white dark:border-purple-800 dark:text-purple-300"
                        >
                            Explore Community
                            <ArrowRight size={17} />
                        </Button>
                    </Link>
                </div>

                {/* Forum Cards */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {res?.map((post) => (
                        <Card
                            key={post._id}
                            shadow="none"
                            className="group overflow-hidden rounded-2xl border border-default bg-background transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/10 dark:hover:border-purple-800"
                        >
                            {/* Image */}
                            <div className="relative h-56 w-full overflow-hidden bg-surface">
                                {post.image ? (
                                    <Image
                                        alt={post.title || "Forum post"}
                                        src={post.image}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-default-500">
                                        No image available
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                    Community
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="line-clamp-2 text-xl font-bold leading-7 text-foreground transition-colors duration-300 group-hover:text-purple-600">
                                    {post.title}
                                </h3>

                                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-default-500">
                                    {post.description}
                                </p>

                                <div className="mt-6 border-t border-default pt-5">
                                    <Link
                                        href={`/community-forum/${post._id}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition-all hover:gap-3 hover:text-purple-700"
                                    >
                                        Read Discussion
                                        <ArrowRight size={17} />
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 rounded-2xl border border-purple-200 bg-purple-50/70 px-6 py-8 text-center dark:border-purple-900/50 dark:bg-purple-950/20 sm:px-10">
                    <h3 className="text-2xl font-bold text-foreground">
                        Your Experience Matters!
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-default-500">
                        Have a fitness tip, question, or experience to share?
                        Join the conversation with our community.
                    </p>
                    <Link href="/community-forum" className="mt-5 inline-block">
                        <Button className="bg-purple-600 px-7 font-semibold text-white hover:bg-purple-700">
                            Join the Discussion
                            <ArrowRight size={17} />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default LatestForum;

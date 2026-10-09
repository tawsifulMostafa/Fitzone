import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="relative min-h-162.5 overflow-hidden rounded-[2rem] bg-zinc-950">
            {/* Background Image */}
            <Image src={"/asset/Banner.avif"} fill alt="Banner Image"/>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-162.5 items-center px-6 py-16 sm:px-10 lg:px-16">
                <div className="max-w-3xl">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-0.5 w-10 bg-purple-500"></span>

                        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
                            Train • Transform • Thrive
                        </span>
                    </div>

                    <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Where{" "}
                        <span className="text-purple-500">Strength</span>{" "}
                        Meets Stillness.
                    </h1>

                    <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                        Your health is your greatest asset. Train smarter,
                        stretch deeper, and build powerful habits that last a
                        lifetime.
                    </p>

                    {/* Buttons */}
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link href="/all-classes">
                            <Button
                                size="lg"
                                className="w-full bg-purple-600 px-8 font-bold text-white hover:bg-purple-500 sm:w-auto"
                            >
                                Explore Classes
                            </Button>
                        </Link>

                        <Link href="/community-forum">
                            <Button
                                size="lg"
                                variant="bordered"
                                className="w-full border-white/30 bg-white/5 px-8 font-bold text-white backdrop-blur-md hover:bg-white/10 sm:w-auto"
                            >
                                Community Forum
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                50+
                            </h3>
                            <p className="mt-1 text-sm text-zinc-400">
                                Fitness Classes
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                20+
                            </h3>
                            <p className="mt-1 text-sm text-zinc-400">
                                Expert Trainers
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                5K+
                            </h3>
                            <p className="mt-1 text-sm text-zinc-400">
                                Active Members
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right Glass Card */}
            <div className="absolute bottom-8 right-8 hidden w-64 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl lg:block">
                <p className="text-xs font-medium uppercase tracking-widest text-purple-300">
                    Your Journey
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                    Start Today.
                </h3>

                <p className="mt-2 text-sm leading-5 text-zinc-300">
                    Small steps today create a stronger version of you
                    tomorrow.
                </p>
            </div>
        </section>
    );
};

export default Banner;

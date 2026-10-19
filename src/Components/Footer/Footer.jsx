
import Link from "next/link";
import { Dumbbell, ArrowUpRight, X } from "lucide-react";
import { LogoFacebook, LogoGithub } from "@gravity-ui/icons";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#111118] text-white">
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="mb-4 inline-flex items-center gap-2">
                            <div className="rounded-lg bg-purple-600 p-2 text-white">
                                <Dumbbell size={22} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="text-purple-400">Fit</span>
                                <span className="text-white">Zone</span>
                            </span>
                        </Link>

                        <p className="max-w-xs text-sm leading-6 text-gray-400">
                            Build strength, improve your health, and become the best version
                            of yourself with FitZone.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                            >
                                <LogoFacebook />
                            </a>

                            <a
                                href="#"
                                aria-label="GitHub"
                                className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                            >
                                <LogoGithub />
                            </a>

                            <a
                                href="#"
                                aria-label="X"
                                className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                            >
                                <X size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link className="transition hover:text-purple-400" href="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="transition hover:text-purple-400" href="/all-classes">
                                    All Classes
                                </Link>
                            </li>
                            <li>
                                <Link className="transition hover:text-purple-400" href="/community-forum">
                                    Community Forum
                                </Link>
                            </li>
                            <li>
                                <Link className="transition hover:text-purple-400" href="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Fitness */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Explore Fitness</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link className="transition hover:text-purple-400" href="/all-classes">
                                    Find a Class
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="transition hover:text-purple-400"
                                    href="/dashboard/member/apply-trainer"
                                >
                                    Become a Trainer
                                </Link>
                            </li>
                            <li>
                                <Link className="transition hover:text-purple-400" href="/signIn">
                                    Join FitZone
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Start Your Journey
                        </h3>
                        <p className="mb-5 text-sm leading-6 text-gray-400">
                            Find the right classes and take the next step toward your fitness
                            goals.
                        </p>

                        <Link
                            href="/all-classes"
                            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
                        >
                            Explore Classes
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} FitZone. All rights reserved.
                    </p>
                    <p>
                        Built for a stronger, healthier lifestyle.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

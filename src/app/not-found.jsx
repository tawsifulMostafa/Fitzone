"use client";

import Link from "next/link";
import { Dumbbell, ArrowLeft, SearchX } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg text-center">

                <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-purple-100 dark:bg-purple-500/10">
                    <Dumbbell
                        size={48}
                        className="text-purple-600"
                    />

                    <span className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-background bg-purple-600 text-lg font-bold text-white">
                        ?
                    </span>
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-600">
                    Error 404
                </p>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Page Not Found
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-default-500 sm:text-base">
                    Looks like this page has gone missing. The page you are
                    looking for doesn't exist or may have been moved.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Home
                    </Link>

                    <Link
                        href="/all-classes"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-default-300 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-purple-500 hover:text-purple-600"
                    >
                        <SearchX size={17} />
                        Explore Classes
                    </Link>
                </div>

                <div className="mt-10 border-t border-default-200 pt-5">
                    <p className="text-xs font-medium tracking-wide text-default-400">
                        FITZONE — YOUR FITNESS, YOUR JOURNEY
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;

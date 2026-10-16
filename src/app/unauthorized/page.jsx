'use client'
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

const UnAuthorizedPage = () => {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <ShieldAlert size={40} />
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-purple-600">
                    Access Denied
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
                    403 — Unauthorized
                </h1>

                <p className="mx-auto mt-4 max-w-sm leading-7 text-gray-500">
                    You don&apos;t have permission to access this page.
                    Please return to your dashboard.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button
                        as={Link}
                        href="/"
                        variant="bordered"
                        startContent={<ArrowLeft size={17} />}
                    >
                        Back to Home
                    </Button>

                    <Button
                        as={Link}
                        href="/all-classes"
                        className="bg-purple-600 font-semibold text-white"
                    >
                        explore classes
                    </Button>
                </div>

                <p className="mt-10 text-xs text-gray-400">
                    FitZone · Your fitness, your journey.
                </p>
            </div>
        </div>
    );
};

export default UnAuthorizedPage;

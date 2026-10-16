import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, LayoutDashboard } from "lucide-react";

const SuccessPage = async () => {
    return (
        <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#09090f] px-4 py-16">
            {/* Background Effects */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/15 blur-[120px]" />

            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-purple-950/20 backdrop-blur-xl sm:p-12">

                {/* Success Icon */}
                <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15">
                        <CheckCircle2
                            size={42}
                            strokeWidth={1.8}
                            className="text-emerald-400"
                        />
                    </div>
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                    Payment Successful
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    You’re All <span className="text-purple-400">Set!</span>
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
                    Your payment has been completed successfully.
                    Get ready to take the next step in your fitness journey
                    with FitZone.
                </p>

                {/* Confirmation */}
                <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/15">
                        <CheckCircle2 className="text-purple-400" size={23} />
                    </div>

                    <div>
                        <p className="font-medium text-white">
                            Booking Payment
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Thank you for choosing FitZone.
                        </p>
                    </div>

                    <span className="ml-auto rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400">
                        Paid
                    </span>
                </div>

                {/* Actions */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Link
                        href="/dashboard"
                        className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 transition hover:from-purple-600 hover:to-purple-400"
                    >
                        <LayoutDashboard size={18} />
                        Go to Dashboard
                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-gray-300 transition hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                </div>

                <p className="mt-8 text-xs text-gray-500">
                    Keep moving. Keep growing. <span className="text-purple-400">#FitZone</span>
                </p>
            </div>
        </main>
    );
};

export default SuccessPage;
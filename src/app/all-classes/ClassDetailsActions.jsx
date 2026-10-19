"use client"

import { useState } from "react";
import { PostPayment } from "@/lib/action/payment";
import { Button } from "@heroui/react";
import {
Heart,
ArrowRight,
ShieldCheck,
CheckCircle2,
Trash,
} from "lucide-react";
import { deleteFavorite, postFavorite } from "@/lib/action/favorite";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ClassDetailsActions = ({ payment, classId, isFavorite }) => {
const [loading, setLoading] = useState(false);
const [favoriteLoading, setFavoriteLoading] = useState(false);

const router = useRouter();

const handlePayment = async () => {
    try {
        setLoading(true);

        const result = await PostPayment(classId);

        if (result?.url) {
            window.location.href = result.url;
        }
    } catch (error) {
        console.error("Payment failed:", error);
    } finally {
        setLoading(false);
    }
};

const handleFavorite = async () => {
    try {
        setFavoriteLoading(true);

      const favorite= await postFavorite(classId);
        if(favorite.insertedId){
            toast.success("Added To favorites" , {
                style : {
                    color : "green"
                }
            })
        router.refresh();

        }

    } catch (error) {
        console.error("Failed to add favorite:", error);
    } finally {
        setFavoriteLoading(false);
    }
};

const removeFavorite = async () => {
    try {
        setFavoriteLoading(true);

      const remove =   await deleteFavorite(classId);
      if(remove.deletedCount){
        toast.success("Removed From favorites", {
            style : {
                color: "red"
            }
        })
        router.refresh();
      }
    } catch (error) {
        console.error("Failed to remove favorite:", error);
    } finally {
        setFavoriteLoading(false);
    }
};

return (
    <div className="group relative overflow-hidden rounded-2xl border border-purple-400/15 bg-gradient-to-br from-[#15111f] via-[#1b1528] to-[#24152f] p-6 shadow-xl shadow-purple-950/30 transition-all duration-300 hover:border-purple-400/25 sm:p-7">

        {/* Background Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-purple-500/20 blur-[70px]" />

        <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-fuchsia-600/10 blur-[60px]" />

        <div className="relative space-y-6">

            {/* Header */}
            <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/[0.08] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300">
                        Your Next Session
                    </p>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Ready to train?
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                    Take the next step toward your fitness goals.
                    Secure your spot and keep building your momentum.
                </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent" />

            {/* Payment */}
            {payment ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10">
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    </div>

                    <div>
                        <p className="font-semibold text-white">
                            Already Booked
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-400">
                            Your payment has been completed.
                        </p>
                    </div>
                </div>
            ) : (
                <Button
                    onPress={handlePayment}
                    isLoading={loading}
                    isDisabled={loading}
                    className="group/book h-13 w-full rounded-xl bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-700/25 active:translate-y-0 disabled:opacity-60"
                >
                    {loading ? (
                        "Redirecting to checkout..."
                    ) : (
                        <>
                            Book Your Spot

                            <ArrowRight
                                size={18}
                                className="ml-1 transition-transform duration-300 group-hover/book:translate-x-1"
                            />
                        </>
                    )}
                </Button>
            )}

            {/* Favorite */}
            {!isFavorite ? (
                <Button
                    onPress={handleFavorite}
                    isLoading={favoriteLoading}
                    isDisabled={favoriteLoading}
                    className="h-12 w-full rounded-xl border border-pink-400/20 bg-pink-500/[0.04] font-medium text-gray-300 transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-500/10 hover:text-pink-300 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:scale-110"
                >
                    <Heart size={18} />
                 { favoriteLoading ? "adding..." :"Add to Favorites"
}                </Button>
            ) : (
                <Button
                    onPress={removeFavorite}
                    isLoading={favoriteLoading}
                    isDisabled={favoriteLoading}
                    className="h-12 w-full rounded-xl border border-red-400/20 bg-red-500/[0.08] font-medium text-red-300 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-200 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:scale-110"
                >
                    <Trash size={18} />
                   {favoriteLoading ? "Removing..." : " Remove from Favorites"} 
                </Button>
            )}

            {/* Secure Checkout */}
            <div className="flex items-center justify-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-gray-500">
                <ShieldCheck
                    size={15}
                    className="shrink-0 text-purple-400"
                />

                <span>
                    Secure checkout · Powered by Stripe
                </span>
            </div>

        </div>
    </div>
);

};

export default ClassDetailsActions;
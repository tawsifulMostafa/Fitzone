"use client"
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock3, ArrowUpRight, Trash2 } from "lucide-react";
import { deleteFavorite } from "@/lib/action/favorite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const FavoriteCard = ({ favorite }) => {
    const [removeLoading , setRemoveLoading] = useState(false)
    const router = useRouter()
    const cls = favorite.classData;

    if (!cls) return null;

    const handleRemoveFavorite = async() => {
       try{
        setRemoveLoading(true)
        const remove = await deleteFavorite(favorite.classId)
        

       }finally{
        setRemoveLoading(false)
        toast.success("favorites removed successfully" , {
            style: {
                color: "red"
            }
        })
       }
       router.refresh()
    };

    return (
        <div className="group flex overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">
            <div className="relative h-36 w-32 shrink-0 sm:w-40">
                <Image
                    src={cls.image}
                    alt={cls.className}
                    fill
                    sizes="160px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
                <div>
                    <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                            {cls.category}
                        </span>

                        <Heart
                            size={17}
                            className="shrink-0 fill-red-500 text-red-500"
                        />
                    </div>

                    <h2 className="truncate font-bold text-gray-900">
                        {cls.className}
                    </h2>

                    <p className="mt-1 truncate text-sm text-gray-500">
                        By {cls.trainerName}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock3 size={14} />
                            {cls.duration} min
                        </span>

                        <span className="font-semibold text-gray-900">
                            ৳{cls.price}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleRemoveFavorite}
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                        <Trash2 size={14} />
                        Remove
                    </button>

                    <Link
                        href={`/all-classes/${cls._id}`}
                        className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-700"
                    >
                        View Details
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;
"use client"
import { LikeAndDislike } from "@/lib/action/forum";
import { HandPointDown } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

const LikeDislike = ({ forumId, forum }) => {
    const router = useRouter(); 
    const handleReaction = async (reaction) => {
        await LikeAndDislike(reaction, forumId);
        router.refresh();
    };

    return (
        <div className="mt-6 flex items-center gap-3">
            <Button
                onPress={() => handleReaction("like")}
                className={`h-10 min-w-20 gap-2 rounded-full border px-5 font-medium transition-all ${
                    forum.userLiked
                        ? "border-pink-200 bg-pink-50 text-pink-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
                }`}
            >
                <ThumbsUp size={18} />
                <span>{forum.likeCount}</span>
            </Button>

            <Button
                onPress={() => handleReaction("dislike")}
                className={`h-10 min-w-20 gap-2 rounded-full border px-5 font-medium transition-all ${
                    forum.userDisliked
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                }`}
            >
                <HandPointDown />
                <span>{forum.dislikeCount}</span>
            </Button>
        </div>
    );
};

export default LikeDislike;
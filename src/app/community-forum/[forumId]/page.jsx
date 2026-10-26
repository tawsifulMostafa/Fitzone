import { forumDetails } from "@/lib/api/forum";
import { HandPointDown } from "@gravity-ui/icons";
import { Button, Label, TextArea, TextField } from "@heroui/react";
import { Heart } from "lucide-react";
import Image from "next/image";

const ForumDetailsPage = async ({ params }) => {
    const { forumId } = await params;
    const details = await forumDetails(forumId);
    const poster = details?.poster;

    console.log(details);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <p className="mb-2 text-sm font-semibold text-purple-700">
                    FitZone Community
                </p>

                <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {details.title}
                </h1>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="p-4 sm:p-7">
                        <div className="relative mx-auto mb-8 h-64 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-96 lg:h-[450px]">
                            <Image
                                alt="Forum post image"
                                src={details.image}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h2 className="mb-3 text-xl font-semibold text-gray-900">
                            About this post
                        </h2>

                        <p className="whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                            {details.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-5 sm:px-7">
                        <div className="flex items-center gap-3">
                            <Image
                                alt="Poster"
                                src={poster.image}
                                height={48}
                                width={48}
                                className="h-12 w-12 rounded-full border border-gray-200 object-cover"
                            />

                            <div>
                                <p className="text-xs text-gray-500">
                                    Posted by
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {poster.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button className="bg-purple-600 px-5 text-white hover:bg-purple-700">
                        <Heart size={18} />
                        Like
                    </Button>

                    <Button className="border border-gray-300 bg-white px-5 text-gray-700 hover:bg-gray-100">
                        <HandPointDown />
                        Dislike
                    </Button>
                </div>

                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                    <h2 className="mb-5 text-xl font-semibold text-gray-900">
                        Join the Discussion
                    </h2>

                    <TextField name="Comment" className="w-full">
                        <Label className="mb-2 text-sm font-medium text-gray-700">
                            Your Comment
                        </Label>

                        <TextArea
                            placeholder="Write a comment and join the discussion..."
                            variant="secondary"
                            className="min-h-32 w-full"
                        />
                    </TextField>

                    <div className="mt-4 flex justify-end">
                        <Button className="bg-purple-600 px-6 text-white hover:bg-purple-700">
                            Post Comment
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ForumDetailsPage;

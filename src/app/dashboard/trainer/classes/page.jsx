 
import { trainersClass } from "@/lib/api/classes";
import { getUser } from "@/lib/core/session";
import { Button, Card } from "@heroui/react";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TrainerClassesPage = async() => {
    const user =  await getUser()
    const cls = await trainersClass()   
    return (
        <div>
             <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {cls.map((cs) => (
                            <Card
                                key={cs._id}
                                shadow="none"
                                className="group overflow-hidden rounded-2xl border border-purple-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/10"
                            >
                                {/* Image */}
                                <div className="relative h-60 w-full overflow-hidden bg-purple-100">
                                    <Image
                                        src={cs.image}
                                        alt={cs.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-gray-950/10" />

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">
                                            Total Booking: {cs.bookingCount}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-extrabold text-white">
                                            {cs.className}
                                        </h3>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-600">
                                        {cs.description}
                                    </p>

                                    <div className="my-5 h-px bg-gray-100" />

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                                                <Clock size={19} />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Training rate
                                                </p>

                                                <p className="text-lg font-extrabold text-gray-950">
                                                    ${cs.price}
                                                    <span className="ml-1 text-xs font-medium text-gray-500">
                                                        / hour
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <span className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-bold text-purple-700">
                                            {cs.category || "PRO TRAINING"}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/all-classes/${cs._id}`}
                                        className="mt-6 block"
                                    >
                                        <Button
                                            color="primary"
                                            className="h-12 w-full rounded-xl bg-purple-700 font-bold text-white shadow-md shadow-purple-700/20 transition-all hover:bg-purple-800 hover:shadow-lg"
                                            endContent={
                                                <ArrowRight
                                                    size={18}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            }
                                        >
                                            View Class Details
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
        </div>
    );
};

export default TrainerClassesPage;
// bookingCount
// : 
// "100"
// category
// : 
// "Weights"
// createdAt
// : 
// "2026-10-20T05:27:40.338Z"
// description
// : 
// "A great strength training class to build your fitness."
// difficultyLevel
// : 
// "Intermediate"
// duration
// : 
// 60
// image
// : 
// "https://i.ibb.co/9kncw1cF/785282155-1120217420651594-8739467332356426810-n.jpg"
// name
// : 
// "Potato magic"
// price
// : 
// 300
// scheduleDate
// : 
// "2026-10-23"
// scheduleTime
// : 
// "02:30"
// status
// : 
// "approved"
// trainerId
// : 
// "6ac5446a717b76c229f0ecad"
// _id
// : 
// "6ad74a286bf3b79764276202"
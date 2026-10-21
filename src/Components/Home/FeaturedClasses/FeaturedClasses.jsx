
import { getFeaturedClasses } from "@/lib/api/classes";
import { Button, Card } from "@heroui/react";
import { ArrowRight, Clock, Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedClasses = async () => {
 const classes = await getFeaturedClasses()
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/50 to-white px-5 py-20 md:px-10 lg:px-16">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
                            <Dumbbell size={16} />
                            TRAIN YOUR WAY
                        </div>

                        <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                            Explore Our{" "}
                            <span className="text-purple-700">
                                Featured Classes
                            </span>
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                            Discover expert-led fitness classes designed to
                            build strength, improve flexibility, and help you
                            become your strongest self.
                        </p>
                    </div>

                    <Link href="/all-classes" className="shrink-0">
                        <Button
                            variant="bordered"
                            className="border-purple-300 border  font-bold text-purple-700 transition-all hover:bg-purple-700 hover:text-white"
                            endContent={<ArrowRight size={18} />}
                        >
                            Explore All Classes
                        </Button>
                    </Link>

                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                    {classes?.map((cs) => (
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

                                <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-purple-700/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                                    Featured Class
                                </div>

                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">
                                     Total Booking : {cs.bookingCount}
                                    </p>

                                    <h3 className="mt-1 text-2xl font-extrabold text-white">
                                        {cs.name}
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
                                        PRO TRAINING
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

                {/* Bottom CTA */}
                <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:flex-row sm:p-8">

                    <div>
                        <h3 className="text-xl font-extrabold text-gray-950">
                            Ready to level up?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Find the right class and start your fitness journey today.
                        </p>
                    </div>

                    <Link href="/all-classes" className="shrink-0">
                        <Button
                            className="h-12 rounded-xl bg-gray-950 px-6 font-bold text-white transition-colors hover:bg-purple-700"
                            endContent={<ArrowRight size={18} />}
                        >
                            Find Your Class
                        </Button>
                    </Link>

                </div>

            </div>
        </section>
    );
};

export default FeaturedClasses;

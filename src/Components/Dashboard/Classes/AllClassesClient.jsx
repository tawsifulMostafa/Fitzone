
"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { ArrowRight, Clock, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AllClassesClient = ({ allClasses = [] }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const categories = [
        ...new Set(allClasses.map((cs) => cs.category).filter(Boolean)),
    ];

    const filteredClasses = allClasses.filter((cs) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            cs.className?.toLowerCase().includes(searchText) ||
            cs.trainerName?.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" || cs.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-600">
                        Find Your Training
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-gray-950 sm:text-4xl">
                        Explore All Classes
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        Discover the right class for your fitness goals and start
                        building a stronger, healthier you.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">

                    <div className="relative flex-1">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by class or trainer name..."
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        />
                    </div>

                    <div className="relative sm:w-56">
                        <SlidersHorizontal
                            size={17}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-purple-600"
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        >
                            <option value="all">All Categories</option>

                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-bold text-gray-900">
                            {filteredClasses.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-gray-900">
                            {allClasses.length}
                        </span>{" "}
                        classes
                    </p>

                    {(search || category !== "all") && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("all");
                            }}
                            className="text-sm font-semibold text-purple-600 transition hover:text-purple-800"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Classes */}
                {filteredClasses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredClasses.map((cs) => (
                            <Card
                                key={cs._id}
                                shadow="none"
                                className="group overflow-hidden rounded-2xl border border-purple-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/10"
                            >
                                {/* Image */}
                                <div className="relative h-60 w-full overflow-hidden bg-purple-100">
                                    <Image
                                        src={cs.image}
                                        alt={cs.className}
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
                ) : (
                    <div className="rounded-2xl border border-dashed border-purple-200 bg-white px-5 py-16 text-center">
                        <Search
                            size={36}
                            className="mx-auto text-purple-300"
                        />

                        <h3 className="mt-4 text-xl font-bold text-gray-900">
                            No classes found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Try another search term or choose a different category.
                        </p>

                        <Button
                            className="mt-5 bg-purple-700 font-semibold text-white"
                            onPress={() => {
                                setSearch("");
                                setCategory("all");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllClassesClient;
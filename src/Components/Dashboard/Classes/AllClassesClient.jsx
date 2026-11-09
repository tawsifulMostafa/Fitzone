"use client";

import { useState } from "react";
import { Button, Card, Pagination } from "@heroui/react";
import { ArrowRight, Clock, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllClassesClient = ({ allClasses = [], totalPages, currentPage }) => {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const categories = [
        ...new Set(allClasses.map((cs) => cs.category).filter(Boolean)),
    ];

    const filteredClasses = allClasses.filter((cs) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            cs.name?.toLowerCase().includes(searchText) ||
            cs.trainerName?.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" || cs.category === category;

        return matchesSearch && matchesCategory;
    });

    const handlePageChange = (page) => {
        router.push(`/all-classes?page=${page}`);
    };

    return (
        <section className="min-h-screen bg-gray-200 dark:bg-gray-950 px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-600">
                        Find Your Training
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-gray-950 dark:text-gray-500 sm:text-4xl">
                        Explore All Classes
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        Discover the right class for your fitness goals and start
                        building a stronger, healthier you.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-purple-100 dark:border-purple-800 bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">

                    <div className="relative flex-1">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by class or trainer name..."
                            className="h-12 w-full rounded-xl border border-default bg-surface px-4 pl-11 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-purple-500 focus:bg-background focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900"
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
                            className="h-12 w-full appearance-none rounded-xl border border-default bg-default pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-600"
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
                    <p className="text-sm text-gray-400">
                        Showing{" "}
                        <span className="font-bold text-foreground">
                            {filteredClasses.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-foreground">
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
                                className="group overflow-hidden rounded-2xl border border-purple-100 dark:border-purple-900/50 bg-background transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:shadow-purple-900/10"
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

                                    <div className="absolute inset-0 bg-linear-to-t from-gray-950/70 via-transparent to-gray-950/10" />

                                    <div className="absolute bottom-4 left-4 right-4">
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
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-default dark:text-purple-500">
                                                <Clock size={19} />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Training rate
                                                </p>

                                                <p className="text-lg font-extrabold text-gray-950 dark:text-gray-500">
                                                    ${cs.price}
                                                    <span className="ml-1 text-xs font-medium text-gray-500">
                                                        / Month
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <span className="rounded-lg bg-purple-50 dark:bg-default px-3 py-2 text-xs font-bold text-purple-700 dark:text-purple-500">
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
                    <div className="rounded-2xl border border-dashed border-purple-200 bg-background px-5 py-16 text-center">
                        <Search
                            size={36}
                            className="mx-auto text-purple-300"
                        />

                        <h3 className="mt-4 text-xl font-bold text-foreground">
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex mx-auto justify-center items-center">
                        <Pagination>
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous
                                        isDisabled={currentPage <= 1}
                                        onPress={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                    >
                                        <Pagination.PreviousIcon />
                                        <span>Previous</span>
                                    </Pagination.Previous>
                                </Pagination.Item>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((page) => (
                                    <Pagination.Item key={page}>
                                        <Pagination.Link
                                            isActive={currentPage === page}
                                            onPress={() =>
                                                handlePageChange(page)
                                            }
                                        >
                                            {page}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ))}

                                <Pagination.Item>
                                    <Pagination.Next
                                        isDisabled={currentPage >= totalPages}
                                        onPress={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                    >
                                        <span>Next</span>
                                        <Pagination.NextIcon />
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllClassesClient;
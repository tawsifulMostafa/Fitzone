
"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Pencil, X, Dumbbell, LoaderCircle } from "lucide-react";
import { editClass } from "@/lib/action/class";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

const EditClass = ({ cls }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEditClass = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const id = formData.get("id");

        const classData = {
            name: formData.get("name")?.toString().trim(),
            description: formData.get("description")?.toString().trim(),
            image: formData.get("image")?.toString().trim(),
            category: formData.get("category")?.toString().trim(),
            price: Number(formData.get("price")),
            duration: Number(formData.get("duration")),
            difficultyLevel: formData.get("difficultyLevel"),
            scheduleDate: formData.get("scheduleDate"),
            scheduleTime: formData.get("scheduleTime"),
        };

        if (
            !classData.name ||
            !classData.description ||
            !classData.image ||
            !classData.category ||
            !classData.difficultyLevel ||
            !classData.scheduleDate ||
            !classData.scheduleTime ||
            !Number.isFinite(classData.price) ||
            classData.price < 0 ||
            !Number.isFinite(classData.duration) ||
            classData.duration < 1
        ) {
            toast.error("Please provide valid class information");
            return;
        }

        try {
            setLoading(true);

            const result = await editClass(id, classData);

            if (result?.modifiedCount > 0) {
                toast.success("Class updated successfully");
                setIsOpen(false);
                router.refresh();
            } else if (
                result?.matchedCount > 0 ||
                result?.modifiedCount === 0
            ) {
                toast.info("No changes detected");
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error(
                    result?.message || "Failed to update class"
                );
            }
        } catch (error) {
            console.error("Failed to update class:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const labelClass =
        "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";

    const inputClassNames = {
        inputWrapper:
            "border border-gray-200 bg-white shadow-none hover:border-purple-300 group-data-[focus=true]:border-purple-600 dark:border-gray-700 dark:bg-gray-800",
    };

    return (
        <>
            <Button
                size="sm"
                variant="flat"
                onPress={() => setIsOpen(true)}
                className="bg-purple-50 font-medium text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300"
            >
                <Pencil size={15} />
                Edit
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget && !loading) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="edit-class-title"
                        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-2xl shadow-purple-950/20 dark:border-gray-800 dark:bg-gray-900"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 bg-purple-50/70 px-5 py-4 dark:border-gray-800 dark:bg-purple-950/30 sm:px-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white shadow-md shadow-purple-700/20">
                                    <Dumbbell size={21} />
                                </div>

                                <div>
                                    <h2
                                        id="edit-class-title"
                                        className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl"
                                    >
                                        Edit Class
                                    </h2>
                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                        Update your class information
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => setIsOpen(false)}
                                aria-label="Close modal"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-purple-100 hover:text-purple-700 disabled:opacity-50 dark:hover:bg-gray-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleEditClass}
                            className="flex min-h-0 flex-1 flex-col"
                        >
                            <input
                                type="hidden"
                                name="id"
                                value={cls._id}
                            />

                            <div className="overflow-y-auto p-5 sm:p-7">
                                <div className="mb-5">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Class Details
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Edit the fields you want to change.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>
                                            Class Name
                                        </label>
                                        <Input
                                            name="name"
                                            defaultValue={cls.name}
                                            placeholder="Enter class name"
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            defaultValue={cls.description}
                                            required
                                            disabled={loading}
                                            rows={3}
                                            placeholder="Describe your class..."
                                            className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Category
                                        </label>
                                        <Input
                                            name="category"
                                            defaultValue={cls.category}
                                            placeholder="e.g. Weights"
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="difficulty"
                                            className={labelClass}
                                        >
                                            Difficulty Level
                                        </label>

                                        <select
                                            id="difficulty"
                                            name="difficultyLevel"
                                            defaultValue={
                                                difficultyLevels.includes(
                                                    cls.difficultyLevel
                                                )
                                                    ? cls.difficultyLevel
                                                    : ""
                                            }
                                            required
                                            disabled={loading}
                                            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="" disabled>
                                                Select level
                                            </option>

                                            {difficultyLevels.map((level) => (
                                                <option
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>
                                            Image URL
                                        </label>
                                        <Input
                                            name="image"
                                            type="url"
                                            defaultValue={cls.image}
                                            placeholder="https://..."
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Price
                                        </label>
                                        <Input
                                            name="price"
                                            type="number"
                                            min="0"
                                            defaultValue={cls.price}
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Duration (minutes)
                                        </label>
                                        <Input
                                            name="duration"
                                            type="number"
                                            min="1"
                                            defaultValue={cls.duration}
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Schedule Date
                                        </label>
                                        <Input
                                            name="scheduleDate"
                                            type="date"
                                            defaultValue={cls.scheduleDate}
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Schedule Time
                                        </label>
                                        <Input
                                            name="scheduleTime"
                                            type="time"
                                            defaultValue={cls.scheduleTime}
                                            isRequired
                                            isDisabled={loading}
                                            classNames={inputClassNames}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/80 px-5 py-4 dark:border-gray-800 dark:bg-gray-900 sm:px-7">
                                <Button
                                    type="button"
                                    variant="flat"
                                    isDisabled={loading}
                                    onPress={() => setIsOpen(false)}
                                    className="font-medium text-gray-600 dark:text-gray-300"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    isDisabled={loading}
                                    className="bg-purple-700 font-semibold text-white shadow-md shadow-purple-700/20 hover:bg-purple-800"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle
                                                size={16}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditClass;


"use client";

import { Input, Label, TextArea } from "@heroui/react";
import { useEffect, useState } from "react";
import {
    Dumbbell,
    CalendarDays,
    Clock,
    Upload,
    Layers3,
} from "lucide-react";
import { imageUpload } from "@/lib/action/image";
import { postClass } from "@/lib/action/class";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TrainerCreateClasses = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");

    const today = (() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    })();

    const difficultyLevels = [
        "Beginner",
        "Intermediate",
        "Advanced",
    ];

    // Cleanup image preview URL
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData(e.currentTarget);
            const classData = Object.fromEntries(formData.entries());

            const image = formData.get("image");

            if (!image || image.size === 0) {
                toast.error("Please select a class image");
                return;
            }

            if (!image.type.startsWith("image/")) {
                toast.error("Please select a valid image");
                return;
            }

            if (image.size > 5 * 1024 * 1024) {
                toast.error("Image size must be less than 5MB");
                return;
            }

            // Upload image
            const imageUrl = await imageUpload(image);

            if (!imageUrl) {
                throw new Error("Image upload failed");
            }

            // Convert numeric fields
            classData.price = Number(classData.price);
            classData.duration = Number(classData.duration);
            classData.image = imageUrl;

            const data = await postClass(classData);

            if (!data?.insertedId) {
                throw new Error("Failed to create class");
            }

            toast.success("Class created successfully");

            router.push("/dashboard/trainer/classes");
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to create class");

        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            e.target.value = "";
            return;
        }

        setPreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setPreview("");
        document.getElementById("image").value = "";
    };

    return (
        <div className="min-h-screen bg-default-50/50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl space-y-7">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Create New Class
                        </h1>

                        <p className="mt-2 text-sm text-default-500">
                            Build a class, set your schedule and help members
                            reach their fitness goals.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-medium text-purple-700">
                        <Dumbbell size={19} />
                        Trainer Workspace
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">

                        {/* Left Column */}
                        <div className="space-y-6 lg:col-span-3">

                            {/* Basic Information */}
                            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">

                                <div className="mb-6 flex items-start gap-3">
                                    <div className="rounded-xl bg-purple-100 p-2.5 text-purple-700">
                                        <Layers3 size={21} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-foreground">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-sm text-default-500">
                                            Give your fitness class a name and category.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">

                                    <div className="space-y-2">
                                        <Label>Class Name</Label>
                                        <Input
                                            name="name"
                                            placeholder="e.g. Power Yoga"
                                            variant="bordered"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="specialty"
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Class Category
                                            </label>

                                            <select
                                                id="specialty"
                                                name="category"
                                                required
                                                defaultValue=""
                                                className="h-12 w-full rounded-xl border border-default-300 bg-background px-3 text-sm text-foreground outline-none transition focus:border-purple-600"
                                            >
                                                <option value="" disabled>
                                                    Select category
                                                </option>
                                                <option value="Yoga">Yoga</option>
                                                <option value="Weights">Weights</option>
                                                <option value="Cardio">Cardio</option>
                                                <option value="Strength Training">
                                                    Strength Training
                                                </option>
                                                <option value="CrossFit">CrossFit</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="difficulty"
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Difficulty Level
                                            </label>

                                            <select
                                                id="difficulty"
                                                name="difficultyLevel"
                                                required
                                                defaultValue=""
                                                className="h-12 w-full rounded-xl border border-default-300 bg-background px-3 text-sm text-foreground outline-none transition focus:border-purple-600"
                                            >
                                                <option value="" disabled>
                                                    Select level
                                                </option>

                                                {difficultyLevels.map((level) => (
                                                    <option key={level} value={level}>
                                                        {level}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <TextArea
                                        name="description"
                                        label="Class Description"
                                        placeholder="Describe your class, training methods and benefits..."
                                        variant="bordered"
                                        required
                                    />

                                </div>
                            </section>

                            {/* Cover Image */}
                            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">

                                <div className="mb-5">
                                    <h2 className="font-semibold text-foreground">
                                        Class Cover Image
                                    </h2>

                                    <p className="mt-1 text-sm text-default-500">
                                        Upload an image to represent your class.
                                    </p>
                                </div>

                                <label
                                    htmlFor="image"
                                    className="group flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-default-300 bg-default-50 transition hover:border-purple-400 hover:bg-purple-50/50"
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Class cover preview"
                                            className="h-64 w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="mb-3 rounded-2xl bg-purple-100 p-4 text-purple-700 transition group-hover:scale-105">
                                                <Upload size={27} />
                                            </div>

                                            <p className="text-sm font-semibold text-foreground">
                                                Click to upload class image
                                            </p>

                                            <p className="mt-2 text-xs text-default-500">
                                                PNG, JPG or WEBP · Max 5MB
                                            </p>
                                        </>
                                    )}
                                </label>

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                    required
                                    className="hidden"
                                />

                                {preview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="mt-3 text-sm font-medium text-danger hover:underline"
                                    >
                                        Remove image
                                    </button>
                                )}

                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Schedule */}
                            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">

                                <div className="mb-6 flex items-start gap-3">
                                    <div className="rounded-xl bg-purple-100 p-2.5 text-purple-700">
                                        <CalendarDays size={21} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-foreground">
                                            Class Schedule
                                        </h2>

                                        <p className="mt-1 text-sm text-default-500">
                                            When will your class take place?
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">

                                    <div className="grid gap-2">
                                        <Label>Date</Label>
                                        <Input
                                            name="scheduleDate"
                                            type="date"
                                            variant="bordered"
                                            min={today}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Time</Label>
                                        <Input
                                            name="scheduleTime"
                                            type="time"
                                            variant="bordered"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Duration (Minutes)</Label>
                                        <Input
                                            name="duration"
                                            type="number"
                                            placeholder="45"
                                            min={1}
                                            variant="bordered"
                                            required
                                        />
                                    </div>

                                </div>
                            </section>

                            {/* Pricing */}
                            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">

                                <div className="mb-5">
                                    <h2 className="font-semibold text-foreground">
                                        Class Pricing
                                    </h2>

                                    <p className="mt-1 text-sm text-default-500">
                                        Set the booking price for members.
                                    </p>
                                </div>

                                <Input
                                    name="price"
                                    type="number"
                                    label="Price per Booking (BDT)"
                                    placeholder="1000"
                                    min={0}
                                    variant="bordered"
                                    required
                                />

                                <div className="mt-4 rounded-xl bg-purple-50 p-4">
                                    <p className="text-sm font-medium text-purple-900">
                                        Pricing tip
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-purple-700">
                                        Choose a fair price based on class duration
                                        and training level.
                                    </p>
                                </div>
                            </section>

                            {/* Submission Info */}
                            <div className="rounded-2xl border border-default-200 bg-background p-5">

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-700">
                                        <Clock size={16} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            Pending Approval
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-default-500">
                                            Your class will be reviewed by an admin
                                            before it becomes available to members.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-default-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-xs text-default-500">
                            All fields are required.
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Dumbbell size={18} />

                            {loading ? "Creating Class..." : "Create Class"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default TrainerCreateClasses;

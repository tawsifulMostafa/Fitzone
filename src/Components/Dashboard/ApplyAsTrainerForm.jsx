"use client";

import { useState } from "react";
import {
    Button,
    FieldError,
    Input,
    Label,
    NumberField,
    TextField,
} from "@heroui/react";
import { Send, Dumbbell, Award, FileText } from "lucide-react";
import { toast } from "sonner";
import { applyAsTrainer } from "@/lib/action/apply";

const ApplyAsTrainerForm = () => {
    const [experience, setExperience] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const applicationData = {
            ...data,
            experience: Number(experience),
            specialty,
        };

        const apply = await applyAsTrainer(applicationData);
        if (apply.insertedId) {
            toast.success("Application submitted successfully", {
                style: {
                    background: "#052e16",
                    color: "#4ade80",
                    border: "1px solid #166534",
                },
            });
        } else {
            toast.error("You have already applied", {
                style: {
                    background: "#450a0a",
                    color: "#f87171",
                    border: "1px solid #991b1b",
                },
            });
        }
        setLoading(false)
    };

    return (
        <div className="mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-default-200 bg-background shadow-sm">

                {/* Header */}
                <div className="border-b border-default-200 bg-purple-50/70 p-6 dark:bg-purple-950/20 sm:p-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
                        <Dumbbell size={24} />
                    </div>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
                        Join FitZone
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Become a Trainer
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-default-500">
                        Share your expertise and help others achieve their fitness goals.
                        Tell us about your experience and training specialty.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">

                    {/* Experience */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <Award size={18} className="text-purple-600" />
                            <h3 className="font-semibold text-foreground">
                                Professional Experience
                            </h3>
                        </div>

                        <NumberField
                            isRequired
                            name="experience"
                            minValue={0}
                            maxValue={500}
                            value={experience}
                            onChange={setExperience}
                        >
                            <Label className="mb-2 block text-sm font-medium">
                                Years of experience
                            </Label>

                            <Input
                                placeholder="e.g. 3"
                                variant="secondary"
                                className="w-full"
                            />

                            <FieldError />
                        </NumberField>
                    </section>

                    <div className="h-px bg-default-200" />

                    {/* Specialty */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <Dumbbell size={18} className="text-purple-600" />
                            <h3 className="font-semibold text-foreground">
                                Training Specialty
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="specialty"
                                className="block text-sm font-medium text-foreground"
                            >
                                Select your specialty
                            </label>

                            <select
                                id="specialty"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                required
                                className="w-full rounded-xl border border-default-300 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                            >
                                <option value="" disabled>
                                    Choose your specialty
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
                    </section>

                    <div className="h-px bg-default-200" />

                    {/* Description */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-purple-600" />
                            <h3 className="font-semibold text-foreground">
                                About You
                            </h3>
                        </div>

                        <TextField
                            isRequired
                            name="description"
                            validate={(value) => {
                                if (value.trim().length < 30) {
                                    return "Description must be at least 30 characters";
                                }

                                return null;
                            }}
                        >
                            <Label className="mb-2 block text-sm font-medium">
                                Your introduction
                            </Label>

                            <Input
                                placeholder="Describe your skills and training experience..."
                                variant="secondary"
                                className="w-full"
                            />

                            <FieldError />
                        </TextField>

                        <p className="mt-2 text-xs text-default-500">
                            Minimum 30 characters.
                        </p>
                    </section>

                    {/* Submit */}
                    <Button
                        type="submit"
                        color="secondary"
                        className="w-full font-semibold"
                        endContent={<Send size={16} />}
                    >
                        {
                            loading ? "Submitting..." : "Submit Application"
                        }
                    </Button>

                    <p className="text-center text-xs text-default-500">
                        Your application will be reviewed by the FitZone team.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ApplyAsTrainerForm;
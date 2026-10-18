
import ApplyAsTrainerForm from "@/Components/Dashboard/ApplyAsTrainerForm";
import { getApplication } from "@/lib/api/application";
import { CheckCircle2, Clock, Dumbbell } from "lucide-react";

const TrainerApplicationForm = async () => {
    const application = await getApplication();

    if (application) {
        return (
            <div className="mx-auto w-full max-w-2xl">
                <div className="overflow-hidden rounded-2xl border border-default-200 bg-background shadow-sm">

                    <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
                            <CheckCircle2
                                size={42}
                                className="text-green-600"
                            />
                        </div>

                        <span className="mb-3 rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                            Application Submitted
                        </span>

                        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                            You&apos;ve Applied Successfully!
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-default-500">
                            Your trainer application has been submitted.
                            Our team will review your information and update
                            your application status.
                        </p>

                        <div className="mt-8 flex w-full max-w-md items-start gap-3 rounded-xl border border-default-200 bg-default-50 p-4 text-left dark:bg-default-100/5">
                            <Clock
                                size={21}
                                className="mt-0.5 shrink-0 text-purple-600"
                            />

                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    What happens next?
                                </p>

                                <p className="mt-1 text-sm leading-5 text-default-500">
                                    The FitZone team will review your
                                    application. Please wait for the decision.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-purple-600">
                            <Dumbbell size={17} />
                            FitZone Trainer Program
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <ApplyAsTrainerForm />;
};

export default TrainerApplicationForm;
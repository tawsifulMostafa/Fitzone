
import {
    Dumbbell,
    Users,
    CalendarCheck,
    Target
} from 'lucide-react';

const WhyFitZone = () => {
    const features = [
        {
            icon: Dumbbell,
            title: "Expert Trainers",
            description: "Learn from experienced trainers who guide you toward better fitness."
        },
        {
            icon: CalendarCheck,
            title: "Flexible Schedules",
            description: "Choose workout days and class schedules that fit your daily routine."
        },
        {
            icon: Target,
            title: "Personalized Goals",
            description: "Find the right fitness classes for your level and personal goals."
        },
        {
            icon: Users,
            title: "Active Community",
            description: "Connect with fitness enthusiasts and stay motivated together."
        }
    ];

    return (
        <section className="bg-background px-5 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 text-center">
                    <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                        The FitZone Advantage
                    </span>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Why Choose <span className="text-purple-600">FitZone?</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                        Everything you need to build a healthier lifestyle,
                        achieve your fitness goals and stay motivated.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-black/20"
                            >
                                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white dark:bg-gray-900 dark:text-gray-200 dark:group-hover:bg-purple-700">
                                    <Icon size={23} />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default WhyFitZone;

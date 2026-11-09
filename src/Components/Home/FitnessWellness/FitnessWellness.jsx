
import {
    Apple,
    Dumbbell,
    HeartPulse
} from 'lucide-react';

const FitnessWellness = () => {
    const tips = [
        {
            icon: Apple,
            title: "Nutrition & Diet",
            description:
                "Fuel your body with balanced nutrition, healthy food choices and essential nutrients for better performance.",
            points: ["Balanced Diet", "Healthy Food Choices", "Nutrition Basics"],
            number: "01"
        },
        {
            icon: Dumbbell,
            title: "Workout Tips",
            description:
                "Discover effective exercise techniques and practical workout tips to make every training session count.",
            points: ["Exercise Techniques", "Training Guides", "Workout Routines"],
            number: "02"
        },
        {
            icon: HeartPulse,
            title: "Recovery & Wellness",
            description:
                "Give your body the care it deserves with proper recovery, quality sleep and healthy daily habits.",
            points: ["Muscle Recovery", "Quality Sleep", "Healthy Lifestyle"],
            number: "03"
        }
    ];

    return (
        <section className="bg-background px-5 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-12 text-center">
                    <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 dark:border-purple-800 dark:bg-default dark:text-purple-300">
                        Your Guide to Better Living
                    </span>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Fitness Tips & <span className="text-purple-600">Wellness</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-default-500">
                        Fitness is more than just exercise. Learn how to eat
                        better, train smarter and recover stronger.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {tips.map((tip) => {
                        const Icon = tip.icon;

                        return (
                            <div
                                key={tip.number}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl hover:shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-purple-800 dark:hover:shadow-black/20"
                            >
                                {/* Number */}
                                <span className="absolute right-6 top-5 text-5xl font-black text-gray-100 dark:text-gray-900">
                                    {tip.number}
                                </span>

                                {/* Icon */}
                                <div className="relative mb-6 flex size-14 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-950 dark:text-purple-300 dark:group-hover:bg-purple-600 dark:group-hover:text-white">
                                    <Icon size={25} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    {tip.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                    {tip.description}
                                </p>

                                {/* Points */}
                                <ul className="mt-6 space-y-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                                    {tip.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            <span className="size-1.5 rounded-full bg-purple-600" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <p className="mt-9 text-center text-sm text-gray-500 dark:text-gray-400">
                    Small healthy habits today lead to a stronger tomorrow.
                </p>

            </div>
        </section>
    );
};

export default FitnessWellness;

import { cn } from "@/lib/utils";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";

export default function FeaturesSection() {
    const features = [
        {
            title: "Built for Students",
            description:
                "Designed for students, engineers, developers, dreamers, and doers—just like you.",
            icon: <IconTerminal2 />,
        },
        {
            title: "Simple and Intuitive",
            description:
                "As easy to use as an Apple product—minus the premium price tag.",
            icon: <IconEaseInOut />,
        },
        {
            title: "Unmatched Pricing",
            description:
                "Transparent pricing with no hidden charges, no credit card required.",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "Access to Previous Questions",
            description:
                "Get full access to a curated collection of previous questions anytime.",
            icon: <IconCloud />,
        },
        {
            title: "One-Click Google Login",
            description:
                "No more passwords—log in securely with your Google account in one click.",
            icon: <IconRouteAltLeft />,
        },
        {
            title: "24/7 Support",
            description:
                "Round-the-clock support available—powered by real-time AI assistance.",
            icon: <IconHelp />,
        },
        {
            title: "Money-Back Promise",
            description:
                "Not satisfied? We will do our best to win you back—or refund your money.",
            icon: <IconAdjustmentsBolt />,
        },
        {
            title: "Personal Dashboard",
            description:
                "Track your progress and manage everything from your personalized dashboard.",
            icon: <IconHeart />,
        },
    ];

    return (
        <section className="h-screen py-20 px-5 md:px-10" id="features">
            <h2 className="w-full align-middle text-3xl md:text-4xl">Features</h2>
            <div
                className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 px-5 relative z-1 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </section>

    );
}

const Feature = ({
    title,
    description,
    icon,
    index
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-7 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}>
            {index < 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div
                className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-5 px-10">
                <div
                    className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span
                    className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p
                className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};

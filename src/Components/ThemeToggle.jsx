"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    if (!mounted) return null;

    return (
        <Button
            isIconOnly 
            variant="secondary"
            onPress={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
    );
};

export default ThemeToggle;
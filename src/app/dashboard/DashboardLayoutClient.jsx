"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";

const DashboardLayoutClient = ({ userRole, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <DashboardSidebar
                userRole={userRole}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <main className="min-w-0 flex-1">
                <div className="flex items-center border-b border-white/10 p-4 lg:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>

                {children}
            </main>
        </div>
    );
};

export default DashboardLayoutClient;
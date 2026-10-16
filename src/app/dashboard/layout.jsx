
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";
import { getUser } from "@/lib/core/session";

const DashboardLayout = async ({ children }) => {
    const user = await getUser();

    if (!user) {
        return <div className="p-6 text-red-500">User not found</div>;
    }
    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar userRole={user.role} />

            <main className="min-w-0 flex-1 p-6">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
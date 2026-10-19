import { redirect } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient";
import { sessionCheck } from "@/lib/core/session";

const DashboardLayout = async ({ children }) => {
    const session = await sessionCheck();

    if (!session) {
        redirect("/signIn");
    }

    return (
        <DashboardLayoutClient userRole={session.user.role}>
            {children}
        </DashboardLayoutClient>
    );
};
export default DashboardLayout;
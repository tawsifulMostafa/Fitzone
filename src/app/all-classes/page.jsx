import AllClassesClient from "@/Components/Dashboard/Classes/AllClassesClient";
import { getAllClasses } from "@/lib/api/classes";
export const metadata = {

    title: "All Class"
}


const AllClassesPage = async ({ searchParams }) => {
    const { page } = await searchParams;

    const currentPage = Number(page) || 1;

    const data = await getAllClasses(currentPage);

    return (
        <AllClassesClient
            allClasses={data.classes}
            totalPages={data.totalPages}
            currentPage={data.currentPage}
        />
    );
};

export default AllClassesPage;
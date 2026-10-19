
import AllClassesClient from "@/Components/Dashboard/Classes/AllClassesClient";
import { getAllClasses } from "@/lib/api/classes";

const AllClassesPage = async () => {
    const allClasses = await getAllClasses();

    return <AllClassesClient allClasses={allClasses} />;
};

export default AllClassesPage;

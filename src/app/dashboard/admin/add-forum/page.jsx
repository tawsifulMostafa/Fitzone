import AddForum from "@/Components/Dashboard/Forum/AddForum";
import { getUser } from "@/lib/core/session";
 
const TrainerAddForumPage = async() => {
       const user = await getUser()
        const role = user?.role
    return (
        <div >
            <AddForum role = {role}/>
        </div>
    );
};

export default TrainerAddForumPage;
import { sessionCheck } from "@/lib/core/session";
import NavDetail from "./NavDetail/NavDetail";

const Navbar = async () => {
    const session = await sessionCheck();
    const user = session?.user
 
    return (
        <NavDetail user = {user}/>
    );
};

export default Navbar;
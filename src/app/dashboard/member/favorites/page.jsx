import DashboardFavoriteCard from '@/Components/Dashboard/DashboardFavoriteCard';
import { favoriteCollection } from '@/lib/api/favorite';



const MyFavoritePage = async(classId) => {
    const favorites = await favoriteCollection(classId)
    
    return (
        <div>
             {
                favorites.map((favorite) => (
                    <div key={favorite._id}>
                       <DashboardFavoriteCard favorite={favorite}/>
                    </div>
                ))
             }
             
        </div>
    );
};

export default MyFavoritePage;
import DashboardFavoriteCard from '@/Components/Dashboard/DashboardFavoriteCard';
import { favoriteCollection } from '@/lib/api/favorite';



const MyFavoritePage = async () => {
    const favorites = await favoriteCollection();
    return (
        <div>
            {
                favorites.map((favorite) => (
                    <div key={favorite._id}>
                        <DashboardFavoriteCard favorite={favorite} />
                    </div>
                ))
            }

        </div>
    );
};

export default MyFavoritePage;
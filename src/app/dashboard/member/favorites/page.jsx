import DashboardFavoriteCard from '@/Components/Dashboard/DashboardFavoriteCard';
import { favoriteCollection } from '@/lib/api/favorite';



const MyFavoritePage = async () => {
    const favorites = await favoriteCollection();
    console.log(favorites);
    return (
        <div>
            {
                favorites.map((favorite) => (
                    <div key={favorite.classId}>
                        <DashboardFavoriteCard favorite={favorite} />
                    </div>
                ))
            }

        </div>
    );
};

export default MyFavoritePage;
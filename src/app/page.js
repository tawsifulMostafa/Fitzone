import Banner from "@/Components/Home/Banner/Banner";
import FeaturedClasses from "@/Components/Home/FeaturedClasses/FeaturedClasses";
import LatestForum from "@/Components/Home/LatesForum/LatestForum";



export default function Home() {
  return (
    <div className= "dark:bg-gray-950 bg-gray-100">
      <Banner />
      <FeaturedClasses />
      <LatestForum />
    </div>
  );
}

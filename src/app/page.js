import Banner from "@/Components/Home/Banner/Banner";
import FeaturedClasses from "@/Components/Home/FeaturedClasses/FeaturedClasses";
import FitnessWellness from "@/Components/Home/FitnessWellness/FitnessWellness";
import LatestForum from "@/Components/Home/LatesForum/LatestForum";
import WhyFitZone from "@/Components/Home/WhyFitZone/WhyFitZone";

export const metadata = {
  title : "Home"
}
export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedClasses />
      <LatestForum />
      <WhyFitZone />
      <FitnessWellness />
    </div>
  );
}

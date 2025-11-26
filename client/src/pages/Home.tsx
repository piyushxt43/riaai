import TopNavBar from "@/components/TopNavBar";
import MainNavigation from "@/components/MainNavigation";
import HeroSection from "@/components/HeroSection";
import AwardsSection from "@/components/AwardsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScienceSection from "@/components/ScienceSection";
import FAQSection from "@/components/FAQSection";
import CommunitySection from "@/components/CommunitySection";
import BottomCTASection from "@/components/BottomCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopNavBar />
      <MainNavigation />
      <HeroSection />
      <AwardsSection />
      <FeaturesSection />
      <ScienceSection />
      <FAQSection />
      <CommunitySection />
      <BottomCTASection />
      <Footer />
    </div>
  );
}

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ImpactStats from '../components/ImpactStats';
import ActivityCards from '../components/ActivityCards';
import DonationTable from '../components/DonationTable';
import VolunteerForm from '../components/VolunteerForm';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ImpactStats />
      <ActivityCards />
      <DonationTable />
      <VolunteerForm />
      <Footer />
    </>
  );
}

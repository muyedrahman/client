
import Banner from './Banner'
import BloodGroupSection from './BloodGroupSection';
import ContactUs from './ContactUs '
import FeaturedSection from './FeaturedSection '
import HowItWorks from './HowItWorks';
import StatsSection from './StatsSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from "./CTASection";

const Home = () => {
  return (
    <div>
      <Banner></Banner> {/* 1. Hero */}
       <StatsSection />    {/* 2. Dynamic Stats */}
      <HowItWorks/>  {/* 3. How It Works */}
      <BloodGroupSection /> {/* 4. Blood Groups */}
      <FeaturedSection></FeaturedSection> {/* 5. Features */}
      <TestimonialsSection /> {/* 6. Testimonials */}
      <ContactUs></ContactUs> {/* 7. Contact */}
      <CTASection /> {/* 8. Call to Action */}
    </div>
  );
}

export default Home

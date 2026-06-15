
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
      <Banner></Banner>  
       <StatsSection />     
      <HowItWorks/>   
      <BloodGroupSection />  
      <FeaturedSection></FeaturedSection> 
      <TestimonialsSection />  
      <ContactUs></ContactUs>  
      <CTASection />  
    </div>
  );
}

export default Home

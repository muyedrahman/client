
import Banner from './Banner'
import ContactUs from './ContactUs '
import FeaturedSection from './FeaturedSection '
import StatsSection from './StatsSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner> {/* 1. Hero */}
       <StatsSection />    {/* 2. Dynamic Stats */}
      {/* 3. How It Works */}
      {/* 4. Blood Groups */}
      <FeaturedSection></FeaturedSection> {/* 5. Features */}
      {/* 6. Testimonials */}
      <ContactUs></ContactUs> {/* 7. Contact */}
      {/* 8. Call to Action */}
    </div>
  );
}

export default Home

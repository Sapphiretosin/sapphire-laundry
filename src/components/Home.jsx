import React from "react";

// Components in the same folder
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import Experience from "./Experience";
import Services from "./Services";
import HowWeWork from "./HowWeWork";
import ScrollToTop from "./ScrollToTop";
import ColorSwitcher from "./ColorSwitcher";
import CommercialLaundry from "./CommercialLaundry";
import ApproachSection from "./Approachsection";
import FAQ from "./FAQ";
import WhyChooseUs from "./WhyChooseUs";
import Prices from "./Prices";
import AppPromo from "./Apppromo";
import Testimony from "./Testimony";
import PricePackages from "./PricePackages";
import ContactBanner from "./ContactBanner";
import StickyCallBar from "./StickyCallBar";
import LocationPicker from "./LocationPicker";
import Blog from "./Blog";
function Home() {
  return (
    <div>
      <Hero />
      <Experience />
      <Services />
      <HowWeWork />
      <ScrollToTop />
      <ColorSwitcher />
      <CommercialLaundry />
      <ApproachSection />
      <FAQ />
      <WhyChooseUs />
      <Prices />
      <AppPromo />
      <Testimony />
      <PricePackages />
      <ContactBanner />
      <StickyCallBar />
      <LocationPicker />
    </div>
  );
}

export default Home;

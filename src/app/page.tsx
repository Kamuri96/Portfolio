// import { Header } from "./components/Header";
import { Hero } from "./components/hero";
import { AboutSection } from "./components/about-section";
import { WorksSection } from "./components/works-section";
import { ArticlesSection } from "./components/articles-section";
import { ContactSection } from "./components/contact-section";
// import { Footer } from "./components/Footer";

const Home = () => {
  return (
    <div id="top">
      {/* <Header /> */}
      <main>
        <Hero />
        <AboutSection />
        <WorksSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;

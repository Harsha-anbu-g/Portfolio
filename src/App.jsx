import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProject from "./components/FeaturedProject";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Coursework from "./components/Coursework";
import BeyondCode from "./components/BeyondCode";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FadeIn from "./components/FadeIn";

export default function App() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProject />
        <FadeIn><About /></FadeIn>
        <FadeIn><Experience /></FadeIn>
        <FadeIn><Skills /></FadeIn>
        <FadeIn><Projects /></FadeIn>
        <FadeIn><Coursework /></FadeIn>
        <FadeIn><BeyondCode /></FadeIn>
        <FadeIn><Contact /></FadeIn>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

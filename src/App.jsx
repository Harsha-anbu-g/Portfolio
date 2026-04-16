import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FadeIn from "./components/FadeIn";
import Loader from "./components/Loader";

export default function App() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <FadeIn><About /></FadeIn>
        <FadeIn><Experience /></FadeIn>
        <FadeIn><Skills /></FadeIn>
        <FadeIn><Projects /></FadeIn>
        <FadeIn><Contact /></FadeIn>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

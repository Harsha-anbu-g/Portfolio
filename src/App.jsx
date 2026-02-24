import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Coursework from "./components/Coursework";
import BeyondCode from "./components/BeyondCode";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FadeIn from "./components/FadeIn";
import Loader from "./components/Loader";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <FadeIn><div className="bg-gray-50 dark:bg-slate-900"><About /></div></FadeIn>
        <div className="section-divider" />
        <FadeIn><Skills /></FadeIn>
        <div className="section-divider" />
        <FadeIn><div className="bg-gray-50 dark:bg-slate-900"><Experience /></div></FadeIn>
        <div className="section-divider" />
        <FadeIn><Projects /></FadeIn>
        <div className="section-divider" />
        <FadeIn><div className="bg-gray-50 dark:bg-slate-900"><Education /></div></FadeIn>
        <div className="section-divider" />
        <FadeIn><Coursework /></FadeIn>
        <div className="section-divider" />
        <FadeIn><BeyondCode /></FadeIn>
        <div className="section-divider" />
        <FadeIn><div className="bg-gray-50 dark:bg-slate-900"><Contact /></div></FadeIn>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import BlogPosts from './components/BlogPosts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/motion/Preloader';
import CustomCursor from './components/motion/CustomCursor';
import ScrollProgress from './components/motion/ScrollProgress';
import { Ticker } from './components/motion/Effects';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Ticker items={['React', 'Django', 'PostgreSQL', 'Three.js', 'Node.js', 'MERN Stack', 'REST APIs', 'Motion Design']} />
        <Projects />
        <About />
        <Skills />
        <BlogPosts />
        <Ticker items={['Open to work', 'Open to work', 'Open to work', 'Open to work']} fast accent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

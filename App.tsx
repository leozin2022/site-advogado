import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { ContentProvider } from './context/ContentContext';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
};

export default App;
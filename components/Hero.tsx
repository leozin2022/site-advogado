import React from 'react';
import Button from './Button';
import { EditableText, EditableImage } from './Editable';
import { useContent } from '../context/ContentContext';

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/5589999867161?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta.";
  const { content } = useContent();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <EditableImage 
          path="hero.bgImage"
          alt="Escritório de Advocacia" 
          className="w-full h-full grayscale"
        />
        <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <EditableText 
          path="hero.eyebrow"
          as="h2"
          className="text-amber-600 text-lg md:text-xl uppercase tracking-[0.3em] mb-4"
        />
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 serif-font leading-tight flex flex-col gap-2">
          <EditableText path="hero.titleMain" as="span" />
          <div className="flex items-center justify-center gap-3">
             <span className="text-white">com</span>
             <EditableText 
               path="hero.titleHighlight" 
               as="span" 
               className="italic font-light text-gray-300"
             />
          </div>
        </h1>
        
        <div className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed">
          <EditableText path="hero.description" multiline={true} />
        </div>

        <div className="flex justify-center">
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary">
               <EditableText path="hero.buttonText" as="span" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
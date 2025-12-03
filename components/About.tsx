import React from 'react';
import { EditableText, EditableImage } from './Editable';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10">
              <EditableImage 
                path="about.image"
                alt="Advogado Moura"
                className="w-full h-auto shadow-2xl rounded-sm"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute top-10 -left-6 w-full h-full border-2 border-amber-600 z-0 hidden md:block"></div>
          </div>

          <div className="w-full md:w-1/2">
            <EditableText 
              path="about.eyebrow" 
              as="h4" 
              className="text-amber-600 uppercase tracking-widest text-sm font-bold mb-2" 
            />
            <EditableText 
              path="about.title" 
              as="h2" 
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 serif-font" 
            />
            
            <div className="text-gray-600 leading-relaxed mb-6 text-lg">
              <EditableText path="about.p1" multiline={true} />
            </div>
            
            <div className="text-gray-600 leading-relaxed mb-8 text-lg">
              <EditableText path="about.p2" multiline={true} />
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12 border-t border-gray-200 pt-8">
              <div>
                <EditableText 
                  path="about.stats1Value" 
                  as="span" 
                  className="block text-4xl font-bold text-amber-600 serif-font" 
                />
                <EditableText 
                  path="about.stats1Label" 
                  as="span" 
                  className="text-sm text-gray-500 uppercase tracking-wider" 
                />
              </div>
              <div>
                <EditableText 
                  path="about.stats2Value" 
                  as="span" 
                  className="block text-4xl font-bold text-amber-600 serif-font" 
                />
                <EditableText 
                  path="about.stats2Label" 
                  as="span" 
                  className="text-sm text-gray-500 uppercase tracking-wider" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
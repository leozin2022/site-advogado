import React, { useState } from 'react';
import Button from './Button';
import { Send, CheckCircle } from 'lucide-react';
import { EditableText } from './Editable';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp Format
    const phone = "5589999867161";
    const text = `
*Nova Solicitação de Contato - Moura Advocacia*

*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}
    `.trim();

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-1/2">
            <EditableText 
              path="contact.eyebrow"
              as="h4"
              className="text-amber-600 uppercase tracking-widest text-sm font-bold mb-3"
            />
            <EditableText 
              path="contact.title"
              as="h2"
              className="text-4xl md:text-5xl serif-font text-neutral-900 mb-6"
            />
            <div className="text-gray-600 mb-8 text-lg">
              <EditableText path="contact.description" multiline={true} />
            </div>
            
            <div className="space-y-6">
               <div className="flex items-start space-x-4">
                 <CheckCircle className="text-amber-600 w-6 h-6 mt-1 flex-shrink-0" />
                 <div>
                   <EditableText 
                     path="contact.feature1Title"
                     as="h5"
                     className="font-bold text-neutral-900"
                   />
                   <EditableText 
                     path="contact.feature1Desc"
                     as="p"
                     className="text-gray-500 text-sm"
                   />
                 </div>
               </div>
               <div className="flex items-start space-x-4">
                 <CheckCircle className="text-amber-600 w-6 h-6 mt-1 flex-shrink-0" />
                 <div>
                   <EditableText 
                     path="contact.feature2Title"
                     as="h5"
                     className="font-bold text-neutral-900"
                   />
                   <EditableText 
                     path="contact.feature2Desc"
                     as="p"
                     className="text-gray-500 text-sm"
                   />
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-neutral-50 p-8 md:p-12 border border-gray-100 shadow-xl rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 p-3 text-neutral-900 focus:border-amber-600 focus:outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 p-3 text-neutral-900 focus:border-amber-600 focus:outline-none transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Área de Interesse</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 p-3 text-neutral-900 focus:border-amber-600 focus:outline-none transition-colors"
                  >
                    <option value="Geral">Direito Civil (Geral)</option>
                    <option value="Família">Direito de Família</option>
                    <option value="Imobiliário">Direito Imobiliário</option>
                    <option value="Contratos">Contratos</option>
                    <option value="Sucessões">Inventários e Sucessões</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Descrição do Caso</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 p-3 text-neutral-900 focus:border-amber-600 focus:outline-none transition-colors resize-none"
                  placeholder="Descreva brevemente sua situação..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center space-x-2">
                <span>Enviar para WhatsApp</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
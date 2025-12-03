import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import Button from './Button';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Reset form when service changes or modal opens
  useEffect(() => {
    if (isOpen && service) {
      const initialData: Record<string, string> = {
        name: '',
        phone: ''
      };
      service.formFields.forEach(field => {
        initialData[field.name] = '';
      });
      setFormData(initialData);
    }
  }, [isOpen, service]);

  if (!isOpen || !service) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp Phone
    const phoneNumber = "5589999867161";
    
    // Build Message
    let message = `*Solicitação de Atendimento: ${service.title}*\n\n`;
    message += `*Nome:* ${formData.name}\n`;
    message += `*Telefone:* ${formData.phone}\n\n`;
    message += `*--- Detalhes do Caso ---*\n`;

    service.formFields.forEach(field => {
      const value = formData[field.name] || 'Não informado';
      message += `*${field.label}:* ${value}\n`;
    });

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl rounded-sm overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-neutral-900 px-6 py-4 flex justify-between items-center border-b border-amber-600">
          <h3 className="text-white serif-font text-xl tracking-wider">
            {service.title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-amber-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          <p className="text-gray-500 text-sm mb-6">
            Preencha as informações específicas sobre <strong>{service.title}</strong> para agilizarmos seu atendimento via WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Standard Fields */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Nome Completo</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="Seu nome"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Telefone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Dynamic Specific Fields */}
            {service.formFields.map((field, idx) => (
              <div key={idx} className="pt-2">
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{field.label}</label>
                
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-amber-600 focus:outline-none transition-colors"
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    rows={3}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 mt-1 focus:border-amber-600 focus:outline-none transition-colors text-sm resize-none"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:border-amber-600 focus:outline-none transition-colors"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <div className="pt-4">
              <Button type="submit" className="w-full flex justify-center items-center space-x-2">
                <span>Enviar Solicitação</span>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
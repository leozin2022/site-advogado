import React, { useState } from 'react';
import { Shield, Home, Users, FileText, Scale, HeartHandshake, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import ServiceModal from './ServiceModal';
import { EditableText } from './Editable';
import { useContent } from '../context/ContentContext';

const Services: React.FC = () => {
  const { content } = useContent();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define icons mapping (icons remain static in code, but text is dynamic)
  const icons = [
    <Users className="w-8 h-8" />,
    <Home className="w-8 h-8" />,
    <FileText className="w-8 h-8" />,
    <Shield className="w-8 h-8" />,
    <Scale className="w-8 h-8" />,
    <HeartHandshake className="w-8 h-8" />
  ];

  // Logic definitions for the form fields (these remain hardcoded logic linked by index)
  const servicesLogic = [
    {
      formFields: [
        {
          label: "Tipo de Ação Desejada",
          name: "actionType",
          type: "select",
          options: ["Divórcio", "Pensão Alimentícia", "Guarda de Filhos", "Reconhecimento de Paternidade", "Outros"]
        },
        {
          label: "A situação é consensual (amigável)?",
          name: "isConsensual",
          type: "select",
          options: ["Sim, estamos de acordo", "Não, há conflito", "Não sei informar"]
        },
        {
          label: "Breve Resumo da Situação",
          name: "summary",
          type: "textarea",
          placeholder: "Descreva brevemente o que está acontecendo..."
        }
      ]
    },
    {
      formFields: [
        {
          label: "Assunto Principal",
          name: "subject",
          type: "select",
          options: ["Usucapião (Regularização)", "Compra e Venda", "Aluguel/Despejo", "Problemas de Condomínio", "Outros"]
        },
        {
          label: "Tipo de Imóvel",
          name: "propertyType",
          type: "select",
          options: ["Residencial", "Comercial", "Terreno/Lote", "Rural"]
        },
        {
          label: "O imóvel possui documentação (escritura)?",
          name: "hasDocs",
          type: "select",
          options: ["Sim", "Não / Apenas Contrato de Gaveta", "Não sei"]
        }
      ]
    },
    {
      formFields: [
        {
          label: "Necessidade",
          name: "need",
          type: "select",
          options: ["Elaboração de novo contrato", "Revisão de contrato existente", "Quebra de contrato", "Execução (Cobrança)"]
        },
        {
          label: "Tipo de Contrato",
          name: "contractType",
          type: "text",
          placeholder: "Ex: Prestação de serviços, Empréstimo, Parceria..."
        },
        {
          label: "Valor aproximado envolvido (se houver)",
          name: "value",
          type: "text",
          placeholder: "R$"
        }
      ]
    },
    {
      formFields: [
        {
          label: "Tipo de Dano Sofrido",
          name: "damageType",
          type: "select",
          options: ["Dano Moral (Ofensa/Negativação)", "Dano Material (Prejuízo Financeiro)", "Erro Médico/Profissional", "Problema com Consumidor (Voo/Produto)"]
        },
        {
          label: "Quando o fato ocorreu?",
          name: "date",
          type: "text",
          placeholder: "Mês/Ano aproximado"
        },
        {
          label: "Relate o ocorrido",
          name: "story",
          type: "textarea",
          placeholder: "O que aconteceu?"
        }
      ]
    },
    {
      formFields: [
        {
          label: "Serviço Necessário",
          name: "serviceType",
          type: "select",
          options: ["Abertura de Inventário", "Testamento", "Planejamento Sucessório", "Sobrepartilha"]
        },
        {
          label: "Há acordo entre os herdeiros?",
          name: "agreement",
          type: "select",
          options: ["Sim", "Não", "Não se aplica"]
        },
        {
          label: "Quantidade aproximada de bens",
          name: "assets",
          type: "text",
          placeholder: "Ex: 1 casa e 1 carro"
        }
      ]
    },
    {
      formFields: [
        {
          label: "Natureza do Conflito",
          name: "conflictNature",
          type: "select",
          options: ["Familiar", "Vizinhos/Vizinhança", "Societário/Empresarial", "Cobrança de Dívida"]
        },
        {
          label: "Já houve tentativa de acordo?",
          name: "attempted",
          type: "select",
          options: ["Sim, sem sucesso", "Não", "O processo já está na justiça"]
        },
        {
          label: "Resumo do Conflito",
          name: "summary",
          type: "textarea",
          placeholder: "Descreva a disputa..."
        }
      ]
    }
  ];

  // Merge context data with logic
  const services = content.services.items.map((item, index) => ({
    ...item,
    icon: icons[index] || <Scale className="w-8 h-8" />,
    formFields: servicesLogic[index]?.formFields || []
  }));

  const handleOpenModal = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <EditableText 
              path="services.eyebrow"
              as="h4"
              className="text-amber-600 uppercase tracking-widest text-sm font-bold mb-3"
            />
            <EditableText 
              path="services.title"
              as="h2"
              className="text-4xl md:text-5xl serif-font text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 bg-white border border-transparent hover:border-amber-600 transition-all duration-300 group flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <EditableText 
                  path={`services.items.${index}.title`}
                  as="h3"
                  className="text-xl font-extrabold mb-4 serif-font text-neutral-900 group-hover:text-amber-600 transition-colors"
                />

                <div className="text-gray-700 leading-relaxed text-sm font-semibold mb-6 flex-grow">
                   <EditableText 
                     path={`services.items.${index}.description`}
                     multiline={true}
                   />
                </div>
                
                <button 
                  onClick={() => handleOpenModal(service)}
                  className="mt-auto flex items-center text-sm font-bold text-amber-600 hover:text-amber-800 transition-colors group-hover:translate-x-2 duration-300 uppercase tracking-wider"
                >
                  <span>Solicitar Atendimento</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Integration */}
      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService as ServiceItem} 
      />
    </>
  );
};

export default Services;
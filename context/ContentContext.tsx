import React, { createContext, useContext, useState, useEffect } from 'react';

// Default content structure mirroring the initial site state
const defaultContent = {
  header: {
    brandName: "MOURA",
    brandSubtitle: "ADVOCACIA"
  },
  hero: {
    eyebrow: "Excelência em Direito Civil",
    titleMain: "Defendendo seus Direitos",
    titleHighlight: "Integridade",
    description: "Atuação estratégica e personalizada para resolver seus conflitos jurídicos com a seriedade que seu caso exige.",
    buttonText: "Agendar Consulta",
    bgImage: "https://picsum.photos/id/1029/1920/1080"
  },
  about: {
    eyebrow: "Sobre o Advogado",
    title: "Moura Advocacia",
    p1: "Com anos de experiência e dedicação exclusiva ao Direito Civil, fundei o Moura Advocacia com um propósito claro: oferecer um atendimento humanizado e tecnicamente impecável.",
    p2: "Entendemos que por trás de cada processo existe uma história, uma família ou um patrimônio a ser protegido. Nossa missão é utilizar o melhor da técnica jurídica para garantir a tranquilidade e a justiça para nossos clientes.",
    stats1Value: "10+",
    stats1Label: "Anos de Experiência",
    stats2Value: "500+",
    stats2Label: "Casos Resolvidos",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  services: {
    eyebrow: "Áreas de Atuação",
    title: "Especialidades em Direito Civil",
    items: [
      { title: "Direito de Família", description: "Divórcios, pensão alimentícia, guarda de filhos e inventários. Tratamento sensível para momentos delicados." },
      { title: "Direito Imobiliário", description: "Assessoria em compra e venda, locações, usucapião e regularização de imóveis." },
      { title: "Contratos", description: "Elaboração, análise e revisão de contratos civis e comerciais para sua segurança jurídica." },
      { title: "Indenizações", description: "Ações de danos morais e materiais, responsabilidade civil e defesa do consumidor." },
      { title: "Sucessões", description: "Planejamento sucessório, testamentos e inventários judiciais e extrajudiciais." },
      { title: "Mediação de Conflitos", description: "Resolução extrajudicial de disputas de forma ágil e eficiente." }
    ]
  },
  contact: {
    eyebrow: "Entre em Contato",
    title: "Vamos analisar o seu caso?",
    description: "Preencha o formulário para ser direcionado ao nosso atendimento via WhatsApp. Garantimos sigilo absoluto sobre todas as informações compartilhadas.",
    feature1Title: "Atendimento Ágil",
    feature1Desc: "Resposta rápida para suas dúvidas urgentes.",
    feature2Title: "Análise Preliminar",
    feature2Desc: "Entendemos o contexto antes de propor soluções."
  }
};

type ContentState = typeof defaultContent;

interface ContentContextType {
  content: ContentState;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateContent: (path: string, value: any) => void;
  uploadImage: (path: string, file: File) => Promise<void>;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentState>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('site_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Merge with default to ensure structure exists if new fields are added later
        setContent({ ...defaultContent, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
    
    const savedAdmin = localStorage.getItem('is_admin');
    if (savedAdmin === 'true') setIsAdmin(true);
  }, []);

  // Save to LocalStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('site_content', JSON.stringify(content));
  }, [content]);

  const login = (password: string) => {
    if (password === '220611') {
      setIsAdmin(true);
      localStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.setItem('is_admin', 'false');
  };

  const updateContent = (path: string, value: any) => {
    setContent(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const uploadImage = async (path: string, file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
            updateContent(path, base64String);
            resolve();
        } catch (e) {
            reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const resetContent = () => {
    if (window.confirm("Tem certeza que deseja restaurar todo o conteúdo original?")) {
      setContent(defaultContent);
    }
  };

  return (
    <ContentContext.Provider value={{ content, isAdmin, login, logout, updateContent, uploadImage, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};

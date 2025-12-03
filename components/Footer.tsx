import React, { useState } from 'react';
import { Phone, Mail, MapPin, Scale, Lock, LogOut, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './Editable';

const Footer: React.FC = () => {
  const { login, logout, isAdmin, resetContent } = useContent();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminClick = () => {
    if (isAdmin) {
      // Direct logout to avoid browser blocking prompts
      logout();
    } else {
      setShowLogin(true);
      setPassword(''); // Clear password field when opening
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setShowLogin(false);
      setPassword('');
    } else {
      alert("Senha incorreta.");
    }
  };

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Scale className="text-amber-600 w-8 h-8" />
              <div className="serif-font text-2xl tracking-widest font-bold flex gap-2">
                <EditableText path="header.brandName" as="span" />
                <EditableText path="header.brandSubtitle" as="span" className="text-amber-600" />
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">
              Compromisso com a ética e a excelência jurídica. Defendendo seus interesses com a dedicação que você merece.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Menu</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-amber-600 transition-colors">Início</a></li>
              <li><a href="#about" className="hover:text-amber-600 transition-colors">Sobre</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Áreas de Atuação</a></li>
              <li><a href="#contact" className="hover:text-amber-600 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-600" />
                <span>(89) 99998-6716</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-600" />
                <span>contato@mouraadvocacia.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                <span>Centro Jurídico, Sala 101<br />Cidade, Estado - CEP 00000-000</span>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
             <h4 className="text-white font-bold uppercase tracking-wider mb-6">Atuação</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
               <li>Direito Civil</li>
               <li>Direito de Família</li>
               <li>Direito Imobiliário</li>
               <li>Contratos</li>
               <li>Sucessões</li>
             </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Moura Advocacia. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button 
                onClick={resetContent}
                className="text-red-500 hover:text-red-400 text-xs uppercase tracking-wider"
              >
                Restaurar Padrão
              </button>
            )}
            <button 
              onClick={handleAdminClick}
              className={`flex items-center gap-2 px-3 py-1 rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer ${isAdmin ? 'bg-amber-600 text-white hover:bg-amber-700' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {isAdmin ? <LogOut className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              {isAdmin ? 'Sair (ADM)' : 'ADM'}
            </button>
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white text-neutral-900 p-6 rounded shadow-xl w-full max-w-sm relative animate-fade-in-up">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-bold mb-4 serif-font text-neutral-800 border-b border-gray-200 pb-2">
              Acesso Administrativo
            </h3>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wider">Senha</label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 p-3 rounded focus:border-amber-600 focus:outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha..."
                  autoFocus
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-amber-600 text-white py-3 rounded font-bold hover:bg-amber-700 transition-colors uppercase tracking-wider text-sm shadow-md hover:shadow-lg"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
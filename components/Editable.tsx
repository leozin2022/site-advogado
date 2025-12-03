import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit2, Upload, Trash2 } from 'lucide-react';

interface EditableTextProps {
  path: string;
  className?: string;
  multiline?: boolean;
  as?: any;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  path, 
  className = '', 
  multiline = false, 
  as: Component = 'p',
  placeholder
}) => {
  const { content, isAdmin, updateContent } = useContent();

  // Helper to get nested value
  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const value = getValue(content, path);

  if (!isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  const baseInputStyles = "bg-amber-100/20 border border-amber-500/50 rounded px-1 w-full text-inherit font-inherit outline-none focus:ring-2 focus:ring-amber-500 transition-all";

  if (multiline) {
    return (
      <textarea
        className={`${className} ${baseInputStyles} resize-y min-h-[100px]`}
        value={value}
        onChange={(e) => updateContent(path, e.target.value)}
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      type="text"
      className={`${className} ${baseInputStyles}`}
      value={value}
      onChange={(e) => updateContent(path, e.target.value)}
      placeholder={placeholder}
    />
  );
};

interface EditableImageProps {
  path: string;
  className?: string;
  alt: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ path, className = '', alt }) => {
  const { content, isAdmin, uploadImage } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const src = getValue(content, path);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic size check (5MB limit for localstorage safety, though strings are larger)
      if (file.size > 3 * 1024 * 1024) {
        alert("A imagem é muito grande. Por favor, use uma imagem menor que 3MB para garantir que seja salva.");
        return;
      }
      await uploadImage(path, file);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {isAdmin && (
        <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity z-50">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-amber-600 text-white p-2 rounded shadow-lg hover:bg-amber-700 transition-colors flex items-center gap-2 px-4 cursor-pointer"
            title="Alterar Imagem"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Alterar Imagem</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

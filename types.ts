import React from 'react';

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormField {
  label: string;
  name: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[]; // For select inputs
  placeholder?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  formFields: FormField[];
}
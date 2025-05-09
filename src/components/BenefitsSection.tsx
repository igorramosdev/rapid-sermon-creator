
import React from 'react';
import { Check, Clock, BookOpen, Save } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-brand-blue-600" />,
      title: "Economize tempo",
      description: "Crie sermões completos e bem estruturados em minutos, não em horas ou dias."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-brand-blue-600" />,
      title: "Conteúdo bíblico sólido",
      description: "Todos os sermões são fundamentados nas Escrituras, com textos e referências bíblicas relevantes."
    },
    {
      icon: <Check className="h-6 w-6 text-brand-blue-600" />,
      title: "Personalizável",
      description: "Adapte facilmente o sermão ao seu estilo pessoal e às necessidades da sua congregação."
    },
    {
      icon: <Save className="h-6 w-6 text-brand-blue-600" />,
      title: "Biblioteca de sermões",
      description: "Acesse e reutilize seus sermões anteriores a qualquer momento."
    }
  ];

  return (
    <div className="bg-white section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            Benefícios que <span className="text-gradient">transformam</span> seu ministério
          </h2>
          <p className="text-gray-600 text-lg">
            Nossa plataforma foi desenvolvida para apoiar sua vocação, não para substituir sua voz única.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-blue-50 rounded-lg flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;

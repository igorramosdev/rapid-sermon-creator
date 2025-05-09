
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Informe seu tema",
      description: "Digite o tema do sermão, escolha uma passagem bíblica base e selecione a duração desejada."
    },
    {
      number: "02",
      title: "Gere o sermão",
      description: "Nossa plataforma cria um sermão biblicamente fundamentado e estruturado em segundos."
    },
    {
      number: "03",
      title: "Personalize",
      description: "Revise o conteúdo, faça ajustes para adequá-lo ao seu estilo e necessidades da sua congregação."
    },
    {
      number: "04",
      title: "Baixe ou copie",
      description: "Exporte seu sermão em PDF ou copie direto para suas anotações favoritas."
    }
  ];
  
  return (
    <div className="bg-gray-50 section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Obtenha sermões inspiradores em apenas alguns cliques, para que você possa focar no que realmente importa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
                <div className="text-5xl font-bold text-brand-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 7H38M38 7L32 1M38 7L32 13" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

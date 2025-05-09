
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "para sempre",
      description: "Perfeito para experimentar a plataforma",
      features: [
        "3 gerações de sermão por mês",
        "Exportação em formato de texto",
        "Acesso à biblioteca básica",
        "Suporte por email"
      ],
      buttonText: "Começar grátis",
      buttonLink: "/signup",
      highlighted: false
    },
    {
      name: "Pro",
      price: "R$ 19",
      period: "por mês",
      description: "Ideal para pastores e líderes regulares",
      features: [
        "Gerações ilimitadas de sermões",
        "Exportação em PDF e Word",
        "Biblioteca completa de temas",
        "Personalização avançada",
        "Suporte prioritário",
        "Acesso a novos recursos"
      ],
      buttonText: "Assinar agora",
      buttonLink: "/signup?plan=pro",
      highlighted: true
    }
  ];
  
  return (
    <div className="bg-white section" id="pricing">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            Planos <span className="text-gradient">acessíveis</span> para todos
          </h2>
          <p className="text-gray-600 text-lg">
            Escolha o plano que melhor se adapta às suas necessidades ministeriais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl border ${plan.highlighted ? 'border-brand-blue-200 shadow-lg' : 'border-gray-200'} bg-white p-8 relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-gold-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recomendado
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-1">/{plan.period}</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue-600 shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.highlighted ? 'bg-brand-blue-600 hover:bg-brand-blue-700' : ''}`}
                variant={plan.highlighted ? "default" : "outline"}
                asChild
              >
                <Link to={plan.buttonLink}>{plan.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Tem dúvidas sobre qual plano escolher? <Link to="/contact" className="text-brand-blue-600 hover:underline">Fale conosco</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

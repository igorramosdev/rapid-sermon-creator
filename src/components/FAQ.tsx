
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como os sermões são gerados?",
      answer: "Os sermões são gerados através de uma combinação de análise bíblica, conhecimento teológico e modelos estruturais de pregação. Nossa plataforma utiliza tecnologia avançada para criar sermões relevantes e biblicamente fundamentados com base nos parâmetros que você fornece."
    },
    {
      question: "Os sermões gerados são biblicamente sólidos?",
      answer: "Sim! Todos os sermões são criados com base nas Escrituras e são teologicamente sólidos. Cada sermão inclui referências bíblicas relevantes e é estruturado para comunicar verdades bíblicas de forma clara e eficaz."
    },
    {
      question: "Posso personalizar os sermões gerados?",
      answer: "Absolutamente! Os sermões gerados são apenas um ponto de partida. Você tem total liberdade para editar, adaptar e personalizar o conteúdo de acordo com seu estilo pessoal, contexto ministerial e necessidades específicas da sua congregação."
    },
    {
      question: "Quantos sermões posso gerar no plano gratuito?",
      answer: "No plano gratuito, você pode gerar até 3 sermões por mês. Para necessidades ministeriais mais frequentes, recomendamos nosso plano Pro, que oferece gerações ilimitadas de sermões."
    },
    {
      question: "Como faço para cancelar minha assinatura?",
      answer: "Você pode cancelar sua assinatura a qualquer momento através da seção 'Minha Conta' no seu painel de controle. O cancelamento será efetivado ao final do período atual pelo qual você já pagou."
    },
    {
      question: "O Sermão Rápido substitui meu tempo de estudo e oração?",
      answer: "Não. O Sermão Rápido foi criado para ser um auxiliar no seu ministério, não um substituto para seu tempo de comunhão com Deus, estudo bíblico e oração. A ferramenta ajuda a otimizar seu tempo e oferece uma estrutura sólida, mas a unção e o discernimento espiritual vêm do Espírito Santo."
    }
  ];
  
  return (
    <div className="bg-gray-50 section" id="faq">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Tire suas dúvidas sobre como o Sermão Rápido pode ajudar você em seu ministério.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

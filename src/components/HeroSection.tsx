
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // Verificar se intersectionObserver é suportado
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-scale-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));

      // Add animations to background elements
      const bgElements = document.querySelectorAll('.bg-element');
      bgElements.forEach(el => {
        el.classList.add('animate-fade-in');
      });

      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-50 to-white opacity-80"></div>
        {/* Elementos decorativos animados */}
        <div className="bg-element absolute top-20 left-10 w-20 h-20 bg-brand-blue-100 rounded-full opacity-40 animate-pulse"></div>
        <div className="bg-element absolute bottom-20 right-10 w-16 h-16 bg-brand-gold-100 rounded-full opacity-60 animate-pulse" style={{animationDelay: "1s"}}></div>
        <div className="bg-element absolute top-40 right-[20%] w-12 h-12 bg-brand-blue-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: "1.5s"}}></div>
        <div className="bg-element absolute bottom-40 left-[15%] w-24 h-24 bg-brand-gold-50 rounded-full opacity-20 animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="bg-element absolute top-[30%] left-[30%] w-8 h-8 bg-brand-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: "0.7s"}}></div>
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-blue-100 text-brand-blue-700 text-sm font-medium mb-6 hover-scale">
              Sermões inspirados pela Palavra
            </span>
            <h1 className="heading-xl mb-6 animate-on-scroll" ref={headingRef}>
              <span className="block">Crie sermões bíblicos</span>
              <span className="text-gradient animate-pulse">em minutos</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 animate-fade-in" style={{animationDelay: "0.3s"}}>
              Sermão Rápido é a plataforma que ajuda pastores, líderes e pregadores a criar sermões 
              biblicamente fundamentados de forma rápida, fácil e inspiradora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.5s"}}>
              <Button size="lg" className="bg-brand-blue-600 hover:bg-brand-blue-700 hover-scale transition-all transform" asChild>
                <Link to="/generate">Crie seu sermão agora</Link>
              </Button>
              <Button variant="outline" size="lg" className="hover-scale transition-all" asChild>
                <Link to="/plans">Ver planos</Link>
              </Button>
            </div>
            
            <div className="mt-10 flex items-center gap-6 animate-fade-in" style={{animationDelay: "0.7s"}}>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white text-xs animate-scale-in" style={{animationDelay: "0.5s"}}>SJ</div>
                <div className="w-8 h-8 rounded-full bg-brand-gold-500 flex items-center justify-center text-white text-xs animate-scale-in" style={{animationDelay: "0.6s"}}>MP</div>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs animate-scale-in" style={{animationDelay: "0.7s"}}>JR</div>
                <div className="w-8 h-8 rounded-full bg-brand-blue-300 flex items-center justify-center text-white text-xs animate-scale-in" style={{animationDelay: "0.8s"}}>+</div>
              </div>
              <p className="text-sm text-gray-600">
                Usado por <span className="font-medium">1,000+</span> líderes e pregadores
              </p>
            </div>
          </div>
          
          <div className="relative animate-fade-in hover-scale" style={{animationDelay: "0.5s"}}>
            <div className="bg-white shadow-xl rounded-xl border border-gray-100 p-6 transition-all hover:shadow-2xl transform transition duration-300 hover:translate-y-[-5px]">
              <div className="mb-4">
                <div className="flex gap-1 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-2"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-center mb-1 animate-fade-in" style={{animationDelay: "0.7s"}}>Fé que Move Montanhas</h4>
                  <p className="text-xs text-gray-500 text-center mb-3">Baseado em Mateus 17:20</p>
                  
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <p className="mb-2 animate-fade-in" style={{animationDelay: "0.8s"}}><strong>Introdução:</strong> A fé é um dos princípios mais poderosos nas escrituras.</p>
                    <p className="mb-2 animate-fade-in" style={{animationDelay: "0.9s"}}><strong>Ponto 1:</strong> O que é a fé segundo Hebreus 11:1</p>
                    <p className="mb-2 animate-fade-in" style={{animationDelay: "1.0s"}}><strong>Ponto 2:</strong> Por que Jesus comparou a fé a um grão de mostarda</p>
                    <p className="mb-2 animate-fade-in" style={{animationDelay: "1.1s"}}><strong>Ponto 3:</strong> Como aplicar essa fé em nossas vidas diárias</p>
                    <p className="animate-fade-in" style={{animationDelay: "1.2s"}}><strong>Conclusão:</strong> Chamado à ação para exercitar nossa fé</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-2 animate-fade-in" style={{animationDelay: "1.3s"}}>
                  <Button variant="outline" size="sm" className="hover-scale transition-all duration-200">Copiar</Button>
                  <Button size="sm" className="hover-scale transition-all duration-200">Gerar Completo</Button>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-brand-gold-100 rounded-full animate-pulse" style={{animationDelay: "1.5s"}}></div>
            <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-brand-blue-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

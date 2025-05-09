
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-50 to-white opacity-80"></div>
      </div>
      
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-blue-100 text-brand-blue-700 text-sm font-medium mb-6">
              Sermões inspirados pela Palavra
            </span>
            <h1 className="heading-xl mb-6">
              <span className="block">Crie sermões bíblicos</span>
              <span className="text-gradient">em minutos</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Sermão Rápido é a plataforma que ajuda pastores, líderes e pregadores a criar sermões biblicamente fundamentados de forma rápida, fácil e inspiradora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-blue-600 hover:bg-brand-blue-700" asChild>
                <Link to="/generate">Crie seu sermão agora</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/plans">Ver planos</Link>
              </Button>
            </div>
            
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white text-xs">SJ</div>
                <div className="w-8 h-8 rounded-full bg-brand-gold-500 flex items-center justify-center text-white text-xs">MP</div>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">JR</div>
                <div className="w-8 h-8 rounded-full bg-brand-blue-300 flex items-center justify-center text-white text-xs">+</div>
              </div>
              <p className="text-sm text-gray-600">
                Usado por <span className="font-medium">1,000+</span> líderes e pregadores
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white shadow-xl rounded-xl border border-gray-100 p-6">
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
                  <h4 className="text-lg font-semibold text-center mb-1">Fé que Move Montanhas</h4>
                  <p className="text-xs text-gray-500 text-center mb-3">Baseado em Mateus 17:20</p>
                  
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <p className="mb-2"><strong>Introdução:</strong> A fé é um dos princípios mais poderosos nas escrituras.</p>
                    <p className="mb-2"><strong>Ponto 1:</strong> O que é a fé segundo Hebreus 11:1</p>
                    <p className="mb-2"><strong>Ponto 2:</strong> Por que Jesus comparou a fé a um grão de mostarda</p>
                    <p className="mb-2"><strong>Ponto 3:</strong> Como aplicar essa fé em nossas vidas diárias</p>
                    <p><strong>Conclusão:</strong> Chamado à ação para exercitar nossa fé</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm">Copiar</Button>
                  <Button size="sm">Gerar Completo</Button>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-brand-gold-100 rounded-full"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-brand-blue-100 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

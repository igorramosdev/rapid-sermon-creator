
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorks from '@/components/HowItWorks';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <HowItWorks />
        <PricingSection />
        <FAQ />
        
        {/* CTA Section */}
        <div className="bg-brand-blue-600 text-white py-16">
          <div className="container-custom text-center">
            <h2 className="heading-lg mb-6">Pronto para transformar seu ministério?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pastores e líderes que estão economizando tempo e entregando sermões impactantes com o Sermão Rápido.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/generate" 
                className="px-6 py-3 bg-white text-brand-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Crie seu sermão agora
              </a>
              <a 
                href="/plans" 
                className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Ver planos
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

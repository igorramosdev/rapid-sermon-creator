
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

const Plans = () => {
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleSubscribe = (plan: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Faça login para assinar um plano.",
        variant: "destructive"
      });
      return;
    }

    // Aqui seria a integração com gateway de pagamento (Stripe/MercadoPago)
    toast({
      title: "Processando assinatura",
      description: `Redirecionando para pagamento do plano ${plan}...`
    });
  };

  const planFeatures = {
    free: [
      "3 gerações de sermões por mês",
      "Exportação em formato de texto",
      "Acesso à biblioteca básica",
      "Suporte por email"
    ],
    pro: [
      "Gerações ilimitadas de sermões",
      "Exportação em PDF e Word",
      "Biblioteca completa de temas",
      "Personalização avançada",
      "Suporte prioritário",
      "Acesso a novos recursos"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-4">
              Escolha o plano ideal para seu <span className="text-gradient">ministério</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Oferecemos opções flexíveis para atender às necessidades do seu chamado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Plano Gratuito */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 relative">
              <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-gray-500 ml-1">/mês</span>
              </div>
              <p className="text-gray-600 mb-6">Perfeito para experimentar a plataforma</p>
              
              <ul className="space-y-3 mb-8">
                {planFeatures.free.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue-600 shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to={isLoggedIn ? "/generate" : "/signup"}>
                  Começar grátis
                </Link>
              </Button>
            </div>

            {/* Plano Pro */}
            <div className="rounded-xl border border-brand-blue-200 bg-white p-8 relative shadow-lg">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-gold-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Recomendado
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">R$ 19</span>
                <span className="text-gray-500 ml-1">/mês</span>
              </div>
              <p className="text-gray-600 mb-6">Ideal para pastores e líderes regulares</p>
              
              <ul className="space-y-3 mb-8">
                {planFeatures.pro.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue-600 shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full bg-brand-blue-600 hover:bg-brand-blue-700"
                onClick={() => handleSubscribe('pro')}
              >
                Assinar agora
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Cancele a qualquer momento
              </p>
            </div>
          </div>

          {/* FAQ Resumido */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="heading-md text-center mb-8">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Posso mudar de plano depois?</h3>
                <p className="text-gray-600">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor no próximo ciclo de faturamento.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Como funciona o período de teste?</h3>
                <p className="text-gray-600">
                  O plano gratuito é permanente, sem necessidade de fornecer dados de cartão de crédito. Você pode usá-lo pelo tempo que quiser, respeitando o limite de 3 sermões por mês.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Como posso pagar?</h3>
                <p className="text-gray-600">
                  Aceitamos cartões de crédito, débito e boleto bancário. Processamos todos os pagamentos de forma segura através do Stripe.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">E se eu precisar de ajuda?</h3>
                <p className="text-gray-600">
                  Oferecemos suporte por email para todos os planos. Clientes do plano Pro têm acesso a suporte prioritário.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 p-10 bg-brand-blue-50 rounded-xl max-w-4xl mx-auto">
            <h2 className="heading-md mb-4">Ainda com dúvidas?</h2>
            <p className="text-gray-600 text-lg mb-6">
              Nossa equipe está pronta para ajudar e responder qualquer pergunta que você tenha.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/contact">Entre em contato</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Começar agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Plans;

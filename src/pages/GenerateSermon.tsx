
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SermonForm, { SermonFormData } from '@/components/SermonForm';
import SermonDisplay, { SermonData } from '@/components/SermonDisplay';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import SermonLoadingSkeleton from '@/components/SermonLoadingSkeleton';
import { AlertCircle } from "lucide-react";

const GenerateSermon = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSermon, setGeneratedSermon] = useState<SermonData | null>(null);
  const [remainingGenerations, setRemainingGenerations] = useState(5); // Aumentado para 5 usos gratuitos
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Verificar se o usuário está autenticado
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Se não estiver autenticado, redirecionar para página de login
    if (!loggedIn) {
      navigate('/login');
      toast({
        title: "Acesso restrito",
        description: "Faça login para acessar esta página.",
        variant: "destructive"
      });
    }
  }, [navigate, toast]);
  
  const handleGenerateSermon = async (formData: SermonFormData) => {
    if (remainingGenerations <= 0) {
      toast({
        title: "Limite de gerações atingido",
        description: "Você já utilizou todas as suas gerações gratuitas este mês. Considere fazer upgrade para o plano Pro.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setGeneratedSermon(null); // Clear any previous sermon
    setError(null); // Clear any previous errors
    
    try {
      console.log("Invoking edge function with data:", formData);
      
      // Chamar a edge function do Supabase para gerar o sermão
      const { data, error } = await supabase.functions.invoke('generate-sermon', {
        body: formData
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }
      
      console.log("Received sermon data:", data);
      
      if (!data || !data.title) {
        throw new Error('Dados do sermão inválidos ou incompletos');
      }
      
      setGeneratedSermon(data);
      setRemainingGenerations(prev => prev - 1);
      
      toast({
        title: "Sermão gerado com sucesso!",
        description: "Seu sermão foi criado e está pronto para uso."
      });
      
      // Salvar no histórico
      const sermonHistory = JSON.parse(localStorage.getItem('sermonHistory') || '[]');
      const newSermon = {
        id: Date.now().toString(),
        title: data.title,
        bibleReference: data.bibleReference,
        createdAt: new Date().toISOString()
      };
      sermonHistory.push(newSermon);
      localStorage.setItem('sermonHistory', JSON.stringify(sermonHistory));
      
    } catch (error) {
      console.error('Erro ao gerar sermão:', error);
      
      setError(error.message || 'Ocorreu um erro ao gerar o sermão');
      
      toast({
        title: "Erro ao gerar sermão",
        description: "Ocorreu um erro ao gerar o sermão. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isLoggedIn) {
    return null; // Evita renderização do conteúdo enquanto redireciona
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gradient-to-b from-brand-blue-50/50 to-white">
        <div className="container-custom">
          <div className="mb-8 animate-fade-in">
            <h1 className="heading-lg mb-2">Gerador de Sermão</h1>
            <p className="text-gray-600 text-lg">
              Preencha os campos abaixo para gerar um sermão personalizado.
            </p>
          </div>
          
          {/* Exibir limite de gerações para usuários gratuitos */}
          <Alert className="mb-6 border-brand-blue-200 bg-brand-blue-50 animate-fade-in">
            <AlertTitle className="flex items-center gap-2">
              <span className="text-brand-blue-600">Plano Gratuito</span>
            </AlertTitle>
            <AlertDescription>
              Você tem <span className="font-semibold text-brand-blue-600">{remainingGenerations} gerações</span> disponíveis este mês.
              Para gerações ilimitadas, <a href="/plans" className="text-brand-blue-600 hover:underline font-medium">faça upgrade para Pro</a>.
            </AlertDescription>
          </Alert>
          
          {error && (
            <Alert variant="destructive" className="mb-6 animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in">
              <SermonForm onGenerateSermon={handleGenerateSermon} isLoading={isLoading} />
            </div>
            
            <div className="animate-fade-in">
              {isLoading ? (
                <SermonLoadingSkeleton />
              ) : generatedSermon ? (
                <SermonDisplay sermon={generatedSermon} />
              ) : (
                <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col items-center justify-center h-full hover-scale">
                  <div className="w-16 h-16 bg-brand-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12H16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Nenhum sermão gerado</h3>
                  <p className="text-gray-500 text-center">
                    Preencha o formulário ao lado e clique em "Gerar Sermão" para criar seu sermão personalizado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GenerateSermon;

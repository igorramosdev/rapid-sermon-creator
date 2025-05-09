
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SermonForm, { SermonFormData } from '@/components/SermonForm';
import SermonDisplay, { SermonData } from '@/components/SermonDisplay';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Dados de exemplo para simulação
const sampleSermon: SermonData = {
  title: "A Fé que Move Montanhas",
  bibleReference: "Mateus 17:20",
  introduction: "Em Mateus 17:20, Jesus nos ensina uma lição poderosa sobre o poder da fé, mesmo quando parece pequena como um grão de mostarda. Neste sermão, exploraremos o que significa ter uma fé que pode mover montanhas em nossa vida espiritual.",
  points: [
    {
      title: "O Que é Fé Segundo a Bíblia",
      content: "Hebreus 11:1 define a fé como 'a certeza daquilo que esperamos e a prova das coisas que não vemos'. A fé não é apenas um sentimento, mas uma convicção profunda baseada na confiança em Deus e em Sua Palavra.",
      bibleReferences: ["Hebreus 11:1-3", "Romanos 10:17"]
    },
    {
      title: "Por Que Jesus Comparou a Fé a um Grão de Mostarda",
      content: "Jesus utilizou a metáfora do grão de mostarda para ilustrar que não é a quantidade de fé que importa, mas sua qualidade e autenticidade. O grão de mostarda é minúsculo, mas cresce e se torna uma árvore grande. Da mesma forma, mesmo uma pequena fé genuína pode produzir resultados extraordinários.",
      bibleReferences: ["Mateus 13:31-32", "Lucas 17:6"]
    },
    {
      title: "Como Desenvolver uma Fé Autêntica",
      content: "A fé autêntica é desenvolvida através da Palavra de Deus, da oração, da comunhão com outros crentes e das experiências de vida. Romanos 10:17 nos diz que 'a fé vem pelo ouvir, e o ouvir pela Palavra de Deus'. Quanto mais conhecemos a Deus e Sua Palavra, mais nossa fé se fortalece.",
      bibleReferences: ["Romanos 10:17", "Tiago 2:14-26", "1 Pedro 1:7"]
    }
  ],
  conclusion: "A fé que move montanhas não é necessariamente uma fé grande, mas uma fé genuína depositada no Deus grande que servimos. Não subestime o poder da fé, mesmo quando ela parece pequena como um grão de mostarda. Quando colocamos nossa confiança em Deus e agimos de acordo com Sua vontade, podemos ver transformações extraordinárias em nossas vidas e ministérios.",
  applicationQuestions: [
    "Como você tem exercitado sua fé nas situações difíceis da sua vida?",
    "Quais são as 'montanhas' em sua vida que precisam ser movidas pela fé?",
    "De que maneiras práticas você pode fortalecer sua fé diariamente?"
  ]
};

const GenerateSermon = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSermon, setGeneratedSermon] = useState<SermonData | null>(null);
  const [remainingGenerations, setRemainingGenerations] = useState(3);
  
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
  
  const handleGenerateSermon = (formData: SermonFormData) => {
    if (remainingGenerations <= 0) {
      toast({
        title: "Limite de gerações atingido",
        description: "Você já utilizou todas as suas gerações gratuitas este mês. Considere fazer upgrade para o plano Pro.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulando o processo de geração
    setTimeout(() => {
      // Usar dados de exemplo (em produção, isso seria substituído por uma chamada de API)
      setGeneratedSermon({
        ...sampleSermon,
        title: formData.theme,
        bibleReference: formData.biblePassage
      });
      
      setRemainingGenerations(prev => prev - 1);
      setIsLoading(false);
      
      toast({
        title: "Sermão gerado com sucesso!",
        description: "Seu sermão foi criado e está pronto para uso."
      });
      
      // Simular salvar no histórico
      const sermonHistory = JSON.parse(localStorage.getItem('sermonHistory') || '[]');
      const newSermon = {
        id: Date.now().toString(),
        title: formData.theme,
        bibleReference: formData.biblePassage,
        createdAt: new Date().toISOString()
      };
      sermonHistory.push(newSermon);
      localStorage.setItem('sermonHistory', JSON.stringify(sermonHistory));
      
    }, 2000);
  };
  
  if (!isLoggedIn) {
    return null; // Evita renderização do conteúdo enquanto redireciona
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Gerador de Sermão</h1>
            <p className="text-gray-600 text-lg">
              Preencha os campos abaixo para gerar um sermão personalizado.
            </p>
          </div>
          
          {/* Exibir limite de gerações para usuários gratuitos */}
          <Alert className="mb-6">
            <AlertTitle>Plano Gratuito</AlertTitle>
            <AlertDescription>
              Você tem <span className="font-semibold">{remainingGenerations} gerações</span> disponíveis este mês.
              Para gerações ilimitadas, <a href="/plans" className="text-brand-blue-600 hover:underline">faça upgrade para Pro</a>.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SermonForm onGenerateSermon={handleGenerateSermon} isLoading={isLoading} />
            </div>
            
            <div>
              {isLoading ? (
                <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue-600 mb-4"></div>
                  <p className="text-gray-600">Gerando sermão personalizado...</p>
                </div>
              ) : generatedSermon ? (
                <SermonDisplay sermon={generatedSermon} />
              ) : (
                <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col items-center justify-center h-full">
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

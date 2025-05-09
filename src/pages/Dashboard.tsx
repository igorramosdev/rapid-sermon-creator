
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface SermonHistoryItem {
  id: string;
  title: string;
  bibleReference: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sermonHistory, setSermonHistory] = useState<SermonHistoryItem[]>([]);
  const [userPlan, setUserPlan] = useState('free');
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
      return;
    }
    
    // Carregar histórico de sermões do localStorage (simulação)
    const savedHistory = localStorage.getItem('sermonHistory');
    if (savedHistory) {
      setSermonHistory(JSON.parse(savedHistory));
    }
  }, [navigate, toast]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: "2-digit", 
      month: "long", 
      year: "numeric"
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  const handleViewSermon = (id: string) => {
    // Em um caso real, isso buscaria o sermão completo
    // Por enquanto, apenas redirecionamos para uma página simulada
    navigate(`/sermon/${id}`);
  };
  
  const handleUpgrade = () => {
    navigate('/plans');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sermonHistory');
    toast({
      title: "Desconectado",
      description: "Você saiu da sua conta com sucesso."
    });
    navigate('/login');
  };
  
  if (!isLoggedIn) {
    return null; // Evita renderização do conteúdo enquanto redireciona
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <h1 className="heading-lg mb-8">Meu Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card do Plano */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Seu Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="text-2xl font-bold">
                    {userPlan === 'free' ? 'Gratuito' : 'Pro'}
                  </span>
                </div>
                {userPlan === 'free' ? (
                  <div className="text-sm text-gray-500">
                    <p className="mb-1">Você tem <span className="font-medium">{remainingGenerations}</span> gerações restantes neste mês.</p>
                    <p>Faça upgrade para gerações ilimitadas.</p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    <p className="mb-1">Gerações ilimitadas de sermões</p>
                    <p>Próxima cobrança: 15/06/2025</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {userPlan === 'free' ? (
                  <Button className="w-full" onClick={handleUpgrade}>Fazer upgrade</Button>
                ) : (
                  <Button variant="outline" className="w-full">Gerenciar assinatura</Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Card de Ações Rápidas */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button asChild>
                  <Link to="/generate">Gerar novo sermão</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/profile">Editar perfil</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Card de Estatísticas */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Suas Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total de sermões:</span>
                    <span className="font-medium">{sermonHistory.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Este mês:</span>
                    <span className="font-medium">{sermonHistory.filter(s => {
                      const date = new Date(s.createdAt);
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && 
                             date.getFullYear() === now.getFullYear();
                    }).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Membro desde:</span>
                    <span className="font-medium">Maio 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Histórico de Sermões */}
          <div className="mb-8">
            <h2 className="heading-md mb-4">Histórico de Sermões</h2>
            
            {sermonHistory.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Referência Bíblica</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sermonHistory.map((sermon) => (
                        <TableRow key={sermon.id}>
                          <TableCell className="font-medium">{sermon.title}</TableCell>
                          <TableCell>{sermon.bibleReference}</TableCell>
                          <TableCell>{formatDate(sermon.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleViewSermon(sermon.id)}>
                              Visualizar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500 mb-4">Você ainda não gerou nenhum sermão.</p>
                <Button asChild>
                  <Link to="/generate">Criar seu primeiro sermão</Link>
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" onClick={handleLogout}>
              Sair da conta
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

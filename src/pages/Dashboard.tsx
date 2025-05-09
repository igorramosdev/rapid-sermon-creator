
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
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  AlertCircle,
  BookOpen,
  Clock,
  LayoutDashboard,
  Settings,
  UserCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [isLoading, setIsLoading] = useState(true);
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
    
    const loadData = async () => {
      try {
        // Simular carregamento de dados com delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Carregar histórico de sermões do localStorage (simulação)
        const savedHistory = localStorage.getItem('sermonHistory');
        if (savedHistory) {
          setSermonHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar seus dados. Tente novamente mais tarde.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
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
      <main className="flex-grow py-12 bg-gradient-to-b from-brand-blue-50/50 to-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="heading-lg mb-4 md:mb-0">Meu Dashboard</h1>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Perfil
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Link>
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-32 mb-1" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Card do Plano */}
              <Card className="border-brand-blue-200 bg-gradient-to-br from-white to-brand-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-blue-600" />
                    Seu Plano
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="text-2xl font-bold">
                      {userPlan === 'free' ? 'Gratuito' : 'Pro'}
                    </span>
                    {userPlan === 'pro' && (
                      <Badge className="ml-2 bg-brand-gold-500">PRO</Badge>
                    )}
                  </div>
                  {userPlan === 'free' ? (
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">Você tem <span className="font-medium text-brand-blue-600">{remainingGenerations}</span> gerações restantes neste mês.</p>
                      <p>Faça upgrade para gerações ilimitadas.</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">Gerações ilimitadas de sermões</p>
                      <p>Próxima cobrança: 15/06/2025</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {userPlan === 'free' ? (
                    <Button className="w-full bg-brand-blue-600 hover:bg-brand-blue-700" onClick={handleUpgrade}>Fazer upgrade</Button>
                  ) : (
                    <Button variant="outline" className="w-full">Gerenciar assinatura</Button>
                  )}
                </CardFooter>
              </Card>
              
              {/* Card de Ações Rápidas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5 text-brand-blue-600" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button asChild className="bg-brand-blue-600 hover:bg-brand-blue-700">
                    <Link to="/generate">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Gerar novo sermão
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/profile">Editar perfil</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Card de Estatísticas */}
              <Card className="border-brand-blue-200 bg-gradient-to-br from-white to-brand-blue-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-brand-blue-600" />
                    Suas Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total de sermões:</span>
                      <span className="font-medium text-brand-blue-800">{sermonHistory.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Este mês:</span>
                      <span className="font-medium text-brand-blue-800">{sermonHistory.filter(s => {
                        const date = new Date(s.createdAt);
                        const now = new Date();
                        return date.getMonth() === now.getMonth() && 
                               date.getFullYear() === now.getFullYear();
                      }).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Membro desde:</span>
                      <span className="font-medium text-brand-blue-800">Maio 2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Histórico de Sermões */}
          <div className="mb-8">
            <h2 className="heading-md mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-brand-blue-600" />
              Histórico de Sermões
            </h2>
            
            {isLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : sermonHistory.length > 0 ? (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-brand-blue-50">
                      <TableRow>
                        <TableHead className="font-semibold">Título</TableHead>
                        <TableHead className="font-semibold">Referência Bíblica</TableHead>
                        <TableHead className="font-semibold">Data</TableHead>
                        <TableHead className="text-right font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sermonHistory.map((sermon) => (
                        <TableRow key={sermon.id} className="hover:bg-brand-blue-50/50">
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
              <div className="text-center p-8 border border-dashed rounded-lg bg-white">
                <BookOpen className="h-12 w-12 text-brand-blue-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Você ainda não gerou nenhum sermão.</p>
                <Button asChild className="bg-brand-blue-600 hover:bg-brand-blue-700">
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

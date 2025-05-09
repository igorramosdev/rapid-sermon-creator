
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Verificar se o usuário já está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulando uma autenticação (será substituído por Firebase/Supabase)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação bem-sucedida (deve ser substituída pela autenticação real)
      toast({
        title: "Login realizado com sucesso",
        description: "Redirecionando para o dashboard..."
      });
      
      // Armazenar estado de login (temporário - deve ser substituído)
      localStorage.setItem('isLoggedIn', 'true');
      
      // Disparar evento para atualizar o navbar
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Erro no login:", error);
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gradient-to-b from-brand-blue-50/30 to-white">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-gray-600 mt-2">Entre na sua conta para acessar seus sermões</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="transition-all focus:border-brand-blue-400 focus:ring-brand-blue-300"
              />
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link to="/recover-password" className="text-sm text-brand-blue-600 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="transition-all focus:border-brand-blue-400 focus:ring-brand-blue-300"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 transition-all transform hover:-translate-y-1 animate-fade-in"
              style={{animationDelay: "0.3s"}}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </span>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-brand-blue-600 hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

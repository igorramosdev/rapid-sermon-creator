
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "Por favor, verifique se as senhas digitadas são iguais.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulando um cadastro (será substituído por Firebase/Supabase)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação bem-sucedida (deve ser substituída pelo cadastro real)
      toast({
        title: "Conta criada com sucesso",
        description: "Redirecionando para o dashboard..."
      });
      
      // Armazenar estado de login (temporário - deve ser substituído)
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-gray-600 mt-2">Comece a criar sermões inspiradores hoje mesmo</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
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
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              Ao se registrar, você concorda com os nossos{" "}
              <Link to="/terms" className="text-brand-blue-600 hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link to="/privacy" className="text-brand-blue-600 hover:underline">
                Política de Privacidade
              </Link>.
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-blue-600 hover:bg-brand-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-brand-blue-600 hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;

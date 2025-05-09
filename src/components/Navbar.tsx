
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, User, Menu, X, Settings, LogOut, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar o estado de login ao carregar o componente e quando a rota muda
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    
    // Verificar no carregamento inicial e quando a rota muda
    checkLoginStatus();
    
    // Criar um evento personalizado para atualizar o navbar quando o status de login mudar
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sermonHistory');
    setIsLoggedIn(false);
    
    // Disparar evento para outros componentes saberem da mudança
    window.dispatchEvent(new Event('loginStatusChanged'));
    
    navigate('/');

    // Mostrar toast de logout (implementar)
    // toast({
    //   title: "Logout realizado",
    //   description: "Você saiu da sua conta com sucesso."
    // });
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover-scale">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-brand-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">SR</span>
            </div>
            <span className="ml-2 font-semibold text-xl text-brand-blue-600">Sermão Rápido</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link story-link">Home</Link>
          <Link to="/plans" className="nav-link story-link">Planos</Link>
          <Link to="/about" className="nav-link story-link">Sobre</Link>
          <Link to="/contact" className="nav-link story-link">Contato</Link>
          {isLoggedIn ? (
            <div className="flex gap-2">
              <Button variant="outline" asChild className="animate-fade-in">
                <Link to="/dashboard">
                  <User className="mr-1 h-4 w-4" />
                  Minha Conta
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 animate-fade-in">
                <LogOut className="mr-1 h-4 w-4" />
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 animate-fade-in">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Registrar</Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Navigation Icon */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 z-50 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link to="/" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <Home size={18} />
                <span>Home</span>
              </div>
            </Link>
            <Link to="/plans" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <Settings size={18} />
                <span>Planos</span>
              </div>
            </Link>
            <Link to="/about" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <span>Sobre</span>
              </div>
            </Link>
            <Link to="/contact" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <span>Contato</span>
              </div>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/generate" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} />
                    <span>Gerar Sermão</span>
                  </div>
                </Link>
                <Link to="/dashboard" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>Minha Conta</span>
                  </div>
                </Link>
                <hr className="my-2" />
                <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Registrar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

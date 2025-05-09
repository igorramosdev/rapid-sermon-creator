
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, User, Menu, X, Settings } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-brand-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">SR</span>
            </div>
            <span className="ml-2 font-semibold text-xl text-brand-blue-600">Sermão Rápido</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/plans" className="nav-link">Planos</Link>
          <Link to="/about" className="nav-link">Sobre</Link>
          <Link to="/contact" className="nav-link">Contato</Link>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Registrar</Link>
            </Button>
          </div>
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
            <hr className="my-2" />
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Registrar</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

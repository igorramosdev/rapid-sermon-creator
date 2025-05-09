
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SermonFormProps {
  onGenerateSermon: (formData: SermonFormData) => void;
  isLoading: boolean;
}

export interface SermonFormData {
  theme: string;
  biblePassage: string;
  sermonType: string;
  duration: string;
  additionalNotes: string;
}

const SermonForm: React.FC<SermonFormProps> = ({ onGenerateSermon, isLoading }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SermonFormData>({
    theme: '',
    biblePassage: '',
    sermonType: 'expository',
    duration: '20',
    additionalNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.theme.trim() || !formData.biblePassage.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o tema e a passagem bíblica.",
        variant: "destructive"
      });
      return;
    }
    
    onGenerateSermon(formData);
  };

  return (
    <Card className="overflow-hidden border-brand-blue-200">
      <div className="bg-brand-blue-600 text-white py-3 px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <h3 className="font-semibold">Configuração do Sermão</h3>
        </div>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
              Tema do Sermão*
            </label>
            <Input
              id="theme"
              name="theme"
              placeholder="Ex: A importância da fé em tempos difíceis"
              value={formData.theme}
              onChange={handleChange}
              className="border-gray-300 focus:border-brand-blue-300 focus:ring focus:ring-brand-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="biblePassage" className="block text-sm font-medium text-gray-700 mb-1">
              Passagem Bíblica Base*
            </label>
            <Input
              id="biblePassage"
              name="biblePassage"
              placeholder="Ex: Hebreus 11:1-6"
              value={formData.biblePassage}
              onChange={handleChange}
              className="border-gray-300 focus:border-brand-blue-300 focus:ring focus:ring-brand-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="sermonType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Sermão
              </label>
              <Select
                value={formData.sermonType}
                onValueChange={(value) => handleSelectChange('sermonType', value)}
              >
                <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue-300 focus:ring focus:ring-brand-blue-200 focus:ring-opacity-50">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expository">Expositivo</SelectItem>
                  <SelectItem value="thematic">Temático</SelectItem>
                  <SelectItem value="textual">Textual</SelectItem>
                  <SelectItem value="topical">Tópico</SelectItem>
                  <SelectItem value="narrative">Narrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duração Estimada (minutos)
              </label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleSelectChange('duration', value)}
              >
                <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue-300 focus:ring focus:ring-brand-blue-200 focus:ring-opacity-50">
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="20">20 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="45">45 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas Adicionais (opcional)
            </label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Adicione instruções específicas, pontos que deseja incluir, ou qualquer outra informação relevante..."
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              className="border-gray-300 focus:border-brand-blue-300 focus:ring focus:ring-brand-blue-200 focus:ring-opacity-50"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando sermão...
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Gerar Sermão
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SermonForm;

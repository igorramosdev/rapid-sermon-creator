
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy, BookOpen, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface SermonData {
  title: string;
  bibleReference: string;
  introduction: string;
  points: {
    title: string;
    content: string;
    bibleReferences: string[];
  }[];
  conclusion: string;
  applicationQuestions: string[];
}

interface SermonDisplayProps {
  sermon: SermonData;
}

const SermonDisplay: React.FC<SermonDisplayProps> = ({ sermon }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    // Create a formatted text version of the sermon
    let sermonText = `# ${sermon.title}\n\n`;
    sermonText += `Referência Bíblica: ${sermon.bibleReference}\n\n`;
    sermonText += `## Introdução\n${sermon.introduction}\n\n`;
    
    sermon.points.forEach((point, index) => {
      sermonText += `## ${index + 1}. ${point.title}\n${point.content}\n`;
      if (point.bibleReferences.length > 0) {
        sermonText += `Referências: ${point.bibleReferences.join(', ')}\n\n`;
      }
    });
    
    sermonText += `## Conclusão\n${sermon.conclusion}\n\n`;
    
    if (sermon.applicationQuestions.length > 0) {
      sermonText += `## Perguntas para Aplicação\n`;
      sermon.applicationQuestions.forEach((q, i) => {
        sermonText += `${i + 1}. ${q}\n`;
      });
    }
    
    navigator.clipboard.writeText(sermonText).then(() => {
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "O sermão foi copiado para a área de transferência."
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(() => {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o sermão.",
        variant: "destructive"
      });
    });
  };
  
  const handleDownload = () => {
    // Create a formatted HTML version of the sermon
    let sermonHtml = `
      <html>
        <head>
          <title>${sermon.title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #1E40AF; }
            h2 { color: #3B82F6; margin-top: 20px; }
            .reference { font-style: italic; color: #4B5563; }
            .point { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${sermon.title}</h1>
          <p class="reference">Referência Bíblica: ${sermon.bibleReference}</p>
          
          <h2>Introdução</h2>
          <p>${sermon.introduction}</p>
          
    `;
    
    sermon.points.forEach((point, index) => {
      sermonHtml += `
        <div class="point">
          <h2>${index + 1}. ${point.title}</h2>
          <p>${point.content}</p>
      `;
      
      if (point.bibleReferences.length > 0) {
        sermonHtml += `<p class="reference">Referências: ${point.bibleReferences.join(', ')}</p>`;
      }
      
      sermonHtml += `</div>`;
    });
    
    sermonHtml += `
          <h2>Conclusão</h2>
          <p>${sermon.conclusion}</p>
    `;
    
    if (sermon.applicationQuestions.length > 0) {
      sermonHtml += `<h2>Perguntas para Aplicação</h2><ol>`;
      sermon.applicationQuestions.forEach(q => {
        sermonHtml += `<li>${q}</li>`;
      });
      sermonHtml += `</ol>`;
    }
    
    sermonHtml += `
        </body>
      </html>
    `;
    
    // Create blob and download link
    const blob = new Blob([sermonHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sermon.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "O sermão está sendo baixado como documento HTML."
    });
  };
  
  return (
    <Card className="overflow-hidden border-brand-blue-200">
      <div className="bg-brand-blue-600 text-white py-3 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-semibold">Sermão Gerado</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy} className="text-white hover:bg-brand-blue-700">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-brand-blue-700">
              <Download className="h-4 w-4 mr-1" />
              Baixar
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{sermon.title}</h2>
          <div className="flex items-center">
            <p className="text-gray-600">Referência: {sermon.bibleReference}</p>
            <Badge variant="outline" className="ml-2 border-brand-blue-200 text-brand-blue-700">
              {sermon.points.length} pontos
            </Badge>
          </div>
        </div>
        
        <div className="space-y-6 divide-y">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-brand-blue-800 mb-2">Introdução</h3>
            <p className="text-gray-700">{sermon.introduction}</p>
          </div>
          
          {sermon.points.map((point, index) => (
            <div key={index} className="py-4">
              <h3 className="text-lg font-semibold text-brand-blue-800 mb-2">
                {index + 1}. {point.title}
              </h3>
              <p className="text-gray-700 mb-2">{point.content}</p>
              {point.bibleReferences.length > 0 && (
                <p className="text-sm text-gray-500 italic">
                  Referências: {point.bibleReferences.join(', ')}
                </p>
              )}
            </div>
          ))}
          
          <div className="py-4">
            <h3 className="text-lg font-semibold text-brand-blue-800 mb-2">Conclusão</h3>
            <p className="text-gray-700">{sermon.conclusion}</p>
          </div>
          
          {sermon.applicationQuestions.length > 0 && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-brand-blue-800 mb-2">Perguntas para Aplicação</h3>
              <ul className="list-disc pl-5 space-y-2">
                {sermon.applicationQuestions.map((question, index) => (
                  <li key={index} className="text-gray-700">{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SermonDisplay;

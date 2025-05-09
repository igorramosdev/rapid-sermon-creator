
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy } from "lucide-react";

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
      toast({
        title: "Copiado!",
        description: "O sermão foi copiado para a área de transferência."
      });
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
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{sermon.title}</h2>
          <p className="text-gray-600">Referência: {sermon.bibleReference}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Baixar
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Introdução</h3>
          <p className="text-gray-700">{sermon.introduction}</p>
        </div>
        
        {sermon.points.map((point, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {index + 1}. {point.title}
            </h3>
            <p className="text-gray-700 mb-2">{point.content}</p>
            {point.bibleReferences.length > 0 && (
              <p className="text-sm text-gray-500">
                Referências: {point.bibleReferences.join(', ')}
              </p>
            )}
          </div>
        ))}
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Conclusão</h3>
          <p className="text-gray-700">{sermon.conclusion}</p>
        </div>
        
        {sermon.applicationQuestions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Perguntas para Aplicação</h3>
            <ul className="list-disc pl-5 space-y-1">
              {sermon.applicationQuestions.map((question, index) => (
                <li key={index} className="text-gray-700">{question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SermonDisplay;

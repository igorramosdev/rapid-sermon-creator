
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Get the Gemini API key from environment variables
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { theme, biblePassage, sermonType, duration, additionalNotes } = await req.json();
    
    // Create prompt for Gemini
    const prompt = createSermonPrompt(theme, biblePassage, sermonType, duration, additionalNotes);
    
    console.log("Calling Gemini API with prompt:", prompt);
    
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }
    
    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || 'Falha ao gerar sermão com a API Gemini');
    }

    // Parse and structure the sermon from Gemini's response
    const sermonText = data.candidates[0].content.parts[0].text;
    const structuredSermon = parseSermonResponse(sermonText, theme, biblePassage);

    return new Response(JSON.stringify(structuredSermon), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Erro na função generate-sermon:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to create a detailed prompt for sermon generation
function createSermonPrompt(theme, biblePassage, sermonType, duration, additionalNotes) {
  return `Crie um sermão cristão completo com o tema: "${theme}" baseado na passagem bíblica: "${biblePassage}".
  
  O sermão deve ser do tipo ${sermonType} e ter duração aproximada de ${duration} minutos.
  
  Instruções adicionais: ${additionalNotes || 'Nenhuma'}
  
  O sermão deve incluir:
  - Um título impactante relacionado ao tema
  - Uma introdução que contextualize a passagem bíblica e capture a atenção
  - 3-5 pontos principais com explicações bíblicas, ilustrações e aplicações práticas
  - Para cada ponto, inclua referências bíblicas adicionais que apoiem o ensino
  - Uma conclusão que sintetize a mensagem e faça um apelo à ação
  - 3-5 perguntas para reflexão/aplicação
  
  O conteúdo deve ser teologicamente sólido, pastoralmente sensível, e relevante para o público cristão contemporâneo brasileiro.
  
  Estruture a resposta claramente com seções distintas para título, introdução, pontos principais (com subtítulos), conclusão e perguntas para aplicação.`;
}

// Helper function to parse and structure the AI response into a sermon object
function parseSermonResponse(sermonText, theme, bibleReference) {
  // Simple parsing - in a real implementation, this would be more robust
  // to handle variations in AI output formatting
  
  let title = theme;
  let introduction = "";
  let points = [];
  let conclusion = "";
  let applicationQuestions = [];
  
  // Extract title (if present in the first few lines)
  const lines = sermonText.split('\n');
  const firstLine = lines[0]?.trim();
  if (firstLine && !firstLine.toLowerCase().includes('introdução')) {
    title = firstLine.replace(/^#\s*/, '').replace(/^título:\s*/i, '');
  }
  
  // Very basic parsing - this could be improved with more pattern matching
  let currentSection = "intro";
  let currentPoint = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Skip the title line we already processed
    if (trimmedLine === title) continue;
    
    // Check for section headers
    if (/^(?:#\s*)?introdução/i.test(trimmedLine)) {
      currentSection = "intro";
      continue;
    } else if (/^(?:#\s*)?conclusão/i.test(trimmedLine)) {
      currentSection = "conclusion";
      continue;
    } else if (/^(?:#\s*)?perguntas|^(?:#\s*)?aplicação/i.test(trimmedLine)) {
      currentSection = "questions";
      continue;
    } else if (/^(?:#\s*)?\d+\.\s/.test(trimmedLine) || /^(?:#\s*)?ponto\s*\d+/i.test(trimmedLine)) {
      // Point title
      currentSection = "points";
      if (currentPoint) {
        points.push(currentPoint);
      }
      
      currentPoint = {
        title: trimmedLine.replace(/^(?:#\s*)?\d+\.\s/, '').replace(/^(?:#\s*)?ponto\s*\d+[:.]\s*/i, ''),
        content: "",
        bibleReferences: []
      };
      continue;
    } else if (currentSection === "points" && /referências|referencia|passagens/i.test(trimmedLine)) {
      // References for current point
      const refs = trimmedLine
        .replace(/^referências[^:]*:\s*/i, '')
        .split(/[,;]/)
        .map(ref => ref.trim())
        .filter(ref => ref.length > 0);
        
      if (refs.length > 0 && currentPoint) {
        currentPoint.bibleReferences = refs;
      }
      continue;
    }
    
    // Add content to the appropriate section
    if (currentSection === "intro") {
      introduction += (introduction ? " " : "") + trimmedLine;
    } else if (currentSection === "conclusion") {
      conclusion += (conclusion ? " " : "") + trimmedLine;
    } else if (currentSection === "points" && currentPoint) {
      currentPoint.content += (currentPoint.content ? " " : "") + trimmedLine;
    } else if (currentSection === "questions") {
      // Check if it's a numbered question
      if (/^\d+[\.\)]/.test(trimmedLine)) {
        applicationQuestions.push(trimmedLine.replace(/^\d+[\.\)]\s*/, ''));
      } else if (trimmedLine.startsWith('- ')) {
        applicationQuestions.push(trimmedLine.substring(2));
      } else if (applicationQuestions.length > 0) {
        // Continuation of previous question
        applicationQuestions[applicationQuestions.length - 1] += " " + trimmedLine;
      } else {
        // First question without numbering or bullet
        applicationQuestions.push(trimmedLine);
      }
    }
  }
  
  // Add the last point if we were processing one
  if (currentPoint && currentSection === "points") {
    points.push(currentPoint);
  }
  
  return {
    title,
    bibleReference: bibleReference || "",
    introduction,
    points,
    conclusion,
    applicationQuestions
  };
}

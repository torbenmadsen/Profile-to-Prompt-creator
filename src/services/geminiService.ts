import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAmAcgknJdWRPUrAk1IMYql2bF-h_YmeQw');

const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.8,
    maxOutputTokens: 1000,
  }
});

export async function enhanceProfileAnalysis(traits: string[], summary: string): Promise<{
  enhancedTraits: string[];
  enhancedSummary: string;
}> {
  const prompt = `
Analyser og forbedre denne personlighedsprofil.

INPUT:
Træk: ${traits.join(', ')}
Sammenfatning: ${summary}

INSTRUKTIONER:
- Fjern overlappende træk
- Løs modstridende karakteristika
- Tilføj relevante træk for LLM-interaktion
- Gør sammenfatningen mere handlingsorienteret
- Behold dansk sprog

FORMAT DIT SVAR PRÆCIST SÅDAN (med krøllede parenteser):
{
  "enhancedTraits": ["træk1", "træk2"],
  "enhancedSummary": "forbedret beskrivelse"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Remove any markdown formatting that might wrap the JSON
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const parsed = JSON.parse(cleanText);
      
      // Validate the response structure
      if (!parsed.enhancedTraits || !parsed.enhancedSummary) {
        throw new Error('Invalid response structure');
      }
      
      return {
        enhancedTraits: parsed.enhancedTraits,
        enhancedSummary: parsed.enhancedSummary
      };
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      // Fallback to original values
      return {
        enhancedTraits: traits,
        enhancedSummary: summary
      };
    }
  } catch (error) {
    console.error('Failed to enhance profile:', error);
    // Fallback to original values
    return {
      enhancedTraits: traits,
      enhancedSummary: summary
    };
  }
}

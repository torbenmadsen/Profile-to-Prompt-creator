import { Profile, ProfileResult } from '../types/types';
import { enhanceProfileAnalysis } from '../services/geminiService';

export async function analyzeProfile(answers: string[]): Promise<Profile> {
  const counts = {
    D: 0,
    I: 0,
    S: 0,
    C: 0
  };

  answers.forEach(type => {
    counts[type as keyof typeof counts]++;
  });

  const total = answers.length;
  
  return {
    dominance: (counts.D / total) * 100,
    influence: (counts.I / total) * 100,
    steadiness: (counts.S / total) * 100,
    compliance: (counts.C / total) * 100,
    traits: generateTraits(counts)
  };
}

function generateTraits(counts: Record<string, number>): string[] {
  const traits: string[] = [];
  const highest = Math.max(...Object.values(counts));
  
  Object.entries(counts).forEach(([type, count]) => {
    if (count === highest) {
      switch (type) {
        case 'D':
          traits.push('Resultatorienteret', 'Direkte', 'Beslutsom');
          break;
        case 'I':
          traits.push('Entusiastisk', 'Samarbejdende', 'Optimistisk');
          break;
        case 'S':
          traits.push('Støttende', 'Tålmodig', 'Pålidelig');
          break;
        case 'C':
          traits.push('Analytisk', 'Præcis', 'Systematisk');
          break;
      }
    }
  });
  
  return traits;
}

export async function generatePromptAdjustment(
  profile: Profile,
  optimize: boolean = false
): Promise<ProfileResult> {
  const dominantStyle = Object.entries({
    D: profile.dominance,
    I: profile.influence,
    S: profile.steadiness,
    C: profile.compliance
  }).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  const summary = getSummary(dominantStyle);
  
  if (!optimize) return { summary, traits: profile.traits, promptAdjustment: `Adjust your responses for someone who is ${profile.traits.join(', ')}, ${summary}` };
  const enhanced = await enhanceProfileAnalysis(profile.traits, summary);
  
  return {
    summary: enhanced.enhancedSummary,
    traits: enhanced.enhancedTraits,
    promptAdjustment: `Adjust your responses for someone who is ${enhanced.enhancedTraits.join(', ')}, ${enhanced.enhancedSummary}`
  };
}

function getSummary(style: string): string {
  switch (style) {
    case 'D':
      return "foretrækker direkte kommunikation og hurtige resultater";
    case 'I':
      return "nyder interaktive diskussioner og kreative tilgange";
    case 'S':
      return "værdsætter stabilitet og samarbejdende problemløsning";
    case 'C':
      return "sætter pris på detaljerede forklaringer og logiske tilgange";
    default:
      return "";
  }
}

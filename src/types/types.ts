export interface Question {
  id: number;
  text: string;
  options: {
    type: 'D' | 'I' | 'S' | 'C';
    text: string;
  }[];
}

export interface Profile {
  dominance: number;
  influence: number;
  steadiness: number;
  compliance: number;
  traits: string[];
}

export interface ProfileResult {
  summary: string;
  traits: string[];
  promptAdjustment: string;
}

import { Question } from '../types/types';

export const questions: Question[] = [
  {
    id: 1,
    text: "I en gruppe plejer jeg at:",
    options: [
      { type: 'D', text: "Tage styringen og træffe hurtige beslutninger" },
      { type: 'I', text: "Engagere andre og holde energien høj" },
      { type: 'S', text: "Lytte omhyggeligt og støtte andre" },
      { type: 'C', text: "Analysere situationen før jeg handler" }
    ]
  },
  {
    id: 2,
    text: "Når jeg står over for en udfordring, foretrækker jeg at:",
    options: [
      { type: 'D', text: "Handle med det samme for at løse det" },
      { type: 'I', text: "Diskutere det med andre for at finde kreative løsninger" },
      { type: 'S', text: "Arbejde stabilt og metodisk gennem det" },
      { type: 'C', text: "Undersøge grundigt før jeg går videre" }
    ]
  },
  {
    id: 3,
    text: "Mit ideelle arbejdsmiljø er:",
    options: [
      { type: 'D', text: "Hurtigt tempo med klare mål" },
      { type: 'I', text: "Samarbejdende og socialt" },
      { type: 'S', text: "Stabilt og harmonisk" },
      { type: 'C', text: "Struktureret og detaljeorienteret" }
    ]
  },
  {
    id: 4,
    text: "Når jeg kommunikerer, plejer jeg at:",
    options: [
      { type: 'D', text: "Gå direkte til sagen" },
      { type: 'I', text: "Dele historier og oplevelser" },
      { type: 'S', text: "Lytte mere end jeg taler" },
      { type: 'C', text: "Fokusere på præcision og detaljer" }
    ]
  },
  {
    id: 5,
    text: "Under pres har jeg tendens til at:",
    options: [
      { type: 'D', text: "Tage kontrollen og skubbe fremad" },
      { type: 'I', text: "Forblive optimistisk og improvisere" },
      { type: 'S', text: "Forblive rolig og støttende" },
      { type: 'C', text: "Fokusere på at gøre tingene rigtigt" }
    ]
  }
];

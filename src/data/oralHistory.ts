import { OralHistoryRecord } from '../types';

export const ORAL_HISTORIES_DATA: OralHistoryRecord[] = [
  {
    id: 'ORAL-001',
    narratorName: 'Mohammad Rashid (Retd. Underground Incline Sirdar)',
    roleOrBackground: 'Former adit supervisor with 34 years of service at Metka Coal Mine (1972-2006)',
    interviewDate: '2023-04-12',
    location: 'Metka Village, Kalakote',
    thematicCategory: 'Mining Operations',
    summary: 'Reflections on the manual adit driving methods, wooden prop roof timbering, and coal dust conditions in the 1970s and 1980s.',
    excerpt: 'We entered the hillside through wet inclines with carbide headlamps. The coal here wasn’t like the hard rock of Bengal; it was brittle and broke into black powder in your hands. When the adit hit water pockets during the July rains, we had to haul diesel pumps down the incline. But those mines gave our families food, built our houses, and put our children through school.',
    consentObtained: true,
    verificationNotes: 'Oral testimony reflecting personal memory and working-class conditions; corroborated by DGMS reports regarding timber props and water seepage.',
    relatedEventIds: ['EVT-005', 'EVT-014']
  },
  {
    id: 'ORAL-002',
    narratorName: 'Des Raj Sharma (Retd. Junior Electrical Overseer)',
    roleOrBackground: 'Former shift technician at Kalakote Thermal Power Station (1969-1988)',
    interviewDate: '2022-11-18',
    location: 'Sair, Kalakote',
    thematicCategory: 'Thermal Power Plant Life',
    summary: 'Eye-witness account of the Czech Skoda turbine installations, trial synchronization, and the chronic clinker problems.',
    excerpt: 'When the Skoda engineers from Czechoslovakia came in the late sixties, Kalakote felt like the capital of the future. The sirens would sound across the valley at 8:00 AM, 4:00 PM, and midnight. But our coal had too much stone and sand in it. The pulverizer mills would wear down in weeks, and the boiler tubes formed thick clinker crusts that had to be hammered off by hand. When the plant stopped humming in 1987, the silence over Sair felt like a funeral.',
    consentObtained: true,
    verificationNotes: 'Personal eyewitness account; accurately aligns with technical reasons documented in J&K Assembly Debates regarding Skoda turbines and high-ash clinkering.',
    relatedEventIds: ['EVT-006', 'EVT-008', 'EVT-009', 'EVT-010']
  },
  {
    id: 'ORAL-003',
    narratorName: 'Advocate Balbir Singh',
    roleOrBackground: 'Member of Joint Action Committee (JAC) during 2018 Agitation',
    interviewDate: '2024-02-10',
    location: 'Main Bazaar, Kalakote',
    thematicCategory: '2018 ADC Agitation',
    summary: 'Chronicles the mobilization of civil society, market strikes, and youth rallies that secured an independent ADC for Kalakote.',
    excerpt: 'For decades, our people had to waste full days traveling on broken buses to Rajouri just to get a certificate signed. When the government gave Kotranka an ADC but proposed that Kalakote share an officer on rotation, people felt outraged. Shopkeepers shut their shutters for over a month. We stood on the highway together—Pahari, Gujjar, Dogra—until the administration realized Kalakote could no longer be treated as an afterthought.',
    consentObtained: true,
    verificationNotes: 'Contemporary testimony of political movement; matches government order dates and newspaper reportage of March 2018.',
    relatedEventIds: ['EVT-013']
  }
];


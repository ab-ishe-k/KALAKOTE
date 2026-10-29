import { VerificationStatus } from '../types';

export interface TimeMachineChapter {
  id: string;
  eraNumber: number;
  eraName: string;
  timeSpan: string;
  title: string;
  subtitle: string;
  narrative: string;
  evidenceLabel: VerificationStatus;
  keyFacts: string[];
  verificationNote: string;
  primarySources: string[];
  landscapeLayer: {
    skyTint: string;
    mountainTint: string;
    atmosphereDescription: string;
    ambientSoundLabel: string;
  };
}

export const TIME_MACHINE_CHAPTERS: TimeMachineChapter[] = [
  {
    id: 'tm-chapter-1',
    eraNumber: 1,
    eraName: 'Ancient Foothills & Rajapuri',
    timeSpan: 'c. 9th - 12th Century CE',
    title: 'The Khasa Kings & Southern Panjal Trails',
    subtitle: 'Autonomous hill polities along the forested Shivalik fringes',
    narrative: 'Centuries before coal seams were understood or named, the foothill valleys southeast of Rajapuri (Rajouri) formed pastoral corridors beneath the Pir Panjal range. Mentioned by Kalhana in the Rajatarangini, Rajapuri flourished as an independent Khasa monarchy. In the secluded ravine of Panjnara, medieval stone sculptors erected Kashmiri-style sanctums beside natural springs—now revered as Pandu Kund.',
    evidenceLabel: 'PARTIALLY VERIFIED',
    keyFacts: [
      'Rajapuri mentioned as hill kingdom in Kalhana\'s Rajatarangini',
      'Panjnara stone architecture displays authentic early Kashmiri temple masonry',
      'No specific epigraphic record naming "Kalakote" prior to medieval revenue records'
    ],
    verificationNote: 'Regional context verified; specific Kalakote valley settlement boundaries in this era remain unrecorded in surviving inscriptions.',
    primarySources: ['SRC-009', 'SRC-010'],
    landscapeLayer: {
      skyTint: 'from-amber-950/40 via-stone-900 to-black',
      mountainTint: 'text-stone-700',
      atmosphereDescription: 'Dense sub-tropical pine and oak woodlands; stone springs and pack-mule hill tracks.',
      ambientSoundLabel: 'Mountain wind, distant pine whistle & clear spring trickle'
    }
  },
  {
    id: 'tm-chapter-2',
    eraNumber: 2,
    eraName: 'Medieval Hill Kingdoms & Mughal Routes',
    timeSpan: '1586 - 1800 CE',
    title: 'Imperial Highways & Foothill Valleys',
    subtitle: 'Tributaries of the Mughal Imperial Road across the Shivalik ridges',
    narrative: 'When Akbar incorporated Kashmir in 1586, the Imperial Mughal Road traversed western Rajouri through Chingus and Thanamandi. Secondary pack-animal arteries crossed Kalakote, linking Reasi\'s fertile Chenab valleys with the northern passes. Local outposts watched over terraced maize cultivation and mountain herds.',
    evidenceLabel: 'PARTIALLY VERIFIED',
    keyFacts: [
      'Main imperial route moved west of Kalakote through Chingus & Rajouri',
      'Terraced agriculture and seasonal pastoral migration established in local oral traditions',
      'Dark outcrops of coal noted as odd black stone by pastoral graziers'
    ],
    verificationNote: 'Imperial highway well documented; secondary routes through Kalakote valley inferred from regional geography and revenue lineages.',
    primarySources: ['SRC-009'],
    landscapeLayer: {
      skyTint: 'from-emerald-950/40 via-stone-900 to-black',
      mountainTint: 'text-emerald-900',
      atmosphereDescription: 'Terraced hill farms, stone watch outposts, grazing sheep and goats along limestone slopes.',
      ambientSoundLabel: 'Bells of livestock, river current in the deep gorge'
    }
  },
  {
    id: 'tm-chapter-3',
    eraNumber: 3,
    eraName: 'Sikh & Dogra Administration',
    timeSpan: '1819 - 1888 CE',
    title: 'The Treaty of Amritsar & Revenue Demarcation',
    subtitle: 'Maharaja Gulab Singh, Mian Hathu, and early geological incursions',
    narrative: 'Following the 1846 Treaty of Amritsar, the Dogra dynasty stabilized Rajouri under administrators like Raja Mian Hathu. British colonial geologists, including H.B. Medlicott (1876) and T.D. La Touche (1888), began venturing into the fractured Subathu strata of Jammu to inspect reported coal veins.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      'Dogra revenue settlement established structured mauzas and forest grazing rights',
      'Geological Survey of India geologists Medlicott & La Touche survey Jammu Sub-Himalayas',
      'Recognition that Jammu coal was Tertiary in age, distinct from peninsular Gondwana basins'
    ],
    verificationNote: 'Documented in Dogra state revenue records and GSI Memoirs (1876-1888).',
    primarySources: ['SRC-003', 'SRC-009'],
    landscapeLayer: {
      skyTint: 'from-yellow-950/30 via-stone-900 to-black',
      mountainTint: 'text-yellow-900',
      atmosphereDescription: 'Sub-Himalayan ridges surveyed with early theodolites; terraced villages and Dogra police thanas.',
      ambientSoundLabel: 'Early military drum signals, surveyor footsteps on shale'
    }
  },
  {
    id: 'tm-chapter-4',
    eraNumber: 4,
    eraName: 'The Middlemiss Survey',
    timeSpan: '1929 CE',
    title: 'The Great Geological Mapping',
    subtitle: 'C.S. Middlemiss uncovers the Subathu coal horizons',
    narrative: 'Under the patronage of Maharaja Hari Singh, Superintendent C.S. Middlemiss published his seminal 1929 monograph detailing the coalfields of Kalakote, Metka, and Mahogala. He mapped the anticlinal folds, exposed limestone inliers, and friable semi-anthracitic coal seams, providing the scientific blueprint for industrial exploitation.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      'First modern scientific survey isolating Metka, Moghla, and Kalakote blocks',
      'Identified semi-anthracite rank with high calorific value but severe tectonic pulverization',
      'Highlighted difficult subterranean mining conditions in steep, folded strata'
    ],
    verificationNote: 'Verified directly from the original 1929 J&K Mineral Survey monograph.',
    primarySources: ['SRC-003', 'SRC-013'],
    landscapeLayer: {
      skyTint: 'from-blue-950/40 via-stone-900 to-black',
      mountainTint: 'text-blue-900',
      atmosphereDescription: 'Geological survey hammers breaking black mineral seams on sunlit limestone spurs.',
      ambientSoundLabel: 'Geologist picks striking stone, wind over high limestone scarp'
    }
  },
  {
    id: 'tm-chapter-5',
    eraNumber: 5,
    eraName: 'JKML & The Mining Dawn',
    timeSpan: '1960 - 1965 CE',
    title: 'Underground Adits & Public Enterprise',
    subtitle: 'The birth of Jammu & Kashmir Minerals Ltd (JKML)',
    narrative: 'In 1960, the newly formed state enterprise JKML commenced organized extraction across Kalakote, driving timber-supported incline adits into the Metka and Moghla hillsides. Hundreds of local villagers entered the mines, transitioning from subsistence farming into industrial miners.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      'JKML incorporated in 1960 as primary state mining agency',
      'Ber-Goa, Metka, and Moghla opened with manual pick-and-shovel adits',
      'Coal dispatched to regional brick kilns across Jammu, Punjab, and Himachal'
    ],
    verificationNote: 'Verified from JKML corporate founding charter and state industrial gazettes.',
    primarySources: ['SRC-001'],
    landscapeLayer: {
      skyTint: 'from-stone-800 via-stone-900 to-black',
      mountainTint: 'text-stone-800',
      atmosphereDescription: 'Timber pit-props stacked at adit mouths; black coal wagons and miner lanterns.',
      ambientSoundLabel: 'Iron mine cars rolling on rails, miners singing hill work songs'
    }
  },
  {
    id: 'tm-chapter-6',
    eraNumber: 6,
    eraName: 'The Thermal Power Era',
    timeSpan: '1963 - 1987 CE',
    title: 'The Silent Chimneys of Sair',
    subtitle: 'North India\'s first pit-head coal power station (22.5 MW)',
    narrative: 'Begun in 1963 and synchronized by 1971, the Kalakote Thermal Power Station brought Czechoslovakian Skoda steam turbines to the quiet valley. Kalakote was envisioned as the energy beacon of Jammu & Kashmir. Yet the severe abrasiveness and high ash content of the local coal relentlessly corroded boiler tubes, culminating in permanent shutdown in 1987.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      'Foundation stone laid May 23, 1963; commissioned 1968-1971 (3 x 7.5 MW)',
      'Constructed with imported Czechoslovakian Skoda turbines',
      'High ash content (>35%) and friable clinkering caused frequent shutdowns',
      'Ceased generation 1987; formally closed by Cabinet 1989'
    ],
    verificationNote: 'Fully verified from J&K Legislative Assembly debates, PDD records, and court judgments.',
    primarySources: ['SRC-005', 'SRC-006', 'SRC-012'],
    landscapeLayer: {
      skyTint: 'from-orange-950/40 via-stone-900 to-black',
      mountainTint: 'text-orange-900',
      atmosphereDescription: 'Twin industrial chimneys rising against green Pir Panjal hills, turbine humming day and night.',
      ambientSoundLabel: 'Deep steam turbine hum, plant shift siren echoing across the valley'
    }
  },
  {
    id: 'tm-chapter-7',
    eraNumber: 7,
    eraName: 'Decline, Security Flux & Reorganization',
    timeSpan: '1988 - 2011 CE',
    title: 'Mothballed Turbines & Demographic Resilience',
    subtitle: 'Transitioning through the turbulent nineties toward modern tehsil life',
    narrative: 'Following the formal cabinet closure in 1989, the thermal plant\'s workforce became idle, even as the 1990s brought security challenges across the border districts. The community persevered through agriculture, local trade, and military service. By the 2011 Census, Kalakote tehsil had grown to 72,667 residents.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      '1989 Cabinet resolution decommissioned KTPS permanently',
      'State government bore salary expenditures of idle power personnel for years',
      '2011 Census established baseline: 72,667 residents, 59.13% literacy across 413 sq km'
    ],
    verificationNote: 'Verified through official Census 2011 handbooks and J&K Assembly official questions.',
    primarySources: ['SRC-002', 'SRC-006'],
    landscapeLayer: {
      skyTint: 'from-slate-900 via-stone-950 to-black',
      mountainTint: 'text-slate-800',
      atmosphereDescription: 'Quiet decommissioned power complex; bustling school grounds and terraced agrarian hillsides.',
      ambientSoundLabel: 'Distant school bell, rustling pine trees in the afternoon wind'
    }
  },
  {
    id: 'tm-chapter-8',
    eraNumber: 8,
    eraName: 'The 2018 Civil Agitation',
    timeSpan: 'February - April 2018 CE',
    title: 'The Great Tri-Subdivision Movement',
    subtitle: 'Citizens unite to demand administrative justice and ADC status',
    narrative: 'When the state granted an ADC post to Kotranka in February 2018, Nowshera, Sunderbani, and Kalakote erupted in a historic 40-day shutdown. Protesters blocked the Jammu-Poonch highway and rejected token rotational posts. On March 23, 2018, the Government conceded, granting Kalakote its own independent Additional Deputy Commissioner.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      'Over 40 days of total civilian and commercial bandh across three subdivisions',
      'Rejection of "rotational ADC" formula as administrative eyewash',
      'GAD Order of March 23, 2018 formally upgraded SDM Kalakote to independent ADC'
    ],
    verificationNote: 'Corroborated by J&K GAD official notifications and contemporaneous news records.',
    primarySources: ['SRC-004', 'SRC-011'],
    landscapeLayer: {
      skyTint: 'from-amber-900/40 via-stone-900 to-black',
      mountainTint: 'text-amber-900',
      atmosphereDescription: 'Crowds assembled in Kalakote bazaar; banners demanding decentralized governance.',
      ambientSoundLabel: 'Crowd chants, microphone reverberation in the mountain market'
    }
  },
  {
    id: 'tm-chapter-9',
    eraNumber: 9,
    eraName: 'Contemporary Realities',
    timeSpan: '2019 - October 2026',
    title: 'DGMS Orders, Geological Exploration & The Future',
    subtitle: 'Suspended adits, Badhog exploration, and heritage conservation',
    narrative: 'As of October 2026, commercial coal extraction at Metka and Moghla remains suspended under DGMS safety orders. Exploration by GSI in the Badhog block continues, while local attention shifts toward preserving ancient stone heritage at Panjnara and developing ecotourism at the Tatapani sulphur springs. The silent chimneys of Sair remain a monument to an audacious industrial chapter.',
    evidenceLabel: 'VERIFIED',
    keyFacts: [
      'Metka and Moghla mines non-operational under DGMS safety compliance mandates',
      'GSI exploratory core drilling in Badhog sector assessing long-term reserves',
      'Panjnara (Pandu Kund) and Tatapani hot springs recognized as key heritage targets'
    ],
    verificationNote: 'Confirmed by latest DGMS notices, Ministry of Coal 2024 inventories, and NIC Rajouri records as of October 2026.',
    primarySources: ['SRC-001', 'SRC-007', 'SRC-008', 'SRC-010'],
    landscapeLayer: {
      skyTint: 'from-emerald-950/30 via-stone-900 to-black',
      mountainTint: 'text-emerald-950',
      atmosphereDescription: 'The modern mountain valley in crisp morning light; solar panels on roofs, old adits sealed, road widened.',
      ambientSoundLabel: 'Morning birdsong, modern vehicle passing on the newly surfaced road'
    }
  }
];


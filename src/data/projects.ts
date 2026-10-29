import { IndustrialProject } from '../types';

export const PROJECTS_DATA: IndustrialProject[] = [
  {
    id: 'PRJ-001',
    projectName: 'Kalakote Thermal Power Station (KTPS)',
    purpose: 'North India\'s first pit-head coal-fired thermal generating plant, built to alleviate extreme winter energy deficits in Jammu & Kashmir before the commissioning of major hydroelectric stations.',
    announcementDate: '1961',
    constructionDate: '1963 - 1968',
    commissioningDate: '1968 (Trial) / 1969-1971 (Commercial)',
    shutdownDate: '1987',
    formalClosureDate: '1989',
    responsibleDepartment: 'Originally J&K Power Development Department (PDD) / Later assets under JKSPDC',
    installedCapacity: '22.5 MW (3 units of 7.5 MW each)',
    generatingUnits: '3 Skoda Steam Turbines (Imported from Czechoslovakia)',
    equipmentOrigin: 'Skoda Export, Czechoslovak Socialist Republic',
    fuelQualityIssues: 'The plant was engineered for uniform coal grades, but Kalakote Subathu coal proved excessively friable, pulverizing into fine soot that choked combustion chambers, alongside abrasive ash content (exceeding 35-40%) that rapidly eroded boiler tubing.',
    fundingAndExpenditure: 'Estimated capital outlay of ₹4.5 to ₹5.5 Crores at 1960s price levels; heavily subsidized in subsequent decades for idle establishment salaries.',
    majorChanges: [
      '1963: Foundation stone laid at Sair.',
      '1968: First 7.5 MW unit synchronized.',
      '1971: Full 22.5 MW capacity available, but rarely achieved concurrent 3-unit generation due to steam tube blowouts.',
      '1987: Permanent cessation of active electrical generation.',
      '1989: J&K State Cabinet formal closure decree.',
      '2010s: Decommissioned status reaffirmed in Legislative Assembly answers; plant grounds utilized as storage and departmental depot.'
    ],
    documentedClosureReasons: [
      'Chronic fuel incompatibility and high abrasive ash eroding boiler superheaters.',
      'Uneconomic generation cost compared to incoming hydel power and Northern Grid linkages.',
      'Lack of consistent, mechanized coal supply from adjacent JKML adits.',
      'Absence of specialized spare parts following the breakup of Czechoslovakia.'
    ],
    currentStatus: 'CLOSED',
    lastVerifiedDate: '2026-10-15',
    communityImpact: 'The station was the economic lifeblood of Kalakote town in the 1960s-1970s, creating hundreds of permanent technical positions, housing colonies, schools, and thriving markets. Its shutdown ushered in prolonged economic stagnation and outmigration.',
    unresolvedQuestions: [
      'Official asset liquidation records: have remaining Skoda turbine scrap materials been completely auctioned or remain under departmental custody?',
      'Exact site redevelopment proposal: while periodic assembly questions debated gas turbine conversion or industrial park establishment, no funded masterplan has been approved through October 2026.'
    ],
    sourceIds: ['SRC-005', 'SRC-006', 'SRC-012']
  },
  {
    id: 'PRJ-002',
    projectName: 'Additional Deputy Commissioner (ADC) Sub-Divisional Secretariat Kalakote',
    purpose: 'Decentralized administrative governance for Kalakote subdivision, eliminating the necessity for rural citizens to travel 45+ km to Rajouri district headquarters for revenue and civil matters.',
    announcementDate: '2018-03-23',
    constructionDate: '2018 - 2021',
    commissioningDate: '2018 (Operationalized in existing civil complex)',
    responsibleDepartment: 'General Administration Department (GAD) & Revenue Department, J&K',
    majorChanges: [
      'February 2018: Kotranka granted ADC post; Kalakote joins Nowshera and Sunderbani in mass protest.',
      'March 2018: Rotational arrangement rejected by public.',
      'March 23, 2018: Government order sanctioning independent ADC Kalakote.',
      '2019-2022: Formal expansion of revenue and executive powers under J&K Reorganization Act.'
    ],
    documentedClosureReasons: [],
    currentStatus: 'OPERATIONAL',
    lastVerifiedDate: '2026-10-20',
    communityImpact: 'Greatly improved administrative accessibility for 16,000+ rural households and established Kalakote as an administrative nucleus independent of Sunderbani or Kotranka.',
    unresolvedQuestions: [
      'Long-term district demand: civilian groups continue to demand a unified border district merging Nowshera, Sunderbani, and Kalakote; no official committee report has recommended this restructuring to date.'
    ],
    sourceIds: ['SRC-004', 'SRC-011']
  },
  {
    id: 'PRJ-003',
    projectName: 'Tatapani Ecotourism & Sulphur Spring Bath Complex',
    purpose: 'Modernization of sanitation, changing rooms, and therapeutic bath facilities around the natural hot sulphur spring at Tatapani (14 km from Kalakote).',
    announcementDate: '2016',
    constructionDate: 'Intermittent civil works (2017-2022)',
    responsibleDepartment: 'Tourism Department, Jammu & Kashmir / Rajouri District Development Board',
    majorChanges: [
      '2016: Sanction of basic bathing ghats and public toilet blocks.',
      '2021: Renovation of boundary walls and access pathways.',
      '2024: Proposals for eco-resort amenities discussed in District Capex meetings.'
    ],
    documentedClosureReasons: [],
    currentStatus: 'PARTIALLY OPERATIONAL',
    lastVerifiedDate: '2026-09-15',
    communityImpact: 'Draws thousands of pilgrims and arthritis/skin disease patients annually, supporting local tea stalls, transporters, and seasonal guesthouses.',
    unresolvedQuestions: [
      'Comprehensive hydrogeological study on sulphur spring recharge rate and conservation zone demarcation remains pending.'
    ],
    sourceIds: ['SRC-010']
  },
  {
    id: 'PRJ-004',
    projectName: 'Siot-Kalakote-Rajouri Road Widening and Resurfacing (NH144A Spur Link)',
    purpose: 'Upgrading the primary transport artery connecting the Jammu-Poonch Highway (NH144A at Siot) through Kalakote town to Rajouri city, improving heavy mineral haulage and civilian mobility.',
    announcementDate: '2019',
    constructionDate: '2020 - Present',
    responsibleDepartment: 'Public Works (R&B) Department, J&K / PMGSY',
    majorChanges: [
      '2020: Bridge reconstruction over hill nullahs and realignment of narrow hairpins near Broh and Metka.',
      '2023-2025: Blacktopping of major stretches between Siot and Kalakote completed.'
    ],
    documentedClosureReasons: [],
    currentStatus: 'PARTIALLY OPERATIONAL',
    lastVerifiedDate: '2026-10-01',
    communityImpact: 'Reduced travel time between Kalakote and Jammu from over 4.5 hours to under 3 hours; boosted agricultural market access for local maize, walnut, and milk producers.',
    unresolvedQuestions: [
      'Certain hill sections subject to monsoon landslips between Metka and Dali remain unreinforced with retaining walls.'
    ],
    sourceIds: ['SRC-002', 'SRC-011']
  }
];


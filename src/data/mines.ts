import { MineRecord } from '../types';

export const MINES_DATA: MineRecord[] = [
  {
    id: 'MINE-001',
    officialName: 'Metka (Mehataka) Coal Mine',
    blockOrArea: 'Metka Block, Kalakote Coalfield',
    coordinates: {
      lat: 33.2215,
      lng: 74.4328,
      isApproximate: true
    },
    geologicalFormation: 'Basal Horizon, Subathu Formation (Late Paleocene to Middle Eocene), unconformably overlying Great Limestone inlier',
    coalRank: 'Semi-anthracite to low-volatile bituminous (Friable, tectonic sheared)',
    firstDocumentedReference: 'C.S. Middlemiss (1929), Mineral Survey of Jammu & Kashmir; earlier noted in GSI Memoirs by Medlicott (1876)',
    explorationHistory: 'Systematically mapped by GSI throughout the 20th century. Characterized by folded synclinal structure with steeply dipping seams (30° to 70°). Seam thickness fluctuates between 1.2 m and 4.5 m due to tectonic squeeze.',
    verifiedProductionPeriod: '1961 - 2021 (intermittent adit extraction)',
    miningMethod: 'Incline / Underground Adits',
    operatingEntity: 'Jammu & Kashmir Minerals Limited (JKML)',
    productionStatistics: [
      {
        year: '1980-1985 (Peak Era)',
        outputMetricTonnes: 28000,
        notes: 'Supplied fuel to local brick kiln industries and cement units across Jammu and Punjab border districts.'
      },
      {
        year: '2015-2016',
        outputMetricTonnes: 9400,
        notes: 'Production severely hampered by water logging in deeper adits and lack of mechanization.'
      },
      {
        year: '2021-2024',
        notes: 'Commercial operations halted following DGMS notices demanding mechanized ventilation and modern roof-bolting.'
      }
    ],
    peakEmploymentRecorded: 'Approximately 350-450 underground miners, adit drivers, and surface laborers during the 1980s.',
    safetyRecords: [
      'Frequent roof fall incidents due to friable shale overburdens.',
      'Water ingress from subsurface aquifers in the fractured limestone baseline during monsoon months.',
      'Low methane emissions observed, but heavy coal-dust accumulation requiring manual water spraying.'
    ],
    dgmsDirectives: [
      'Notice under Section 22(1) of the Mines Act, 1952 ordering cessation of extraction in unsanctioned adits pending certified geological support plan.',
      'Mandatory installation of mechanical ventilation fans and emergency refuge chambers prior to any operational resumption.'
    ],
    environmentalImpact: 'Acidic runoff and mine-tailing wash into local rain-fed nullahs during heavy downpours; deforestation of surrounding subtropical pine scrub on steep slopes.',
    currentStatus: 'SUSPENDED',
    lastVerifiedDate: '2026-10-15',
    statusNotes: 'Operations suspended pending comprehensive scientific mine planning, environmental clearances, and DGMS compliance. JKML continues to manage site security and legacy employee dues.',
    sourceIds: ['SRC-001', 'SRC-003', 'SRC-007', 'SRC-013']
  },
  {
    id: 'MINE-002',
    officialName: 'Moghla (Mahogala) Coal Mine',
    blockOrArea: 'Moghla Block, Kalakote Coalfield',
    coordinates: {
      lat: 33.2082,
      lng: 74.4589,
      isApproximate: true
    },
    geologicalFormation: 'Subathu Formation (Eocene), resting on brecciated cherty limestone',
    coalRank: 'Semi-anthracite (Calorific value ~6,200 - 7,400 Kcal/kg, Ash: 28-42%)',
    firstDocumentedReference: 'T.D. La Touche (1888) & C.S. Middlemiss (1929)',
    explorationHistory: 'Explored via exploratory trial trenches and short adits. The coal occurs in lenses rather than continuous sheets due to intense faulting along the southern Pir Panjal limb.',
    verifiedProductionPeriod: '1964 - 2018 (seasonal extraction)',
    miningMethod: 'Incline / Underground Adits',
    operatingEntity: 'Jammu & Kashmir Minerals Limited (JKML)',
    productionStatistics: [
      {
        year: '1995-2000',
        outputMetricTonnes: 12000,
        notes: 'Dispatched in trucks to Jammu, Kathua, and Pathankot industrial brick kilns.'
      },
      {
        year: '2018-2026',
        notes: 'No verifiable commercial production recorded in official departmental summaries.'
      }
    ],
    peakEmploymentRecorded: '150-200 contractual and regular personnel during peak seasons.',
    safetyRecords: [
      'Structural roof instability in artisanal incline workings.',
      'Poor natural ventilation in narrow incline adits exceeding 100 meters depth.'
    ],
    dgmsDirectives: [
      'Directive issued to construct standardized steel and timber gallery supports before deploying subterranean personnel.'
    ],
    environmentalImpact: 'Gully erosion around adit entrances and localized subsidence on barren hillside slopes.',
    currentStatus: 'SUSPENDED',
    lastVerifiedDate: '2026-09-01',
    statusNotes: 'Moghla block is non-operational for large-scale extraction as of October 2026. Only periodic maintenance inspections and geological resource reviews have been documented.',
    sourceIds: ['SRC-001', 'SRC-003', 'SRC-007']
  },
  {
    id: 'MINE-003',
    officialName: 'Ber-Goa Coal Block',
    blockOrArea: 'Ber-Goa / Sair Sector, Kalakote',
    coordinates: {
      lat: 33.2144,
      lng: 74.4095,
      isApproximate: true
    },
    geologicalFormation: 'Subathu Coal Measures (Paleocene-Eocene)',
    coalRank: 'High-ash, friable Semi-anthracite',
    firstDocumentedReference: 'Mid-20th century industrial exploration for Kalakote Thermal Power Project (1960-1963)',
    explorationHistory: 'Explored specifically to serve as a pit-head captive fuel source for the Kalakote Thermal Power Station. Multiple adits were driven into the Sair hills directly above the power plant.',
    verifiedProductionPeriod: '1963 - 1987',
    miningMethod: 'Incline / Underground Adits',
    operatingEntity: 'JKML in linkage with J&K Power Development Department',
    productionStatistics: [
      {
        year: '1969-1975',
        outputMetricTonnes: 18500,
        notes: 'Direct conveyor/truck haulage to the Kalakote Thermal Power Station bunkers.'
      },
      {
        year: 'Post-1987',
        notes: 'Ceased completely with the shutdown of the thermal power plant.'
      }
    ],
    peakEmploymentRecorded: 'Over 300 miners during the active thermal operational window.',
    safetyRecords: [
      'Significant fine dust hazards; friable coal disintegrated into fine powder during handling, causing severe boiler fouling and worker respiratory irritation.'
    ],
    dgmsDirectives: [
      'Adits sealed or gated following the 1989 formal closure of the linked power plant.'
    ],
    environmentalImpact: 'Old spoil heaps colonized by natural brushwood; no modern tailings dam exists.',
    currentStatus: 'CLOSED',
    lastVerifiedDate: '2026-08-20',
    statusNotes: 'Formally closed and non-functioning. Incline adits remain abandoned with overgrown portals.',
    sourceIds: ['SRC-001', 'SRC-006', 'SRC-012']
  },
  {
    id: 'MINE-004',
    officialName: 'Badhog Exploratory Coal Block',
    blockOrArea: 'Badhog Sector, Kalakote Basin',
    coordinates: {
      lat: 33.1945,
      lng: 74.475,
      isApproximate: true
    },
    geologicalFormation: 'Subathu Formation (Eocene)',
    coalRank: 'Semi-anthracitic to carbonaceous shale',
    firstDocumentedReference: 'GSI Field Season Reports (2018-2022)',
    explorationHistory: 'Identified as a prospective contiguous extension of the Kalakote-Mahogala synclinal belt. Targeted for exploratory core drilling by GSI and State Directorate of Geology & Mining.',
    verifiedProductionPeriod: 'Never placed into commercial production',
    miningMethod: 'Mixed Adit & Shaft',
    operatingEntity: 'Geological Survey of India / J&K Directorate of Geology and Mining (Exploratory Phase)',
    productionStatistics: [
      {
        notes: 'Exploratory drilling only. Zero commercial coal mined.'
      }
    ],
    safetyRecords: ['Drilling exploratory core samples; no underground workings established.'],
    dgmsDirectives: ['Not applicable - unmined prospect.'],
    environmentalImpact: 'Minimal localized surface disturbance during borehole drilling.',
    currentStatus: 'UNDER INVESTIGATION',
    lastVerifiedDate: '2026-09-10',
    statusNotes: 'Remains an unexploited geological exploration block. Available official records through October 2026 show no commercial mining lease granted.',
    sourceIds: ['SRC-003', 'SRC-008']
  }
];


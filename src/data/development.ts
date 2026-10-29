import { DevelopmentMetric } from '../types';

export const DEVELOPMENT_METRICS: DevelopmentMetric[] = [
  {
    id: 'DEV-001',
    indicator: 'Total Tehsil Population',
    category: 'Demographics',
    geographicUnit: 'Kalakote Tehsil',
    source: 'Census of India 2011 (Series 02, Part XII-B)',
    referenceYear: '2011',
    value: 72667,
    unit: 'Persons',
    caveatsAndNotes: 'Encompasses 16,243 households across all rural villages and the core township in Kalakote tehsil.'
  },
  {
    id: 'DEV-002',
    indicator: 'Male Population',
    category: 'Demographics',
    geographicUnit: 'Kalakote Tehsil',
    source: 'Census of India 2011',
    referenceYear: '2011',
    value: 37864,
    unit: 'Persons',
    caveatsAndNotes: '52.1% of tehsil population.'
  },
  {
    id: 'DEV-003',
    indicator: 'Female Population',
    category: 'Demographics',
    geographicUnit: 'Kalakote Tehsil',
    source: 'Census of India 2011',
    referenceYear: '2011',
    value: 34803,
    unit: 'Persons',
    caveatsAndNotes: '47.9% of tehsil population.'
  },
  {
    id: 'DEV-004',
    indicator: 'Sex Ratio',
    category: 'Demographics',
    geographicUnit: 'Kalakote Tehsil',
    source: 'Census of India 2011',
    referenceYear: '2011',
    value: 919,
    unit: 'Females per 1,000 Males',
    caveatsAndNotes: 'Compares favorably to Jammu & Kashmir state average of 889 recorded in the same census.'
  },
  {
    id: 'DEV-005',
    indicator: 'Geographic Area',
    category: 'Demographics',
    geographicUnit: 'Kalakote Tehsil',
    source: 'District Census Handbook: Rajouri',
    referenceYear: '2011',
    value: 413,
    unit: 'Square Kilometers',
    caveatsAndNotes: 'Hilly terrain featuring steep pine forests, terraced agrarian slopes, and dry riverbeds.'
  },
  {
    id: 'DEV-006',
    indicator: 'Population Density',
    category: 'Demographics',
    geographicUnit: 'Kalakote Tehsil',
    source: 'Census of India 2011 Calculations',
    referenceYear: '2011',
    value: 176,
    unit: 'Persons per sq km',
    caveatsAndNotes: 'Reflects dispersed rural settlements across rugged Shivalik foothill topography.'
  },
  {
    id: 'DEV-007',
    indicator: 'Core Settlement Population (Village/Ward)',
    category: 'Demographics',
    geographicUnit: 'Kalakote Town',
    source: 'Census of India 2011 (Village Directory)',
    referenceYear: '2011',
    value: 558,
    unit: 'Persons',
    caveatsAndNotes: 'Crucial distinction: while the entire tehsil hosts 72,667 people, the historic core bazaar village area recorded 558 residents.'
  },
  {
    id: 'DEV-008',
    indicator: 'Overall Tehsil Literacy Rate',
    category: 'Literacy',
    geographicUnit: 'Kalakote Tehsil',
    source: 'Census of India 2011',
    referenceYear: '2011',
    value: 59.13,
    unit: '%',
    caveatsAndNotes: '35,418 literate individuals. Male literacy stood higher (~69%) compared to female literacy (~48%).'
  },
  {
    id: 'DEV-009',
    indicator: 'Core Settlement Literacy Rate',
    category: 'Literacy',
    geographicUnit: 'Kalakote Town',
    source: 'Census of India 2011 (Village Directory)',
    referenceYear: '2011',
    value: 78.4,
    unit: '%',
    caveatsAndNotes: 'Significantly higher in the central administrative/commercial ward due to access to secondary schools and government quarters.'
  },
  {
    id: 'DEV-010',
    indicator: 'Estimated Tertiary Coal Reserves (Jammu Belt)',
    category: 'Mining & Minerals',
    geographicUnit: 'Rajouri District',
    source: 'Ministry of Coal / Geological Survey of India Inventory',
    referenceYear: '2024',
    value: 9.38,
    unit: 'Million Metric Tonnes',
    caveatsAndNotes: 'Encompasses both explored and inferred reserves across Kalakote, Metka, Mahogala, and contiguous foothill horizons.'
  },
  {
    id: 'DEV-011',
    indicator: 'Kalakote Thermal Power Installed Capacity',
    category: 'Health & Amenities',
    geographicUnit: 'Kalakote Town',
    source: 'J&K Power Development Department Historical Ledger',
    referenceYear: '1971 (Commissioned) / 1989 (Decommissioned)',
    value: 22.5,
    unit: 'Megawatts (3 x 7.5 MW Units)',
    caveatsAndNotes: 'Currently 0 MW active generation; site decommissioned and defunct.'
  }
];


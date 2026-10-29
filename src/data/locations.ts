import { GeographicLocation } from '../types';

export const LOCATIONS_DATA: GeographicLocation[] = [
  {
    id: 'LOC-001',
    name: 'Kalakote Town & Sub-Divisional Headquarters',
    category: 'Town / Village',
    coordinates: [33.2105, 74.4172],
    isApproximate: false,
    elevationMeters: 750,
    description: 'The administrative heart of Kalakote Tehsil, housing the Additional Deputy Commissioner (ADC) office, Sub-District Hospital, Municipal Committee, and principal commercial bazaar.',
    historicalSignificance: 'Grew from a rural foothill hamlet into a major industrial and administrative township following the establishment of JKML coalfields and the Kalakote Thermal Station.',
    sourceIds: ['SRC-002', 'SRC-004']
  },
  {
    id: 'LOC-002',
    name: 'Kalakote Thermal Power Station Site (Sair)',
    category: 'Industrial Site',
    coordinates: [33.2150, 74.4080],
    isApproximate: false,
    elevationMeters: 740,
    description: 'The historic site of North India\'s first pit-head thermal plant (22.5 MW), featuring decommissioned turbine halls, boiler structures, transformer yards, and staff residential quarters.',
    historicalSignificance: 'Foundation laid in May 1963; generated regional electricity from 1968 to 1987 utilizing Czechoslovakian Skoda machinery before formal 1989 closure.',
    sourceIds: ['SRC-006', 'SRC-012']
  },
  {
    id: 'LOC-003',
    name: 'Metka Coal Mine & Incline Adits',
    category: 'Mine / Coalfield',
    coordinates: [33.2215, 74.4328],
    isApproximate: true,
    elevationMeters: 820,
    description: 'Primary underground mining sector operated by JKML, located northeast of Kalakote town in the folded Subathu syncline.',
    historicalSignificance: 'First mapped in 1929 by C.S. Middlemiss; produced thousands of tonnes of semi-anthracite coal for regional kilns until regulatory suspension.',
    sourceIds: ['SRC-001', 'SRC-003', 'SRC-007']
  },
  {
    id: 'LOC-004',
    name: 'Moghla (Mahogala) Coal Block',
    category: 'Mine / Coalfield',
    coordinates: [33.2082, 74.4589],
    isApproximate: true,
    elevationMeters: 860,
    description: 'Eastern mining block of the Kalakote coalfield characterized by steep seam inclinations and limestone contact horizons.',
    historicalSignificance: 'Extracted via artisanal adits for decades; currently dormant awaiting modern scientific exploration and clearances.',
    sourceIds: ['SRC-001', 'SRC-003']
  },
  {
    id: 'LOC-005',
    name: 'Ber-Goa Adit Portals',
    category: 'Mine / Coalfield',
    coordinates: [33.2144, 74.4095],
    isApproximate: true,
    elevationMeters: 760,
    description: 'Direct captive coal adits situated in the hills directly abutting the thermal power plant.',
    historicalSignificance: 'Supplied the boilers of KTPS via direct incline haulage; permanently sealed after the plant was shuttered.',
    sourceIds: ['SRC-001', 'SRC-006']
  },
  {
    id: 'LOC-006',
    name: 'Tatapani Hot Sulphur Spring',
    category: 'Natural Feature / Spring',
    coordinates: [33.2450, 74.4850],
    isApproximate: true,
    elevationMeters: 920,
    description: 'Natural geothermal spring situated approximately 14 km northeast of Kalakote, bubbling with warm sulphur-rich mineral water.',
    historicalSignificance: 'Revered across the Jammu region for centuries; pilgrims and visitors bathe in separate ghats for treatment of chronic skin ailments and rheumatism.',
    sourceIds: ['SRC-010']
  },
  {
    id: 'LOC-007',
    name: 'Panjnara (Pandu Kund Ancient Stone Shrines)',
    category: 'Heritage & Sacred Site',
    coordinates: [33.1890, 74.3720],
    isApproximate: true,
    elevationMeters: 690,
    description: 'Ancient monolithic stone temple ruins and perennial spring kunds displaying classic Kashmiri-style architectural traits.',
    historicalSignificance: 'Locally associated with the Mahabharata Pandavas in oral tradition; represents an exceptionally rare southern Pir Panjal manifestation of early medieval stone sanctums.',
    sourceIds: ['SRC-010']
  },
  {
    id: 'LOC-008',
    name: 'Manma Mata Shrine & Cave',
    category: 'Heritage & Sacred Site',
    coordinates: [33.2320, 74.3850],
    isApproximate: true,
    elevationMeters: 810,
    description: 'Sacred hillside shrine and natural cavern dedicated to Devi, situated on the winding road between Kalakote and Rajouri.',
    historicalSignificance: 'Significant center of local pilgrimage with cave folklore linking the route to ancient ascetics traversing the southern Pir Panjal.',
    sourceIds: ['SRC-010']
  },
  {
    id: 'LOC-009',
    name: 'Siot Highway Junction (NH144A)',
    category: 'Administrative Office',
    coordinates: [33.1550, 74.4650],
    isApproximate: false,
    elevationMeters: 550,
    description: 'The strategic road junction on the Jammu-Poonch National Highway where the secondary arterial road branches north to Kalakote.',
    historicalSignificance: 'Crucial logistical lifeline for coal dispatch trucks and heavy machinery moving into the Kalakote industrial basin.',
    sourceIds: ['SRC-002']
  }
];


# KALAKOTE OVERLOOK
### A Cinematic, Interactive, Research-Driven Digital History & Heritage Archive
*Documenting Kalakote, Rajouri District, Jammu and Kashmir, India (Through October 2026)*

> **"Every Mountain Has a Story. Every Era Leaves a Mark."**  
> *Alternative Tagline: "Preserving the Past. Understanding the Present."*

---

## 1. Independent Archive Disclaimer

**KALAKOTE OVERLOOK** is an autonomous digital history, cartographic, and archival research platform. It is **NOT** an official government website and has no administrative affiliation with or endorsement from the Government of Jammu & Kashmir, the Rajouri District Administration, or the Government of India. 

All official government orders, gazette notifications, census tables, court judgments, and geological memoirs referenced herein are cited under educational and historical fair-use principles.

---

## 2. Research Methodology & Verification Ratings

In compliance with strict archival principles:
* **No historical fabrication:** Dates, rulers, monuments, mine coordinates, production figures, project costs, quotations, or closure reasons are never invented.
* **Separation of vintage:** The historical date of an event (e.g. 1963 foundation stone) is strictly distinguished from the publication date of its surviving evidence (e.g. 2013 Assembly proceedings).
* **Hierarchical source priority:** Official Government Gazettes, Directorate of Census Operations, Geological Survey of India (GSI) memoirs, and High Court judgments take precedence. Wikipedia and personal blogs are not treated as authorities.
* **Mandatory missing data policy:** When reliable evidence cannot be established, the platform explicitly displays:  
  `"Available sources do not currently establish this detail."`

### Evidential Ratings

| Status | Definition |
| :--- | :--- |
| **VERIFIED** | Supported by a direct primary source appropriate to the claim. |
| **PARTIALLY VERIFIED** | Broader regional or stylistic context is confirmed, but local specifics remain uncertain. |
| **UNVERIFIED** | A claim exists in oral tradition or hearsay, but reliable archival evidence has not been located. |
| **CONFLICTING SOURCES** | Reputable official records or publications present divergent figures or dates. |
| **RESEARCH PENDING** | Requires further access to un-digitized regional state archives or departmental files. |

---

## 3. Core Features & Architecture

### 1. Homepage (`/`)
* **Cinematic Hero:** Full-viewport mountain landscape with editorial typography, branding, and instant exploration triggers.
* **Geographical Context:** Tehsil area (413 km²), Rajouri relationship, and Pir Panjal foothill orientation.
* **Curated Entry Points:** 8 large editorial gateways.
* **Then and Now Slider:** Interactive comparison between the 1971 commissioned Skoda thermal plant at Sair and the stabilized decommissioned landscape in October 2026.
* **Source of the Month:** Featured primary document with complete archival metadata.

### 2. Cinematic Time Machine (`/time-machine`)
* **9 Documented Chapters:**
  1. *Ancient Foothills & Rajapuri (c. 9th–12th Cent. CE)*
  2. *Medieval Hill Kingdoms & Mughal Routes (1586–1800 CE)*
  3. *Sikh & Dogra Administration (1819–1888 CE)*
  4. *The Middlemiss Geological Survey (1929 CE)*
  5. *JKML & The Mining Dawn (1960–1965 CE)*
  6. *The Thermal Power Era (1963–1987 CE)*
  7. *Decline, Security Flux & Reorganization (1988–2011 CE)*
  8. *The 2018 Civil Agitation (2018 CE)*
  9. *Contemporary Realities (2019–October 2026)*
* **Interactive Controls:** Autoplay walkthrough, interactive timeline scrubber, keyboard arrow-key navigation (`←` / `→`), fullscreen mode, audio atmospheric soundscape toggle, and reduced-motion support.
* **Mandatory Disclosure:** Every visual plate bears the label:  
  `"HISTORICAL RECONSTRUCTION — NOT AN ORIGINAL ARCHIVAL IMAGE"`.

### 3. Historical Timeline (`/history`)
* Multi-facet filtering by **Era**, **Category**, and **Verification Status**.
* Chronological sorting (Earliest first vs. Latest first).
* Expandable in-depth analytical dossiers.
* JSON export of research records and bibliography.

### 4. Coal Mines Explorer (`/mining`)
* **Geological Stratigraphy:** Tertiary Subathu Formation (Eocene) unconformably overlying Proterozoic Great Limestone.
* **Mine Directory:** Metka, Moghla, Ber-Goa, and Badhog blocks.
* **Statutory Compliance:** Directorate General of Mines Safety (DGMS) Section 22/22A notices, roof-bolting mandates, and suspension records.
* **Sourced Production Tables:** Real historical extraction figures and explicit `"Data unavailable"` disclosures.

### 5. Kalakote Thermal Power Station (`/thermal-station`)
* **Engineering Dossier:** 22.5 MW installed capacity ($3 \times 7.5\text{ MW}$ Czechoslovakian Skoda steam turbogenerators).
* **Historical Timeline:** Foundation (May 23, 1963), Trial (1968), Commissioning (1969–1971), Shutdown (1987), Formal Cabinet Closure Decree (1989).
* **Combustion Bottlenecks:** Technical breakdown of abrasive ash ($>35\text{--}45\%$) eroding boiler superheaters and pulverizer pulverization issues.

### 6. Interactive Geospatial Atlas (`/map` & `/atlas`)
* OpenFreeMap vector cartography via MapLibre GL & Leaflet with zero API keys or tracking.
* Dynamic style switcher: **OFM Dark** (obsidian night), **OFM Liberty** (topographical terrain & elevation contours), and **OFM Positron** (archival parchment).
* Verified coordinates for coal incline adits, Sair power site, Tatapani hot springs, and Panjnara stone shrines.
* Category layer toggles: *All, Coalfields, Thermal Station, Heritage & Springs, Administrative*.
* Verified Topographic Points Registry table.

### 7. 3D Digital Museum & Relics Inspector (`/artifacts-3d`)
* **Procedural 3D WebGL Models (Three.js):**
  1. *1968 Škoda 7.5 MW Steam Turbine Assembly* (Czechoslovak condensing turbine casing, multi-stage rotor blades, governor actuator).
  2. *1920s Underground Coal Mining Marsaut Flame Safety Lamp & Miner's Pick* (Double brass wire-gauze flame barrier, interior safety flame point light, Dogra forged coal pick).
  3. *8th–11th Century Kashmiri Pandu Kund Stone Sanctum Pillar* (Fluted monolithic shaft, kalasa moldings, Kashmiri pediment stone capital).
* **Hardware Motion Sensor Integration (`useDeviceMotion`):**
  * Real-time physical mobile gyroscope tracking ($\beta, \gamma$ pitch/roll) for hands-free 3D tilt.
  * Native iOS Safari permission workflow (`requestPermission`).
  * 360° mouse / touch drag rotation, wireframe mesh toggle, and museum spotlight vs. archival studio lighting modes.

### 8. Administration & Public Movements (`/administration`)
* **Carving of Rajouri:** Established January 1, 1968 from Poonch district.
* **The 2018 ADC Agitation:** 40-day civil strike, rejection of rotational compromises, and J&K GAD Order No. 490-GAD of 2018 granting independent ADC status.
* **Constitutional Distinctions:** Rigorous separation between the former Princely State, post-1947 State of J&K, and post-2019 Union Territory.

### 8. Built, Changed & Lost (`/built-changed-lost`)
* Investigative project lifecycle tracker across statuses: `PROPOSED`, `APPROVED`, `UNDER CONSTRUCTION`, `OPERATIONAL`, `PARTIALLY OPERATIONAL`, `SUSPENDED`, `CLOSED`.
* Explicit recording of unanswered administrative questions.

### 9. Data & Development Dashboard (`/development`)
* **Census of India 2011 Baselines:**
  * Tehsil Population: 72,667 (16,243 households).
  * Sex Ratio: 919 females per 1,000 males.
  * Literacy: 59.13% (Tehsil) vs 78.4% (Core town ward).
  * Core Town Population: 558 persons (strictly differentiated from tehsil totals).
* **Mineral Inventory:** 9.38 Million Tonnes estimated Tertiary coal reserves (GSI 2024).
* Responsive SVG visualization and complete tabular data toggle.

### 10. Myths vs Documented Evidence (`/myths`)
* Rigorous evidential audit testing 5 major claims:
  1. *Etymology of "Kalakote" (Black Fort vs coal outcrops / watchtowers).*
  2. *KTPS shutdown causes (Fuel incompatibility vs 1990s militancy).*
  3. *Administrative status (ADC Sub-division vs separate district).*
  4. *Pandu Kund at Panjnara (Mahabharata legend vs medieval Kashmiri stone masonry).*
  5. *Mining continuity (Commercial scale in 2026 vs DGMS safety suspension).*

### 11. People & Oral History (`/people`)
* Documented first-person accounts from retired adit sirdars, power station technicians, and Joint Action Committee lawyers.
* Explicit labeling as personal recollection rather than independently verified fact.
* Moderated submission workflow for community contributions.

### 12. Historical Document Archive (`/archive`)
* Searchable and filterable catalog of primary court judgments, GSI memoirs, legislative proceedings, and census gazetteers.
* Instant modal inspector for deep citations and source excerpts.

---

## 4. Unresolved Research Questions

The platform maintains an explicit public ledger of historical questions where reliable public records remain pending as of October 2026:

1. **Earliest Epigraphic Name Attestation:** No surviving pre-1800 Sanskrit or Persian inscription utilizing the exact name "Kalakote" has been located.
2. **Panjnara Donor Monarchy:** The commissioning monarch of the Kashmiri-style stone sanctums at Pandu Kund remains unrecorded in deciphered epigraphs.
3. **Skoda Asset Liquidation Ledger:** Full public audit records detailing whether all decommissioned Czechoslovakian turbine scrap was formally auctioned or retained in departmental depots.
4. **CMPF Balance Sheet:** Exact audited quantum of legacy Coal Mines Provident Fund liabilities owed to retired Kalakote miners.
5. **Badhog Reserve Commercial Viability:** Whether ongoing GSI core drilling in Badhog sector has established commercially extractable seams capable of sustaining mechanized mining under modern environmental norms.

---

## 5. Technology Stack & Design System

* **Frontend Framework:** React 19 + TypeScript + Vite 8
* **Styling & Design System:** Tailwind CSS
  * Primary Background: `#080B09`
  * Secondary Surface: `#111713`
  * Forest Green: `#20392C`
  * Muted Warm Gold: `#C5A56A`
  * Primary Text: `#F4F1E8`
  * Muted Text: `#A4ADA5`
* **Typography:** Cormorant Garamond / Playfair Display (Serif Headings) + Inter / Manrope (Sans Body & Data)
* **Cartography:** Leaflet with CartoDB Dark Matter vector basemaps
* **Icons:** Lucide React
* **Build Architecture:** Code-split bundle with separate `vendor`, `leaflet`, and `icons` chunks.

---

## 6. Installation & Development

### Prerequisites
* Node.js v18+ (tested on Node v24)
* npm v9+

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile and build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 7. License & Rights Notice

* **Codebase & Architecture:** Open Source under the MIT License.
* **Archival Texts & Public Records:** Cited under educational fair-use principles.
* **Historical Reconstructions:** Labeled as interpretive reconstructions; not authentic archival photography.

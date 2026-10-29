export type VerificationStatus =
  | 'VERIFIED'
  | 'PARTIALLY VERIFIED'
  | 'UNVERIFIED'
  | 'CONFLICTING SOURCES'
  | 'RESEARCH PENDING';

export type DatePrecision = 'exact-date' | 'month-year' | 'year' | 'approximate-period' | 'era';

export type GeographicScope = 'Kalakote Town' | 'Kalakote Tehsil' | 'Rajouri District' | 'Jammu Region' | 'Pir Panjal' | 'Jammu & Kashmir';

export interface SourceReference {
  id: string;
  title: string;
  institutionOrAuthor: string;
  publicationDate: string;
  url?: string;
  sourceType: 'Official Government Order' | 'Court Judgment' | 'Geological Survey (GSI)' | 'Census of India' | 'Assembly Proceeding' | 'Academic Journal' | 'Gazetteer / Archival Record' | 'News Report';
  relevantExcerpt: string;
  verificationStatus: VerificationStatus;
  lastVerificationDate: string;
  accessStatus: 'Public Online' | 'Archival Reference' | 'Gated / Inaccessible';
}

export interface HistoricalEvent {
  id: string;
  title: string;
  eventDate: string;
  datePrecision: DatePrecision;
  era: 'Ancient & Classical' | 'Medieval Hill Kingdoms' | 'Sikh & Dogra Period' | 'Colonial Era & Early Geology' | 'Post-Independence & Industrial Dawn' | 'Thermal Era & Coal Expansion' | 'Militancy, Decline & Reorganization' | 'Contemporary Administration (2018-2026)';
  category: 'Industrial & Mining' | 'Governance & Politics' | 'Geology' | 'Heritage & Culture' | 'Infrastructure' | 'Dispute / Litigation';
  summary: string;
  detailedAnalysis: string;
  geographicScope: GeographicScope;
  verificationStatus: VerificationStatus;
  sourceIds: string[];
  lastVerifiedDate: string;
  significance: 'High' | 'Medium' | 'Foundational';
  imageUrl?: string;
  imageCaption?: string;
  isReconstructionImage?: boolean;
}

export interface MineRecord {
  id: string;
  officialName: string;
  blockOrArea: string;
  coordinates: {
    lat: number;
    lng: number;
    isApproximate: boolean;
  };
  geologicalFormation: string;
  coalRank: string;
  firstDocumentedReference: string;
  explorationHistory: string;
  verifiedProductionPeriod: string;
  miningMethod: 'Incline / Underground Adits' | 'Open Cast' | 'Mixed Adit & Shaft';
  operatingEntity: string;
  productionStatistics: {
    year?: string;
    outputMetricTonnes?: number;
    notes: string;
  }[];
  peakEmploymentRecorded?: string;
  safetyRecords: string[];
  dgmsDirectives: string[];
  environmentalImpact: string;
  currentStatus: 'OPERATIONAL' | 'SUSPENDED' | 'CLOSED' | 'UNDER INVESTIGATION' | 'STATUS UNKNOWN';
  lastVerifiedDate: string;
  statusNotes: string;
  sourceIds: string[];
}

export interface IndustrialProject {
  id: string;
  projectName: string;
  purpose: string;
  announcementDate: string;
  constructionDate?: string;
  commissioningDate?: string;
  shutdownDate?: string;
  formalClosureDate?: string;
  responsibleDepartment: string;
  installedCapacity?: string;
  generatingUnits?: string;
  equipmentOrigin?: string;
  fuelQualityIssues?: string;
  fundingAndExpenditure?: string;
  majorChanges: string[];
  documentedClosureReasons: string[];
  currentStatus: 'PROPOSED' | 'APPROVED' | 'UNDER CONSTRUCTION' | 'OPERATIONAL' | 'PARTIALLY OPERATIONAL' | 'SUSPENDED' | 'CLOSED' | 'TRANSFERRED' | 'STATUS UNKNOWN';
  lastVerifiedDate: string;
  communityImpact: string;
  unresolvedQuestions: string[];
  sourceIds: string[];
}

export interface GeographicLocation {
  id: string;
  name: string;
  category: 'Town / Village' | 'Mine / Coalfield' | 'Industrial Site' | 'Heritage & Sacred Site' | 'Natural Feature / Spring' | 'Administrative Office';
  coordinates: [number, number]; // [lat, lng]
  isApproximate: boolean;
  elevationMeters?: number;
  description: string;
  historicalSignificance: string;
  sourceIds: string[];
}

export interface HeritageSite {
  id: string;
  name: string;
  alternateNames: string[];
  location: string;
  coordinates: [number, number];
  isApproximateCoordinates: boolean;
  approximateAge?: string;
  architecturalStyle: string;
  culturalSignificance: string;
  folkloreVsFact: string;
  conservationStatus: 'Protected' | 'Unprotected' | 'Local Custodianship' | 'Vulnerable / Neglected';
  accessibility: string;
  sourceIds: string[];
}

export interface OralHistoryRecord {
  id: string;
  narratorName: string;
  roleOrBackground: string;
  interviewDate: string;
  location: string;
  thematicCategory: 'Mining Operations' | 'Thermal Power Plant Life' | '2018 ADC Agitation' | 'Rural Agrarian Life';
  summary: string;
  excerpt: string;
  consentObtained: boolean;
  verificationNotes: string;
  relatedEventIds: string[];
}

export interface MythVsEvidence {
  id: string;
  claim: string;
  popularPerception: string;
  documentedEvidence: string;
  sourcesReviewed: string[];
  whatIsEstablished: string;
  whatRemainsUncertain: string;
  verificationStatus: VerificationStatus;
}

export interface DevelopmentMetric {
  id: string;
  indicator: string;
  category: 'Demographics' | 'Literacy' | 'Mining & Minerals' | 'Health & Amenities';
  geographicUnit: 'Kalakote Tehsil' | 'Kalakote Town' | 'Rajouri District';
  source: string;
  referenceYear: string;
  value: string | number;
  unit?: string;
  caveatsAndNotes: string;
}

export interface ResearchQuestion {
  id: string;
  questionNumber: number;
  topic: string;
  title: string;
  currentFinding: string;
  unresolvedDetail: string;
  verificationStatus: VerificationStatus;
  primaryInstitutionsInvolved: string[];
  researchPriority: 'High' | 'Medium' | 'Foundational';
  lastReviewedDate: string;
}

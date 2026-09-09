export interface Medicine {
  id: string;
  brandName: string;
  manufacturer: string;
  saltComposition: string;
  dosageForm: string;
  packSize: string;
  prescribedMRP: number;
  marketPrice: number;
  genericSubstituteName: string;
  genericManufacturer: string;
  genericPrice: number;
  janAushadhiPrice: number;
  savingsPercentage: number;
  bioEquivalenceScore: number;
  category: string;
  scheduleType: 'Schedule H' | 'Schedule H1' | 'OTC';
  image?: string;
  description: string;
}

export interface SubstituteMatrixItem {
  id: string;
  brandName: string;
  manufacturer: string;
  saltComposition: string;
  bioEquivalenceScore: number;
  packMRP: number;
  savingsAmount: number;
  savingsPercentage: number;
  badge?: string;
  badgeType?: 'primary' | 'government' | 'secondary' | 'neutral';
  isPrescribedOriginal?: boolean;
  image?: string;
}

export interface PharmacyStore {
  id: string;
  name: string;
  storeType: 'Jan Aushadhi (Govt)' | 'Organized Chain' | 'Independent Chemist' | 'Online E-Pharmacy';
  address: string;
  locality: string;
  pincode: string;
  distanceKm: number;
  coordinates: {
    lat: number;
    lng: number;
    topPercent: string;
    leftPercent: string;
  };
  phone: string;
  openHours: string;
  isOpen24: boolean;
  priceForMoxikind: number;
  mrp: number;
  stockCount: number;
  stockStatus: 'High Stock' | 'Ample Stock' | 'Low Stock' | 'In Stock';
  lastSyncedAgo: string;
  batchNumber?: string;
  deliveryTime?: string;
  abdmVerified: boolean;
  notes?: string;
}

export interface PatientReservation {
  id: string;
  patientName: string;
  holdCode: string;
  shelfLocation: string;
  medicineName: string;
  genericSwitched: boolean;
  savingsAmount: number;
  reservedTimeAgo: string;
  amountDue: number;
  paymentMethod: string;
  status: 'Awaiting Pickup' | 'Dispensed' | 'Expired';
  erxVerified: boolean;
  phone?: string;
}

export interface InventoryItem {
  id: string;
  medicineName: string;
  packDetails: string;
  manufacturer: string;
  hsnCode: string;
  batchNumber: string;
  saltComposition: string;
  stockStrips: number;
  rackLocation: string;
  storePriceMRP: number;
  marginPercentage: number;
  bengaluruBenchmarkRange: string;
  benchmarkBadge: string;
  substituteStrategy: string;
  substitutePriceSaving: string;
  isFastMover?: boolean;
  isLowStock?: boolean;
  reservedByAppCount?: number;
  drugClass: string;
}

export type UserRole = 'patient' | 'pharmacist' | 'admin';

export interface MedicalCondition {
  id: string;
  conditionName: string;
  diagnosedYear?: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Controlled';
  notes?: string;
  contraindications?: string[];
}

export interface RecommendedSaltItem {
  saltName: string;
  indication: string;
  standardDosage: string;
  brandedExamples: string[];
  brandedAvgMRP: number;
  janAushadhiGenericPrice: number;
  savingsPct: number;
  firstLineClinicalRationale: string;
  contraindicationWarning?: string;
  inStockStoresCount: number;
}

export interface ConditionRecommendation {
  conditionName: string;
  category: string;
  recommendedSalts: RecommendedSaltItem[];
  lifestyleTips: string[];
  monitoringGuideline: string;
  commonContraindications: {
    drugClass: string;
    reason: string;
  }[];
}

export interface MedicineHistoryItem {
  id: string;
  medicineName: string;
  brandPrescribed: string;
  saltComposition: string;
  dosage: string;
  frequency: string;
  conditionTargeted: string;
  startDate: string;
  endDate?: string;
  status: 'Active (Ongoing)' | 'Completed' | 'Refill Due' | 'Discontinued';
  pharmacyName: string;
  pharmacyLocality: string;
  mrpPaid: number;
  originalBrandMRP: number;
  savingsRealized: number;
  isJanAushadhi: boolean;
  holdCode?: string;
  refillDaysLeft?: number;
  notes?: string;
  prescribingDoctor?: string;
  totalDaysCourse?: number;
  remainingPills?: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleBadge: string;
  avatarText: string;
  organization?: string;
  branchId?: string;
  licenseNumber?: string;
  phone?: string;
  abdmVerified?: boolean;
  age?: number;
  gender?: string;
  pincode?: string;
  locality?: string;
  abhaId?: string;
  existingConditions?: string[];
}

export interface PharmacyApplication {
  id: string;
  pharmacyName: string;
  storeType: string;
  locality: string;
  pincode: string;
  proprietorName: string;
  licenseNumber: string;
  abdmFacilityId: string;
  posSoftware: string;
  submittedDate: string;
  status: 'Pending Verification' | 'Approved' | 'Requires Audit';
  initialSKUCount: number;
}

export interface PriceDiscrepancyReport {
  id: string;
  pharmacyName: string;
  medicineName: string;
  reportedPrice: number;
  officialPrice: number;
  differencePercentage: number;
  receiptAttached: boolean;
  patientPhone: string;
  locality: string;
  timestamp: string;
  status: 'Under Investigation' | 'Warning Issued' | 'Resolved / Refunded' | 'Dismissed';
  notes?: string;
}

export interface CdscoPriceCeilingItem {
  id: string;
  saltName: string;
  dosageForm: string;
  therapeuticCategory: string;
  dpcoCeilingPricePerUnit: number;
  lastRevisedDate: string;
  referenceStandard: string;
  isScheduleH1: boolean;
}

export type AppViewMode = 
  | 'consumer-discovery'
  | 'rx-matcher'
  | 'gis-map-locator'
  | 'medication-history'
  | 'b2b-partner-portal'
  | 'admin-portal'
  | 'system-architecture';

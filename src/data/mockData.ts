import { 
  Medicine, 
  SubstituteMatrixItem, 
  PharmacyStore, 
  PatientReservation, 
  InventoryItem,
  UserSession,
  PharmacyApplication,
  PriceDiscrepancyReport,
  CdscoPriceCeilingItem,
  MedicalCondition,
  MedicineHistoryItem,
  ConditionRecommendation
} from '../types';

export const POPULAR_MEDICINES: Medicine[] = [
  {
    id: 'augmentin-625',
    brandName: 'Augmentin 625 Duo',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    saltComposition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    dosageForm: '10 Tablets / Strip',
    packSize: 'Strip of 10 tablets',
    prescribedMRP: 223.50,
    marketPrice: 224.50,
    genericSubstituteName: 'Moxikind-CV 625',
    genericManufacturer: 'Mankind Pharma Ltd / PMBJP',
    genericPrice: 62.80,
    janAushadhiPrice: 42.00,
    savingsPercentage: 72,
    bioEquivalenceScore: 99.4,
    category: 'Antibiotics & Anti-Infective',
    scheduleType: 'Schedule H1',
    description: 'High-strength broad-spectrum antibiotic prescribed for bacterial infections. 100% molecularly bio-equivalent to Moxikind-CV and Jan Aushadhi generic.',
  },
  {
    id: 'lipitor-20',
    brandName: 'Lipitor 20mg',
    manufacturer: 'Pfizer India Limited',
    saltComposition: 'Atorvastatin Calcium IP (20mg)',
    dosageForm: '15 Tablets / Strip',
    packSize: 'Strip of 15 tablets',
    prescribedMRP: 465.00,
    marketPrice: 452.00,
    genericSubstituteName: 'Atorlip 20 / PMBJP Atorvastatin',
    genericManufacturer: 'Cipla Ltd / Bureau of Pharma PSUs',
    genericPrice: 68.50,
    janAushadhiPrice: 18.00,
    savingsPercentage: 86,
    bioEquivalenceScore: 99.7,
    category: 'Cardiac & Cholesterol',
    scheduleType: 'Schedule H',
    description: 'Statins used for lowering low-density cholesterol and preventing cardiovascular arterial blockages.',
  },
  {
    id: 'glucophage-500',
    brandName: 'Glucophage 500mg',
    manufacturer: 'Merck Healthcare / Procter & Gamble',
    saltComposition: 'Metformin Hydrochloride IP (500mg)',
    dosageForm: '20 Tablets / Strip',
    packSize: 'Strip of 20 tablets',
    prescribedMRP: 185.00,
    marketPrice: 178.00,
    genericSubstituteName: 'Glycomet 500 / PMBJP Metformin',
    genericManufacturer: 'USV Ltd / Jan Aushadhi',
    genericPrice: 34.20,
    janAushadhiPrice: 14.00,
    savingsPercentage: 82,
    bioEquivalenceScore: 99.9,
    category: 'Diabetes Mellitus',
    scheduleType: 'Schedule H',
    description: 'First-line anti-hyperglycemic agent for managing Type-2 Diabetes Mellitus with identical therapeutic index.',
  },
  {
    id: 'dolo-650',
    brandName: 'Dolo 650mg',
    manufacturer: 'Micro Labs Limited',
    saltComposition: 'Paracetamol IP (650mg)',
    dosageForm: '15 Tablets / Strip',
    packSize: 'Strip of 15 tablets',
    prescribedMRP: 33.60,
    marketPrice: 33.50,
    genericSubstituteName: 'Pacimol 650 / PMBJP Paracetamol',
    genericManufacturer: 'IPCA / Cipla / Jan Aushadhi',
    genericPrice: 22.50,
    janAushadhiPrice: 13.50,
    savingsPercentage: 60,
    bioEquivalenceScore: 100,
    category: 'Pain & Antipyretic',
    scheduleType: 'OTC',
    description: 'Analgesic and antipyretic medication for fever reduction and symptomatic relief of body ache.',
  },
  {
    id: 'pantocid-dsr',
    brandName: 'Pantocid DSR',
    manufacturer: 'Sun Pharma Industries Ltd',
    saltComposition: 'Pantoprazole Sodium IP (40mg) + Domperidone (30mg SR)',
    dosageForm: '10 Capsules / Strip',
    packSize: 'Strip of 10 capsules',
    prescribedMRP: 218.00,
    marketPrice: 210.00,
    genericSubstituteName: 'Pantakind DSR / PMBJP Panto-D',
    genericManufacturer: 'Mankind / Jan Aushadhi',
    genericPrice: 58.00,
    janAushadhiPrice: 26.00,
    savingsPercentage: 73,
    bioEquivalenceScore: 99.2,
    category: 'Gastroenterology & GERD',
    scheduleType: 'Schedule H',
    description: 'Proton pump inhibitor combined with anti-emetic prokinetic for gastroesophageal reflux disease and hyperacidity.',
  },
  {
    id: 'telma-40',
    brandName: 'Telma 40mg',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    saltComposition: 'Telmisartan IP (40mg)',
    dosageForm: '15 Tablets / Strip',
    packSize: 'Strip of 15 tablets',
    prescribedMRP: 142.00,
    marketPrice: 138.00,
    genericSubstituteName: 'Telmikind 40 / PMBJP Telmisartan',
    genericManufacturer: 'Mankind / Jan Aushadhi',
    genericPrice: 42.00,
    janAushadhiPrice: 19.50,
    savingsPercentage: 70,
    bioEquivalenceScore: 99.5,
    category: 'Hypertension & Cardiac',
    scheduleType: 'Schedule H',
    description: 'Angiotensin II receptor antagonist prescribed for primary hypertension and cardiovascular risk reduction.',
  }
];

export const AUGMENTIN_SUBSTITUTE_MATRIX: SubstituteMatrixItem[] = [
  {
    id: 'pmbjp-amoxyclav',
    brandName: 'Jan Aushadhi Generic Amoxy-Clav 625',
    manufacturer: 'Pradhan Mantri Bhartiya Janaushadhi (BPPI)',
    saltComposition: 'Amoxicillin IP 500mg + Potassium Clavulanate IP 125mg',
    bioEquivalenceScore: 99.8,
    packMRP: 42.00,
    savingsAmount: 181.50,
    savingsPercentage: 81,
    badge: 'Govt. Price Control (PMBJP)',
    badgeType: 'government',
  },
  {
    id: 'moxikind-cv-625',
    brandName: 'Moxikind-CV 625',
    manufacturer: 'Mankind Pharma Ltd',
    saltComposition: 'Amoxicillin IP 500mg + Potassium Clavulanate IP 125mg',
    bioEquivalenceScore: 99.4,
    packMRP: 94.00,
    savingsAmount: 129.50,
    savingsPercentage: 58,
    badge: 'Top Indian Brand Substitute',
    badgeType: 'primary',
  },
  {
    id: 'amoxyclav-625',
    brandName: 'Amoxyclav 625',
    manufacturer: 'Cipla Limited',
    saltComposition: 'Amoxicillin IP 500mg + Potassium Clavulanate IP 125mg',
    bioEquivalenceScore: 99.1,
    packMRP: 105.00,
    savingsAmount: 118.50,
    savingsPercentage: 53,
    badge: 'Export Quality Standard',
    badgeType: 'secondary',
  },
  {
    id: 'clavam-625',
    brandName: 'Clavam 625',
    manufacturer: 'Alkem Laboratories Ltd',
    saltComposition: 'Amoxicillin IP 500mg + Potassium Clavulanate IP 125mg',
    bioEquivalenceScore: 98.9,
    packMRP: 122.00,
    savingsAmount: 101.50,
    savingsPercentage: 45,
    badge: 'Popular Retail Alternative',
    badgeType: 'neutral',
  },
  {
    id: 'augmentin-original',
    brandName: 'Augmentin 625 Duo',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals',
    saltComposition: 'Amoxicillin IP 500mg + Potassium Clavulanate IP 125mg',
    bioEquivalenceScore: 100,
    packMRP: 223.50,
    savingsAmount: 0,
    savingsPercentage: 0,
    badge: 'Prescribed Original Baseline',
    badgeType: 'neutral',
    isPrescribedOriginal: true,
  }
];

export const BENGALURU_PHARMACIES: PharmacyStore[] = [
  {
    id: 'pmbjp-indiranagar',
    name: 'PMBJP Jan Aushadhi Kendra (Store #KA-1042)',
    storeType: 'Jan Aushadhi (Govt)',
    address: 'Near Indiranagar Club, 100ft Road, HAL 2nd Stage',
    locality: 'Indiranagar',
    pincode: '560038',
    distanceKm: 0.4,
    coordinates: {
      lat: 12.9716,
      lng: 77.6412,
      topPercent: '42%',
      leftPercent: '44%',
    },
    phone: '+91 80 2520 1192',
    openHours: '08:00 AM - 09:30 PM',
    isOpen24: false,
    priceForMoxikind: 42.00,
    mrp: 223.50,
    stockCount: 48,
    stockStatus: 'High Stock',
    lastSyncedAgo: '3 mins ago (Live ABDM Telemetry)',
    batchNumber: 'JAK-2026-B819',
    abdmVerified: true,
    notes: 'Official Pradhan Mantri Bhartiya Janaushadhi Pariyojana center. 100% CDSCO audited lot.',
  },
  {
    id: 'apollo-indiranagar',
    name: 'Apollo 24/7 Pharmacy (100ft Road)',
    storeType: 'Organized Chain',
    address: 'Shop No. 12, 100 Feet Rd, 12th Main Corner',
    locality: 'Indiranagar',
    pincode: '560038',
    distanceKm: 0.8,
    coordinates: {
      lat: 12.9782,
      lng: 77.6435,
      topPercent: '32%',
      leftPercent: '56%',
    },
    phone: '+91 80 4115 8890',
    openHours: 'Open 24 Hours',
    isOpen24: true,
    priceForMoxikind: 94.00,
    mrp: 223.50,
    stockCount: 22,
    stockStatus: 'Ample Stock',
    lastSyncedAgo: '12 mins ago (Marg ERP API)',
    deliveryTime: '30 mins instant drop',
    abdmVerified: true,
    notes: '24/7 night dispensing counter active. Pharmacist on-duty.',
  },
  {
    id: 'medplus-domlur',
    name: 'MedPlus Pharmacy (Domlur Junction)',
    storeType: 'Organized Chain',
    address: '71/4 Intermediate Ring Road, Near Domlur Flyover',
    locality: 'Domlur / Indiranagar Border',
    pincode: '560071',
    distanceKm: 1.4,
    coordinates: {
      lat: 12.9610,
      lng: 77.6380,
      topPercent: '65%',
      leftPercent: '38%',
    },
    phone: '+91 80 2535 0098',
    openHours: '07:30 AM - 11:00 PM',
    isOpen24: false,
    priceForMoxikind: 89.50,
    mrp: 223.50,
    stockCount: 11,
    stockStatus: 'In Stock',
    lastSyncedAgo: '18 mins ago (MedPlus POS)',
    deliveryTime: '45 mins delivery',
    abdmVerified: true,
    notes: 'Special 5% loyalty cashback with MedPlus card.',
  },
  {
    id: 'sri-venkateshwara-cmh',
    name: 'Sri Venkateshwara Medicals & Chemist',
    storeType: 'Independent Chemist',
    address: '244 CMH Road, Near Metro Station Exit B',
    locality: 'Indiranagar',
    pincode: '560038',
    distanceKm: 1.1,
    coordinates: {
      lat: 12.9790,
      lng: 77.6320,
      topPercent: '28%',
      leftPercent: '25%',
    },
    phone: '+91 98450 19283',
    openHours: '08:30 AM - 10:30 PM',
    isOpen24: false,
    priceForMoxikind: 92.00,
    mrp: 223.50,
    stockCount: 18,
    stockStatus: 'In Stock',
    lastSyncedAgo: '26 mins ago (C-Square POS)',
    abdmVerified: true,
    notes: 'Trusted community chemist since 1994. Cold-chain storage audited.',
  },
  {
    id: 'wellness-forever-koramangala',
    name: 'Wellness Forever 24x7 Life Care',
    storeType: 'Organized Chain',
    address: '80 Feet Road, 4th Block, Koramangala',
    locality: 'Koramangala',
    pincode: '560034',
    distanceKm: 2.2,
    coordinates: {
      lat: 12.9350,
      lng: 77.6240,
      topPercent: '82%',
      leftPercent: '68%',
    },
    phone: '+91 80 6620 4400',
    openHours: 'Open 24 Hours',
    isOpen24: true,
    priceForMoxikind: 98.00,
    mrp: 223.50,
    stockCount: 3,
    stockStatus: 'Low Stock',
    lastSyncedAgo: '5 mins ago',
    abdmVerified: true,
    notes: 'Low stock warning! Only 3 strips of Moxikind-CV remain on shelf.',
  },
  {
    id: 'tata-1mg-express',
    name: 'Tata 1mg Quick Dispense Hub',
    storeType: 'Online E-Pharmacy',
    address: 'Old Airport Road, Kodihalli Delivery Hub',
    locality: 'Old Airport Road',
    pincode: '560008',
    distanceKm: 2.9,
    coordinates: {
      lat: 12.9590,
      lng: 77.6530,
      topPercent: '52%',
      leftPercent: '78%',
    },
    phone: '+91 80 4010 3300',
    openHours: '06:00 AM - Midnight',
    isOpen24: false,
    priceForMoxikind: 96.00,
    mrp: 223.50,
    stockCount: 65,
    stockStatus: 'High Stock',
    lastSyncedAgo: '1 min ago (Tata 1mg Warehouse API)',
    deliveryTime: '2 hours guaranteed delivery',
    abdmVerified: true,
    notes: 'Online fulfillment with doorstep temperature-controlled bag delivery.',
  }
];

export const INITIAL_PATIENT_RESERVATIONS: PatientReservation[] = [
  {
    id: 'res-1',
    patientName: 'Riya Sharma',
    holdCode: '#MS-7891',
    shelfLocation: 'Shelf B4',
    medicineName: 'Moxikind-CV 625 (10 tabs)',
    genericSwitched: true,
    savingsAmount: 129.50,
    reservedTimeAgo: '12m ago',
    amountDue: 94.00,
    paymentMethod: 'Pay at Counter (UPI / Cash)',
    status: 'Awaiting Pickup',
    erxVerified: true,
    phone: '+91 98765 43210'
  },
  {
    id: 'res-2',
    patientName: 'Arjun Patel',
    holdCode: '#MS-7882',
    shelfLocation: 'Shelf A2',
    medicineName: 'Generic Atorvastatin 20mg (15 tabs)',
    genericSwitched: true,
    savingsAmount: 99.00,
    reservedTimeAgo: '24m ago',
    amountDue: 36.00,
    paymentMethod: 'Prepaid via PhonePe',
    status: 'Awaiting Pickup',
    erxVerified: true,
    phone: '+91 98111 22334'
  },
  {
    id: 'res-3',
    patientName: 'Marcus Banerjee',
    holdCode: '#MS-7870',
    shelfLocation: 'Store Pick-up',
    medicineName: 'Augmentin 625 Duo (Original Brand)',
    genericSwitched: false,
    savingsAmount: 0.00,
    reservedTimeAgo: '42m ago',
    amountDue: 223.50,
    paymentMethod: 'Pay at Counter',
    status: 'Awaiting Pickup',
    erxVerified: true,
    phone: '+91 99002 44556'
  },
  {
    id: 'res-4',
    patientName: 'Sunita Narayanan',
    holdCode: '#MS-7855',
    shelfLocation: 'Shelf C1',
    medicineName: 'Glycomet 500 (20 tabs)',
    genericSwitched: true,
    savingsAmount: 143.80,
    reservedTimeAgo: '1h 15m ago',
    amountDue: 34.20,
    paymentMethod: 'Prepaid via GPay',
    status: 'Dispensed',
    erxVerified: true,
    phone: '+91 97400 99881'
  }
];

export const INITIAL_B2B_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    medicineName: 'Augmentin 625 Duo',
    packDetails: '10 Tabs / Strip',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals',
    hsnCode: '30042010',
    batchNumber: 'GSK-25B09',
    saltComposition: 'Amoxicillin IP 500mg + Pot. Clavulanate 125mg',
    stockStrips: 14,
    rackLocation: 'Rack A-12',
    storePriceMRP: 223.50,
    marginPercentage: 22,
    bengaluruBenchmarkRange: '₹220 - ₹224.50',
    benchmarkBadge: 'Standard MRP',
    substituteStrategy: 'Moxikind-CV linked (₹94.00)',
    substitutePriceSaving: 'Save ₹129.50 (58%)',
    isFastMover: true,
    drugClass: 'Antibiotics'
  },
  {
    id: 'inv-2',
    medicineName: 'Moxikind-CV 625mg',
    packDetails: '10 Tabs / Strip',
    manufacturer: 'Mankind Pharma Ltd',
    hsnCode: '30042010',
    batchNumber: 'MK-8812A',
    saltComposition: 'Amoxicillin IP 500mg + Pot. Clavulanate 125mg',
    stockStrips: 42,
    rackLocation: 'Rack A-14',
    storePriceMRP: 94.00,
    marginPercentage: 34,
    bengaluruBenchmarkRange: '₹89.50 - ₹98.00',
    benchmarkBadge: 'Best in Bengaluru!',
    substituteStrategy: 'Direct Generic Equivalent',
    substitutePriceSaving: 'Recommended Switch',
    isFastMover: true,
    drugClass: 'Antibiotics'
  },
  {
    id: 'inv-3',
    medicineName: 'Lipitor 20mg',
    packDetails: '15 Tabs / Strip',
    manufacturer: 'Pfizer India Ltd',
    hsnCode: '30049099',
    batchNumber: 'PF-9021',
    saltComposition: 'Atorvastatin Calcium IP 20mg',
    stockStrips: 6,
    rackLocation: 'Rack C-02',
    storePriceMRP: 135.00,
    marginPercentage: 20,
    bengaluruBenchmarkRange: '₹130 - ₹145',
    benchmarkBadge: 'Market Average',
    substituteStrategy: 'Generic Atorvastatin linked',
    substitutePriceSaving: 'Save ₹99.00 (73%)',
    drugClass: 'Cardiovascular'
  },
  {
    id: 'inv-4',
    medicineName: 'Generic Atorvastatin 20mg',
    packDetails: '15 Tabs / Strip',
    manufacturer: 'Cipla Ltd / Zee Labs',
    hsnCode: '30049099',
    batchNumber: 'CIP-4019',
    saltComposition: 'Atorvastatin Calcium IP 20mg',
    stockStrips: 85,
    rackLocation: 'Rack C-04',
    storePriceMRP: 36.00,
    marginPercentage: 42,
    bengaluruBenchmarkRange: '₹34 - ₹42',
    benchmarkBadge: 'Best Value',
    substituteStrategy: 'Primary Generic Recommendation',
    substitutePriceSaving: 'High Margin Driver',
    isFastMover: true,
    drugClass: 'Cardiovascular'
  },
  {
    id: 'inv-5',
    medicineName: 'Glucophage 500mg',
    packDetails: '20 Tabs / Strip',
    manufacturer: 'Merck Healthcare',
    hsnCode: '30049089',
    batchNumber: 'MK-1102',
    saltComposition: 'Metformin Hydrochloride IP 500mg',
    stockStrips: 2,
    rackLocation: 'Rack B-01',
    storePriceMRP: 45.00,
    marginPercentage: 18,
    bengaluruBenchmarkRange: '₹42 - ₹48',
    benchmarkBadge: 'Low Margin',
    substituteStrategy: 'Glycomet 500 available (₹34.20)',
    substitutePriceSaving: 'Switch to Generic',
    isLowStock: true,
    reservedByAppCount: 2,
    drugClass: 'Anti-Diabetic'
  },
  {
    id: 'inv-6',
    medicineName: 'Glycomet 500mg',
    packDetails: '20 Tabs / Strip',
    manufacturer: 'USV Private Limited',
    hsnCode: '30049089',
    batchNumber: 'USV-709',
    saltComposition: 'Metformin Hydrochloride IP 500mg',
    stockStrips: 54,
    rackLocation: 'Rack B-03',
    storePriceMRP: 34.20,
    marginPercentage: 36,
    bengaluruBenchmarkRange: '₹32 - ₹36',
    benchmarkBadge: 'Standard Rate',
    substituteStrategy: 'Top Prescribed Generic',
    substitutePriceSaving: 'Save 24%',
    isFastMover: true,
    drugClass: 'Anti-Diabetic'
  }
];

export const SYSTEM_ARCHITECTURE_MODULES = [
  {
    id: 'client-layer',
    title: 'Client Layer (Next-Gen Responsive Web / PWA)',
    description: 'Mobile & Desktop interface with zero-install PWA, offline-capable local indexation, and real-time WebSocket sync.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Lucide Icons', 'HTML5 Geolocation API', 'Web Worker OCR Engine'],
    keyFeatures: [
      'Microsecond Salt Search Index (<15ms autocomplete)',
      'Camera prescription scan with real-time OCR extraction',
      'Interactive GIS Canvas with real-time geolocation telemetry',
      'Pharmacist Counter POS quick-hold barcode scanner'
    ]
  },
  {
    id: 'edge-gateway',
    title: 'Edge & API Gateway (Cloudflare / NGINX Ingress)',
    description: 'Global edge layer managing TLS termination, DDOS mitigation, DPCO rate limiting, and Geo-routing to nearest health zones.',
    technologies: ['NGINX Reverse Proxy', 'Cloudflare Workers', 'Edge Caching (Cache-Control 300s)', 'JWT Token Validator'],
    keyFeatures: [
      'Geo-IP routing to Bengaluru East, South & Central clusters',
      'Rate-limiting for pharmacy inventory scrapers',
      'Edge SSR hydration for instant First Contentful Paint'
    ]
  },
  {
    id: 'app-layer',
    title: 'Application Services & Domain Logic',
    description: 'Core microservices coordinating pharmaceutical salt matching, pricing benchmarks, and ABDM Ayushman Bharat health record sync.',
    technologies: ['Node.js Express / TSX', 'Salt Parity Matrix Engine', 'CDSCO Drug Database Service', 'ABDM M1/M2/M3 Bridge'],
    keyFeatures: [
      'Chemical Salt Parity Engine: Compares bioavailability AUC, dissolution rates, and Indian Pharmacopoeia standards',
      'DPCO Maximum Retail Price Guard: Flags over-charging chemists instantly',
      'Smart Order Router: Directs patients to nearby Jan Aushadhi Kendras or licensed retail pharmacies with confirmed inventory'
    ]
  },
  {
    id: 'data-layer',
    title: 'Multi-Tenant Data & Observability Layer',
    description: 'Shared platform catalog with isolated tenant stores for independent pharmacies and chain stores.',
    technologies: ['PostgreSQL / Cloud SQL', 'Redis Cache (Stock Telemetry)', 'OpenTelemetry', 'Prometheus & Grafana'],
    keyFeatures: [
      'CDSCO National Formulary: 85,000+ mapped salts & bio-equivalents',
      'Tenant Isolated Marg ERP & C-Square connectors',
      'Full audit trail of Schedule H/H1 dispensed medicines'
    ]
  }
];

export const PRD_METRICS = {
  projectTitle: 'MediSmart: Real-Time Generic Medicine Discovery & Pharmacy Platform',
  version: '2.4.0-PROD',
  complianceStandards: ['CDSCO (Central Drugs Standard Control Organisation)', 'Drugs and Cosmetics Act, 1940', 'Pharmacy Council of India (PCI)', 'ABDM (Ayushman Bharat Digital Mission)'],
  targetMarket: 'Bengaluru Urban District (560001 - 560100) with Pan-India Scalability',
  coreKPIs: [
    { label: 'Average Patient Savings', value: '68.4%', trend: '+4.2% YoY' },
    { label: 'Bio-Equivalence Accuracy', value: '99.8%', trend: 'CDSCO Validated' },
    { label: 'Bengaluru Active Pharmacies', value: '1,480+', trend: 'Online Real-time' },
    { label: 'Jan Aushadhi PMBJP Kendras', value: '184', trend: 'Mapped in BLR' },
    { label: 'Average Reservation Hold Time', value: '18 mins', trend: 'SLA < 30m' }
  ]
};

export const MOCK_USERS: Record<string, UserSession> = {
  admin: {
    id: 'user-admin-01',
    name: 'Dr. Arvind Rao, IAS',
    email: 'arvind.rao@karnatakahealth.gov.in',
    role: 'admin',
    roleBadge: 'State Drug Controller (Admin)',
    avatarText: 'AR',
    organization: 'CDSCO & Karnataka State Drug Control Directorate',
    licenseNumber: 'GOVT-KA-DC-001',
    phone: '+91 94480 12345',
    abdmVerified: true
  },
  pharmacist: {
    id: 'user-pharm-01',
    name: 'Dr. Sarah Jenkins PharmD',
    email: 'sarah.jenkins@healthhub.in',
    role: 'pharmacist',
    roleBadge: 'Lead Pharmacist & Branch Manager',
    avatarText: 'SJ',
    organization: 'Bengaluru Health Hub - Koramangala Branch',
    branchId: 'KA-560034',
    licenseNumber: 'KA-PH-2022-9011',
    phone: '+91 80 4123 9980',
    abdmVerified: true
  },
  pharmacist_pmbjp: {
    id: 'user-pharm-02',
    name: 'Ramesh Gowda B.Pharm',
    email: 'ramesh.pmbjp@janaushadhi.gov.in',
    role: 'pharmacist',
    roleBadge: 'Jan Aushadhi Kendra Officer',
    avatarText: 'RG',
    organization: 'PMBJP Jan Aushadhi Kendra - Indiranagar',
    branchId: 'KA-PMBJP-102',
    licenseNumber: 'KA-PMBJP-2021-4402',
    phone: '+91 80 2520 1199',
    abdmVerified: true
  },
  patient: {
    id: 'user-patient-01',
    name: 'Riya Sharma',
    email: 'riya.sharma@gmail.com',
    role: 'patient',
    roleBadge: 'Caregiver / Patient',
    avatarText: 'RS',
    organization: 'Indiranagar Patient Network',
    phone: '+91 98450 67890',
    abdmVerified: true,
    age: 36,
    gender: 'Female',
    pincode: '560038',
    locality: 'Indiranagar, Bengaluru',
    abhaId: '91-8842-1092-5501@abdm',
    existingConditions: ['Type 2 Diabetes Mellitus', 'Hypertension']
  }
};

export const COMMON_MEDICAL_CONDITIONS_LIST = [
  'Type 2 Diabetes Mellitus',
  'Hypertension (High Blood Pressure)',
  'Asthma / Respiratory Conditions',
  'Dyslipidemia / High Cholesterol',
  'Hypothyroidism',
  'Chronic Kidney Disease (CKD)',
  'Osteoarthritis / Joint Pain',
  'Acid Peptic Disease / GERD'
];

export const MOCK_PATIENT_CONDITIONS: MedicalCondition[] = [
  {
    id: 'cond-01',
    conditionName: 'Type 2 Diabetes Mellitus',
    diagnosedYear: '2022',
    severity: 'Controlled',
    notes: 'HbA1c target < 6.8%. Strictly avoiding high-fructose syrups and unmonitored corticosteroids.',
    contraindications: ['Systemic Corticosteroids (Prednisolone, Dexamethasone)', 'High-dose Thiazide Diuretics']
  },
  {
    id: 'cond-02',
    conditionName: 'Hypertension (High Blood Pressure)',
    diagnosedYear: '2023',
    severity: 'Controlled',
    notes: 'Average resting BP 124/82 mmHg. Low sodium diet prescribed.',
    contraindications: ['Frequent NSAIDs (Ibuprofen, Naproxen, Diclofenac)', 'Decongestants with Pseudoephedrine']
  }
];

export const MOCK_MEDICINE_HISTORY: MedicineHistoryItem[] = [
  {
    id: 'hist-01',
    medicineName: 'Jan Aushadhi Metformin PR 500mg',
    brandPrescribed: 'Glycomet-SR 500mg',
    saltComposition: 'Metformin Hydrochloride (Prolonged Release)',
    dosage: '500mg',
    frequency: '1 Tablet twice daily after meals',
    conditionTargeted: 'Type 2 Diabetes Mellitus',
    startDate: '2026-08-15',
    status: 'Refill Due',
    pharmacyName: 'PMBJP Jan Aushadhi Kendra - Indiranagar',
    pharmacyLocality: 'Indiranagar 100ft Road',
    mrpPaid: 28.00,
    originalBrandMRP: 98.50,
    savingsRealized: 70.50,
    isJanAushadhi: true,
    holdCode: '#MS-9402',
    refillDaysLeft: 3,
    prescribingDoctor: 'Dr. Mohan Kumar MD (Diabetologist, Manipal Hospital)',
    totalDaysCourse: 30,
    remainingPills: 4,
    notes: 'Take with breakfast and dinner. Keep hydration optimal.'
  },
  {
    id: 'hist-02',
    medicineName: 'Jan Aushadhi Telmisartan 40mg',
    brandPrescribed: 'Telma 40mg (Glenmark)',
    saltComposition: 'Telmisartan IP',
    dosage: '40mg',
    frequency: '1 Tablet once daily in morning',
    conditionTargeted: 'Hypertension (High Blood Pressure)',
    startDate: '2026-08-20',
    status: 'Refill Due',
    pharmacyName: 'PMBJP Jan Aushadhi Kendra - Indiranagar',
    pharmacyLocality: 'Indiranagar 100ft Road',
    mrpPaid: 22.50,
    originalBrandMRP: 148.00,
    savingsRealized: 125.50,
    isJanAushadhi: true,
    holdCode: '#MS-8812',
    refillDaysLeft: 5,
    prescribingDoctor: 'Dr. Meenakshi Sundaram MD (Cardiology)',
    totalDaysCourse: 30,
    remainingPills: 6,
    notes: 'Do not discontinue without consulting doctor. Monitored BP steady.'
  },
  {
    id: 'hist-03',
    medicineName: 'Jan Aushadhi Atorvastatin 20mg',
    brandPrescribed: 'Atorva 20mg (Zydus Cadila)',
    saltComposition: 'Atorvastatin Calcium IP',
    dosage: '20mg',
    frequency: '1 Tablet at night before bed',
    conditionTargeted: 'Dyslipidemia / High Cholesterol',
    startDate: '2026-08-01',
    status: 'Active (Ongoing)',
    pharmacyName: 'Bengaluru Health Hub (Koramangala Branch)',
    pharmacyLocality: 'Koramangala 4th Block',
    mrpPaid: 38.00,
    originalBrandMRP: 285.00,
    savingsRealized: 247.00,
    isJanAushadhi: true,
    holdCode: '#MS-7719',
    refillDaysLeft: 18,
    prescribingDoctor: 'Dr. Meenakshi Sundaram MD',
    totalDaysCourse: 30,
    remainingPills: 19,
    notes: 'Lipid profile scheduled for October review.'
  },
  {
    id: 'hist-04',
    medicineName: 'PMBJP Pantoprazole Gastro-Resistant 40mg',
    brandPrescribed: 'Pan 40mg (Alkem)',
    saltComposition: 'Pantoprazole Sodium IP',
    dosage: '40mg',
    frequency: '1 Tablet 30 minutes before breakfast',
    conditionTargeted: 'Acid Peptic Disease / GERD',
    startDate: '2026-07-10',
    endDate: '2026-07-24',
    status: 'Completed',
    pharmacyName: 'MedPlus Pharmacy & Wellness',
    pharmacyLocality: 'HAL 2nd Stage',
    mrpPaid: 21.00,
    originalBrandMRP: 115.00,
    savingsRealized: 94.00,
    isJanAushadhi: true,
    prescribingDoctor: 'Dr. R. K. Varma MBBS (General Physician)',
    totalDaysCourse: 14,
    remainingPills: 0,
    notes: 'Completed 14-day acute gastritis taper course. Symptoms resolved.'
  },
  {
    id: 'hist-05',
    medicineName: 'Jan Aushadhi Amoxicillin + Potassium Clavulanate 625mg',
    brandPrescribed: 'Augmentin 625 Duo (GSK)',
    saltComposition: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    dosage: '625mg',
    frequency: '1 Tablet every 12 hours for 5 days',
    conditionTargeted: 'Bacterial Bronchitis / Upper RTI',
    startDate: '2026-06-12',
    endDate: '2026-06-17',
    status: 'Completed',
    pharmacyName: 'PMBJP Jan Aushadhi Kendra - HAL 2nd Stage',
    pharmacyLocality: 'HAL 2nd Stage, Indiranagar',
    mrpPaid: 78.00,
    originalBrandMRP: 201.27,
    savingsRealized: 123.27,
    isJanAushadhi: true,
    prescribingDoctor: 'Dr. Sunita Rao MD (Pulmonology)',
    totalDaysCourse: 5,
    remainingPills: 0,
    notes: 'Full antibiotic course completed without premature stoppage.'
  },
  {
    id: 'hist-06',
    medicineName: 'Jan Aushadhi Montelukast 10mg + Levocetirizine 5mg',
    brandPrescribed: 'Montair-LC (Cipla)',
    saltComposition: 'Montelukast Sodium 10mg + Levocetirizine 5mg',
    dosage: '10mg/5mg',
    frequency: '1 Tablet bedtime as needed for seasonal allergy',
    conditionTargeted: 'Allergic Rhinitis / Seasonal Asthma',
    startDate: '2026-08-10',
    status: 'Active (Ongoing)',
    pharmacyName: 'PMBJP Jan Aushadhi Kendra - Indiranagar',
    pharmacyLocality: 'Indiranagar 100ft Road',
    mrpPaid: 32.00,
    originalBrandMRP: 182.50,
    savingsRealized: 150.50,
    isJanAushadhi: true,
    refillDaysLeft: 12,
    prescribingDoctor: 'Dr. Sunita Rao MD',
    totalDaysCourse: 20,
    remainingPills: 12,
    notes: 'Take during rainy seasonal weather or allergen spikes.'
  }
];

export const CONDITION_RECOMMENDATIONS_DATA: Record<string, ConditionRecommendation> = {
  'Type 2 Diabetes Mellitus': {
    conditionName: 'Type 2 Diabetes Mellitus',
    category: 'Endocrine & Metabolic Care',
    lifestyleTips: [
      'Maintain 30 minutes of brisk walking or moderate aerobic exercise 5 days/week.',
      'Prioritize complex carbohydrates with low glycemic index (millets, oats, whole grains).',
      'Hydrate with at least 2.5-3L water daily to assist renal excretion of glucose.'
    ],
    monitoringGuideline: 'Check Fasting & Post-prandial blood glucose fortnightly; monitor HbA1c every 3 months (target: < 6.8%).',
    commonContraindications: [
      {
        drugClass: 'Systemic Corticosteroids (Prednisolone, Betamethasone)',
        reason: 'Causes hepatic gluconeogenesis and severe insulin resistance, triggering dangerous blood glucose spikes.'
      },
      {
        drugClass: 'High-dose Thiazide Diuretics',
        reason: 'Can impair pancreatic beta-cell insulin secretion and worsen glycemic control.'
      }
    ],
    recommendedSalts: [
      {
        saltName: 'Metformin Hydrochloride (Prolonged Release 500mg / 1000mg)',
        indication: 'First-line monotherapy for glycemic control and insulin sensitization',
        standardDosage: '500mg - 1000mg once or twice daily after main meals',
        brandedExamples: ['Glycomet-SR', 'Obimet-SR', 'Cetapin-XR'],
        brandedAvgMRP: 98.00,
        janAushadhiGenericPrice: 28.00,
        savingsPct: 71,
        firstLineClinicalRationale: 'ICMR Guidelines 2024 specify Metformin PR as first-line for HbA1c reduction without hypoglycemia risk.',
        inStockStoresCount: 14
      },
      {
        saltName: 'Glimepiride 1mg / 2mg Tablet',
        indication: 'Sulfonylurea secretagogue for post-prandial glucose surges',
        standardDosage: '1mg or 2mg taken immediately before breakfast',
        brandedExamples: ['Amaryl 1mg/2mg', 'Glimestar', 'Zoryl'],
        brandedAvgMRP: 112.00,
        janAushadhiGenericPrice: 19.50,
        savingsPct: 83,
        firstLineClinicalRationale: 'Second-line addition when Metformin monotherapy achieves inadequate HbA1c reduction.',
        inStockStoresCount: 12
      },
      {
        saltName: 'Dapagliflozin 10mg Tablet',
        indication: 'SGLT2 inhibitor providing glycemic control with cardio-renal protection',
        standardDosage: '10mg once daily in morning with or without food',
        brandedExamples: ['Forxiga 10mg', 'Daxin', 'Oxra'],
        brandedAvgMRP: 540.00,
        janAushadhiGenericPrice: 85.00,
        savingsPct: 84,
        firstLineClinicalRationale: 'Proven reduction in cardiovascular hospitalization and slows progression of diabetic kidney disease.',
        inStockStoresCount: 9
      },
      {
        saltName: 'Teneligliptin 20mg Tablet',
        indication: 'DPP-4 inhibitor enhancing endogenous incretin levels without weight gain',
        standardDosage: '20mg once daily',
        brandedExamples: ['Ziten 20mg', 'Dynaglipt', 'Tenali'],
        brandedAvgMRP: 165.00,
        janAushadhiGenericPrice: 34.00,
        savingsPct: 79,
        firstLineClinicalRationale: 'Safely administered without dose titration even in mild-to-moderate renal impairment.',
        inStockStoresCount: 11
      }
    ]
  },
  'Hypertension (High Blood Pressure)': {
    conditionName: 'Hypertension (High Blood Pressure)',
    category: 'Cardiovascular Care',
    lifestyleTips: [
      'Adopt DASH diet guidelines: restrict daily sodium intake to under 2.0g (approx 1 level teaspoon salt).',
      'Avoid high-sodium preserved foods (pickles, papads, canned broths, salted snacks).',
      'Incorporate stress management, regular sleep hygiene, and daily aerobic movement.'
    ],
    monitoringGuideline: 'Log resting blood pressure 2-3 times per week; target seated BP < 130/80 mmHg.',
    commonContraindications: [
      {
        drugClass: 'Frequent NSAIDs (Ibuprofen, Naproxen, Diclofenac)',
        reason: 'Inhibits renal prostaglandin synthesis, leading to sodium and water retention and blunting anti-hypertensive drugs.'
      },
      {
        drugClass: 'Oral Decongestants containing Pseudoephedrine or Phenylephrine',
        reason: 'Causes systemic vasoconstriction, causing sudden acute blood pressure elevations.'
      }
    ],
    recommendedSalts: [
      {
        saltName: 'Telmisartan 40mg Tablet IP',
        indication: 'Angiotensin II Receptor Blocker (ARB) with 24-hour sustained vascular protection',
        standardDosage: '40mg once daily in morning',
        brandedExamples: ['Telma 40', 'Micardis', 'Telmikind'],
        brandedAvgMRP: 148.00,
        janAushadhiGenericPrice: 22.50,
        savingsPct: 85,
        firstLineClinicalRationale: 'Cardio-protective ARB with longest elimination half-life (24 hrs) preventing early morning BP spikes.',
        inStockStoresCount: 16
      },
      {
        saltName: 'Amlodipine 5mg Tablet IP',
        indication: 'Dihydropyridine Calcium Channel Blocker for arterial vasodilation',
        standardDosage: '5mg once daily',
        brandedExamples: ['Norvasc 5mg', 'Amlopres 5', 'Stamlo 5'],
        brandedAvgMRP: 85.00,
        janAushadhiGenericPrice: 12.00,
        savingsPct: 86,
        firstLineClinicalRationale: 'Excellent peripheral vascular resistance reduction; synergistic when combined with Telmisartan.',
        inStockStoresCount: 15
      },
      {
        saltName: 'Metoprolol Succinate Prolonged-Release 25mg / 50mg',
        indication: 'Cardioselective Beta-1 adrenergic blocker for patients with angina or tachycardia',
        standardDosage: '25mg - 50mg once daily',
        brandedExamples: ['Betaloc 50', 'Metolar-XR 50', 'Seloken'],
        brandedAvgMRP: 175.00,
        janAushadhiGenericPrice: 26.00,
        savingsPct: 85,
        firstLineClinicalRationale: 'Controls elevated resting heart rate and reduces myocardial oxygen demand.',
        inStockStoresCount: 10
      }
    ]
  },
  'Asthma / Respiratory Conditions': {
    conditionName: 'Asthma / Respiratory Conditions',
    category: 'Pulmonary Care',
    lifestyleTips: [
      'Keep indoor environments free of dust mites, incense smoke, and strong chemical sprays.',
      'Always carry quick-relief rescue inhaler during outdoor commutes or Bengaluru pollen season.',
      'Rinse mouth thoroughly with water after using corticosteroid inhalers to prevent oral thrush.'
    ],
    monitoringGuideline: 'Measure Peak Expiratory Flow Rate (PEFR) during flare-ups; review inhaler technique every 6 months.',
    commonContraindications: [
      {
        drugClass: 'Non-selective Beta Blockers (Propranolol, Timolol eye drops)',
        reason: 'Blocks beta-2 receptors in bronchial smooth muscle, provoking life-threatening bronchospasm.'
      },
      {
        drugClass: 'Aspirin & NSAIDs (in Aspirin-Exacerbated Respiratory Disease)',
        reason: 'Shunts arachidonic acid metabolism to leukotrienes, inducing severe acute asthma attacks in susceptible patients.'
      }
    ],
    recommendedSalts: [
      {
        saltName: 'Salbutamol (Albuterol) 100mcg Inhaler',
        indication: 'Short-acting beta-2 agonist (SABA) rescue bronchodilator',
        standardDosage: '1-2 puffs as needed for acute wheeze or chest tightness',
        brandedExamples: ['Asthalin Inhaler', 'Ventorlin'],
        brandedAvgMRP: 165.00,
        janAushadhiGenericPrice: 42.00,
        savingsPct: 75,
        firstLineClinicalRationale: 'Gold standard fast-onset bronchodilator for prompt symptom relief within 5 minutes.',
        inStockStoresCount: 14
      },
      {
        saltName: 'Budesonide 200mcg + Formoterol 6mcg Inhaler',
        indication: 'Inhaled corticosteroid + Long-acting beta-2 agonist maintenance controller',
        standardDosage: '1 puff twice daily regular maintenance',
        brandedExamples: ['Foracort 200', 'Symbicort', 'Budamate 200'],
        brandedAvgMRP: 420.00,
        janAushadhiGenericPrice: 110.00,
        savingsPct: 74,
        firstLineClinicalRationale: 'GINA Guidelines 2024 recommendation for primary asthma maintenance preventing remodeling.',
        inStockStoresCount: 11
      },
      {
        saltName: 'Montelukast 10mg + Levocetirizine 5mg Tablet',
        indication: 'Leukotriene receptor antagonist + antihistamine for allergic bronchospasm',
        standardDosage: '1 tablet nightly at bedtime',
        brandedExamples: ['Montair-LC', 'Telekast-L', 'Levocet-M'],
        brandedAvgMRP: 182.00,
        janAushadhiGenericPrice: 32.00,
        savingsPct: 82,
        firstLineClinicalRationale: 'Suppresses nocturnal asthma triggers, allergic rhinitis, and eosinophilic airway inflammation.',
        inStockStoresCount: 13
      }
    ]
  },
  'Dyslipidemia / High Cholesterol': {
    conditionName: 'Dyslipidemia / High Cholesterol',
    category: 'Cardiovascular Care',
    lifestyleTips: [
      'Eliminate trans-fats and palm oils; substitute with cold-pressed mustard oil or olive oil.',
      'Increase soluble fiber (psyllium husk, oats, flaxseed, lentils) to bind intestinal bile acids.',
      'Engage in regular aerobic conditioning to naturally raise HDL (good cholesterol).'
    ],
    monitoringGuideline: 'Fasting Lipid Profile every 6 months (target LDL-C < 70 mg/dL for high risk, Total Cholesterol < 170 mg/dL).',
    commonContraindications: [
      {
        drugClass: 'Macrolide Antibiotics (Clarithromycin, Erythromycin) with Statins',
        reason: 'Strong CYP3A4 inhibitors that increase statin plasma concentrations, raising rhabdomyolysis / muscle toxicity risk.'
      },
      {
        drugClass: 'High-dose Gemfibrozil with Statins',
        reason: 'Significantly increases risk of severe myopathy and liver enzyme abnormalities.'
      }
    ],
    recommendedSalts: [
      {
        saltName: 'Atorvastatin Calcium 20mg Tablet IP',
        indication: 'HMG-CoA reductase inhibitor for high-intensity LDL reduction',
        standardDosage: '20mg once daily at bedtime',
        brandedExamples: ['Atorva 20', 'Lipitor 20', 'Storvas 20'],
        brandedAvgMRP: 285.00,
        janAushadhiGenericPrice: 38.00,
        savingsPct: 87,
        firstLineClinicalRationale: 'Reduces LDL-C by 40-50% and stabilizes arterial atherosclerotic plaques.',
        inStockStoresCount: 15
      },
      {
        saltName: 'Rosuvastatin 10mg Tablet IP',
        indication: 'Hydrophilic statin with minimal CYP3A4 drug interactions',
        standardDosage: '10mg once daily in evening',
        brandedExamples: ['Rozucor 10', 'Crestor 10', 'Rosuvas 10'],
        brandedAvgMRP: 260.00,
        janAushadhiGenericPrice: 42.00,
        savingsPct: 84,
        firstLineClinicalRationale: 'Higher potency LDL reduction with lower potential for muscle aches in statin-sensitive individuals.',
        inStockStoresCount: 12
      },
      {
        saltName: 'Fenofibrate Micronized 160mg Tablet',
        indication: 'PPAR-alpha agonist specifically targeting high triglycerides (> 300 mg/dL)',
        standardDosage: '160mg once daily with main meal',
        brandedExamples: ['Lipicard 160', 'Tricor', 'Fibator'],
        brandedAvgMRP: 215.00,
        janAushadhiGenericPrice: 45.00,
        savingsPct: 79,
        firstLineClinicalRationale: 'Reduces risk of hypertriglyceridemia-induced acute pancreatitis.',
        inStockStoresCount: 8
      }
    ]
  },
  'Hypothyroidism': {
    conditionName: 'Hypothyroidism',
    category: 'Endocrine Care',
    lifestyleTips: [
      'Always take thyroid hormone first thing in the morning with a full glass of water, on an empty stomach.',
      'Wait at least 45 to 60 minutes before drinking tea, coffee, milk, or consuming breakfast.',
      'Separate calcium, iron, or antacid supplements by at least 4 hours to avoid absorption binding.'
    ],
    monitoringGuideline: 'Serum TSH every 6 to 8 weeks after dose adjustments, and every 6 months once stabilized.',
    commonContraindications: [
      {
        drugClass: 'Simultaneous Calcium Carbonate / Ferrous Sulfate Supplements',
        reason: 'Forms unabsorbable chelates with Levothyroxine in the gut, rendering hormone replacement ineffective.'
      },
      {
        drugClass: 'Proton Pump Inhibitors taken at the exact same hour',
        reason: 'Gastric acid is required for optimal dissolution and enteric absorption of Levothyroxine.'
      }
    ],
    recommendedSalts: [
      {
        saltName: 'Levothyroxine Sodium 25mcg / 50mcg / 100mcg Tablet',
        indication: 'Bio-identical synthetic T4 thyroid hormone replacement',
        standardDosage: 'Exact microgram dose once daily early morning fasting',
        brandedExamples: ['Thyronorm', 'Eltroxin', 'Thyrox'],
        brandedAvgMRP: 185.00,
        janAushadhiGenericPrice: 28.00,
        savingsPct: 85,
        firstLineClinicalRationale: 'Standard of care for replenishing circulating thyroxine levels and reversing metabolic slowing.',
        inStockStoresCount: 14
      }
    ]
  },
  'Acid Peptic Disease / GERD': {
    conditionName: 'Acid Peptic Disease / GERD',
    category: 'Gastroenterology',
    lifestyleTips: [
      'Avoid lying flat for at least 2.5 hours after meals to prevent acid reflux regurgitation.',
      'Limit trigger items: deep fried spicy gravies, excess black coffee, tobacco, and carbonated beverages.',
      'Elevate the head of your bed by 15 cm if nocturnal reflux or chronic cough occurs.'
    ],
    monitoringGuideline: 'Review PPI usage after 4 to 8 weeks; avoid uninterrupted long-term usage without clinical indication.',
    commonContraindications: [
      {
        drugClass: 'Unbuffered NSAIDs (Diclofenac, Ketorolac, Piroxicam)',
        reason: 'Depletes gastric protective mucosal prostaglandins, provoking severe ulcerations and gastrointestinal bleeding.'
      }
    ],
    recommendedSalts: [
      {
        saltName: 'Pantoprazole 40mg Gastro-Resistant Tablet IP',
        indication: 'Proton Pump Inhibitor for gastric acid suppression and ulcer healing',
        standardDosage: '40mg once daily 30-45 minutes before first meal',
        brandedExamples: ['Pan 40', 'Pantocid 40', 'Pantodac 40'],
        brandedAvgMRP: 115.00,
        janAushadhiGenericPrice: 21.00,
        savingsPct: 82,
        firstLineClinicalRationale: 'Potent and sustained gastric acid suppression with minimal hepatic enzyme interactions.',
        inStockStoresCount: 16
      },
      {
        saltName: 'Pantoprazole 40mg + Domperidone 30mg SR Capsule',
        indication: 'Combined acid inhibitor + prokinetic for reflux accompanied by nausea/bloating',
        standardDosage: '1 capsule once daily before breakfast',
        brandedExamples: ['Pan-D', 'Pantocid-DSR', 'Dompan-SR'],
        brandedAvgMRP: 185.00,
        janAushadhiGenericPrice: 35.00,
        savingsPct: 81,
        firstLineClinicalRationale: 'Accelerates gastric emptying while neutralizing acid reflux into lower esophagus.',
        inStockStoresCount: 13
      }
    ]
  }
};

export const MOCK_PENDING_PHARMACIES: PharmacyApplication[] = [
  {
    id: 'app-blr-01',
    pharmacyName: 'Sanjeevani Medico & Surgical',
    storeType: 'Independent Chemist',
    locality: 'HSR Layout Sector 2',
    pincode: '560102',
    proprietorName: 'Manjunath Reddy',
    licenseNumber: 'KA-DRUG-2024-8841',
    abdmFacilityId: 'IN-KA-560102-FAC-99',
    posSoftware: 'Marg ERP 9+ Platinum',
    submittedDate: 'Today, 10:30 AM',
    status: 'Pending Verification',
    initialSKUCount: 840
  },
  {
    id: 'app-blr-02',
    pharmacyName: 'PMBJP Jan Aushadhi Kendra BTM',
    storeType: 'Jan Aushadhi (Govt)',
    locality: 'BTM 2nd Stage 7th Main',
    pincode: '560076',
    proprietorName: 'Geetha Narayanan B.Pharm',
    licenseNumber: 'KA-PMBJP-2024-1188',
    abdmFacilityId: 'IN-KA-560076-PMBJP-42',
    posSoftware: 'PMBI National Portal Sync',
    submittedDate: 'Yesterday, 4:15 PM',
    status: 'Pending Verification',
    initialSKUCount: 1620
  },
  {
    id: 'app-blr-03',
    pharmacyName: 'Lifeline Wellness & Compounding',
    storeType: 'Organized Chain',
    locality: 'Jayanagar 4th Block',
    pincode: '560041',
    proprietorName: 'Vikram Joshi',
    licenseNumber: 'KA-DRUG-2023-3390',
    abdmFacilityId: 'IN-KA-560041-LIF-12',
    posSoftware: 'C-Square POS v8',
    submittedDate: 'Sep 05, 2026',
    status: 'Requires Audit',
    initialSKUCount: 2150
  }
];

export const MOCK_DISCREPANCY_REPORTS: PriceDiscrepancyReport[] = [
  {
    id: 'disc-8091',
    pharmacyName: 'Apollo Pharmacy Indiranagar',
    medicineName: 'Moxikind-CV 625 (10 Tabs)',
    reportedPrice: 145.00,
    officialPrice: 94.00,
    differencePercentage: 54.2,
    receiptAttached: true,
    patientPhone: '+91 98450 XXXXX',
    locality: '100 Feet Rd, Indiranagar',
    timestamp: '2 hours ago',
    status: 'Under Investigation',
    notes: 'Patient bill shows billing under higher branded SKU code instead of generic formulation.'
  },
  {
    id: 'disc-8092',
    pharmacyName: 'City Care Meds Domlur',
    medicineName: 'Atorvastatin 20mg (15 Tabs)',
    reportedPrice: 112.00,
    officialPrice: 68.50,
    differencePercentage: 63.5,
    receiptAttached: true,
    patientPhone: '+91 97411 XXXXX',
    locality: 'Old Airport Road, Domlur',
    timestamp: '5 hours ago',
    status: 'Warning Issued',
    notes: 'Statutory notice served under DPCO Section 15. Store acknowledged system pricing error.'
  },
  {
    id: 'disc-8093',
    pharmacyName: 'Noble Chemist Koramangala',
    medicineName: 'Metformin 500mg SR (20 Tabs)',
    reportedPrice: 42.00,
    officialPrice: 34.20,
    differencePercentage: 22.8,
    receiptAttached: false,
    patientPhone: '+91 99002 XXXXX',
    locality: '80 Feet Road, Koramangala',
    timestamp: 'Yesterday',
    status: 'Resolved / Refunded',
    notes: 'POS barcode updated. Patient provided ₹8 credit voucher on next purchase.'
  }
];

export const MOCK_CDSCO_CEILINGS: CdscoPriceCeilingItem[] = [
  {
    id: 'ceil-amoxyclav-625',
    saltName: 'Amoxicillin + Clavulanic Acid Tablet',
    dosageForm: '500mg + 125mg (10 Tablets)',
    therapeuticCategory: 'Broad Spectrum Antibiotic',
    dpcoCeilingPricePerUnit: 22.35,
    lastRevisedDate: 'Jan 15, 2026',
    referenceStandard: 'IP 2024 / CDSCO Monograph 412',
    isScheduleH1: true
  },
  {
    id: 'ceil-atorva-20',
    saltName: 'Atorvastatin Calcium Tablet',
    dosageForm: '20mg (15 Tablets)',
    therapeuticCategory: 'Lipid Lowering / Statin',
    dpcoCeilingPricePerUnit: 4.56,
    lastRevisedDate: 'Nov 10, 2025',
    referenceStandard: 'IP 2024 / CDSCO Monograph 189',
    isScheduleH1: false
  },
  {
    id: 'ceil-metformin-500',
    saltName: 'Metformin Hydrochloride Prolonged-Release',
    dosageForm: '500mg (20 Tablets)',
    therapeuticCategory: 'Biguanide Anti-diabetic',
    dpcoCeilingPricePerUnit: 1.71,
    lastRevisedDate: 'Dec 02, 2025',
    referenceStandard: 'IP 2024 / CDSCO Monograph 88',
    isScheduleH1: false
  },
  {
    id: 'ceil-paracetamol-650',
    saltName: 'Paracetamol Tablet',
    dosageForm: '650mg (15 Tablets)',
    therapeuticCategory: 'Analgesic & Antipyretic',
    dpcoCeilingPricePerUnit: 1.84,
    lastRevisedDate: 'Feb 20, 2026',
    referenceStandard: 'IP 2024 / CDSCO Monograph 02',
    isScheduleH1: false
  }
];

export const MOCK_ADMIN_AUDIT_LOGS = [
  { id: 'log-01', time: '10:45 AM', action: 'DPCO Rate Audit', actor: 'Automated Crawler', detail: 'Cross-verified 1,480 BLR chemist inventories against NPPA Gazette Jan 2026' },
  { id: 'log-02', time: '09:30 AM', action: 'Pharmacist Login', actor: 'Dr. Sarah Jenkins (KA-PH-2022-9011)', detail: 'Authenticated Marg ERP connector for Koramangala dispensary' },
  { id: 'log-03', time: '09:12 AM', action: 'Ceiling Revision', actor: 'Dr. Arvind Rao (Admin)', detail: 'Updated ceiling cap for Amoxicillin + Clavulanic Acid 625mg to ₹22.35/tab' },
  { id: 'log-04', time: '08:50 AM', action: 'Notice Dispatched', actor: 'Grievance Cell', detail: 'Issued Form 4 Show-Cause to City Care Meds Domlur (Discrepancy #8092)' },
  { id: 'log-05', time: '08:00 AM', action: 'ABDM Health Bridge', actor: 'National Health Authority', detail: 'Ingested 284 e-prescriptions for Bengaluru East Health Zone' }
];

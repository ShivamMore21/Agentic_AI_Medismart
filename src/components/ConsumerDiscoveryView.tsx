import React, { useState } from 'react';
import { 
  POPULAR_MEDICINES, 
  BENGALURU_PHARMACIES 
} from '../data/mockData';
import { Medicine, AppViewMode } from '../types';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  TrendingDown, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Heart, 
  Percent, 
  ExternalLink,
  Info,
  Calendar,
  Zap,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsumerDiscoveryViewProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenClinicalModal: () => void;
  onSelectMedicineForParity: (med: Medicine) => void;
  selectedPincode: string;
  selectedLocality: string;
  onQuickHoldPharmacy: (pharmacyId: string, storeName: string) => void;
}

export const ConsumerDiscoveryView: React.FC<ConsumerDiscoveryViewProps> = ({
  onNavigate,
  onOpenClinicalModal,
  onSelectMedicineForParity,
  selectedPincode,
  selectedLocality,
  onQuickHoldPharmacy
}) => {
  const [searchMode, setSearchMode] = useState<'brand' | 'salt'>('brand');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [monthlySpendSlider, setMonthlySpendSlider] = useState<number>(3500);

  // Quick chips
  const quickSalts = [
    'Amoxicillin + Clavulanate',
    'Atorvastatin 20mg',
    'Metformin 500mg',
    'Paracetamol 650mg',
    'Pantoprazole + Domperidone',
    'Telmisartan 40mg'
  ];

  // Filtered medicines
  const filteredMeds = POPULAR_MEDICINES.filter((med) => {
    const matchesCategory = selectedCategory === 'All' || med.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      med.brandName.toLowerCase().includes(query) ||
      med.saltComposition.toLowerCase().includes(query) ||
      med.genericSubstituteName.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Calculate dynamic savings for Chronic Care Budget Simulator
  const monthlyGenericBill = Math.round(monthlySpendSlider * 0.28);
  const monthlySavings = monthlySpendSlider - monthlyGenericBill;
  const annualSavings = monthlySavings * 12;

  const handleHeroSwitchAction = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
    onNavigate('rx-matcher');
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner & Annual Patient Impact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#005c55] via-[#086a63] to-[#0f766e] rounded-3xl p-6 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
            <ShieldCheck className="w-64 h-64 text-white" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#6ffbbe]/20 text-[#6ffbbe] text-xs font-semibold border border-[#6ffbbe]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6ffbbe]" /> 100% Bio-Equivalent Chemical Salts
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-xs font-medium">
                Local Stock: {selectedLocality}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#004741] text-[#a3faef] text-xs font-mono">
                PMBJP Jan Aushadhi Compliant
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-headline tracking-tight text-white mt-1">
              Namaste, Riya 🙏
            </h1>
            <p className="text-sm text-[#ccfbf1] mt-1.5 max-w-xl leading-relaxed">
              Find government PMBJP Jan Aushadhi Kendras and verified Bengaluru retail pharmacies offering identical CDSCO-approved active chemical salts at up to <strong>86% lower prices</strong>.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-[#a3faef]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6ffbbe]"></span>
                <span>Active City GPS: <strong>{selectedLocality}</strong></span>
              </div>
              <div className="hidden sm:block text-white/60">•</div>
              <div className="hidden sm:flex items-center gap-1">
                <span>Drugs &amp; Cosmetics Act Rule 65 Compliant</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('gis-map-locator')}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded-xl font-semibold transition-colors"
            >
              <span>Explore 184 Jan Aushadhi Kendras</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Patient Annual Impact Widget */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Annual Patient Impact
              </span>
              <span className="text-[11px] font-semibold text-[#007952] bg-[#e6fbf1] px-2 py-0.5 rounded-full">
                4 Chronic Switched
              </span>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">Total Family Savings (Year-to-Date)</div>
              <div className="text-3xl font-black text-[#007952] tracking-tight font-headline mt-0.5">
                ₹11,480.00
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Avg. monthly savings of <strong className="text-gray-900">₹956.60</strong> on cardiac &amp; antibiotic courses.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>5-Year Household Projection</span>
              <span className="font-bold text-gray-900">₹57,400+ Saved</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-[#007952] h-full w-4/5 rounded-full"></div>
            </div>
            <button
              onClick={() => onNavigate('rx-matcher')}
              className="w-full text-center text-xs font-bold text-[#005c55] hover:text-[#004741] pt-1"
            >
              View Active Prescription Optimization →
            </button>
          </div>
        </div>

      </div>

      {/* Dual Search Console */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-headline">
              Instant Medicine &amp; Active Salt Finder
            </h2>
            <p className="text-xs text-gray-500">
              Search by doctor's branded prescription or therapeutic molecular compound
            </p>
          </div>

          {/* Search Toggle */}
          <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold">
            <button
              onClick={() => setSearchMode('brand')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                searchMode === 'brand'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Prescribed Brand Name
            </button>
            <button
              onClick={() => setSearchMode('salt')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                searchMode === 'salt'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active Salt / Formula
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search className="w-5 h-5 text-[#005c55]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchMode === 'brand'
                ? "Search prescribed brand (e.g. Augmentin 625, Lipitor 20, Glucophage, Dolo 650)..."
                : "Search active chemical salt (e.g. Amoxicillin + Clavulanic Acid, Atorvastatin, Metformin)..."
            }
            className="w-full pl-12 pr-28 py-3.5 bg-[#faf8ff] border border-gray-200 focus:border-[#005c55] focus:bg-white rounded-2xl text-sm text-gray-900 placeholder-gray-400 outline-hidden transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-14 pr-2 flex items-center text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => onNavigate('rx-matcher')}
            className="absolute inset-y-1.5 right-1.5 px-4 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span>Match</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Popular Salt Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-[10px]">
            Popular Salts:
          </span>
          {quickSalts.map((salt) => (
            <button
              key={salt}
              onClick={() => setSearchQuery(salt)}
              className="px-2.5 py-1 rounded-lg bg-[#f0fbf9] hover:bg-[#d6f5ef] text-[#005c55] text-xs font-medium border border-[#a3faef] transition-colors"
            >
              {salt}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {['All', 'Antibiotics', 'Cardiac', 'Diabetes', 'Pain', 'Gastroenterology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#005c55] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hero: High-Value Bio-Equivalent Switch Identified (Image 3 / 9 Focal Card) */}
      <div className="bg-gradient-to-br from-[#ffffff] to-[#f4fbf9] rounded-3xl p-6 border-2 border-[#a3faef] shadow-md relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007952] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#007952]"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#007952] bg-[#e6fbf1] px-2.5 py-1 rounded-full">
              High-Value Bio-Equivalent Switch Identified
            </span>
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Prices verified 3 mins ago in {selectedLocality}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Prescribed Brand */}
          <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs relative">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Prescribed Brand
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-headline">Augmentin 625 Duo</h3>
            <p className="text-xs text-gray-500 font-medium">GlaxoSmithKline Pharmaceuticals</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">₹224.50</span>
              <span className="text-xs text-gray-400 line-through">MRP ₹236.00</span>
              <span className="text-[11px] text-gray-500">/ 10 tablets</span>
            </div>
            <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
              Schedule H1 • Prescribed Baseline
            </div>
          </div>

          {/* Active Salt Parity Connector */}
          <div className="md:col-span-4 text-center px-2 py-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0fbf9] border border-[#a3faef] text-[#005c55] text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#007952]" />
              <span>100% Identical Active Formula</span>
            </div>
            <div className="text-xs font-bold text-gray-800 mt-2">
              Amoxicillin (500mg) + Clavulanic Acid (125mg)
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              CDSCO Verified Dissolution &amp; Bio-Equivalence (AUC 99.4%)
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="h-0.5 w-12 bg-[#a3faef]"></div>
              <span className="text-xs font-mono font-bold text-[#007952]">1:1 EQUIVALENT</span>
              <div className="h-0.5 w-12 bg-[#a3faef]"></div>
            </div>
          </div>

          {/* Top Indian Generic Substitute */}
          <div className="md:col-span-4 bg-gradient-to-br from-[#005c55] to-[#0f766e] p-5 rounded-2xl text-white shadow-md relative">
            <div className="absolute top-3 right-3 bg-[#6ffbbe] text-[#004741] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Save 72%
            </div>
            <div className="text-[10px] font-bold text-[#a3faef] uppercase tracking-wider mb-1">
              Top Bio-Equivalent Generic
            </div>
            <h3 className="text-lg font-bold text-white font-headline">Moxikind-CV 625</h3>
            <p className="text-xs text-[#ccfbf1]">Mankind Pharma Ltd / PMBJP Equivalent</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">₹62.80</span>
              <span className="text-xs text-[#a3faef] line-through">₹224.50</span>
              <span className="text-[11px] text-white/80">/ 10 tablets</span>
            </div>
            <div className="mt-2 text-[11px] text-[#6ffbbe] bg-[#004741] px-2 py-0.5 rounded border border-[#6ffbbe]/30 font-semibold">
              You Save ₹161.70 per strip!
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-5 pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onOpenClinicalModal}
            className="text-xs font-bold text-[#005c55] hover:text-[#004741] flex items-center gap-1.5 underline decoration-2 underline-offset-4"
          >
            <Info className="w-4 h-4" />
            <span>View Clinical Pharmacopoeia Parity &amp; Dissolution Report</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('gis-map-locator')}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-xl transition-colors"
            >
              Locate Stock in {selectedLocality}
            </button>
            <button
              onClick={handleHeroSwitchAction}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white text-xs font-bold rounded-xl shadow-xs transition-transform hover:scale-[1.02]"
            >
              <span>Switch &amp; Order Generic (₹62.80)</span>
              <ArrowRight className="w-4 h-4 text-[#6ffbbe]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Trending Verified Alternatives + Right Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Trending Alternatives in BLR */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline">
                Trending Verified Alternatives in Bengaluru ({selectedPincode})
              </h3>
              <p className="text-xs text-gray-500">
                100% CDSCO audited therapeutic equivalents for common chronic &amp; acute treatments
              </p>
            </div>
            <span className="text-xs font-semibold text-[#005c55]">
              {filteredMeds.length} Medicines Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMeds.map((med) => (
              <div 
                key={med.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 hover:border-[#005c55]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {med.category}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#007952] bg-[#e6fbf1] px-2 py-0.5 rounded-full">
                      Save {med.savingsPercentage}%
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 mt-2 font-headline">
                    {med.brandName}
                  </h4>
                  <p className="text-xs text-gray-400">{med.manufacturer}</p>

                  <div className="mt-2.5 p-2 bg-[#faf8ff] rounded-xl border border-gray-100 text-[11px] text-gray-600">
                    <span className="font-semibold text-gray-800">Active Salt: </span>
                    {med.saltComposition}
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Prescribed Brand</span>
                      <strong className="text-gray-700 text-sm">₹{med.prescribedMRP.toFixed(2)}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#005c55] font-semibold block text-[10px]">Verified Generic</span>
                      <strong className="text-[#007952] text-base font-black">₹{med.genericPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectMedicineForParity(med);
                      onNavigate('rx-matcher');
                    }}
                    className="flex-1 py-1.5 bg-[#f0fbf9] hover:bg-[#d8f5ef] text-[#005c55] text-xs font-bold rounded-xl border border-[#a3faef] transition-colors text-center"
                  >
                    Compare Parity
                  </button>
                  <button
                    onClick={() => onNavigate('gis-map-locator')}
                    className="py-1.5 px-3 bg-[#005c55] hover:bg-[#004741] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center"
                    title="Locate Pharmacy"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chronic Care Budget Simulator Slider (Image 3 / 9 Requirement) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-headline flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-[#007952]" />
                  <span>Chronic Care Family Budget Simulator</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Estimate household savings by switching ongoing maintenance prescriptions to bio-equivalent salts
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#e6fbf1] text-[#007952]">
                72% Average Reduction
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-700">Current Monthly Branded Medicine Bill:</span>
                <span className="text-lg font-black text-gray-900">₹{monthlySpendSlider.toLocaleString('en-IN')}</span>
              </div>
              
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={monthlySpendSlider}
                onChange={(e) => setMonthlySpendSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#005c55]"
              />

              <div className="flex justify-between text-[11px] text-gray-400">
                <span>₹1,000 / mo</span>
                <span>₹7,500 / mo</span>
                <span>₹15,000 / mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#faf8ff] p-3.5 rounded-2xl border border-gray-200 text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Optimized Generic Bill</span>
                <span className="text-xl font-bold text-gray-800">₹{monthlyGenericBill.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-gray-500 block">Per month</span>
              </div>

              <div className="bg-[#f0fbf9] p-3.5 rounded-2xl border border-[#a3faef] text-center">
                <span className="text-[10px] uppercase font-bold text-[#005c55] block">Monthly Savings</span>
                <span className="text-xl font-black text-[#007952]">₹{monthlySavings.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-[#007952] font-semibold block">In your pocket</span>
              </div>

              <div className="bg-[#005c55] p-3.5 rounded-2xl text-white text-center">
                <span className="text-[10px] uppercase font-bold text-[#a3faef] block">Annual Unlocked Wealth</span>
                <span className="text-2xl font-black text-[#6ffbbe]">₹{annualSavings.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-white/80 block">Saved in 12 months</span>
              </div>
            </div>
          </div>

          {/* Live Retailer Rates Comparison Table for Moxikind-CV 625 */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-headline">
                  Live Retailer Rates: Moxikind-CV 625 in {selectedLocality}
                </h3>
                <p className="text-xs text-gray-500">
                  Real-time POS stock &amp; pricing benchmarked against DPCO price ceiling (₹224.50 MRP)
                </p>
              </div>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                100% IN STOCK
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf8ff] text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Retailer / Chemist</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Distance</th>
                    <th className="p-3">Available Stock</th>
                    <th className="p-3">Price / Strip</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {BENGALURU_PHARMACIES.map((pharm) => (
                    <tr key={pharm.id} className="hover:bg-[#f0fbf9]/40 transition-colors">
                      <td className="p-3 font-semibold text-gray-900">
                        <div className="flex items-center gap-1.5">
                          <span>{pharm.name}</span>
                          {pharm.storeType === 'Jan Aushadhi (Govt)' && (
                            <span className="text-[9px] bg-[#6ffbbe] text-[#004741] font-extrabold px-1 rounded">PMBJP</span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 block font-normal">{pharm.address}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {pharm.storeType}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-600">{pharm.distanceKm} km</td>
                      <td className="p-3">
                        <span className="font-semibold text-emerald-700">{pharm.stockCount} strips</span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-black text-[#007952]">₹{pharm.priceForMoxikind.toFixed(2)}</span>
                        <span className="text-[10px] text-gray-400 block line-through">₹224.50</span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onQuickHoldPharmacy(pharm.id, pharm.name)}
                          className="px-3 py-1 bg-[#005c55] hover:bg-[#004741] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                        >
                          Hold Pack
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Rail: Jan Aushadhi Spotlight + CDSCO Advisory */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* PMBJP Kendra Spotlight Card */}
          <div className="bg-gradient-to-b from-[#f0fbf9] to-[#ffffff] rounded-3xl p-5 border-2 border-[#a3faef] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#005c55] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-5 h-5 text-[#6ffbbe]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#007952] uppercase tracking-wider">
                  Government Initiative
                </span>
                <h4 className="text-sm font-bold text-gray-900 font-headline">
                  Pradhan Mantri Jan Aushadhi (PMBJP)
                </h4>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Quality generic medicines manufactured by WHO-GMP compliant pharmaceutical PSUs, dispensed at 50% to 90% below commercial market MRP.
            </p>

            {/* Nearest Kendra Info */}
            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">HAL 2nd Stage Kendra</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  0.4 km away
                </span>
              </div>
              <p className="text-gray-500 text-[11px]">Near Indiranagar Club, 100ft Road</p>
              <div className="flex items-center justify-between text-[11px] pt-1 text-gray-600">
                <span>Timings: 08:00 AM - 09:30 PM</span>
                <span className="text-[#007952] font-semibold">Open Now</span>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => onNavigate('gis-map-locator')}
                  className="w-full py-1.5 bg-[#005c55] text-white text-xs font-semibold rounded-lg hover:bg-[#004741] text-center"
                >
                  View on GPS Map
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900">
              <span className="font-bold">Pro-Tip: </span>
              Jan Aushadhi stores maintain ample stocks of Amoxy-Clav, Metformin, Atorvastatin, and Telmisartan.
            </div>
          </div>

          {/* CDSCO & Drugs and Cosmetics Act Advisory */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm font-headline">
              <ShieldCheck className="w-4 h-4 text-[#005c55]" />
              <span>Know Your Medicine Rights in India</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#007952] shrink-0 mt-0.5" />
                <span>
                  <strong>Rule 65 Compliance:</strong> Pharmacists are legally entitled to suggest equivalent generic medicines with identical active ingredients.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#007952] shrink-0 mt-0.5" />
                <span>
                  <strong>CDSCO Testing:</strong> All approved generics undergo bioavailability and dissolution testing equivalent to US FDA Orange Book benchmarks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#007952] shrink-0 mt-0.5" />
                <span>
                  <strong>DPCO Price Cap:</strong> Retailers cannot legally charge more than National Pharmaceutical Pricing Authority (NPPA) ceiling rates.
                </span>
              </li>
            </ul>

            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-400">
              Department of Pharmaceuticals • Ministry of Chemicals and Fertilizers, Govt. of India.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

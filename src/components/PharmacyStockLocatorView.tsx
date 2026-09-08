import React, { useState } from 'react';
import { BENGALURU_PHARMACIES } from '../data/mockData';
import { PharmacyStore, AppViewMode } from '../types';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Phone, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Layers, 
  Sliders, 
  Filter, 
  Crosshair, 
  Plus, 
  Minus, 
  Building2, 
  ShoppingBag,
  Flag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PharmacyStockLocatorViewProps {
  onNavigate: (view: AppViewMode) => void;
  selectedPincode: string;
  selectedLocality: string;
  onOpenDiscrepancyModal: (pharmacyName: string, medName: string) => void;
  onQuickHoldPharmacy: (pharmacyId: string, storeName: string) => void;
}

export const PharmacyStockLocatorView: React.FC<PharmacyStockLocatorViewProps> = ({
  onNavigate,
  selectedPincode,
  selectedLocality,
  onOpenDiscrepancyModal,
  onQuickHoldPharmacy
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(5);
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>(BENGALURU_PHARMACIES[0].id);
  const [mapMode, setMapMode] = useState<'standard' | 'satellite' | 'traffic'>('standard');
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  const selectedStore = BENGALURU_PHARMACIES.find(p => p.id === selectedPharmacyId) || BENGALURU_PHARMACIES[0];

  const filteredPharmacies = BENGALURU_PHARMACIES.filter(p => {
    if (p.distanceKm > selectedRadius) return false;
    if (filterType === 'jan-aushadhi') return p.storeType === 'Jan Aushadhi (Govt)';
    if (filterType === '24-7') return p.isOpen24;
    if (filterType === 'high-stock') return p.stockCount >= 20;
    return true;
  });

  const handleHoldClick = (store: PharmacyStore) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    onQuickHoldPharmacy(store.id, store.name);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#005c55] uppercase tracking-wider mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#007952] animate-pulse"></span>
            <span>Real-Time GIS Pharmacy Stock Telemetry</span>
            <span>•</span>
            <span>Bengaluru East Health Zone</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 font-headline">
            Verified Moxikind-CV 625 &amp; Generic Amoxyclav Stocks
          </h1>
          <p className="text-xs text-gray-500">
            Live inventory synced with pharmacy point-of-sale (Marg ERP, C-Square &amp; ABDM)
          </p>
        </div>

        {/* Radius & Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold">
            {[2, 5, 10, 20].map((radius) => (
              <button
                key={radius}
                onClick={() => setSelectedRadius(radius)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedRadius === radius
                    ? 'bg-white text-[#005c55] shadow-xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {radius} km
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenDiscrepancyModal(selectedStore.name, 'Moxikind-CV 625')}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <Flag className="w-3.5 h-3.5 text-amber-700" />
            <span>Report Discrepancy</span>
          </button>
        </div>
      </div>

      {/* Main Container: Left Store List + Right GIS Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Store Stock Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'all' ? 'bg-[#005c55] text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              All Stores ({BENGALURU_PHARMACIES.length})
            </button>
            <button
              onClick={() => setFilterType('jan-aushadhi')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'jan-aushadhi' ? 'bg-[#007952] text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              Jan Aushadhi (Govt)
            </button>
            <button
              onClick={() => setFilterType('24-7')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === '24-7' ? 'bg-[#005c55] text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              Open 24/7
            </button>
            <button
              onClick={() => setFilterType('high-stock')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'high-stock' ? 'bg-[#005c55] text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              High Stock (&gt;20)
            </button>
          </div>

          {/* Pharmacies List */}
          <div className="space-y-3 max-h-[620px] overflow-y-auto custom-scrollbar pr-1">
            {filteredPharmacies.map((store) => {
              const isSelected = selectedPharmacyId === store.id;
              const isGovt = store.storeType === 'Jan Aushadhi (Govt)';

              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedPharmacyId(store.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#005c55] bg-white shadow-md ring-2 ring-[#005c55]/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {isGovt && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#004741]">
                          Govt. PMBJP
                        </span>
                      )}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {store.storeType}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-[#005c55]" />
                      {store.distanceKm} km
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-gray-900 mt-2 font-headline">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{store.address}</p>

                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Generic Price (Strip)</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-black text-[#007952]">₹{store.priceForMoxikind.toFixed(2)}</span>
                        <span className="text-[10px] text-gray-400 line-through">₹{store.mrp.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-gray-400 block text-[10px]">Shelf Availability</span>
                      <span className={`font-bold ${
                        store.stockCount < 5 ? 'text-amber-600' : 'text-emerald-700'
                      }`}>
                        {store.stockCount} strips {store.stockCount < 5 ? '(Low)' : 'in stock'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {store.openHours}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHoldClick(store);
                      }}
                      className="px-3 py-1 bg-[#005c55] hover:bg-[#004741] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
                    >
                      Hold 1 Strip
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive GIS Bengaluru Map (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-slate-900 rounded-3xl overflow-hidden border border-gray-300 shadow-md relative h-[620px]">
            
            {/* GIS Map Canvas with Simulated Street Grid of Bengaluru East */}
            <div className="absolute inset-0 bg-[#e8ecf1] overflow-hidden select-none">
              
              {/* SVG Map Texture / Streets of Indiranagar & Domlur */}
              <svg className="w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-roads" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d5dde5" strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-roads)" />

                {/* Major Arteries */}
                {/* 100 Feet Road Indiranagar */}
                <path d="M 120 0 L 320 620" stroke="#cbd5e1" strokeWidth="14" fill="none" />
                <path d="M 120 0 L 320 620" stroke="#ffffff" strokeWidth="10" fill="none" />

                {/* CMH Road & Metro Line */}
                <path d="M 0 180 L 700 190" stroke="#cbd5e1" strokeWidth="12" fill="none" />
                <path d="M 0 180 L 700 190" stroke="#9333ea" strokeWidth="4" strokeDasharray="8 6" fill="none" />

                {/* Intermediate Ring Road / Domlur Flyover */}
                <path d="M 0 440 Q 280 410 700 480" stroke="#cbd5e1" strokeWidth="16" fill="none" />
                <path d="M 0 440 Q 280 410 700 480" stroke="#ffffff" strokeWidth="12" fill="none" />

                {/* Old Airport Road */}
                <path d="M 100 320 L 700 360" stroke="#cbd5e1" strokeWidth="12" fill="none" />
                <path d="M 100 320 L 700 360" stroke="#ffffff" strokeWidth="8" fill="none" />
              </svg>

              {/* Area Labels */}
              <div className="absolute top-12 left-16 text-[11px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
                Indiranagar Metro (Purple Line)
              </div>
              <div className="absolute top-48 left-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
                CMH Road • 560038
              </div>
              <div className="absolute bottom-28 left-12 text-[11px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
                Domlur Flyover / Ring Road
              </div>
              <div className="absolute bottom-12 right-12 text-[11px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
                HAL Airport Rd • 560008
              </div>

              {/* User Location Radar Marker */}
              <div 
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: '48%', left: '46%' }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="radar-indicator w-8 h-8 rounded-full bg-[#005c55]/30"></div>
                  <div className="w-4 h-4 rounded-full bg-[#005c55] border-2 border-white shadow-md absolute"></div>
                </div>
                <span className="text-[10px] font-bold text-[#005c55] bg-white/90 px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap block mt-1 text-center">
                  You (Indiranagar)
                </span>
              </div>

              {/* Pharmacy Pins */}
              {BENGALURU_PHARMACIES.map((pharmacy) => {
                const isSelected = selectedPharmacyId === pharmacy.id;
                const isGovt = pharmacy.storeType === 'Jan Aushadhi (Govt)';

                return (
                  <button
                    key={pharmacy.id}
                    onClick={() => setSelectedPharmacyId(pharmacy.id)}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-full transition-all group"
                    style={{
                      top: pharmacy.coordinates.topPercent,
                      left: pharmacy.coordinates.leftPercent
                    }}
                  >
                    {/* Floating Price Pill */}
                    <div className={`px-2.5 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1 transition-transform ${
                      isSelected ? 'scale-110 ring-3 ring-[#005c55]' : 'group-hover:scale-105'
                    } ${
                      isGovt 
                        ? 'bg-[#007952] text-white' 
                        : pharmacy.stockCount < 5
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-300'
                    }`}>
                      {isGovt && <Building2 className="w-3 h-3 text-[#6ffbbe]" />}
                      <span>₹{pharmacy.priceForMoxikind.toFixed(0)}</span>
                    </div>

                    {/* Pin pointer triangle */}
                    <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-gray-800 mx-auto"></div>
                  </button>
                );
              })}

            </div>

            {/* Map Top-Right Controls */}
            <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
              <div className="bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-gray-200 p-1 flex flex-col">
                <button
                  onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  title="Zoom In"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="h-px bg-gray-200"></div>
                <button
                  onClick={() => setZoomLevel(Math.max(10, zoomLevel - 1))}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  title="Zoom Out"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setSelectedPharmacyId('pmbjp-indiranagar')}
                className="bg-white/95 backdrop-blur-xs p-2 rounded-xl shadow-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                title="Recenter GPS"
              >
                <Crosshair className="w-4 h-4 text-[#005c55]" />
              </button>
            </div>

            {/* Map Bottom Floating HUD Card (Selected Store Details) */}
            <div className="absolute bottom-4 left-4 right-4 z-30">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#f0fbf9] text-[#005c55] border border-[#a3faef]">
                      {selectedStore.storeType}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {selectedStore.distanceKm} km away • {selectedStore.openHours}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-gray-900 font-headline">
                    {selectedStore.name}
                  </h4>
                  <p className="text-xs text-gray-500">{selectedStore.address}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 block">Verified Rate</span>
                    <span className="text-xl font-black text-[#007952]">₹{selectedStore.priceForMoxikind.toFixed(2)}</span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">
                      {selectedStore.stockCount} strips ready
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedStore.phone}`}
                      className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                      title="Call Chemist"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleHoldClick(selectedStore)}
                      className="px-5 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Hold 1 Strip</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#6ffbbe]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

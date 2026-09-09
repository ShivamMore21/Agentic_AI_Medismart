import React, { useState } from 'react';
import { 
  INITIAL_B2B_INVENTORY, 
  INITIAL_PATIENT_RESERVATIONS 
} from '../data/mockData';
import { InventoryItem, PatientReservation, AppViewMode, UserSession } from '../types';
import { 
  Building2, 
  RefreshCw, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  FileCheck, 
  QrCode, 
  Download,
  Check,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
  LogIn,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PharmacyPartnerPortalViewProps {
  onNavigate: (view: AppViewMode) => void;
  currentUser?: UserSession;
  onOpenLoginModal?: (role?: 'pharmacist' | 'admin') => void;
}

export const PharmacyPartnerPortalView: React.FC<PharmacyPartnerPortalViewProps> = ({
  onNavigate,
  currentUser,
  onOpenLoginModal
}) => {
  const isPharmacist = currentUser?.role === 'pharmacist';
  const pharmacistName = isPharmacist ? currentUser.name : 'Dr. Sarah Jenkins PharmD';
  const pharmacistLicense = isPharmacist ? (currentUser.licenseNumber || 'KA-PH-2022-9011') : 'KA-PH-2022-9011';
  const branchName = isPharmacist && currentUser.organization ? currentUser.organization : 'Bengaluru Health Hub - Koramangala Branch #KA-560034';

  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_B2B_INVENTORY);
  const [reservations, setReservations] = useState<PatientReservation[]>(INITIAL_PATIENT_RESERVATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('2m ago');
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);
  const [posSoftware, setPosSoftware] = useState('marg');
  const [posApiKey, setPosApiKey] = useState('');
  const [posSaved, setPosSaved] = useState(false);

  const filteredInventory = inventory.filter((item) => {
    const matchesClass = selectedClass === 'All' || item.drugClass === selectedClass;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      item.medicineName.toLowerCase().includes(q) ||
      item.saltComposition.toLowerCase().includes(q) ||
      item.rackLocation.toLowerCase().includes(q);
    return matchesClass && matchesSearch;
  });

  const handleDispense = (id: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: 'Dispensed' } : res))
    );
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setEditPrice(item.storePriceMRP);
    setEditStock(item.stockStrips);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? { ...item, storePriceMRP: Number(editPrice), stockStrips: Number(editStock) }
          : item
      )
    );
    setEditingItem(null);
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncText('Just now');
    }, 1200);
  };

  const awaitingPickupCount = reservations.filter(r => r.status === 'Awaiting Pickup').length;

  return (
    <div className="space-y-6">
      {/* Session State Banner if not Pharmacist */}
      {!isPharmacist && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <div className="font-bold text-amber-900">
                Viewing Dispensary Portal in Demo Simulation Mode
              </div>
              <div className="text-amber-700">
                You are currently viewing as patient / guest. Log in with your pharmacy license to manage inventory.
              </div>
            </div>
          </div>
          {onOpenLoginModal && (
            <button
              onClick={() => onOpenLoginModal('pharmacist')}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-2xs shrink-0 flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Pharmacist Partner Sign-In</span>
            </button>
          )}
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f0fbf9] text-[#005c55] font-bold border border-[#a3faef] flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> {branchName}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 font-medium flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-[#007952]" />
              Inventory updated: <strong>{lastSyncText}</strong>
            </span>
            {isPharmacist && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Live Authenticated
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black text-gray-900 font-headline">
            Pharmacy Dispensary &amp; Live Stock Operations
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Dispensary Manager: <strong>{pharmacistName}</strong> • License: <strong>{pharmacistLicense}</strong>
            {onOpenLoginModal && (
              <button
                onClick={() => onOpenLoginModal('pharmacist')}
                className="ml-2 text-[#005c55] hover:underline font-semibold"
              >
                (Switch Branch)
              </button>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenEdit(inventory[1])}
            className="px-4 py-2 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Update Item Stock/Price</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Catalog</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">+18 this week</span>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2 font-headline">1,428 SKUs</div>
          <div className="text-xs text-gray-500 mt-1">98.6% Mapped to CDSCO Salts</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Holds Today</span>
            <span className="text-[10px] text-[#005c55] bg-[#f0fbf9] px-2 py-0.5 rounded font-bold">
              {awaitingPickupCount} Awaiting Pickup
            </span>
          </div>
          <div className="text-2xl font-black text-[#005c55] mt-2 font-headline">24 Holds</div>
          <div className="text-xs text-gray-500 mt-1">18 Dispensed • 2 Expired</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Generic Switch Rate</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">+8.5% MoM</span>
          </div>
          <div className="text-2xl font-black text-[#007952] mt-2 font-headline">74.2%</div>
          <div className="text-xs text-gray-500 mt-1">Top Switch: Moxikind-CV 625</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Freshness Telemetry</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">ABDM Live</span>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2 font-headline">99.4% SLA</div>
          <div className="text-xs text-gray-500 mt-1">0 Stale Feeds Flagged</div>
        </div>
      </div>

      {/* Main Grid: Master Inventory Table (8 cols) + Right Operational Drawer (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Master Inventory & Real-Time Pricing Table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
            
            {/* Table Filters Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-headline">
                  Master Inventory &amp; Live Price Sync
                </h3>
                <p className="text-xs text-gray-500">
                  Update your retail dispensing prices and stock counts to broadcast to local patients
                </p>
              </div>

              {/* Class Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['All', 'Antibiotics', 'Cardiovascular', 'Anti-Diabetic'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedClass === cls
                        ? 'bg-[#005c55] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Search within table */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by SKU name, salt, rack location (Rack A-14)..."
                className="w-full pl-9 pr-4 py-2 bg-[#faf8ff] border border-gray-200 rounded-xl text-xs text-gray-800 outline-hidden focus:border-[#005c55]"
              />
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf8ff] text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Medicine SKU</th>
                    <th className="p-3">Stock &amp; Shelf</th>
                    <th className="p-3">Store Price (MRP)</th>
                    <th className="p-3">Margin</th>
                    <th className="p-3">BLR Benchmark</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{item.medicineName}</div>
                        <div className="text-[11px] text-gray-400">{item.saltComposition}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                          Batch: {item.batchNumber} • {item.packDetails}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${
                            item.stockStrips < 5 ? 'text-amber-600' : 'text-emerald-700'
                          }`}>
                            {item.stockStrips} strips
                          </span>
                          {item.isLowStock && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                              LOW
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 block font-mono mt-0.5">
                          Loc: {item.rackLocation}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="font-black text-gray-900 text-sm">₹{item.storePriceMRP.toFixed(2)}</span>
                        <span className="text-[10px] text-gray-400 block">Retail Rate</span>
                      </td>

                      <td className="p-3">
                        <span className="font-bold text-emerald-700">{item.marginPercentage}%</span>
                      </td>

                      <td className="p-3">
                        <span className="text-[11px] text-gray-600 block">{item.bengaluruBenchmarkRange}</span>
                        <span className={`text-[10px] font-semibold ${
                          item.benchmarkBadge.includes('Best') ? 'text-[#007952]' : 'text-gray-500'
                        }`}>
                          {item.benchmarkBadge}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="px-2.5 py-1 bg-white border border-gray-300 hover:border-[#005c55] text-gray-700 hover:text-[#005c55] rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Right Operational Drawer: Patient Holds Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Patient Holds Queue (Image 1 Feature) */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#005c55]" />
                <h3 className="font-bold text-sm text-gray-900 font-headline">
                  Patient Reservations Queue
                </h3>
              </div>
              <span className="text-xs font-bold text-[#005c55] bg-[#f0fbf9] px-2 py-0.5 rounded-full">
                {awaitingPickupCount} Active Holds
              </span>
            </div>

            <div className="space-y-3">
              {reservations.map((res) => {
                const isDispensed = res.status === 'Dispensed';

                return (
                  <div
                    key={res.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isDispensed
                        ? 'border-gray-200 bg-gray-50 opacity-60'
                        : 'border-[#a3faef] bg-[#f0fbf9]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-gray-900 text-xs">{res.patientName}</div>
                        <div className="text-[10px] font-mono text-[#005c55] font-bold">{res.holdCode}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isDispensed
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-[#e6fbf1] text-[#007952]'
                      }`}>
                        {res.status}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-gray-700">
                      <strong>{res.medicineName}</strong>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Shelf Slot</span>
                        <span className="font-mono font-semibold text-gray-700">{res.shelfLocation}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-400 block">Amount Due</span>
                        <span className="font-bold text-gray-900">₹{res.amountDue.toFixed(2)}</span>
                      </div>

                      {!isDispensed && (
                        <button
                          onClick={() => handleDispense(res.id)}
                          className="px-2.5 py-1 bg-[#005c55] hover:bg-[#004741] text-white text-[11px] font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Dispense</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marg ERP & ABDM Telemetry Box */}
          <div className="bg-[#faf8ff] rounded-3xl p-5 border border-gray-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 text-gray-900 font-bold">
              <FileCheck className="w-4 h-4 text-[#005c55]" />
              <span>Ayushman Bharat (ABDM) Gateway</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Koramangala Health Hub is registered as an authorized ABDM M1/M2/M3 dispensary. All Schedule H substitutions are digitally recorded.
            </p>
            <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center justify-between text-[11px]">
              <span className="text-gray-500">ABDM Registry ID:</span>
              <span className="font-mono font-bold text-gray-800">IN-KA-560034-DISP-01</span>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Stock/Price Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-base text-gray-900">Update Item Stock &amp; Price</h3>
                <p className="text-xs text-gray-500">{editingItem.medicineName}</p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Store Retail Price (₹)</label>
                <input
                  type="number"
                  step="0.1"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 font-bold text-sm"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Available Strips on Shelf</label>
                <input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 font-bold text-sm"
                  required
                />
              </div>

              <div className="p-3 bg-[#f0fbf9] rounded-xl border border-[#a3faef] text-[#005c55] text-[11px]">
                Updating this immediately broadcasts real-time price &amp; stock to local patients searching in Bengaluru.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl font-bold shadow-xs"
                >
                  Save &amp; Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* POS / Marg ERP Sync Configuration Modal */}
      {false && isPosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden pop-in">
            <div className="bg-gradient-to-r from-[#005c55] to-[#086a63] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#a3faef]" />
                <div>
                  <h3 className="font-bold text-base">POS / ERP Sync Configuration</h3>
                  <p className="text-xs text-[#a3faef]">Marg ERP · C-Square · StoreHippo Pharma</p>
                </div>
              </div>
              <button
                onClick={() => { setIsPosModalOpen(false); setPosSaved(false); }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {posSaved ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-[#e6fbf1] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#007952]" />
                </div>
                <h4 className="font-bold text-gray-900">POS Integration Active!</h4>
                <p className="text-xs text-gray-500">
                  Inventory will sync automatically every 5 minutes from your {posSoftware === 'marg' ? 'Marg ERP' : posSoftware === 'csquare' ? 'C-Square' : 'StoreHippo'} instance.
                </p>
                <button
                  onClick={() => { setIsPosModalOpen(false); setPosSaved(false); }}
                  className="mt-2 px-6 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setPosSaved(true); handleManualSync(); }}
                className="p-6 space-y-4 text-xs"
              >
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">POS / ERP Software</label>
                  <select
                    value={posSoftware}
                    onChange={(e) => setPosSoftware(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-800"
                  >
                    <option value="marg">Marg ERP 9+ (Most Popular in India)</option>
                    <option value="csquare">C-Square Pharma Software</option>
                    <option value="storehippo">StoreHippo Pharma Edition</option>
                    <option value="meditech">MediTech POS</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Store API Key / License Token</label>
                  <input
                    type="text"
                    value={posApiKey}
                    onChange={(e) => setPosApiKey(e.target.value)}
                    placeholder="e.g. MARG-KA-2026-XXXX-YYYY"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-800 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Sync Interval</label>
                  <select className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-800">
                    <option>Every 5 minutes (Recommended)</option>
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Manual sync only</option>
                  </select>
                </div>
                <div className="bg-[#f0fbf9] border border-[#a3faef] rounded-xl p-3 flex items-start gap-2 text-[#005c55]">
                  <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>This integration maps your POS item codes to MediSmart medicine IDs and broadcasts live stock counts to patients searching nearby stores.</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsPosModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl font-bold shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Activate Integration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

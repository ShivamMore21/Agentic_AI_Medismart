import React, { useState } from 'react';
import { 
  MedicineHistoryItem, 
  MedicalCondition, 
  ConditionRecommendation, 
  AppViewMode, 
  Medicine,
  UserSession 
} from '../types';
import { 
  CONDITION_RECOMMENDATIONS_DATA, 
  COMMON_MEDICAL_CONDITIONS_LIST,
  POPULAR_MEDICINES 
} from '../data/mockData';
import { 
  Pill, 
  Heart, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  Store, 
  Phone, 
  ArrowRight, 
  FileText, 
  RefreshCw, 
  Trash2, 
  Check, 
  AlertCircle, 
  Info, 
  Filter, 
  Printer, 
  Activity,
  ChevronRight,
  Stethoscope,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MedicineHistoryAndConditionsViewProps {
  onNavigate: (view: AppViewMode) => void;
  currentUser: UserSession;
  medicineHistory: MedicineHistoryItem[];
  patientConditions: MedicalCondition[];
  onAddMedicineHistoryItem: (item: MedicineHistoryItem) => void;
  onUpdateMedicineStatus: (id: string, newStatus: MedicineHistoryItem['status']) => void;
  onDeleteMedicineHistoryItem: (id: string) => void;
  onAddCondition: (condition: MedicalCondition) => void;
  onRemoveCondition: (conditionId: string) => void;
  onQuickHoldPharmacy: (pharmacyId: string, storeName: string) => void;
  onSelectMedicineForParity?: (med: Medicine) => void;
}

export const MedicineHistoryAndConditionsView: React.FC<MedicineHistoryAndConditionsViewProps> = ({
  onNavigate,
  currentUser,
  medicineHistory,
  patientConditions,
  onAddMedicineHistoryItem,
  onUpdateMedicineStatus,
  onDeleteMedicineHistoryItem,
  onAddCondition,
  onRemoveCondition,
  onQuickHoldPharmacy,
  onSelectMedicineForParity
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'conditions'>('history');
  
  // History filtering & search
  const [historySearch, setHistorySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active (Ongoing)' | 'Refill Due' | 'Completed'>('All');

  // Add Medicine Modal State
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [newSalt, setNewSalt] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('1 Tablet daily');
  const [newCondition, setNewCondition] = useState('Type 2 Diabetes Mellitus');
  const [newMrpPaid, setNewMrpPaid] = useState<number>(30);
  const [newBrandMrp, setNewBrandMrp] = useState<number>(120);
  const [newPharmacy, setNewPharmacy] = useState('PMBJP Jan Aushadhi Kendra - Indiranagar');
  const [newDoctor, setNewDoctor] = useState('Dr. Consultation');

  // Add Condition Modal State
  const [isAddConditionModalOpen, setIsAddConditionModalOpen] = useState(false);
  const [selectedConditionName, setSelectedConditionName] = useState(COMMON_MEDICAL_CONDITIONS_LIST[0]);
  const [customConditionName, setCustomConditionName] = useState('');
  const [conditionSeverity, setConditionSeverity] = useState<'Controlled' | 'Mild' | 'Moderate' | 'Severe'>('Controlled');
  const [conditionYear, setConditionYear] = useState('2024');
  const [conditionNotes, setConditionNotes] = useState('');

  // Calculate Cumulative Metrics
  const totalSaved = medicineHistory.reduce((acc, item) => acc + (item.savingsRealized || 0), 0);
  const activeMedsCount = medicineHistory.filter(m => m.status === 'Active (Ongoing)' || m.status === 'Refill Due').length;
  const refillsDueCount = medicineHistory.filter(m => m.status === 'Refill Due').length;

  // Filtered History
  const filteredHistory = medicineHistory.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const query = historySearch.toLowerCase();
    const matchesSearch = 
      item.medicineName.toLowerCase().includes(query) ||
      item.brandPrescribed.toLowerCase().includes(query) ||
      item.saltComposition.toLowerCase().includes(query) ||
      item.conditionTargeted.toLowerCase().includes(query) ||
      (item.prescribingDoctor && item.prescribingDoctor.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  const handleCreateNewMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newSalt.trim()) return;

    const savings = Math.max(0, newBrandMrp - newMrpPaid);
    const newItem: MedicineHistoryItem = {
      id: 'hist-' + Date.now(),
      medicineName: newMedName.trim(),
      brandPrescribed: newBrandName.trim() || newMedName.trim(),
      saltComposition: newSalt.trim(),
      dosage: newDosage.trim() || 'Standard Dose',
      frequency: newFrequency.trim(),
      conditionTargeted: newCondition,
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active (Ongoing)',
      pharmacyName: newPharmacy,
      pharmacyLocality: 'Bengaluru Health Zone',
      mrpPaid: Number(newMrpPaid) || 25,
      originalBrandMRP: Number(newBrandMrp) || 100,
      savingsRealized: savings,
      isJanAushadhi: true,
      refillDaysLeft: 25,
      totalDaysCourse: 30,
      remainingPills: 25,
      prescribingDoctor: newDoctor.trim()
    };

    onAddMedicineHistoryItem(newItem);
    setIsAddMedModalOpen(false);

    // Reset form
    setNewMedName('');
    setNewBrandName('');
    setNewSalt('');
    setNewDosage('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleCreateNewCondition = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = selectedConditionName === 'Other / Custom' ? customConditionName.trim() : selectedConditionName;
    if (!finalName) return;

    const newCond: MedicalCondition = {
      id: 'cond-' + Date.now(),
      conditionName: finalName,
      diagnosedYear: conditionYear,
      severity: conditionSeverity,
      notes: conditionNotes.trim() || 'Follow prescribed diet and regular checkups.'
    };

    onAddCondition(newCond);
    setIsAddConditionModalOpen(false);
    setCustomConditionName('');
    setConditionNotes('');

    confetti({
      particleCount: 60,
      spread: 65,
      origin: { y: 0.7 }
    });
  };

  const handleRefillQuickHold = (item: MedicineHistoryItem) => {
    onQuickHoldPharmacy('store-pmbjp-01', item.pharmacyName || 'PMBJP Jan Aushadhi Kendra');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Metric Deck */}
      <div className="bg-gradient-to-r from-[#005c55] via-[#086a63] to-[#0f766e] rounded-3xl p-6 text-white shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <Activity className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#6ffbbe]/20 text-[#6ffbbe] text-xs font-semibold border border-[#6ffbbe]/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ABHA Health Locker Synced
              </span>
              <span className="text-xs text-white/80">•</span>
              <span className="text-xs text-white/90 font-medium">
                Patient: <strong className="text-white">{currentUser.name}</strong> ({currentUser.abhaId || '91-8842-1092-5501@abdm'})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Medication History &amp; Chronic Health Profile
            </h1>
            <p className="text-xs sm:text-sm text-teal-50 leading-relaxed">
              Track past dispensations, schedule refill alerts, manage ongoing chronic conditions like <strong>Diabetes &amp; Blood Pressure</strong>, and explore verified generic recommendations.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center px-2">
              <div className="text-xs text-teal-100 font-medium">Total Saved</div>
              <div className="text-lg sm:text-2xl font-black text-[#6ffbbe]">
                ₹{totalSaved.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] text-teal-200">via Generics</div>
            </div>

            <div className="text-center px-2 border-x border-white/15">
              <div className="text-xs text-teal-100 font-medium">Active Rx</div>
              <div className="text-lg sm:text-2xl font-black text-white">
                {activeMedsCount}
              </div>
              <div className="text-[10px] text-teal-200">Prescriptions</div>
            </div>

            <div className="text-center px-2">
              <div className="text-xs text-teal-100 font-medium">Refills Due</div>
              <div className={`text-lg sm:text-2xl font-black ${refillsDueCount > 0 ? 'text-amber-300' : 'text-white'}`}>
                {refillsDueCount}
              </div>
              <div className="text-[10px] text-teal-200">&le; 5 days left</div>
            </div>
          </div>
        </div>

        {/* Tab Selector inside Hero */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medicine History &amp; Refill Log</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-teal-800 text-teal-100">
                {medicineHistory.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('conditions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'conditions'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-4 h-4 text-red-300" />
              <span>Medical Conditions &amp; Recommendations</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-900/60 text-red-100">
                {patientConditions.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'history' ? (
              <button
                onClick={() => setIsAddMedModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#6ffbbe] text-[#004741] hover:bg-[#5be2ac] px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Log Past Medicine</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAddConditionModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#6ffbbe] text-[#004741] hover:bg-[#5be2ac] px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medical Condition</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TAB 1: MEDICINE HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Controls Bar: Search & Filter Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search history by medicine, salt, condition..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#005c55] focus:border-transparent"
              />
              {historySearch && (
                <button
                  onClick={() => setHistorySearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {(['All', 'Active (Ongoing)', 'Refill Due', 'Completed'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    statusFilter === filter
                      ? 'bg-[#005c55] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Refill Due Urgent Callout (if any) */}
          {refillsDueCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-amber-900">
                  Refill Alert: You have {refillsDueCount} medication{refillsDueCount > 1 ? 's' : ''} running low (&le; 5 days stock remaining)
                </span>
                <p className="text-amber-700 mt-0.5">
                  Reserve ahead at PMBJP Jan Aushadhi Kendras to lock in 70%+ savings and prevent sudden prescription interruptions.
                </p>
              </div>
            </div>
          )}

          {/* History Cards Grid */}
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">No medication history found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
                No recorded medicines matched your search or status filter. You can log existing prescriptions to maintain your personal digital locker.
              </p>
              <button
                onClick={() => setIsAddMedModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#005c55] text-white rounded-xl text-xs font-semibold hover:bg-[#004b45]"
              >
                <Plus className="w-4 h-4" /> Log Past Prescription
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHistory.map((item) => {
                const isRefillDue = item.status === 'Refill Due';
                const isCompleted = item.status === 'Completed';

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md flex flex-col justify-between ${
                      isRefillDue
                        ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-300/60'
                        : 'border-gray-200'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e6fbf1] text-[#007952] border border-[#a3faef] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.conditionTargeted}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isRefillDue
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : isCompleted
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      {/* Medicine Title & Substitution Line */}
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {item.medicineName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Prescribed Brand: <strong className="text-gray-700">{item.brandPrescribed}</strong>
                      </p>
                      <p className="text-[11px] font-mono text-gray-500 bg-gray-50 p-1.5 rounded-lg mt-2 border border-gray-100">
                        Salt: {item.saltComposition}
                      </p>

                      {/* Dosage, Doctor & Frequency */}
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-[#f8fafc] p-2.5 rounded-xl border border-gray-100">
                        <div>
                          <span className="text-[10px] text-gray-500 block">Dosage &amp; Timing</span>
                          <span className="font-semibold text-gray-800">{item.frequency}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 block">Prescribing Physician</span>
                          <span className="font-semibold text-gray-800 truncate block">
                            {item.prescribingDoctor || 'Verified Specialist'}
                          </span>
                        </div>
                      </div>

                      {/* Price & Savings Metrics */}
                      <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
                        <div>
                          <div className="text-[10px] text-emerald-800 font-medium">Fulfilled Generic MRP</div>
                          <div className="text-base font-black text-[#007952]">
                            ₹{item.mrpPaid.toFixed(2)}
                            <span className="text-[10px] text-gray-400 line-through ml-1.5">
                              ₹{item.originalBrandMRP.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-emerald-800 font-medium">Realized Savings</div>
                          <div className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                            Saved ₹{item.savingsRealized.toFixed(2)} ({Math.round((item.savingsRealized / item.originalBrandMRP) * 100)}%)
                          </div>
                        </div>
                      </div>

                      {/* Chemist & Date */}
                      <div className="mt-3 text-[11px] text-gray-500 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Store className="w-3 h-3 text-gray-400" />
                          <span className="truncate max-w-[180px]">{item.pharmacyName}</span>
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Started {item.startDate}</span>
                        </span>
                      </div>

                      {item.refillDaysLeft !== undefined && !isCompleted && (
                        <div className="mt-2 text-[11px] flex items-center justify-between">
                          <span className="text-gray-500">Stock Remaining:</span>
                          <span className={`font-bold ${item.refillDaysLeft <= 5 ? 'text-amber-700' : 'text-gray-700'}`}>
                            {item.remainingPills || 0} pills ({item.refillDaysLeft} days)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Deck */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {isCompleted ? (
                          <button
                            onClick={() => onUpdateMedicineStatus(item.id, 'Active (Ongoing)')}
                            className="text-[11px] text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
                          >
                            Resume Course
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateMedicineStatus(item.id, 'Completed')}
                            className="text-[11px] text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
                          >
                            Mark Completed
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteMedicineHistoryItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const found = POPULAR_MEDICINES.find(m => 
                              m.saltComposition.toLowerCase().includes(item.saltComposition.toLowerCase().split(' ')[0]) ||
                              m.brandName.toLowerCase().includes(item.brandPrescribed.toLowerCase().split(' ')[0])
                            ) || POPULAR_MEDICINES[0];
                            if (onSelectMedicineForParity) onSelectMedicineForParity(found);
                            onNavigate('rx-matcher');
                          }}
                          className="text-xs text-[#005c55] font-semibold hover:underline"
                        >
                          Salt Parity
                        </button>

                        <button
                          onClick={() => handleRefillQuickHold(item)}
                          className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                            isRefillDue
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs'
                              : 'bg-[#005c55] hover:bg-[#004843] text-white'
                          }`}
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>1-Click Re-Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MEDICAL CONDITIONS & RECOMMENDATIONS */}
      {activeTab === 'conditions' && (
        <div className="space-y-6">
          {/* Active Conditions Profile Deck */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">Your Active Medical Conditions</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-[#005c55] border border-teal-200">
                    {patientConditions.length} Diagnosed
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  We use your clinical conditions to cross-check generic drug safety, check contraindications, and provide standard WHO/ICMR formulary recommendations.
                </p>
              </div>

              <button
                onClick={() => setIsAddConditionModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#005c55] text-white rounded-xl text-xs font-bold hover:bg-[#004b45] shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Condition</span>
              </button>
            </div>

            {patientConditions.length === 0 ? (
              <div className="py-8 text-center">
                <Heart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500">No medical conditions added yet.</p>
                <button
                  onClick={() => setIsAddConditionModalOpen(true)}
                  className="mt-2 text-xs font-bold text-[#005c55] hover:underline"
                >
                  + Add your first condition (e.g. Type 2 Diabetes, Hypertension)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                {patientConditions.map((cond) => (
                  <div
                    key={cond.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-[#fcfdfd] hover:border-[#005c55] transition-all relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 font-medium">Diagnosed ~{cond.diagnosedYear || '2024'}</span>
                        <h4 className="text-sm font-bold text-gray-900 leading-snug">{cond.conditionName}</h4>
                      </div>

                      <button
                        onClick={() => onRemoveCondition(cond.id)}
                        className="text-gray-300 hover:text-red-600 transition-colors"
                        title="Remove condition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        cond.severity === 'Controlled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cond.severity === 'Mild'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        Status: {cond.severity}
                      </span>
                    </div>

                    {cond.notes && (
                      <p className="text-[11px] text-gray-600 mt-2 line-clamp-2 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
                        &quot;{cond.notes}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Condition-Based Medicine Recommendations Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#005c55]" />
                <h2 className="text-xl font-bold text-gray-900">
                  Evidence-Based Medicine Recommendations
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Government Jan Aushadhi generic alternatives mapped directly to your active conditions per <strong>National List of Essential Medicines (NLEM)</strong> and <strong>ICMR Guidelines</strong>.
              </p>
            </div>

            {patientConditions.map((cond) => {
              const recData = CONDITION_RECOMMENDATIONS_DATA[cond.conditionName] || {
                conditionName: cond.conditionName,
                category: 'General Therapeutics',
                lifestyleTips: [
                  'Follow doctor consultation schedule regularly.',
                  'Stay hydrated and track symptoms in a diary.'
                ],
                monitoringGuideline: 'Review vitals and lab markers as advised by primary physician.',
                commonContraindications: [
                  {
                    drugClass: 'Unregulated Self-Medication',
                    reason: 'Always cross-verify active ingredients with qualified pharmacist.'
                  }
                ],
                recommendedSalts: [
                  {
                    saltName: 'Standard Essential Generic Salts',
                    indication: `Therapeutic management for ${cond.conditionName}`,
                    standardDosage: 'As directed by specialist physician',
                    brandedExamples: ['Commercial Brands'],
                    brandedAvgMRP: 150.00,
                    janAushadhiGenericPrice: 35.00,
                    savingsPct: 76,
                    firstLineClinicalRationale: 'Jan Aushadhi generic bio-equivalent substitutes available with 70%+ savings.',
                    inStockStoresCount: 12
                  }
                ]
              };

              return (
                <div
                  key={cond.id}
                  className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-5"
                >
                  {/* Condition Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#005c55] flex items-center justify-center font-bold">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          {recData.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">
                          {cond.conditionName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#e6fbf1] text-[#007952] font-semibold px-3 py-1 rounded-full border border-[#a3faef] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ICMR &amp; WHO Guideline Aligned
                      </span>
                    </div>
                  </div>

                  {/* Contraindications Warning Box */}
                  {recData.commonContraindications && recData.commonContraindications.length > 0 && (
                    <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-red-900 font-bold text-xs mb-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>Safety Advisory &amp; Drug-Condition Contraindications:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {recData.commonContraindications.map((ci, idx) => (
                          <div key={idx} className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                            <span className="font-bold text-red-800 block text-[11px]">{ci.drugClass}</span>
                            <span className="text-red-700 text-[11px] leading-tight block mt-0.5">{ci.reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Salts Cards */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                      Recommended First-Line Generic Salts ({recData.recommendedSalts.length} Options)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recData.recommendedSalts.map((salt, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-[#f8fafc] rounded-2xl p-4 border border-gray-200 flex flex-col justify-between hover:border-[#005c55] transition-colors"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="text-sm font-bold text-gray-900 leading-snug">
                                {salt.saltName}
                              </h5>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#6ffbbe] text-[#004741] shrink-0">
                                Save {salt.savingsPct}%
                              </span>
                            </div>

                            <p className="text-xs text-gray-600 mt-1">
                              <strong>Indication:</strong> {salt.indication}
                            </p>

                            <div className="mt-2 text-[11px] text-gray-500 bg-white p-2 rounded-xl border border-gray-100">
                              <span className="text-gray-400 block text-[10px]">Branded Commercial Equivalents:</span>
                              <span className="font-semibold text-gray-700">
                                {salt.brandedExamples.join(', ')}
                              </span>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between bg-[#f0fdf4] p-2.5 rounded-xl border border-[#bbf7d0]">
                              <div>
                                <span className="text-[10px] text-emerald-800 block">Jan Aushadhi Kendra Price</span>
                                <span className="text-base font-extrabold text-[#007952]">
                                  ₹{salt.janAushadhiGenericPrice.toFixed(2)}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-gray-400 block">Commercial MRP</span>
                                <span className="text-xs font-medium text-gray-500 line-through">
                                  ₹{salt.brandedAvgMRP.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <p className="text-[11px] text-gray-500 mt-2.5 italic">
                              &bull; {salt.firstLineClinicalRationale}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                              <Store className="w-3.5 h-3.5 text-[#005c55]" />
                              <strong>{salt.inStockStoresCount}</strong> Bengaluru Kendras
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  onNavigate('rx-matcher');
                                }}
                                className="text-xs font-bold text-[#005c55] hover:underline"
                              >
                                View Parity
                              </button>

                              <button
                                onClick={() => {
                                  onQuickHoldPharmacy('store-pmbjp-01', 'PMBJP Jan Aushadhi Kendra');
                                }}
                                className="px-3 py-1.5 bg-[#005c55] hover:bg-[#004b45] text-white text-xs font-bold rounded-xl shadow-xs"
                              >
                                Hold Refill
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle & Monitoring Guidance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs bg-[#fdfefe] p-4 rounded-2xl border border-gray-100">
                    <div>
                      <h5 className="font-bold text-gray-800 flex items-center gap-1.5 mb-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#005c55]" />
                        Lifestyle &amp; Dietary Guidelines
                      </h5>
                      <ul className="space-y-1 text-gray-600 text-[11px]">
                        {recData.lifestyleTips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <span className="text-[#005c55] font-bold">&bull;</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold text-gray-800 flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#005c55]" />
                        Monitoring Guideline
                      </h5>
                      <p className="text-[11px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100">
                        {recData.monitoringGuideline}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: ADD / LOG MEDICINE TO HISTORY */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#005c55] flex items-center justify-center font-bold">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Log Past Prescription Medicine</h3>
                  <p className="text-xs text-gray-500">Record a medication in your ABHA-linked history log</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddMedModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewMedicine} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Generic / Fulfilled Name *</label>
                  <input
                    type="text"
                    required
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="e.g. Jan Aushadhi Metformin 500mg"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Prescribed Brand Name</label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. Glycomet-SR 500"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Salt Composition *</label>
                <input
                  type="text"
                  required
                  value={newSalt}
                  onChange={(e) => setNewSalt(e.target.value)}
                  placeholder="e.g. Metformin Hydrochloride Prolonged Release"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Dosage &amp; Frequency</label>
                  <input
                    type="text"
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value)}
                    placeholder="e.g. 1 Tab twice daily"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Condition Targeted</label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  >
                    {COMMON_MEDICAL_CONDITIONS_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="General Health / Antibiotic">General Health / Antibiotic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price Paid (₹)</label>
                  <input
                    type="number"
                    value={newMrpPaid}
                    onChange={(e) => setNewMrpPaid(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Original Brand MRP (₹)</label>
                  <input
                    type="number"
                    value={newBrandMrp}
                    onChange={(e) => setNewBrandMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Fulfilled Pharmacy</label>
                  <input
                    type="text"
                    value={newPharmacy}
                    onChange={(e) => setNewPharmacy(e.target.value)}
                    placeholder="Pharmacy name"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Prescribing Doctor</label>
                  <input
                    type="text"
                    value={newDoctor}
                    onChange={(e) => setNewDoctor(e.target.value)}
                    placeholder="Doctor Name"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#005c55] text-white font-bold hover:bg-[#004b45] shadow-xs"
                >
                  Save to History Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD MEDICAL CONDITION */}
      {isAddConditionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Add Medical Condition</h3>
                  <p className="text-xs text-gray-500">Configure health profile for generic suggestions</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddConditionModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewCondition} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Select Condition *</label>
                <select
                  value={selectedConditionName}
                  onChange={(e) => setSelectedConditionName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none font-semibold text-gray-800"
                >
                  {COMMON_MEDICAL_CONDITIONS_LIST.map((cond) => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                  <option value="Other / Custom">Other / Custom Condition...</option>
                </select>
              </div>

              {selectedConditionName === 'Other / Custom' && (
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Custom Condition Name *</label>
                  <input
                    type="text"
                    required
                    value={customConditionName}
                    onChange={(e) => setCustomConditionName(e.target.value)}
                    placeholder="e.g. Chronic Migraine, Rheumatoid Arthritis"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Current Status / Severity</label>
                  <select
                    value={conditionSeverity}
                    onChange={(e) => setConditionSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  >
                    <option value="Controlled">Controlled</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Diagnosed Year</label>
                  <input
                    type="text"
                    value={conditionYear}
                    onChange={(e) => setConditionYear(e.target.value)}
                    placeholder="e.g. 2023"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Physician Notes / Diet Directives</label>
                <textarea
                  rows={2}
                  value={conditionNotes}
                  onChange={(e) => setConditionNotes(e.target.value)}
                  placeholder="e.g. Low sodium diet, maintain fasting glucose < 110 mg/dL"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddConditionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#005c55] text-white font-bold hover:bg-[#004b45] shadow-xs"
                >
                  Add to Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

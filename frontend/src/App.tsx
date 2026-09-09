import React, { useEffect, useState } from 'react';
import { AppViewMode, Medicine, UserSession, UserRole, MedicineHistoryItem, MedicalCondition } from './types';
import { POPULAR_MEDICINES, MOCK_USERS, MOCK_MEDICINE_HISTORY, MOCK_PATIENT_CONDITIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ConsumerDiscoveryView } from './components/ConsumerDiscoveryView';
import { RxMatcherMatrixView } from './components/RxMatcherMatrixView';
import { PharmacyStockLocatorView } from './components/PharmacyStockLocatorView';
import { PharmacyPartnerPortalView } from './components/PharmacyPartnerPortalView';
import { AdminPortalView } from './components/AdminPortalView';
import { ArchitectureAndPRDView } from './components/ArchitectureAndPRDView';
import { MedicineHistoryAndConditionsView } from './components/MedicineHistoryAndConditionsView';
import { ClinicalComparisonModal } from './components/ClinicalComparisonModal';
import { PriceDiscrepancyModal } from './components/PriceDiscrepancyModal';
import { LoginModal } from './components/LoginModal';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Pill, 
  PhoneCall, 
  X,
  Heart,
  Clock,
  UserPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiClient } from './lib/api';

export default function App() {
  useEffect(() => {
    void apiClient.health().catch(() => undefined);
  }, []);
  const [currentView, setCurrentView] = useState<AppViewMode>('consumer-discovery');
  const [selectedPincode, setSelectedPincode] = useState<string>('560038');
  const [selectedLocality, setSelectedLocality] = useState<string>('Indiranagar, Bengaluru');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine>(POPULAR_MEDICINES[0]);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserSession>(MOCK_USERS.patient);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalDefaultRole, setLoginModalDefaultRole] = useState<UserRole>('pharmacist');
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');
  const [pendingProtectedView, setPendingProtectedView] = useState<AppViewMode | null>(null);

  // Medication History & Patient Conditions State
  const [medicineHistory, setMedicineHistory] = useState<MedicineHistoryItem[]>(MOCK_MEDICINE_HISTORY);
  const [patientConditions, setPatientConditions] = useState<MedicalCondition[]>(MOCK_PATIENT_CONDITIONS);

  // Modal states
  const [isClinicalModalOpen, setIsClinicalModalOpen] = useState<boolean>(false);
  const [discrepancyModalData, setDiscrepancyModalData] = useState<{
    isOpen: boolean;
    pharmacyName: string;
    medicineName: string;
  }>({
    isOpen: false,
    pharmacyName: '',
    medicineName: ''
  });

  // Hold Notification Toast
  const [holdToast, setHoldToast] = useState<{
    show: boolean;
    storeName: string;
    code: string;
  }>({
    show: false,
    storeName: '',
    code: ''
  });

  const requiredRoleForView = (view: AppViewMode): UserRole | null => {
    if (view === 'b2b-partner-portal') return 'pharmacist';
    if (view === 'admin-portal') return 'admin';
    return null;
  };

  const navigateTo = (view: AppViewMode) => {
    const requiredRole = requiredRoleForView(view);
    if (requiredRole && currentUser.role !== requiredRole) {
      setPendingProtectedView(view);
      handleOpenLoginModal(requiredRole, 'signin');
      return;
    }
    setCurrentView(view);
  };

  const handlePincodeChange = (pincode: string, locality: string) => {
    setSelectedPincode(pincode);
    setSelectedLocality(locality);
  };

  const handleSelectMedicineForParity = (med: Medicine) => {
    setSelectedMedicine(med);
    setCurrentView('rx-matcher');
  };

  const handleOpenLoginModal = (role: UserRole = 'pharmacist', mode: 'signin' | 'register' = 'signin') => {
    setLoginModalDefaultRole(role);
    setAuthModalMode(mode);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user: UserSession, targetView?: AppViewMode) => {
    setCurrentUser(user);
    const destination = targetView || pendingProtectedView;
    if (destination) {
      setCurrentView(destination);
    }
    setPendingProtectedView(null);
  };

  const handleRegisterSuccess = (newUser: UserSession, initialConditions: MedicalCondition[], targetView?: AppViewMode) => {
    setCurrentUser(newUser);
    if (initialConditions.length > 0) {
      setPatientConditions(initialConditions);
    }
    const destination = targetView || pendingProtectedView;
    if (destination) {
      setCurrentView(destination);
    }
    setPendingProtectedView(null);
  };

  const handleLogout = () => {
    setCurrentUser(MOCK_USERS.patient);
    if (currentView === 'admin-portal' || currentView === 'b2b-partner-portal') {
      setCurrentView('consumer-discovery');
    }
  };

  const handleQuickSwitchRole = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(MOCK_USERS.admin);
      setCurrentView('admin-portal');
    } else if (role === 'pharmacist') {
      setCurrentUser(MOCK_USERS.pharmacist);
      setCurrentView('b2b-partner-portal');
    } else {
      setCurrentUser(MOCK_USERS.patient);
      setCurrentView('consumer-discovery');
    }
  };

  const handleQuickHoldPharmacy = (pharmacyId: string, storeName: string) => {
    const code = '#MS-' + Math.floor(1000 + Math.random() * 9000);
    setHoldToast({
      show: true,
      storeName,
      code
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 }
    });
  };

  // Medication History Handlers
  const handleAddMedicineHistoryItem = (item: MedicineHistoryItem) => {
    setMedicineHistory(prev => [item, ...prev]);
  };

  const handleUpdateMedicineStatus = (id: string, newStatus: MedicineHistoryItem['status']) => {
    setMedicineHistory(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const handleDeleteMedicineHistoryItem = (id: string) => {
    setMedicineHistory(prev => prev.filter(m => m.id !== id));
  };

  // Conditions Handlers
  const handleAddCondition = (condition: MedicalCondition) => {
    setPatientConditions(prev => [...prev, condition]);
    // Also sync in currentUser object
    setCurrentUser(prev => ({
      ...prev,
      existingConditions: [...(prev.existingConditions || []), condition.conditionName]
    }));
  };

  const handleRemoveCondition = (conditionId: string) => {
    const target = patientConditions.find(c => c.id === conditionId);
    setPatientConditions(prev => prev.filter(c => c.id !== conditionId));
    if (target) {
      setCurrentUser(prev => ({
        ...prev,
        existingConditions: (prev.existingConditions || []).filter(c => c !== target.conditionName)
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf9] text-[#131b2e] selection:bg-[#9cf2e8] selection:text-[#005c55]">
      {/* Top Main Navigation Header */}
      <Navbar
        currentView={currentView}
        onViewChange={navigateTo}
        selectedPincode={selectedPincode}
        onPincodeChange={handlePincodeChange}
        currentUser={currentUser}
        onOpenLoginModal={handleOpenLoginModal}
        onLogout={handleLogout}
        onQuickSwitchRole={handleQuickSwitchRole}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentView === 'consumer-discovery' && (
          <ConsumerDiscoveryView
            onNavigate={navigateTo}
            onOpenClinicalModal={() => setIsClinicalModalOpen(true)}
            onSelectMedicineForParity={handleSelectMedicineForParity}
            selectedPincode={selectedPincode}
            selectedLocality={selectedLocality}
            onQuickHoldPharmacy={handleQuickHoldPharmacy}
          />
        )}

        {currentView === 'medication-history' && (
          <MedicineHistoryAndConditionsView
            onNavigate={navigateTo}
            currentUser={currentUser}
            medicineHistory={medicineHistory}
            patientConditions={patientConditions}
            onAddMedicineHistoryItem={handleAddMedicineHistoryItem}
            onUpdateMedicineStatus={handleUpdateMedicineStatus}
            onDeleteMedicineHistoryItem={handleDeleteMedicineHistoryItem}
            onAddCondition={handleAddCondition}
            onRemoveCondition={handleRemoveCondition}
            onQuickHoldPharmacy={handleQuickHoldPharmacy}
            onSelectMedicineForParity={handleSelectMedicineForParity}
          />
        )}

        {currentView === 'rx-matcher' && (
          <RxMatcherMatrixView
            onNavigate={navigateTo}
            onOpenClinicalModal={() => setIsClinicalModalOpen(true)}
            selectedPincode={selectedPincode}
            selectedLocality={selectedLocality}
            onQuickHoldPharmacy={handleQuickHoldPharmacy}
            selectedMedicine={selectedMedicine}
          />
        )}

        {currentView === 'gis-map-locator' && (
          <PharmacyStockLocatorView
            onNavigate={navigateTo}
            selectedPincode={selectedPincode}
            selectedLocality={selectedLocality}
            onOpenDiscrepancyModal={(pharmacyName, medName) => {
              setDiscrepancyModalData({
                isOpen: true,
                pharmacyName,
                medicineName: medName
              });
            }}
            onQuickHoldPharmacy={handleQuickHoldPharmacy}
          />
        )}

        {currentView === 'b2b-partner-portal' && (
          <PharmacyPartnerPortalView
            onNavigate={navigateTo}
            currentUser={currentUser}
            onOpenLoginModal={handleOpenLoginModal}
          />
        )}

        {currentView === 'admin-portal' && (
          <AdminPortalView
            onNavigate={navigateTo}
            currentUser={currentUser}
          />
        )}

        {currentView === 'system-architecture' && (
          <ArchitectureAndPRDView />
        )}
      </main>

      {/* Quick Hold Floating Notification Toast */}
      {holdToast.show && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 border-[#005c55] p-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6fbf1] text-[#007952] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-gray-900 text-sm">
                <span>Hold Confirmed!</span>
                <span className="text-xs font-mono bg-[#f0fbf9] text-[#005c55] px-2 py-0.5 rounded border border-[#a3faef]">
                  {holdToast.code}
                </span>
              </div>
              <p className="text-gray-600 mt-0.5">
                Generic strip has been held for you at <strong>{holdToast.storeName}</strong>.
              </p>
              <div className="mt-2 flex items-center gap-3 text-[11px] font-semibold text-[#005c55]">
                <button
                  onClick={() => {
                    setCurrentView('gis-map-locator');
                    setHoldToast(prev => ({ ...prev, show: false }));
                  }}
                  className="underline hover:text-[#004741]"
                >
                  View Route on Map →
                </button>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 font-normal">Valid for 2 Hours</span>
              </div>
            </div>
            <button
              onClick={() => setHoldToast(prev => ({ ...prev, show: false }))}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ClinicalComparisonModal
        isOpen={isClinicalModalOpen}
        onClose={() => setIsClinicalModalOpen(false)}
        onConfirmSwitch={() => {
          setIsClinicalModalOpen(false);
          setCurrentView('rx-matcher');
        }}
      />

      <PriceDiscrepancyModal
        isOpen={discrepancyModalData.isOpen}
        onClose={() => setDiscrepancyModalData(prev => ({ ...prev, isOpen: false }))}
        pharmacyName={discrepancyModalData.pharmacyName}
        medicineName={discrepancyModalData.medicineName}
      />

      {/* Role-based Authentication & Registration Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
        defaultRole={loginModalDefaultRole}
        initialMode={authModalMode}
      />

      {/* Professional Footer */}
      <footer className="hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
            {/* Col 1 */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#005c55] flex items-center justify-center text-white">
                  <Pill className="w-4 h-4 text-[#a3faef]" />
                </div>
                <span className="font-extrabold text-base text-[#005c55]">MediSmart</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                India&apos;s verified open medicine intelligence, prescription history tracking, and bio-equivalent generic pharmacy discovery platform.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#007952] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> CDSCO Formulary Synced
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Patient &amp; Health Locker</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => setCurrentView('medication-history')} className="hover:text-[#005c55] font-semibold text-[#005c55]">Medication History &amp; Refill Due</button></li>
                <li><button onClick={() => setCurrentView('medication-history')} className="hover:text-[#005c55]">Medical Conditions &amp; Recommendations</button></li>
                <li><button onClick={() => handleOpenLoginModal('patient', 'register')} className="hover:text-[#005c55]">New User ABHA Registration</button></li>
                <li><button onClick={() => setCurrentView('consumer-discovery')} className="hover:text-[#005c55]">Medicine Discovery</button></li>
                <li><button onClick={() => setCurrentView('rx-matcher')} className="hover:text-[#005c55]">Rx Salt Parity Matrix</button></li>
                <li><button onClick={() => setCurrentView('gis-map-locator')} className="hover:text-[#005c55]">PMBJP Jan Aushadhi Kendras</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Regulatory &amp; Legal</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => navigateTo('admin-portal')} className="hover:text-[#005c55] font-semibold text-amber-800">State Drug Controller (Admin Console)</button></li>
                <li><a href="#compliance" onClick={(e) => { e.preventDefault(); setCurrentView('system-architecture'); }} className="hover:text-[#005c55]">Drugs &amp; Cosmetics Act 1940 (Rule 65)</a></li>
                <li><a href="#nppa" onClick={(e) => { e.preventDefault(); setCurrentView('system-architecture'); }} className="hover:text-[#005c55]">NPPA DPCO 2026 Price Ceilings</a></li>
                <li><a href="#abdm" onClick={(e) => { e.preventDefault(); setCurrentView('system-architecture'); }} className="hover:text-[#005c55]">Ayushman Bharat (ABDM) Integration</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Chemist &amp; Health Hubs</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => handleOpenLoginModal('pharmacist', 'signin')} className="hover:text-[#005c55] font-semibold text-[#005c55]">Pharmacist Partner Sign-In</button></li>
                <li><button onClick={() => handleOpenLoginModal('pharmacist', 'register')} className="hover:text-[#005c55]">Register Chemist Store</button></li>
                <li><button onClick={() => navigateTo('b2b-partner-portal')} className="hover:text-[#005c55]">Dispensary Partner Portal</button></li>
                <li><button onClick={() => navigateTo('b2b-partner-portal')} className="hover:text-[#005c55]">Marg ERP / POS Sync Connector</button></li>
                <li><a href="tel:18001808080" className="hover:text-[#005c55] flex items-center gap-1"><PhoneCall className="w-3 h-3" /> PMBJP Helpline: 1800-180-8080</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
            <div>
              © 2026 MediSmart Healthcare Technologies. Developed for Bengaluru Health Zone &amp; Pan-India Accessibility.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleOpenLoginModal('patient', 'register')} className="text-teal-700 font-bold hover:underline">New User Register</button>
              <span>•</span>
              <button onClick={() => handleOpenLoginModal('admin')} className="text-gray-500 hover:text-gray-700">Admin Login</button>
              <span>•</span>
              <button onClick={() => handleOpenLoginModal('pharmacist')} className="text-gray-500 hover:text-gray-700">Chemist Login</button>
              <span>•</span>
              <span className="font-mono text-gray-500">v2.5.0-PROD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { AppViewMode, Medicine, UserSession, UserRole } from './types';
import { POPULAR_MEDICINES, MOCK_USERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ConsumerDiscoveryView } from './components/ConsumerDiscoveryView';
import { RxMatcherMatrixView } from './components/RxMatcherMatrixView';
import { PharmacyStockLocatorView } from './components/PharmacyStockLocatorView';
import { PharmacyPartnerPortalView } from './components/PharmacyPartnerPortalView';
import { AdminPortalView } from './components/AdminPortalView';
import { ArchitectureAndPRDView } from './components/ArchitectureAndPRDView';
import { ClinicalComparisonModal } from './components/ClinicalComparisonModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { PriceDiscrepancyModal } from './components/PriceDiscrepancyModal';
import { LoginModal } from './components/LoginModal';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  HeartHandshake, 
  Pill, 
  Building2, 
  PhoneCall, 
  FileText,
  Sparkles,
  X,
  LogIn
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentView, setCurrentView] = useState<AppViewMode>('consumer-discovery');
  const [selectedPincode, setSelectedPincode] = useState<string>('560038');
  const [selectedLocality, setSelectedLocality] = useState<string>('Indiranagar, Bengaluru');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine>(POPULAR_MEDICINES[0]);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserSession>(MOCK_USERS.patient);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalDefaultRole, setLoginModalDefaultRole] = useState<UserRole>('pharmacist');

  // Modal states
  const [isClinicalModalOpen, setIsClinicalModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
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

  const handlePincodeChange = (pincode: string, locality: string) => {
    setSelectedPincode(pincode);
    setSelectedLocality(locality);
  };

  const handleSelectMedicineForParity = (med: Medicine) => {
    setSelectedMedicine(med);
    setCurrentView('rx-matcher');
  };

  const handleOpenLoginModal = (role: UserRole = 'pharmacist') => {
    setLoginModalDefaultRole(role);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user: UserSession, targetView?: AppViewMode) => {
    setCurrentUser(user);
    if (targetView) {
      setCurrentView(targetView);
    }
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

  const handlePrescriptionAnalyzed = (detectedName: string) => {
    const found = POPULAR_MEDICINES.find(m => m.brandName.toLowerCase().includes(detectedName.toLowerCase()));
    if (found) {
      setSelectedMedicine(found);
    }
    setCurrentView('rx-matcher');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] selection:bg-[#9cf2e8] selection:text-[#005c55]">
      {/* Top Main Navigation Header */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedPincode={selectedPincode}
        onPincodeChange={handlePincodeChange}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        currentUser={currentUser}
        onOpenLoginModal={handleOpenLoginModal}
        onLogout={handleLogout}
        onQuickSwitchRole={handleQuickSwitchRole}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === 'consumer-discovery' && (
          <ConsumerDiscoveryView
            onNavigate={setCurrentView}
            onOpenClinicalModal={() => setIsClinicalModalOpen(true)}
            onSelectMedicineForParity={handleSelectMedicineForParity}
            selectedPincode={selectedPincode}
            selectedLocality={selectedLocality}
            onQuickHoldPharmacy={handleQuickHoldPharmacy}
          />
        )}

        {currentView === 'rx-matcher' && (
          <RxMatcherMatrixView
            onNavigate={setCurrentView}
            onOpenClinicalModal={() => setIsClinicalModalOpen(true)}
            selectedPincode={selectedPincode}
            selectedLocality={selectedLocality}
            onQuickHoldPharmacy={handleQuickHoldPharmacy}
          />
        )}

        {currentView === 'gis-map-locator' && (
          <PharmacyStockLocatorView
            onNavigate={setCurrentView}
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
            onNavigate={setCurrentView}
            currentUser={currentUser}
            onOpenLoginModal={handleOpenLoginModal}
          />
        )}

        {currentView === 'admin-portal' && (
          <AdminPortalView
            onNavigate={setCurrentView}
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
                1 Strip of <strong>Moxikind-CV 625</strong> is set aside for you at <strong>{holdToast.storeName}</strong>.
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

      <PrescriptionUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPrescriptionAnalyzed={handlePrescriptionAnalyzed}
      />

      <PriceDiscrepancyModal
        isOpen={discrepancyModalData.isOpen}
        onClose={() => setDiscrepancyModalData(prev => ({ ...prev, isOpen: false }))}
        pharmacyName={discrepancyModalData.pharmacyName}
        medicineName={discrepancyModalData.medicineName}
      />

      {/* Role-based Authentication Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        defaultRole={loginModalDefaultRole}
      />

      {/* Professional Footer */}
      <footer className="bg-white border-t border-[#e2e8f0] py-8 mt-12 text-xs text-gray-500">
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
                India's verified open medicine intelligence and bio-equivalent generic pharmacy discovery platform.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#007952] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> CDSCO Formulary Synced
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Patient Resources</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => setCurrentView('consumer-discovery')} className="hover:text-[#005c55]">Medicine Discovery</button></li>
                <li><button onClick={() => setCurrentView('rx-matcher')} className="hover:text-[#005c55]">Rx Salt Parity Matrix</button></li>
                <li><button onClick={() => setCurrentView('gis-map-locator')} className="hover:text-[#005c55]">PMBJP Jan Aushadhi Kendras</button></li>
                <li><button onClick={() => setIsUploadModalOpen(true)} className="hover:text-[#005c55]">AI Prescription Scanner</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Regulatory &amp; Legal</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => setCurrentView('admin-portal')} className="hover:text-[#005c55] font-semibold text-amber-800">State Drug Controller (Admin Console)</button></li>
                <li><a href="#compliance" onClick={(e) => { e.preventDefault(); setCurrentView('system-architecture'); }} className="hover:text-[#005c55]">Drugs &amp; Cosmetics Act 1940 (Rule 65)</a></li>
                <li><a href="#nppa" onClick={(e) => { e.preventDefault(); setCurrentView('system-architecture'); }} className="hover:text-[#005c55]">NPPA DPCO 2026 Price Ceilings</a></li>
                <li><a href="#abdm" onClick={(e) => { e.preventDefault(); setCurrentView('system-architecture'); }} className="hover:text-[#005c55]">Ayushman Bharat (ABDM) Integration</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Chemist &amp; Health Hubs</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => handleOpenLoginModal('pharmacist')} className="hover:text-[#005c55] font-semibold text-[#005c55]">Pharmacist Partner Sign-In</button></li>
                <li><button onClick={() => setCurrentView('b2b-partner-portal')} className="hover:text-[#005c55]">Dispensary Partner Portal</button></li>
                <li><button onClick={() => setCurrentView('b2b-partner-portal')} className="hover:text-[#005c55]">Marg ERP / POS Sync Connector</button></li>
                <li><a href="tel:18001808080" className="hover:text-[#005c55] flex items-center gap-1"><PhoneCall className="w-3 h-3" /> PMBJP National Helpline: 1800-180-8080</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
            <div>
              © 2026 MediSmart Healthcare Technologies. Developed for Bengaluru Health Zone &amp; Pan-India Accessibility.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleOpenLoginModal('admin')} className="text-gray-500 hover:text-gray-700">Admin Login</button>
              <span>•</span>
              <button onClick={() => handleOpenLoginModal('pharmacist')} className="text-gray-500 hover:text-gray-700">Chemist Login</button>
              <span>•</span>
              <span className="font-mono text-gray-500">v2.4.0-PROD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

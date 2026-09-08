import React, { useState } from 'react';
import { UserSession, UserRole, MedicalCondition, AppViewMode } from '../types';
import { MOCK_USERS, COMMON_MEDICAL_CONDITIONS_LIST } from '../data/mockData';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Eye, 
  EyeOff, 
  X, 
  CheckCircle2, 
  UserCheck, 
  Store, 
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck,
  Zap,
  User,
  Heart,
  Phone,
  MapPin,
  Plus,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession, targetView?: AppViewMode) => void;
  onRegisterSuccess?: (user: UserSession, initialConditions: MedicalCondition[], targetView?: AppViewMode) => void;
  defaultRole?: UserRole;
  initialMode?: 'signin' | 'register';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterSuccess,
  defaultRole = 'pharmacist',
  initialMode = 'signin'
}) => {
  const [modalMode, setModalMode] = useState<'signin' | 'register'>(initialMode);
  const [activeTab, setActiveTab] = useState<UserRole>(defaultRole);
  const [registerRole, setRegisterRole] = useState<'patient' | 'pharmacist'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pharmacist Login state
  const [pharmEmail, setPharmEmail] = useState('sarah.jenkins@healthhub.in');
  const [pharmLicense, setPharmLicense] = useState('KA-PH-2022-9011');
  const [pharmPassword, setPharmPassword] = useState('MargPOS@2026');
  const [pharmBranch, setPharmBranch] = useState<'koramangala' | 'janaushadhi'>('koramangala');

  // Admin Login state
  const [adminEmail, setAdminEmail] = useState('arvind.rao@karnatakahealth.gov.in');
  const [adminKey, setAdminKey] = useState('CDSCO-DC-KA-8899');
  const [adminPassword, setAdminPassword] = useState('SecureAdmin#2026');

  // Patient Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('+91 98450 ');
  const [regAge, setRegAge] = useState<number | ''>(34);
  const [regGender, setRegGender] = useState('Female');
  const [regLocality, setRegLocality] = useState('Indiranagar, Bengaluru');
  const [regPincode, setRegPincode] = useState('560038');
  const [regAbhaId, setRegAbhaId] = useState('');
  const [regSelectedConditions, setRegSelectedConditions] = useState<string[]>(['Type 2 Diabetes Mellitus']);
  const [regCustomCondition, setRegCustomCondition] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Pharmacy Registration Form State
  const [regPharmStoreName, setRegPharmStoreName] = useState('');
  const [regPharmProprietor, setRegPharmProprietor] = useState('');
  const [regPharmLicense, setRegPharmLicense] = useState('KA-PH-2026-');
  const [regPharmAbdmFacility, setRegPharmAbdmFacility] = useState('IN-KA-BLR-FAC-');
  const [regPharmPos, setRegPharmPos] = useState('Marg ERP 9+ Platinum');
  const [regPharmEmail, setRegPharmEmail] = useState('');
  const [regPharmPhone, setRegPharmPhone] = useState('+91 80 ');
  const [regPharmPassword, setRegPharmPassword] = useState('');

  if (!isOpen) return null;

  const handleGenerateAbhaId = () => {
    const random1 = Math.floor(1000 + Math.random() * 9000);
    const random2 = Math.floor(1000 + Math.random() * 9000);
    const random3 = Math.floor(1000 + Math.random() * 9000);
    setRegAbhaId(`91-${random1}-${random2}-${random3}@abdm`);
  };

  const toggleConditionSelection = (cond: string) => {
    if (regSelectedConditions.includes(cond)) {
      setRegSelectedConditions(regSelectedConditions.filter(c => c !== cond));
    } else {
      setRegSelectedConditions([...regSelectedConditions, cond]);
    }
  };

  const handleAddCustomCondition = () => {
    if (regCustomCondition.trim() && !regSelectedConditions.includes(regCustomCondition.trim())) {
      setRegSelectedConditions([...regSelectedConditions, regCustomCondition.trim()]);
      setRegCustomCondition('');
    }
  };

  // Sign in actions
  const handlePharmacistLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const selectedUser = pharmBranch === 'janaushadhi' 
        ? MOCK_USERS.pharmacist_pmbjp 
        : MOCK_USERS.pharmacist;

      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });

      onLoginSuccess(selectedUser, 'b2b-partner-portal');
      onClose();
    }, 600);
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const adminUser = MOCK_USERS.admin;

      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 }
      });

      onLoginSuccess(adminUser, 'admin-portal');
      onClose();
    }, 600);
  };

  const handlePatientSwitch = () => {
    onLoginSuccess(MOCK_USERS.patient, 'consumer-discovery');
    onClose();
  };

  // Registration action
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (registerRole === 'patient') {
        if (!regName.trim() || !regEmail.trim()) {
          setErrorMessage('Please fill in your name and email address.');
          return;
        }

        const initials = regName.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PT';
        const finalAbhaId = regAbhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}@abdm`;

        const newUser: UserSession = {
          id: 'user-pat-' + Date.now(),
          name: regName.trim(),
          email: regEmail.trim(),
          role: 'patient',
          roleBadge: 'Caregiver / Patient (Smart Saver)',
          avatarText: initials,
          organization: `${regLocality} Resident`,
          phone: regPhone.trim(),
          abdmVerified: true,
          age: Number(regAge) || 30,
          gender: regGender,
          locality: regLocality,
          pincode: regPincode,
          abhaId: finalAbhaId,
          existingConditions: regSelectedConditions
        };

        const initialConditionsList: MedicalCondition[] = regSelectedConditions.map((cName, idx) => ({
          id: `cond-new-${idx}-${Date.now()}`,
          conditionName: cName,
          diagnosedYear: '2024',
          severity: 'Controlled',
          notes: 'Added during onboarding registration profile setup.'
        }));

        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 }
        });

        if (onRegisterSuccess) {
          onRegisterSuccess(newUser, initialConditionsList, 'medication-history');
        } else {
          onLoginSuccess(newUser, 'medication-history');
        }
        onClose();

      } else {
        // Pharmacy Partner Registration
        if (!regPharmStoreName.trim() || !regPharmProprietor.trim()) {
          setErrorMessage('Please enter the store name and pharmacist name.');
          return;
        }

        const initials = regPharmProprietor.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PH';
        const newPharmUser: UserSession = {
          id: 'user-pharm-' + Date.now(),
          name: regPharmProprietor.trim(),
          email: regPharmEmail.trim() || `${regPharmProprietor.toLowerCase().replace(/\s+/g, '.')}@pharmacy.in`,
          role: 'pharmacist',
          roleBadge: 'Registered Dispensary Partner',
          avatarText: initials,
          organization: regPharmStoreName.trim(),
          branchId: 'BLR-' + Math.floor(100 + Math.random() * 900),
          licenseNumber: regPharmLicense.trim(),
          phone: regPharmPhone.trim(),
          abdmVerified: true
        };

        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 }
        });

        if (onRegisterSuccess) {
          onRegisterSuccess(newPharmUser, [], 'b2b-partner-portal');
        } else {
          onLoginSuccess(newPharmUser, 'b2b-partner-portal');
        }
        onClose();
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#005c55] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#007952]" />
              <span>MediSmart National Formulary Network</span>
            </div>
            <h3 className="text-xl font-black text-gray-900 font-headline">
              {modalMode === 'signin' ? 'Portal Sign-In' : 'Create New User Account'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {modalMode === 'signin' 
                ? 'Sign in to access prescription records, dispensary sync, or administrative console'
                : 'Join MediSmart to track medications, manage chronic conditions, or register your dispensary'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher: Sign In vs Register */}
        <div className="flex p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setModalMode('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              modalMode === 'signin'
                ? 'bg-white text-[#005c55] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Existing User Sign-In
          </button>

          <button
            type="button"
            onClick={() => {
              setModalMode('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              modalMode === 'register'
                ? 'bg-[#005c55] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            New User Registration
          </button>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* -------------------- SIGN IN MODE -------------------- */}
        {modalMode === 'signin' && (
          <div className="space-y-4">
            {/* Role Segmented Tabs for Sign In */}
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('pharmacist');
                  setErrorMessage('');
                }}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'pharmacist'
                    ? 'bg-white text-[#005c55] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Store className="w-4 h-4 text-[#005c55]" />
                <span>Pharmacist Partner</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('admin');
                  setErrorMessage('');
                }}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-amber-300 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Admin / CDSCO</span>
              </button>
            </div>

            {/* PHARMACIST SIGN IN */}
            {activeTab === 'pharmacist' && (
              <form onSubmit={handlePharmacistLogin} className="space-y-3.5 text-xs">
                {/* Quick Demo Preload Pill */}
                <div className="bg-[#f0fbf9] p-3 rounded-2xl border border-[#a3faef] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#007952]" />
                    <div>
                      <div className="font-bold text-[#005c55]">One-Click Quick Login</div>
                      <div className="text-[10px] text-gray-600">Bengaluru Koramangala Hub (Dr. Sarah Jenkins)</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePharmacistLogin()}
                    disabled={loading}
                    className="px-3 py-1.5 bg-[#005c55] hover:bg-[#004741] text-white font-bold rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    {loading ? 'Logging in...' : 'Demo Login →'}
                  </button>
                </div>

                {/* Branch Switcher */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Select Dispensary Outlet</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPharmBranch('koramangala');
                        setPharmEmail('sarah.jenkins@healthhub.in');
                        setPharmLicense('KA-PH-2022-9011');
                      }}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        pharmBranch === 'koramangala'
                          ? 'border-[#005c55] bg-[#f0fbf9] ring-2 ring-[#005c55]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900">Health Hub (Retail)</div>
                      <div className="text-[10px] text-gray-500">Koramangala • KA-PH-2022</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPharmBranch('janaushadhi');
                        setPharmEmail('ramesh.pmbjp@janaushadhi.gov.in');
                        setPharmLicense('KA-PMBJP-2021-4402');
                      }}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        pharmBranch === 'janaushadhi'
                          ? 'border-[#007952] bg-emerald-50 ring-2 ring-[#007952]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900">Jan Aushadhi Kendra</div>
                      <div className="text-[10px] text-gray-500">Indiranagar • PMBJP</div>
                    </button>
                  </div>
                </div>

                {/* License Input */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State Pharmacy License No.</label>
                  <input
                    type="text"
                    value={pharmLicense}
                    onChange={(e) => setPharmLicense(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pharmacist Email / Phone</label>
                  <input
                    type="email"
                    value={pharmEmail}
                    onChange={(e) => setPharmEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Marg POS Key / Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={pharmPassword}
                      onChange={(e) => setPharmPassword(e.target.value)}
                      className="w-full px-3 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePatientSwitch}
                    className="text-gray-500 hover:text-gray-800 text-[11px] underline"
                  >
                    Continue as Patient Riya Sharma
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>{loading ? 'Signing in...' : 'Sign In as Pharmacist'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6ffbbe]" />
                  </button>
                </div>
              </form>
            )}

            {/* ADMIN SIGN IN */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="space-y-3.5 text-xs">
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <div>
                      <div className="font-bold text-amber-900">State Drug Controller (Admin)</div>
                      <div className="text-[10px] text-amber-800">Dr. Arvind Rao, IAS (CDSCO Karnataka)</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAdminLogin()}
                    disabled={loading}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    {loading ? 'Entering...' : 'Admin Login →'}
                  </button>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Official Directorate Email</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Security Clearance Key</label>
                  <input
                    type="text"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-3 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePatientSwitch}
                    className="text-gray-500 hover:text-gray-800 text-[11px] underline"
                  >
                    Return to Consumer Portal
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>{loading ? 'Authorizing...' : 'Admin Sign In'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <span className="text-gray-500 text-xs">Don&apos;t have an account? </span>
              <button
                type="button"
                onClick={() => setModalMode('register')}
                className="text-[#005c55] font-bold text-xs hover:underline"
              >
                Register New Account
              </button>
            </div>
          </div>
        )}

        {/* -------------------- REGISTRATION MODE -------------------- */}
        {modalMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            {/* Select Account Type */}
            <div>
              <label className="block font-bold text-gray-700 mb-1.5">Select Account Type to Register</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRegisterRole('patient')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    registerRole === 'patient'
                      ? 'border-[#005c55] bg-[#f0fbf9] ring-2 ring-[#005c55]/20 text-[#005c55] font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <div className="text-left">
                    <div className="leading-tight">Patient / Consumer</div>
                    <div className="text-[10px] text-gray-500 font-normal">Track Rx &amp; Conditions</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRegisterRole('pharmacist')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    registerRole === 'pharmacist'
                      ? 'border-[#005c55] bg-[#f0fbf9] ring-2 ring-[#005c55]/20 text-[#005c55] font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <div className="text-left">
                    <div className="leading-tight">Pharmacy Partner</div>
                    <div className="text-[10px] text-gray-500 font-normal">Connect Chemist POS</div>
                  </div>
                </button>
              </div>
            </div>

            {/* PATIENT REGISTRATION FIELDS */}
            {registerRole === 'patient' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. rahul.verma@gmail.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block font-semibold text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={regAge}
                      onChange={(e) => setRegAge(Number(e.target.value) || '')}
                      placeholder="42"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block font-semibold text-gray-700 mb-1">Gender</label>
                    <select
                      value={regGender}
                      onChange={(e) => setRegGender(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block font-semibold text-gray-700 mb-1">Mobile No.</label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98450"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Bengaluru Locality</label>
                    <input
                      type="text"
                      value={regLocality}
                      onChange={(e) => setRegLocality(e.target.value)}
                      placeholder="e.g. Indiranagar, Bengaluru"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={regPincode}
                      onChange={(e) => setRegPincode(e.target.value)}
                      placeholder="560038"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>
                </div>

                {/* ABHA ID Generation Card */}
                <div className="p-3 bg-[#e6fbf1] rounded-2xl border border-[#a3faef] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#007952] flex items-center gap-1.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-[#007952]" />
                      Ayushman Bharat Health Account (ABHA ID)
                    </span>
                    <button
                      type="button"
                      onClick={handleGenerateAbhaId}
                      className="px-2 py-1 bg-white hover:bg-gray-50 text-[#007952] border border-[#a3faef] rounded-lg text-[10px] font-bold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Generate ID
                    </button>
                  </div>
                  <input
                    type="text"
                    value={regAbhaId}
                    onChange={(e) => setRegAbhaId(e.target.value)}
                    placeholder="Click 'Generate ID' or enter 91-XXXX-XXXX-XXXX@abdm"
                    className="w-full px-3 py-1.5 bg-white border border-[#a3faef] rounded-xl font-mono text-xs text-gray-900 focus:outline-none"
                  />
                  <div className="text-[10px] text-gray-500">
                    Enables unified digital prescription retrieval across all PMBJP Kendras and hospitals.
                  </div>
                </div>

                {/* Existing Medical Conditions Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-gray-800 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-500" />
                      Existing Medical Conditions (Select all that apply)
                    </label>
                    <span className="text-[10px] text-gray-400">
                      Used for generic medicine recommendations
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_MEDICAL_CONDITIONS_LIST.map((cond) => {
                      const isSelected = regSelectedConditions.includes(cond);
                      return (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => toggleConditionSelection(cond)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border ${
                            isSelected
                              ? 'bg-[#005c55] text-white border-[#005c55] shadow-xs'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{cond}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Condition Input */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="text"
                      value={regCustomCondition}
                      onChange={(e) => setRegCustomCondition(e.target.value)}
                      placeholder="Other chronic condition (e.g. Migraine, Kidney)..."
                      className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomCondition}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Create Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* PHARMACY PARTNER REGISTRATION FIELDS */}
            {registerRole === 'pharmacist' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Pharmacy / Chemist Name *</label>
                    <input
                      type="text"
                      required
                      value={regPharmStoreName}
                      onChange={(e) => setRegPharmStoreName(e.target.value)}
                      placeholder="e.g. Sanjeevani Medico & Surgical"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Pharmacist / Proprietor Name *</label>
                    <input
                      type="text"
                      required
                      value={regPharmProprietor}
                      onChange={(e) => setRegPharmProprietor(e.target.value)}
                      placeholder="e.g. Manjunath Reddy B.Pharm"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Drug License Number *</label>
                    <input
                      type="text"
                      required
                      value={regPharmLicense}
                      onChange={(e) => setRegPharmLicense(e.target.value)}
                      placeholder="KA-PH-2026-XXXX"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">POS / ERP Software</label>
                    <select
                      value={regPharmPos}
                      onChange={(e) => setRegPharmPos(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    >
                      <option value="Marg ERP 9+ Platinum">Marg ERP 9+ Platinum</option>
                      <option value="RetailIO B2B Cloud">RetailIO B2B Cloud</option>
                      <option value="C-Square Chemist POS">C-Square Chemist POS</option>
                      <option value="PMBJP Official Portal">PMBJP Official Portal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Registered Email *</label>
                    <input
                      type="email"
                      required
                      value={regPharmEmail}
                      onChange={(e) => setRegPharmEmail(e.target.value)}
                      placeholder="store@pharmacy.in"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={regPharmPhone}
                      onChange={(e) => setRegPharmPhone(e.target.value)}
                      placeholder="+91 80 2520 1199"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Create Access Password</label>
                  <input
                    type="password"
                    required
                    value={regPharmPassword}
                    onChange={(e) => setRegPharmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#005c55] outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setModalMode('signin')}
                className="text-gray-500 hover:text-gray-800 text-[11px] underline"
              >
                Already registered? Sign In
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>{loading ? 'Creating Account...' : 'Complete Registration & Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6ffbbe]" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

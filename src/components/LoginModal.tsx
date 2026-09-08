import React, { useState } from 'react';
import { UserSession, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
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
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession, targetView?: 'b2b-partner-portal' | 'admin-portal' | 'consumer-discovery') => void;
  defaultRole?: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultRole = 'pharmacist'
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pharmacist form state
  const [pharmEmail, setPharmEmail] = useState('sarah.jenkins@healthhub.in');
  const [pharmLicense, setPharmLicense] = useState('KA-PH-2022-9011');
  const [pharmPassword, setPharmPassword] = useState('MargPOS@2026');
  const [pharmBranch, setPharmBranch] = useState<'koramangala' | 'janaushadhi'>('koramangala');

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('arvind.rao@karnatakahealth.gov.in');
  const [adminKey, setAdminKey] = useState('CDSCO-DC-KA-8899');
  const [adminPassword, setAdminPassword] = useState('SecureAdmin#2026');

  if (!isOpen) return null;

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
    }, 700);
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
    }, 700);
  };

  const handlePatientSwitch = () => {
    onLoginSuccess(MOCK_USERS.patient, 'consumer-discovery');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#005c55] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#007952]" />
              <span>MediSmart Secure Portal Authentication</span>
            </div>
            <h3 className="text-xl font-black text-gray-900 font-headline">
              Authorized Portal Sign-In
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Access dispensary operations or state regulatory command dashboards
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Segmented Tabs */}
        <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('pharmacist');
              setErrorMessage('');
            }}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
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
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-[#005c55] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#6ffbbe]" />
            <span>Admin / CDSCO</span>
          </button>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* PHARMACIST TAB */}
        {activeTab === 'pharmacist' && (
          <form onSubmit={handlePharmacistLogin} className="space-y-4 text-xs">
            
            {/* Quick Demo Preload Pill */}
            <div className="bg-[#f0fbf9] p-3 rounded-2xl border border-[#a3faef] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#007952]" />
                <div>
                  <div className="font-bold text-[#005c55]">One-Click Quick Login</div>
                  <div className="text-[11px] text-gray-600">Pre-authenticated with Bengaluru Koramangala Hub</div>
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

            {/* Branch Switcher Radio */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">Select Dispensary Outlet</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPharmBranch('koramangala');
                    setPharmEmail('sarah.jenkins@healthhub.in');
                    setPharmLicense('KA-PH-2022-9011');
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    pharmBranch === 'koramangala'
                      ? 'border-[#005c55] bg-[#f0fbf9] ring-2 ring-[#005c55]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900">Health Hub (Retail)</div>
                  <div className="text-[10px] text-gray-500">Koramangala • Lic: KA-PH-2022</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPharmBranch('janaushadhi');
                    setPharmEmail('ramesh.pmbjp@janaushadhi.gov.in');
                    setPharmLicense('KA-PMBJP-2021-4402');
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    pharmBranch === 'janaushadhi'
                      ? 'border-[#007952] bg-emerald-50 ring-2 ring-[#007952]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900">Jan Aushadhi Kendra</div>
                  <div className="text-[10px] text-gray-500">Indiranagar • Govt. PMBJP</div>
                </button>
              </div>
            </div>

            {/* License Number Input */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">State Pharmacy License No. / ABDM ID</label>
              <div className="relative">
                <FileCheck className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={pharmLicense}
                  onChange={(e) => setPharmLicense(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono font-medium focus:bg-white focus:border-[#005c55] outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Email / Username */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Pharmacist Registered Email / Phone</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={pharmEmail}
                  onChange={(e) => setPharmEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Marg POS Key / Portal Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pharmPassword}
                  onChange={(e) => setPharmPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono focus:bg-white focus:border-[#005c55] outline-hidden"
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
                Continue as Patient/Consumer
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In as Pharmacist'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6ffbbe]" />
              </button>
            </div>
          </form>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            
            {/* Quick Demo Preload Pill */}
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <div>
                  <div className="font-bold text-amber-900">State Drug Controller (Admin)</div>
                  <div className="text-[11px] text-amber-800">Pre-loaded credentials: Dr. Arvind Rao, IAS</div>
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

            {/* Email */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Official NIC / Directorate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:bg-white focus:border-[#005c55] outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Digital Security Key */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">CDSCO Inspector Security Clearance Key</label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono focus:bg-white focus:border-[#005c55] outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Directorate Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono focus:bg-white focus:border-[#005c55] outline-hidden"
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

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 text-[11px]">
              <strong>Admin Scope:</strong> Price Discrepancy &amp; DPCO Grievance Triage, New Pharmacy Partner KYC Approvals, and National CDSCO Drug Monograph adjustments.
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePatientSwitch}
                className="text-gray-500 hover:text-gray-800 text-[11px] underline"
              >
                Return to Patient Portal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>{loading ? 'Authorizing...' : 'Sign In as Administrator'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6ffbbe]" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

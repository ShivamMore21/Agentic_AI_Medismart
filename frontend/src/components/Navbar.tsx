import React, { useState } from 'react';
import { AppViewMode, UserSession, UserRole } from '../types';
import { 
  Pill, 
  MapPin, 
  Search, 
  FileCheck, 
  Store, 
  Map, 
  CheckCircle2, 
  ChevronDown,
  Heart,
  Building2,
  LogIn,
  LogOut,
  UserPlus,
  Clock
} from 'lucide-react';

interface NavbarProps {
  currentView: AppViewMode;
  onViewChange: (view: AppViewMode) => void;
  selectedPincode: string;
  onPincodeChange: (pincode: string, locality: string) => void;
  currentUser?: UserSession;
  onOpenLoginModal?: (role?: UserRole, initialMode?: 'signin' | 'register') => void;
  onLogout?: () => void;
  onQuickSwitchRole?: (role: UserRole) => void;
}

const LOCALITIES = [
  { pincode: '560038', locality: 'Indiranagar, Bengaluru' },
  { pincode: '560034', locality: 'Koramangala, Bengaluru' },
  { pincode: '560071', locality: 'Domlur / HAL, Bengaluru' },
  { pincode: '560102', locality: 'HSR Layout, Bengaluru' },
  { pincode: '560066', locality: 'Whitefield, Bengaluru' },
  { pincode: '560041', locality: 'Jayanagar, Bengaluru' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  selectedPincode,
  onPincodeChange,
  currentUser,
  onOpenLoginModal,
  onLogout,
  onQuickSwitchRole
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const currentLocality = LOCALITIES.find(l => l.pincode === selectedPincode) || LOCALITIES[0];
  const role = currentUser?.role || 'patient';
  const isAdmin = role === 'admin';
  const isPharmacist = role === 'pharmacist';

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#e2e8f0] shadow-xs">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onViewChange('consumer-discovery')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#005c55] to-[#0f766e] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Pill className="w-5 h-5 text-[#a3faef]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-[#005c55]">MediSmart</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#e6f4f2] text-[#005c55] border border-[#a3faef]">
                    CDSCO Verified
                  </span>
                </div>
                <p className="text-[11px] text-[#5b6563] hidden sm:block font-medium">
                  Generic Medicine &amp; Pharmacy Platform
                </p>
              </div>
            </button>

            {/* Location Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 text-xs bg-[#f2f4f8] hover:bg-[#e6ebf2] text-[#2c3e50] font-medium px-3 py-1.5 rounded-lg border border-[#e2e8f0] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#005c55]" />
                <span>{currentLocality.locality} - {currentLocality.pincode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Select Bengaluru Health Zone
                  </div>
                  {LOCALITIES.map((loc) => (
                    <button
                      key={loc.pincode}
                      onClick={() => {
                        onPincodeChange(loc.pincode, loc.locality);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#e6f4f2] transition-colors ${
                        selectedPincode === loc.pincode ? 'text-[#005c55] font-semibold bg-[#f0fbf9]' : 'text-gray-700'
                      }`}
                    >
                      <span>{loc.locality}</span>
                      <span className="text-[11px] font-mono text-gray-400">{loc.pincode}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Switchers */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-xl border border-[#e2e8f0]">
            <button
              onClick={() => onViewChange('consumer-discovery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'consumer-discovery'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Discovery</span>
            </button>

            <button
              onClick={() => onViewChange('medication-history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'medication-history'
                  ? 'bg-[#005c55] text-white shadow-xs'
                  : 'text-[#005c55] hover:bg-[#005c55]/10 font-bold'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
              <span>History &amp; Conditions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => onViewChange('rx-matcher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'rx-matcher'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Rx Parity</span>
            </button>

            <button
              onClick={() => onViewChange('gis-map-locator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'gis-map-locator'
                  ? 'bg-white text-[#005c55] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Live Stock</span>
            </button>

          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {/* User Profile Chip */}
            <div className="relative">
              <button
                onClick={() => setShowProfileModal(!showProfileModal)}
                className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border transition-colors ${
                  isAdmin 
                    ? 'bg-slate-900 text-white border-amber-500/40 hover:bg-slate-800'
                    : isPharmacist
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-[#f0fbf9] border-[#a3faef] hover:bg-[#e0f8f4]'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isAdmin 
                    ? 'bg-amber-400 text-slate-950'
                    : isPharmacist
                    ? 'bg-[#007952] text-white'
                    : 'bg-[#005c55] text-white'
                }`}>
                  {currentUser?.avatarText || 'RS'}
                </div>
                <div className="text-left hidden xl:block">
                  <div className={`text-xs font-bold leading-tight ${isAdmin ? 'text-amber-300' : 'text-gray-900'}`}>
                    {currentUser?.name || 'Riya Sharma'}
                  </div>
                  <div className={`text-[10px] font-medium leading-none ${isAdmin ? 'text-slate-300' : 'text-gray-500'}`}>
                    {currentUser?.roleBadge || 'Smart Saver Club'}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 ${isAdmin ? 'text-slate-300' : 'text-gray-400'} hidden xl:block`} />
              </button>

              {showProfileModal && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${
                      isAdmin 
                        ? 'bg-slate-900 text-amber-300 border-2 border-amber-400' 
                        : isPharmacist 
                        ? 'bg-[#007952] text-white' 
                        : 'bg-[#005c55] text-white'
                    }`}>
                      {currentUser?.avatarText || 'RS'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">
                        {currentUser?.name || 'Riya Sharma'}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate">
                        {currentUser?.organization || currentUser?.email || 'Caregiver • Indiranagar'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#007952] font-semibold bg-[#e6fbf1] px-2 py-0.5 rounded-full mt-1">
                        <CheckCircle2 className="w-3 h-3" /> 
                        {isAdmin ? 'CDSCO State Authorized' : isPharmacist ? 'PCI Regd. Pharmacist' : 'Verified ABHA Health ID'}
                      </span>
                    </div>
                  </div>

                  {/* Profile Quick Details */}
                  <div className="py-3 space-y-2 text-xs">
                    {isAdmin ? (
                      <div className="bg-slate-900 text-white p-3 rounded-xl space-y-1">
                        <div className="flex justify-between text-slate-300 text-[11px]">
                          <span>Authority Designation:</span>
                          <span className="font-bold text-amber-300">State Drug Controller</span>
                        </div>
                        <div className="flex justify-between text-slate-300 text-[11px]">
                          <span>License Number:</span>
                          <span className="font-mono text-white">GOVT-KA-DC-001</span>
                        </div>
                        <div className="flex justify-between text-slate-300 text-[11px]">
                          <span>DPCO Compliance BLR:</span>
                          <span className="font-bold text-emerald-400">99.7%</span>
                        </div>
                      </div>
                    ) : isPharmacist ? (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-1 text-emerald-950">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-emerald-800">Pharmacy Branch:</span>
                          <span className="font-bold">Koramangala #KA-560034</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-emerald-800">Drug License:</span>
                          <span className="font-mono">{currentUser?.licenseNumber || 'KA-PH-2022-9011'}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-emerald-800">Marg POS Integration:</span>
                          <span className="font-bold text-emerald-700">Online Active</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center bg-[#f8fafc] p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-600">Total Year Savings</span>
                          <span className="font-bold text-[#007952] text-sm">₹11,480.00</span>
                        </div>
                        
                        {/* Active Chronic Conditions Pill Display */}
                        {currentUser?.existingConditions && currentUser.existingConditions.length > 0 && (
                          <div className="p-2 bg-red-50/70 rounded-xl border border-red-100">
                            <span className="text-[10px] font-bold text-red-900 block mb-1 flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-500 fill-current" /> Active Health Conditions:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {currentUser.existingConditions.map((cond, idx) => (
                                <span key={idx} className="text-[10px] bg-white border border-red-200 text-red-800 px-1.5 py-0.5 rounded font-medium">
                                  {cond}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            onViewChange('medication-history');
                            setShowProfileModal(false);
                          }}
                          className="w-full text-left p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#005c55] font-bold flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>My Rx History &amp; Refill Due</span>
                          </span>
                          <span className="text-[10px] bg-teal-200/60 px-1.5 py-0.5 rounded-full">View</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Role Switcher & Registration Actions */}
                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Quick Portal Access
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          if (onOpenLoginModal) onOpenLoginModal('pharmacist', 'signin');
                          setShowProfileModal(false);
                        }}
                        className="p-2 rounded-xl bg-gray-50 hover:bg-[#f0fbf9] border border-gray-200 hover:border-[#005c55] text-left transition-colors text-xs"
                      >
                        <div className="font-bold text-[#005c55] flex items-center gap-1">
                          <Store className="w-3.5 h-3.5" /> Pharmacist
                        </div>
                        <div className="text-[10px] text-gray-500">Partner portal login</div>
                      </button>

                      <button
                        onClick={() => {
                          if (onOpenLoginModal) onOpenLoginModal('admin', 'signin');
                          setShowProfileModal(false);
                        }}
                        className="p-2 rounded-xl bg-gray-50 hover:bg-slate-900 hover:text-white border border-gray-200 text-left transition-colors text-xs group"
                      >
                        <div className="font-bold text-gray-900 group-hover:text-amber-300 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" /> Admin
                        </div>
                        <div className="text-[10px] text-gray-500 group-hover:text-slate-300">CDSCO controller</div>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (onOpenLoginModal) onOpenLoginModal('patient', 'register');
                        setShowProfileModal(false);
                      }}
                      className="w-full mt-1.5 text-center py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl hover:bg-[#004b45] flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-[#6ffbbe]" />
                      <span>Register New Patient / Chemist</span>
                    </button>

                    {role !== 'patient' && onQuickSwitchRole && (
                      <button
                        onClick={() => {
                          onQuickSwitchRole('patient');
                          setShowProfileModal(false);
                        }}
                        className="w-full mt-1 text-center py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50"
                      >
                        Switch to Patient / Consumer View
                      </button>
                    )}

                    {onLogout && role !== 'patient' && (
                      <button
                        onClick={() => {
                          onLogout();
                          setShowProfileModal(false);
                        }}
                        className="w-full text-center py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-xl hover:bg-red-100 flex items-center justify-center gap-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Drawer Links */}
        <div className="flex xl:hidden items-center justify-between gap-1 mt-2.5 pt-2 border-t border-gray-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onViewChange('consumer-discovery')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              currentView === 'consumer-discovery' ? 'bg-[#005c55] text-white font-bold' : 'text-gray-600 bg-gray-100'
            }`}
          >
            Discovery
          </button>
          <button
            onClick={() => onViewChange('medication-history')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold flex items-center gap-1 ${
              currentView === 'medication-history' ? 'bg-[#005c55] text-white' : 'text-[#005c55] bg-teal-50'
            }`}
          >
            <Heart className="w-3 h-3 text-red-400 fill-current" />
            <span>History &amp; Health</span>
          </button>
          <button
            onClick={() => onViewChange('rx-matcher')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              currentView === 'rx-matcher' ? 'bg-[#005c55] text-white font-bold' : 'text-gray-600 bg-gray-100'
            }`}
          >
            Rx Parity
          </button>
          <button
            onClick={() => onViewChange('gis-map-locator')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              currentView === 'gis-map-locator' ? 'bg-[#005c55] text-white font-bold' : 'text-gray-600 bg-gray-100'
            }`}
          >
            Live Map
          </button>
          {onOpenLoginModal && (
            <button
              onClick={() => onOpenLoginModal('patient', 'register')}
              className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold bg-[#6ffbbe] text-[#004741] flex items-center gap-1"
            >
              <UserPlus className="w-3 h-3" />
              <span>Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

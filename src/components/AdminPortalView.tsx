import React, { useState } from 'react';
import { 
  MOCK_PENDING_PHARMACIES, 
  MOCK_DISCREPANCY_REPORTS, 
  MOCK_CDSCO_CEILINGS, 
  MOCK_ADMIN_AUDIT_LOGS 
} from '../data/mockData';
import { 
  PharmacyApplication, 
  PriceDiscrepancyReport, 
  CdscoPriceCeilingItem,
  UserSession,
  AppViewMode 
} from '../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Send, 
  Check, 
  X, 
  RefreshCw, 
  Sparkles, 
  Sliders, 
  Scale, 
  Layers, 
  UserCheck,
  AlertCircle,
  FileBadge,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminPortalViewProps {
  onNavigate: (view: AppViewMode) => void;
  currentUser?: UserSession;
  onOpenDiscrepancyDetail?: (report: PriceDiscrepancyReport) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  onNavigate,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'discrepancies' | 'kyc' | 'ceilings' | 'audit'>('discrepancies');
  
  // State for discrepancies
  const [reports, setReports] = useState<PriceDiscrepancyReport[]>(MOCK_DISCREPANCY_REPORTS);
  // State for applications
  const [applications, setApplications] = useState<PharmacyApplication[]>(MOCK_PENDING_PHARMACIES);
  // State for ceilings
  const [ceilings, setCeilings] = useState<CdscoPriceCeilingItem[]>(MOCK_CDSCO_CEILINGS);
  // State for audit logs
  const [auditLogs, setAuditLogs] = useState(MOCK_ADMIN_AUDIT_LOGS);

  // Edit ceiling modal state
  const [editingCeiling, setEditingCeiling] = useState<CdscoPriceCeilingItem | null>(null);
  const [newCeilingPrice, setNewCeilingPrice] = useState<number>(0);

  // Toast feedback
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => {
      setAdminToast(null);
    }, 4000);
  };

  const handleIssueNotice = (reportId: string, storeName: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Warning Issued' } : r));
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        time: 'Just now',
        action: 'Form 4 Notice Issued',
        actor: currentUser?.name || 'Dr. Arvind Rao (Admin)',
        detail: `Issued DPCO Section 15 statutory show-cause notice to ${storeName}`
      },
      ...prev
    ]);
    showToast(`Statutory Notice Form-4 dispatched to ${storeName}. Store notified via ABDM gateway.`);
  };

  const handleEnforceCorrection = (reportId: string, storeName: string, officialPrice: number) => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Resolved / Refunded' } : r));
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        time: 'Just now',
        action: 'Price Ceiling Enforced',
        actor: currentUser?.name || 'Dr. Arvind Rao (Admin)',
        detail: `Force-corrected POS SKU price to ₹${officialPrice.toFixed(2)} at ${storeName}`
      },
      ...prev
    ]);
    showToast(`Price corrected to ₹${officialPrice.toFixed(2)} across all POS terminals of ${storeName}.`);
  };

  const handleApprovePharmacy = (appId: string, pharmName: string) => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Approved' } : a));
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        time: 'Just now',
        action: 'Pharmacy Verified',
        actor: currentUser?.name || 'Dr. Arvind Rao (Admin)',
        detail: `Approved license & Marg POS telemetry for ${pharmName}`
      },
      ...prev
    ]);
    showToast(`Approved ${pharmName}! Telemetry stream is now live on the public GIS map.`);
  };

  const handleAuditRequest = (appId: string, pharmName: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Requires Audit' } : a));
    showToast(`Physical Drug Inspector inspection queued for ${pharmName}.`);
  };

  const handleSaveCeiling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCeiling) return;
    setCeilings(prev => prev.map(c => c.id === editingCeiling.id ? { 
      ...c, 
      dpcoCeilingPricePerUnit: Number(newCeilingPrice),
      lastRevisedDate: 'Today (Sep 2026)'
    } : c));
    
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        time: 'Just now',
        action: 'DPCO Ceiling Updated',
        actor: currentUser?.name || 'Dr. Arvind Rao (Admin)',
        detail: `Revised ceiling price for ${editingCeiling.saltName} to ₹${Number(newCeilingPrice).toFixed(2)}/unit`
      },
      ...prev
    ]);

    showToast(`DPCO Ceiling updated for ${editingCeiling.saltName}. Synchronized to 1,480+ pharmacy databases.`);
    setEditingCeiling(null);
  };

  const pendingDiscrepanciesCount = reports.filter(r => r.status === 'Under Investigation').length;
  const pendingKycCount = applications.filter(a => a.status === 'Pending Verification').length;

  return (
    <div className="space-y-6">
      
      {/* Toast alert */}
      {adminToast && (
        <div className="p-4 bg-[#005c55] text-white rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6ffbbe]" />
            <span className="font-semibold">{adminToast}</span>
          </div>
          <button onClick={() => setAdminToast(null)} className="text-[#a3faef] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1e293b] via-[#0f172a] to-[#1e293b] text-white rounded-3xl p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Karnataka State Drug Control Administration
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-medium">
              CDSCO Official Gateway: <strong>KA-GOVT-SYS-2026</strong>
            </span>
          </div>
          <h1 className="text-2xl font-black font-headline tracking-tight text-white">
            State Drug Controller &amp; Regulatory Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Presiding Officer: <strong>{currentUser?.name || 'Dr. Arvind Rao, IAS'}</strong> • License Authority: <strong>GOVT-KA-DC-001</strong>
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('discrepancies')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'discrepancies'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Price Discrepancies</span>
            {pendingDiscrepanciesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-black">
                {pendingDiscrepanciesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('kyc')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'kyc'
                ? 'bg-[#007952] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Chemist Onboarding</span>
            {pendingKycCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] flex items-center justify-center font-black">
                {pendingKycCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ceilings')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'ceilings'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>DPCO Price Ceilings</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Live Audit Trail</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Pharmacies</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">100% ABDM Linked</span>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2 font-headline">1,482 Stores</div>
          <div className="text-xs text-gray-500 mt-1">184 Jan Aushadhi Kendras Online</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Grievances Under Review</span>
            <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">
              {pendingDiscrepanciesCount} Active Alerts
            </span>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2 font-headline">3 Triage Tickets</div>
          <div className="text-xs text-gray-500 mt-1">1 Form-4 Statutory Notice Issued</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Formulary Monograph</span>
            <span className="text-[10px] text-[#005c55] bg-[#f0fbf9] px-2 py-0.5 rounded font-bold">IP 2026</span>
          </div>
          <div className="text-2xl font-black text-[#005c55] mt-2 font-headline">85,420 SKUs</div>
          <div className="text-xs text-gray-500 mt-1">National Drug Code Mapped</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">DPCO Enforcement Rate</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">99.7% Compliant</span>
          </div>
          <div className="text-2xl font-black text-[#007952] mt-2 font-headline">₹1.42 Cr</div>
          <div className="text-xs text-gray-500 mt-1">Patient wealth shielded this week</div>
        </div>
      </div>

      {/* TAB 1: Price Discrepancies & Grievance Triage */}
      {activeTab === 'discrepancies' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline flex items-center gap-2">
                <span>Consumer Price Discrepancy &amp; DPCO Grievance Queue</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {reports.length} Total Reports
                </span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Investigate and penalize retail chemists charging above DPCO ceiling or substituting with inflated brands
              </p>
            </div>
            <button
              onClick={() => showToast('Re-scanned all Marg POS feeds for DPCO ceiling non-compliance.')}
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Telemetry Feed</span>
            </button>
          </div>

          <div className="space-y-3">
            {reports.map((report) => {
              const isInvestigating = report.status === 'Under Investigation';
              const isWarning = report.status === 'Warning Issued';
              const isResolved = report.status === 'Resolved / Refunded';

              return (
                <div 
                  key={report.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isInvestigating 
                      ? 'border-amber-300 bg-amber-50/40 shadow-xs' 
                      : isWarning
                      ? 'border-orange-300 bg-orange-50/30'
                      : 'border-gray-200 bg-gray-50/60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gray-500">#{report.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isInvestigating 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : isWarning 
                            ? 'bg-orange-100 text-orange-900 border border-orange-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {report.status}
                        </span>
                        <span className="text-xs text-gray-400">• {report.timestamp}</span>
                      </div>

                      <h4 className="font-bold text-sm text-gray-900">
                        {report.pharmacyName} — <span className="text-[#005c55]">{report.medicineName}</span>
                      </h4>
                      <p className="text-xs text-gray-600">
                        Location: <strong>{report.locality}</strong> • Patient ID: <span className="font-mono">{report.patientPhone}</span>
                      </p>
                      {report.notes && (
                        <div className="text-xs text-gray-700 bg-white/80 p-2 rounded-xl border border-gray-200 mt-1">
                          <strong>Investigator Note:</strong> {report.notes}
                        </div>
                      )}
                    </div>

                    {/* Price Differential Comparison Block */}
                    <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-4 border-gray-200">
                      <div className="text-right">
                        <div className="text-[10px] text-gray-400">Billed vs DPCO Cap</div>
                        <div className="flex items-baseline gap-1.5 justify-end">
                          <span className="text-base font-black text-red-600">₹{report.reportedPrice.toFixed(2)}</span>
                          <span className="text-xs text-gray-400 line-through">₹{report.officialPrice.toFixed(2)}</span>
                        </div>
                        <span className="text-[10px] font-bold text-red-700 block">
                          +{report.differencePercentage}% Overcharge
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col gap-1.5 shrink-0">
                        {isInvestigating && (
                          <>
                            <button
                              onClick={() => handleIssueNotice(report.id, report.pharmacyName)}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1 transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              <span>Issue Notice Form 4</span>
                            </button>
                            <button
                              onClick={() => handleEnforceCorrection(report.id, report.pharmacyName, report.officialPrice)}
                              className="px-3 py-1.5 bg-[#005c55] hover:bg-[#004741] text-white rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Enforce DPCO Cap</span>
                            </button>
                          </>
                        )}

                        {isWarning && (
                          <button
                            onClick={() => handleEnforceCorrection(report.id, report.pharmacyName, report.officialPrice)}
                            className="px-3 py-1.5 bg-[#005c55] hover:bg-[#004741] text-white rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            <span>Confirm Restitution</span>
                          </button>
                        )}

                        {isResolved && (
                          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved &amp; Audited
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Chemist Onboarding & KYC */}
      {activeTab === 'kyc' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline">
                Chemist Partner Licensure &amp; Telemetry Onboarding
              </h3>
              <p className="text-xs text-gray-500">
                Review drug license numbers, ABDM facility IDs, and Marg ERP connectors before broadcasting to public map
              </p>
            </div>
            <span className="text-xs font-bold bg-[#f0fbf9] text-[#005c55] px-3 py-1.5 rounded-xl border border-[#a3faef]">
              {pendingKycCount} Awaiting Verification
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-3">Pharmacy &amp; Proprietor</th>
                  <th className="p-3">License &amp; ABDM Registry</th>
                  <th className="p-3">POS Integration</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Regulatory Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => {
                  const isPending = app.status === 'Pending Verification';
                  const isApproved = app.status === 'Approved';

                  return (
                    <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{app.pharmacyName}</div>
                        <div className="text-[11px] text-gray-500">{app.locality} • {app.pincode}</div>
                        <div className="text-[10px] text-gray-400">Proprietor: {app.proprietorName}</div>
                      </td>

                      <td className="p-3 font-mono">
                        <div className="font-bold text-[#005c55]">{app.licenseNumber}</div>
                        <div className="text-[10px] text-gray-500">{app.abdmFacilityId}</div>
                        <span className="inline-block mt-0.5 text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                          Govt Verified
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="font-medium text-gray-800">{app.posSoftware}</span>
                        <span className="text-[10px] text-gray-400 block">{app.initialSKUCount} Active Catalog SKUs</span>
                      </td>

                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isApproved 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : isPending 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleAuditRequest(app.id, app.pharmacyName)}
                              className="px-2.5 py-1 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold"
                            >
                              Audit Visit
                            </button>
                            <button
                              onClick={() => handleApprovePharmacy(app.id, app.pharmacyName)}
                              className="px-3 py-1 bg-[#005c55] hover:bg-[#004741] text-white rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve KYC</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-emerald-700 text-xs font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active Live Feed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CDSCO DPCO Price Ceilings */}
      {activeTab === 'ceilings' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline">
                National List of Essential Medicines (NLEM / DPCO 2026)
              </h3>
              <p className="text-xs text-gray-500">
                Official statutory price ceilings per unit. Any chemist price exceeding this threshold automatically triggers grievance alerts.
              </p>
            </div>
            <button
              onClick={() => showToast('Synced latest DPCO gazette notifications with National Health Authority.')}
              className="px-3.5 py-1.5 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Publish Gazette Sync</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-3">Salt Composition &amp; Strength</th>
                  <th className="p-3">Therapeutic Class</th>
                  <th className="p-3">DPCO Ceiling Rate</th>
                  <th className="p-3">Pharmacopoeia Standard</th>
                  <th className="p-3">Last Revised</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ceilings.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{item.saltName}</div>
                      <div className="text-[11px] text-gray-500">{item.dosageForm}</div>
                      {item.isScheduleH1 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 inline-block mt-0.5">
                          Schedule H1 Prescription
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-gray-700">
                      {item.therapeuticCategory}
                    </td>

                    <td className="p-3">
                      <div className="font-black text-sm text-[#007952]">₹{item.dpcoCeilingPricePerUnit.toFixed(2)}</div>
                      <div className="text-[10px] text-gray-400">per unit tablet/cap</div>
                    </td>

                    <td className="p-3 font-mono text-[11px] text-gray-600">
                      {item.referenceStandard}
                    </td>

                    <td className="p-3 text-gray-500">
                      {item.lastRevisedDate}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setEditingCeiling(item);
                          setNewCeilingPrice(item.dpcoCeilingPricePerUnit);
                        }}
                        className="px-2.5 py-1 bg-white border border-gray-300 hover:border-[#005c55] text-gray-700 hover:text-[#005c55] rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Adjust Cap</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Live Audit Trail */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline">
                CDSCO &amp; ABDM System Regulatory Audit Trail
              </h3>
              <p className="text-xs text-gray-500">
                Immutable chronological log of statutory notices, price modifications, and pharmacy authentication events
              </p>
            </div>
            <span className="font-mono text-xs text-gray-400">BLOCKCHAIN HASH: 0x8f2a...c94b</span>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-[11px] font-bold text-gray-400 shrink-0 mt-0.5">{log.time}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{log.action}</span>
                      <span className="text-[10px] font-mono text-[#005c55] bg-[#f0fbf9] px-1.5 py-0.5 rounded border border-[#a3faef]">
                        {log.actor}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-0.5 text-[11px]">{log.detail}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Ceiling Price Modal */}
      {editingCeiling && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-base text-gray-900">Adjust DPCO Ceiling Price</h3>
                <p className="text-xs text-gray-500">{editingCeiling.saltName}</p>
              </div>
              <button
                onClick={() => setEditingCeiling(null)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCeiling} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Ceiling Price per Unit Tablet/Cap (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newCeilingPrice}
                  onChange={(e) => setNewCeilingPrice(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 font-bold text-sm"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                <strong>Statutory Notice:</strong> Modifying this ceiling updates the DPCO 2026 rule in the database and automatically flags any pharmacy billing higher than this rate.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingCeiling(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl font-bold shadow-xs"
                >
                  Update &amp; Broadcast Gazette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

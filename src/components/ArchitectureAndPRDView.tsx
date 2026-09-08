import React, { useState } from 'react';
import { SYSTEM_ARCHITECTURE_MODULES, PRD_METRICS } from '../data/mockData';
import { 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Globe, 
  CheckCircle2, 
  FileText, 
  Download, 
  ExternalLink,
  Code2,
  Workflow,
  Lock,
  Zap
} from 'lucide-react';

export const ArchitectureAndPRDView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'prd' | 'compliance'>('architecture');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#005c55] via-[#086a63] to-[#0f766e] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#a3faef] uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" /> Production Architecture &amp; PRD Specification
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">
            MediSmart System Blueprint &amp; Requirements
          </h1>
          <p className="text-xs sm:text-sm text-[#ccfbf1] mt-1 max-w-2xl">
            Enterprise multi-tenant microservices architecture designed for sub-second pharmaceutical salt matching, real-time POS telemetry, and nationwide CDSCO/ABDM compliance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex bg-[#004741] p-1 rounded-2xl border border-white/20 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'architecture' ? 'bg-white text-[#005c55] shadow-xs' : 'text-white/80 hover:text-white'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveTab('prd')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'prd' ? 'bg-white text-[#005c55] shadow-xs' : 'text-white/80 hover:text-white'
            }`}
          >
            PRD Document
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'compliance' ? 'bg-white text-[#005c55] shadow-xs' : 'text-white/80 hover:text-white'
            }`}
          >
            CDSCO / ABDM Compliance
          </button>
        </div>
      </div>

      {/* KPI Ticker Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PRD_METRICS.coreKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {kpi.label}
            </span>
            <span className="text-xl font-black text-gray-900 mt-1 block font-headline">
              {kpi.value}
            </span>
            <span className="text-[10px] text-[#007952] font-semibold mt-0.5 block">
              {kpi.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Tab 1: System Architecture Diagram */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          {/* Interactive Flow Diagram */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-headline">
                  High-Availability Distributed Flow
                </h3>
                <p className="text-xs text-gray-500">
                  Data orchestration from patient search to chemist dispensary hold
                </p>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
                LATENCY: &lt; 45ms P99
              </span>
            </div>

            {/* Architecture Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Layer 1 */}
              <div className="bg-[#faf8ff] p-5 rounded-2xl border-2 border-[#a3faef] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#005c55] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-bold text-sm text-gray-900 font-headline">Client Layer</h4>
                <p className="text-xs text-gray-600">
                  Responsive Web, Progressive Web App (PWA), and Chemist POS Web App.
                </p>
                <div className="text-[11px] text-gray-500 space-y-1 pt-2 border-t border-gray-200">
                  <div>• React 19 + TypeScript</div>
                  <div>• Tailwind CSS v4 Engine</div>
                  <div>• Local IndexedDB Cache</div>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bg-[#faf8ff] p-5 rounded-2xl border-2 border-teal-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-bold text-sm text-gray-900 font-headline">Edge &amp; Ingress</h4>
                <p className="text-xs text-gray-600">
                  Cloudflare Workers &amp; NGINX Reverse Proxy terminating TLS on Port 3000.
                </p>
                <div className="text-[11px] text-gray-500 space-y-1 pt-2 border-t border-gray-200">
                  <div>• Geo-IP routing (BLR Zones)</div>
                  <div>• DPCO Anti-Scraper Guard</div>
                  <div>• Edge Monograph Caching</div>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="bg-[#faf8ff] p-5 rounded-2xl border-2 border-emerald-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#007952] text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-bold text-sm text-gray-900 font-headline">Core Domain Logic</h4>
                <p className="text-xs text-gray-600">
                  Active Salt Parity Engine, Bio-Equivalence Matrix &amp; Smart Order Router.
                </p>
                <div className="text-[11px] text-gray-500 space-y-1 pt-2 border-t border-gray-200">
                  <div>• AUC Bio-Parity Evaluator</div>
                  <div>• 2-Hour Reservation Locker</div>
                  <div>• ABDM Health Record Bridge</div>
                </div>
              </div>

              {/* Layer 4 */}
              <div className="bg-[#faf8ff] p-5 rounded-2xl border-2 border-indigo-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <h4 className="font-bold text-sm text-gray-900 font-headline">Data &amp; Telemetry</h4>
                <p className="text-xs text-gray-600">
                  PostgreSQL multi-tenant database and Redis live shelf stock streams.
                </p>
                <div className="text-[11px] text-gray-500 space-y-1 pt-2 border-t border-gray-200">
                  <div>• 85,000+ CDSCO Formulations</div>
                  <div>• Marg / C-Square Connectors</div>
                  <div>• Audit Trail for Sched H/H1</div>
                </div>
              </div>
            </div>

            {/* Deep-Dive Module List */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-900">Technical Module Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SYSTEM_ARCHITECTURE_MODULES.map((mod) => (
                  <div key={mod.id} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2">
                    <h5 className="font-bold text-sm text-[#005c55]">{mod.title}</h5>
                    <p className="text-xs text-gray-600">{mod.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mod.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PRD Document */}
      {activeTab === 'prd' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline">
                Product Requirements Document (PRD v2.4)
              </h3>
              <p className="text-xs text-gray-500">
                Author: Healthcare Product Directorate • Scope: Indian Retail Pharmaceutical Transparency
              </p>
            </div>
            <button
              onClick={() => alert("Downloading MediSmart_PRD_v2.4_Bengaluru.pdf")}
              className="px-3 py-1.5 bg-[#005c55] text-white rounded-xl text-xs font-bold hover:bg-[#004741] flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>

          <div className="space-y-4">
            <section className="space-y-1.5">
              <h4 className="font-bold text-sm text-gray-900">1. Problem Statement</h4>
              <p className="leading-relaxed">
                In India, out-of-pocket healthcare expenses account for over 48% of total healthcare expenditure, with pharmaceutical purchases contributing to the lion's share. Patients frequently purchase expensive branded medicines (e.g., Augmentin 625 at ₹224.50) when bio-equivalent generics (such as Moxikind-CV at ₹94.00 or Jan Aushadhi at ₹42.00) containing the exact same active molecules are readily available within 1 kilometer. Lack of consumer visibility, chemist margins, and medical brand inertia cause Indian households to forfeit billions of rupees annually.
              </p>
            </section>

            <section className="space-y-1.5">
              <h4 className="font-bold text-sm text-gray-900">2. Core Objectives</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Empower Indian citizens with 1-click active salt comparisons backed by CDSCO scientific monographs.</li>
                <li>Display live stock and verified retail rates across Jan Aushadhi Kendras and private retail chemists.</li>
                <li>Provide a 2-hour pharmacist counter hold mechanism so patients do not make redundant physical trips.</li>
                <li>Provide pharmacies with automated Marg ERP / C-Square price broadcasting and patient reservation management.</li>
              </ul>
            </section>

            <section className="space-y-1.5">
              <h4 className="font-bold text-sm text-gray-900">3. Functional Specifications</h4>
              <div className="bg-[#faf8ff] p-4 rounded-xl border border-gray-200 space-y-2">
                <div><strong>Module 1: Discovery &amp; Savings:</strong> Dual brand/salt autocomplete search, family budget simulator, high-value switch spotlight.</div>
                <div><strong>Module 2: Rx Salt Parity Matrix:</strong> Visual comparison bar, pharmacopoeia bio-availability index, doctor substitution slip with barcode.</div>
                <div><strong>Module 3: Live GIS Map:</strong> Real-time radius filter, stock count telemetry, dynamic HUD store card.</div>
                <div><strong>Module 4: B2B Dispensary:</strong> Real-time price updater, fast-moving SKU metrics, counter pick-up queue with "Mark Dispensed" action.</div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Tab 3: CDSCO / ABDM Compliance */}
      {activeTab === 'compliance' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-headline">
                Statutory &amp; Regulatory Compliance Matrix
              </h3>
              <p className="text-xs text-gray-500">
                Audited against Central Drugs Standard Control Organisation (CDSCO) and DPCO mandates
              </p>
            </div>
            <span className="text-xs font-bold text-[#007952] bg-[#e6fbf1] px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Drugs and Cosmetics Act, 1940 (Rule 65)</h4>
              <p className="text-gray-600 leading-relaxed">
                Registered pharmacists have legal authorization to inform patients regarding equivalent generic compositions containing identical therapeutic values. MediSmart provides clinical parity documentation to facilitate informed patient choice.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">DPCO 2026 Price Ceiling Enforcement</h4>
              <p className="text-gray-600 leading-relaxed">
                All listed maximum retail prices are synchronized with the National Pharmaceutical Pricing Authority (NPPA). The app incorporates a 1-click grievance filing mechanism for price gouging.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Ayushman Bharat Digital Mission (ABDM)</h4>
              <p className="text-gray-600 leading-relaxed">
                Integrates with ABHA Health ID and ABDM M1/M2/M3 standards for secure digital health records, e-prescriptions, and consent-driven dispensary handoffs.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Schedule H &amp; H1 Auditability</h4>
              <p className="text-gray-600 leading-relaxed">
                Antimicrobial agents like Amoxicillin-Clavulanate are tagged as Schedule H1, requiring doctor's prescription verification and mandatory 2-year pharmacy log maintenance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

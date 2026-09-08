import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, FileText, FlaskConical, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClinicalComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSwitch: () => void;
}

export const ClinicalComparisonModal: React.FC<ClinicalComparisonModalProps> = ({
  isOpen,
  onClose,
  onConfirmSwitch
}) => {
  if (!isOpen) return null;

  const handleSwitch = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onConfirmSwitch();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005c55] to-[#0f766e] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#a3faef] text-xs font-semibold uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" /> CDSCO Bio-Equivalence &amp; Pharmacopoeia Report
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-headline">
            Clinical Salt Parity &amp; Molecular Verification
          </h2>
          <p className="text-xs sm:text-sm text-[#ccfbf1] mt-1">
            Standard: Indian Pharmacopoeia (IP 2022) &amp; Drugs and Cosmetics Rules (Rule 65 Compliance)
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Executive Parity Summary */}
          <div className="bg-[#f0fbf9] border border-[#a3faef] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#005c55] text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#6ffbbe]" />
              </div>
              <div>
                <h4 className="font-bold text-[#005c55] text-sm sm:text-base">
                  100% Active Chemical Salt Parity Confirmed
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Augmentin 625 Duo and Moxikind-CV 625 contain identical active pharmaceutical ingredients (API) in the exact same milligram dosage.
                </p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-xl border border-[#a3faef] text-center shrink-0">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bio-Availability Parity</div>
              <div className="text-xl font-black text-[#007952]">99.4%</div>
              <div className="text-[10px] text-[#007952] font-semibold">CDSCO Verified</div>
            </div>
          </div>

          {/* Detailed Side-by-Side Comparison Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc] border-b border-gray-200 font-semibold text-gray-700">
                <tr>
                  <th className="p-3 w-1/3">Clinical Parameter</th>
                  <th className="p-3 w-1/3 bg-amber-50/50 text-amber-900 border-x border-gray-200">
                    Prescribed Original (Augmentin 625)
                  </th>
                  <th className="p-3 w-1/3 bg-[#f0fbf9] text-[#005c55]">
                    Bio-Equivalent (Moxikind-CV 625)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="p-3 font-semibold text-gray-900">Active API Salt 1</td>
                  <td className="p-3 bg-amber-50/20 border-x border-gray-200">Amoxicillin Trihydrate IP 500mg</td>
                  <td className="p-3 bg-[#f0fbf9]/40 font-semibold text-[#005c55]">Amoxicillin Trihydrate IP 500mg</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900">Active API Salt 2</td>
                  <td className="p-3 bg-amber-50/20 border-x border-gray-200">Potassium Clavulanate IP 125mg</td>
                  <td className="p-3 bg-[#f0fbf9]/40 font-semibold text-[#005c55]">Potassium Clavulanate IP 125mg</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900">Pharmacopoeia Standard</td>
                  <td className="p-3 bg-amber-50/20 border-x border-gray-200">Indian Pharmacopoeia (IP) / BP</td>
                  <td className="p-3 bg-[#f0fbf9]/40 font-semibold text-[#005c55]">Indian Pharmacopoeia (IP) / BP</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900">Rate of Dissolution</td>
                  <td className="p-3 bg-amber-50/20 border-x border-gray-200">98.9% dissolved at 15 mins</td>
                  <td className="p-3 bg-[#f0fbf9]/40 font-semibold text-[#007952]">98.7% dissolved at 15 mins</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900">Therapeutic Area / AUC</td>
                  <td className="p-3 bg-amber-50/20 border-x border-gray-200">Reference Standard (100%)</td>
                  <td className="p-3 bg-[#f0fbf9]/40 font-semibold text-[#007952]">99.4% (Within 90-110% CI)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900">Regulatory Approval</td>
                  <td className="p-3 bg-amber-50/20 border-x border-gray-200">CDSCO Reg. #MFG-GSK-09</td>
                  <td className="p-3 bg-[#f0fbf9]/40 font-semibold text-[#005c55]">CDSCO Reg. #MFG-MK-712</td>
                </tr>
                <tr className="bg-[#faf8ff]">
                  <td className="p-3 font-bold text-gray-900">Patient Cost per 10 Tabs</td>
                  <td className="p-3 bg-amber-50 border-x border-gray-200 font-bold text-amber-950 line-through">
                    ₹223.50 (MRP ₹224.50)
                  </td>
                  <td className="p-3 bg-[#e6fbf1] font-bold text-[#007952] text-sm">
                    ₹94.00 (Save ₹129.50 • 58%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statutory Advisory */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-gray-600">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900">Statutory Legal Guidance: </span>
              Under Section 65 of the Drugs and Cosmetics Rules (1945), registered pharmacists in India are permitted and encouraged to inform patients of bio-equivalent generic formulations to optimize healthcare affordability while maintaining clinical outcomes.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f8fafc] border-t border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            <span>Guaranteed genuine CDSCO audited lot</span> • <span>Free pharmacist hold</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSwitch}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <span>Accept &amp; Switch to Generic (Save ₹129.50)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

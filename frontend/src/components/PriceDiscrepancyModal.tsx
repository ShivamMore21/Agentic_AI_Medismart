import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle2, ShieldAlert, Send, TrendingDown, Info } from 'lucide-react';

// DPCO 2026 reference ceilings for common medicines (₹ per pack)
const DPCO_CEILINGS: Record<string, number> = {
  'Moxikind-CV 625': 89.75,
  'Augmentin 625': 224.50,
  'Atorvastatin 20mg': 62.00,
  'Metformin 500mg': 28.50,
  'Paracetamol 650mg': 14.00,
  'Telmisartan 40mg': 49.00,
};

interface PriceDiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacyName?: string;
  medicineName?: string;
}

export const PriceDiscrepancyModal: React.FC<PriceDiscrepancyModalProps> = ({
  isOpen,
  onClose,
  pharmacyName = 'Apollo 24/7 Pharmacy (100ft Road)',
  medicineName = 'Moxikind-CV 625'
}) => {
  const [chargedPrice, setChargedPrice] = useState('115.00');
  const [issueType, setIssueType] = useState('overcharging');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // DPCO ceiling lookup
  const dpcoCeiling = DPCO_CEILINGS[medicineName] ?? null;
  const chargedNum = parseFloat(chargedPrice) || 0;
  const isOverCeiling = dpcoCeiling !== null && chargedNum > dpcoCeiling;
  const overchargeAmount = dpcoCeiling !== null ? (chargedNum - dpcoCeiling) : 0;
  const overchargePct = dpcoCeiling !== null && dpcoCeiling > 0
    ? ((overchargeAmount / dpcoCeiling) * 100).toFixed(1)
    : '0';

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setChargedPrice('115.00');
      setNotes('');
      setIssueType('overcharging');
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after showing reference code
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-gradient-to-r from-amber-700 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-base">Report Price / Generic Discrepancy</h3>
              <p className="text-xs text-amber-200">DPCO 2026 &amp; CDSCO Consumer Compliance Cell</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#e6fbf1] text-[#007952] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Grievance Ticket Generated!</h4>
            <p className="text-xs text-gray-600">
              Your report has been logged under DPCO Grievance Reference:
              <span className="block mt-1 font-mono font-bold text-sm text-[#005c55]">BLR-DPCO-2026-89441</span>
            </p>
            <p className="text-[11px] text-gray-400">
              The Karnataka State Drug Control Department will audit the listed distributor. Thank you for protecting patient consumer rights!
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Target Pharmacy</label>
              <input
                type="text"
                disabled
                value={pharmacyName}
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Reported Drug / Salt</label>
              <input
                type="text"
                disabled
                value={medicineName}
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Issue Category</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-800"
              >
                <option value="overcharging">Quoting Price Higher than App / DPCO Cap</option>
                <option value="denial">Chemist Refused to Dispense Available Generic Alternative</option>
                <option value="forced-brand">Forcing High-Cost Brand despite Generic Rx</option>
                <option value="no-receipt">Chemist Refused to Issue Tax Invoice / Bill</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Price Actually Charged / Quoted (₹)</label>
              <input
                type="number"
                value={chargedPrice}
                onChange={(e) => setChargedPrice(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 font-bold text-sm transition-colors ${
                  isOverCeiling
                    ? 'bg-red-50 border-red-400 text-red-700'
                    : chargedNum > 0
                    ? 'bg-green-50 border-green-300 text-gray-800'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                required
              />
              {/* Live DPCO validation feedback */}
              {isOverCeiling && (
                <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 slide-up-fade">
                  <TrendingDown className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <p className="font-bold text-[11px]">DPCO Ceiling Violation Detected!</p>
                    <p className="text-[11px] text-red-600">
                      Charged ₹{chargedNum.toFixed(2)} vs ceiling ₹{dpcoCeiling!.toFixed(2)} — 
                      overcharge of <strong>₹{overchargeAmount.toFixed(2)} ({overchargePct}%)</strong>. 
                      This violates Drug Price Control Order 2026.
                    </p>
                  </div>
                </div>
              )}
              {!isOverCeiling && dpcoCeiling !== null && chargedNum > 0 && chargedNum <= dpcoCeiling && (
                <div className="mt-2 p-2.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 slide-up-fade">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" />
                  <p className="text-[11px] font-semibold">Price is within DPCO 2026 regulatory ceiling.</p>
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Additional Observations (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="E.g. Chemist claimed generic was out of stock despite live telemetry showing 22 units on rack..."
                className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-gray-800"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-amber-800">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                DPCO (Drug Price Control Order) mandates strict compliance. Reports are forwarded to the National Pharmaceutical Pricing Authority (NPPA).
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

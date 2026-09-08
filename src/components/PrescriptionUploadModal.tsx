import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrescriptionAnalyzed: (detectedMedName: string) => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  onPrescriptionAnalyzed
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'uploading' | 'ocr' | 'complete'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (name: string = 'Prescription_Manipal_Hospital_Aug2026.pdf') => {
    setFileName(name);
    setScanStep('uploading');
    setIsScanning(true);

    setTimeout(() => {
      setScanStep('ocr');
    }, 1200);

    setTimeout(() => {
      setScanStep('complete');
      setIsScanning(false);
    }, 2800);
  };

  const handleApplyResults = () => {
    onPrescriptionAnalyzed('Augmentin 625 Duo');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#005c55] to-[#0f766e] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#a3faef]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Smart Rx Scanner &amp; Salt Matcher</h3>
              <p className="text-xs text-[#ccfbf1]">AI-powered OCR extracts active chemical formulas instantly</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {scanStep === 'idle' && (
            <div className="space-y-4">
              <div 
                onClick={() => handleSimulateScan()}
                className="border-2 border-dashed border-gray-300 hover:border-[#005c55] bg-[#faf8ff] hover:bg-[#f0fbf9] rounded-2xl p-8 text-center cursor-pointer transition-colors group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#005c55] group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="mt-4 font-bold text-gray-800 text-sm">
                  Drag &amp; Drop Doctor's Prescription or Click to Browse
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Supports JPG, PNG, PDF, or Camera Photos (Max 10MB)
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-[#005c55]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#007952]" /> 100% HIPAA &amp; ABDM Compliant Confidential
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>Want to test immediately?</span>
                <button
                  type="button"
                  onClick={() => handleSimulateScan('Sample_Dr_Ramesh_Manipal_Rx.pdf')}
                  className="font-bold text-[#005c55] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Load Sample Prescription with Augmentin 625 Duo
                </button>
              </div>
            </div>
          )}

          {(scanStep === 'uploading' || scanStep === 'ocr') && (
            <div className="py-8 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#e2e8f0]"></div>
                <div className="absolute inset-0 rounded-full border-4 border-[#005c55] border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[#005c55] animate-pulse" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 text-base">
                  {scanStep === 'uploading' ? 'Analyzing Prescription Document...' : 'Extracting Chemical Salts via CDSCO Formulary...'}
                </h4>
                <p className="text-xs text-gray-500 mt-1 font-mono">
                  {fileName || 'prescription_scan.pdf'}
                </p>
              </div>

              {/* Simulated recognized bounding progress */}
              <div className="max-w-xs mx-auto bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-[#005c55] h-full transition-all duration-1000 ${
                    scanStep === 'uploading' ? 'w-2/5' : 'w-4/5'
                  }`}
                ></div>
              </div>
              <p className="text-[11px] text-gray-400">Comparing active compounds against 85,000+ Indian Pharmacopoeia monographs</p>
            </div>
          )}

          {scanStep === 'complete' && (
            <div className="space-y-4">
              <div className="bg-[#e6fbf1] border border-[#a3faef] p-4 rounded-2xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#007952] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#005e3f]">
                    Prescription Analyzed Successfully!
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Identified 1 high-cost originator brand with approved low-cost Indian bio-equivalents.
                  </p>
                </div>
              </div>

              {/* Detected Medicines Card */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Detected Prescribed Drug</span>
                  <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Schedule H1</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-gray-900">Augmentin 625 Duo</h5>
                    <p className="text-xs text-gray-500">Amoxicillin 500mg + Potassium Clavulanate 125mg</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through">₹224.50</span>
                    <div className="text-base font-black text-[#007952]">Save ₹129.50</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#005c55] block">
                      Recommended Equivalent
                    </span>
                    <strong className="text-gray-900">Moxikind-CV 625 (Mankind)</strong>
                  </div>
                  <div className="font-bold text-sm text-[#005c55]">₹94.00</div>
                </div>
              </div>

              <div className="text-[11px] text-gray-500 text-center">
                Prescription ID: <strong>BLR-RX-2026-9811</strong> • Verified by Central CDSCO Directory
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          {scanStep === 'complete' && (
            <button
              onClick={handleApplyResults}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#005c55] hover:bg-[#004741] text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <span>View Parity Matrix &amp; Switch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  AUGMENTIN_SUBSTITUTE_MATRIX, 
  BENGALURU_PHARMACIES 
} from '../data/mockData';
import { SubstituteMatrixItem, AppViewMode, Medicine } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  QrCode, 
  Download, 
  Printer, 
  Clock, 
  Share2, 
  Sparkles, 
  Building, 
  AlertCircle, 
  MapPin, 
  Store,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RxMatcherMatrixViewProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenClinicalModal: () => void;
  selectedPincode: string;
  selectedLocality: string;
  onQuickHoldPharmacy: (pharmacyId: string, storeName: string) => void;
  /** The medicine card the user clicked 'Compare Generic' on in ConsumerDiscovery */
  selectedMedicine?: Medicine;
}

export const RxMatcherMatrixView: React.FC<RxMatcherMatrixViewProps> = ({
  onNavigate,
  onOpenClinicalModal,
  selectedPincode,
  selectedLocality,
  onQuickHoldPharmacy,
  selectedMedicine
}) => {
  const [selectedSubstituteId, setSelectedSubstituteId] = useState<string>('moxikind-cv-625');
  const [quantity, setQuantity] = useState<number>(1);
  const [pickupOption, setPickupOption] = useState<'counter' | 'delivery'>('counter');
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string>('#MS-7891');

  const selectedItem = AUGMENTIN_SUBSTITUTE_MATRIX.find(item => item.id === selectedSubstituteId) || AUGMENTIN_SUBSTITUTE_MATRIX[1];
  const baselineOriginal = AUGMENTIN_SUBSTITUTE_MATRIX.find(item => item.isPrescribedOriginal) || AUGMENTIN_SUBSTITUTE_MATRIX[4];

  const totalCost = selectedItem.packMRP * quantity;
  const originalCost = baselineOriginal.packMRP * quantity;
  const totalSavings = originalCost - totalCost;

  const handleReserve = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    const randomCode = '#MS-' + Math.floor(1000 + Math.random() * 9000);
    setReservationCode(randomCode);
    setIsReserved(true);
  };

  return (
    <div className="space-y-6">
      {/* Prescribed Baseline Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 card-hover">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            <span>Prescription Baseline Reference</span>
            <span>•</span>
            <span className={`font-bold px-2 py-0.5 rounded ${
              (selectedMedicine?.scheduleType ?? 'Schedule H1') === 'Schedule H1'
                ? 'text-amber-700 bg-amber-100'
                : 'text-blue-700 bg-blue-100'
            }`}>
              {selectedMedicine?.scheduleType ?? 'Schedule H1'} Drug
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 font-headline">
            {selectedMedicine
              ? `${selectedMedicine.brandName} (${selectedMedicine.packSize})`
              : 'Augmentin 625 Duo (10 Tablets)'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {selectedMedicine
              ? `Manufactured by ${selectedMedicine.manufacturer} • Salt: ${selectedMedicine.saltComposition}`
              : 'Manufactured by GlaxoSmithKline Pharmaceuticals Ltd • Salt: Amoxicillin (500mg) + Clavulanic Acid (125mg)'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#faf8ff] p-3 rounded-2xl border border-gray-200">
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">Standard Originator MRP</div>
            <div className="text-xl font-black text-gray-800">
              ₹{selectedMedicine ? selectedMedicine.marketPrice.toFixed(2) : '223.50'}
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">DPCO 2026 Ceiling</div>
            <div className="text-sm font-bold text-gray-600">
              ₹{selectedMedicine ? selectedMedicine.prescribedMRP.toFixed(2) : '224.50'}
            </div>
          </div>
          {selectedMedicine && (
            <>
              <div className="h-8 w-px bg-gray-200"></div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold">Jan Aushadhi Price</div>
                <div className="text-sm font-bold text-[#005c55]">₹{selectedMedicine.janAushadhiPrice.toFixed(2)}</div>
              </div>
            </>
          )}
        </div>
      </div>


      {/* Hero Savings Bento & Visual Comparison Bar (Image 7 Feature) */}
      <div className="bg-gradient-to-r from-[#005c55] via-[#086a63] to-[#0f766e] rounded-3xl p-6 text-white shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6ffbbe] bg-[#004741] px-3 py-1 rounded-full border border-[#6ffbbe]/30">
              Verified CDSCO Bio-Equivalence Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-headline text-white mt-2">
              Save up to ₹181.50 per 10-tab course!
            </h2>
            <p className="text-xs sm:text-sm text-[#ccfbf1] mt-1">
              Switching from originator brand to Indian Pharmacopoeia generic guarantees identical efficacy.
            </p>
          </div>

          <button
            onClick={onOpenClinicalModal}
            className="self-start sm:self-auto px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#6ffbbe]" />
            <span>View Monograph &amp; AUC Report</span>
          </button>
        </div>

        {/* Visual Bar Comparison Chart */}
        <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 space-y-3">
          <div className="text-xs font-bold text-[#a3faef] uppercase tracking-wider">
            Price Comparison per 10-tablet strip (Indian Market):
          </div>

          <div className="space-y-2">
            {/* PMBJP */}
            <div className="flex items-center gap-3 text-xs">
              <span className="w-36 truncate font-bold text-white">Jan Aushadhi (Govt)</span>
              <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden relative">
                <div className="bg-[#6ffbbe] h-full w-[19%] rounded-full flex items-center justify-end pr-2 text-[10px] font-bold text-[#004741]">
                  ₹42.00
                </div>
              </div>
              <span className="w-20 text-right font-black text-[#6ffbbe]">Save 81%</span>
            </div>

            {/* Moxikind-CV */}
            <div className="flex items-center gap-3 text-xs">
              <span className="w-36 truncate font-bold text-white">Moxikind-CV (Mankind)</span>
              <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden relative">
                <div className="bg-[#a3faef] h-full w-[42%] rounded-full flex items-center justify-end pr-2 text-[10px] font-bold text-[#005c55]">
                  ₹94.00
                </div>
              </div>
              <span className="w-20 text-right font-black text-[#a3faef]">Save 58%</span>
            </div>

            {/* Originator GSK */}
            <div className="flex items-center gap-3 text-xs">
              <span className="w-36 truncate font-semibold text-white/80">Augmentin 625 (GSK)</span>
              <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden relative">
                <div className="bg-amber-400 h-full w-full rounded-full flex items-center justify-end pr-2 text-[10px] font-bold text-amber-950">
                  ₹223.50
                </div>
              </div>
              <span className="w-20 text-right font-medium text-white/60">Baseline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chemical Salt & Bio-Availability Parity Highlights (Image 7 Feature) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Active Antibiotic</div>
          <div className="text-sm font-bold text-gray-900 mt-1">Amoxicillin Trihydrate IP</div>
          <div className="text-xs text-gray-500">500mg • Bio-Equivalence 99.4%</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Enzyme Inhibitor</div>
          <div className="text-sm font-bold text-gray-900 mt-1">Potassium Clavulanate IP</div>
          <div className="text-xs text-gray-500">125mg • Protects degradation</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Dissolution Profile</div>
          <div className="text-sm font-bold text-[#007952] mt-1">98.7% in 15 Minutes</div>
          <div className="text-xs text-gray-500">Indian Pharmacopoeia compliant</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Therapeutic Area</div>
          <div className="text-sm font-bold text-gray-900 mt-1">AUC Parity 99.4%</div>
          <div className="text-xs text-gray-500">Passes US FDA &amp; CDSCO guidelines</div>
        </div>
      </div>

      {/* Main Grid: Comparison Matrix Table + Active Selection Checkout Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Comparison Matrix Table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-headline">
                  Formulation Comparison Matrix
                </h3>
                <p className="text-xs text-gray-500">
                  Select a substitute to inspect local stock and hold at nearest chemist
                </p>
              </div>
              <span className="text-xs font-semibold text-[#005c55] bg-[#e6fbf1] px-2.5 py-1 rounded-full">
                5 Lab Formulations Audited
              </span>
            </div>

            <div className="space-y-3">
              {AUGMENTIN_SUBSTITUTE_MATRIX.map((item) => {
                const isSelected = selectedSubstituteId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSubstituteId(item.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#005c55] bg-[#f0fbf9] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <input
                          type="radio"
                          name="substitute"
                          checked={isSelected}
                          onChange={() => setSelectedSubstituteId(item.id)}
                          className="w-4 h-4 text-[#005c55] accent-[#005c55] cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-sm text-gray-900 font-headline">
                            {item.brandName}
                          </h4>
                          {item.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.badgeType === 'government'
                                ? 'bg-[#6ffbbe] text-[#004741]'
                                : item.badgeType === 'primary'
                                ? 'bg-[#005c55] text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{item.manufacturer}</p>
                        <div className="text-[11px] text-gray-600 font-mono mt-1">
                          {item.saltComposition}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-base font-black text-gray-900">₹{item.packMRP.toFixed(2)}</span>
                        <span className="text-[10px] text-gray-400 block">per 10 tabs</span>
                      </div>
                      {item.savingsAmount > 0 ? (
                        <div className="text-right mt-1">
                          <span className="text-xs font-bold text-[#007952]">
                            Save ₹{item.savingsAmount.toFixed(2)} ({item.savingsPercentage}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 mt-1">Baseline</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prescriber Note & Pharmacist Barcode Box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                <QrCode className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  Doctor's Digital Rx Substitution Slip
                </h4>
                <p className="text-xs text-gray-500">
                  Compliant with Pharmacy Council of India (PCI) Section 65 substitution guidelines.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("Printing substitution advisory slip for pharmacist counter...")}
                className="px-3 py-1.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
              <button 
                onClick={() => alert("Downloading PDF Rx record...")}
                className="px-3 py-1.5 bg-[#005c55] text-white rounded-xl text-xs font-semibold hover:bg-[#004741] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

        </div>

        {/* Active Selection Checkout / Reservation Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#005c55] shadow-md space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#005c55]">
                Active Selection
              </span>
              <span className="text-xs font-bold text-[#007952] bg-[#e6fbf1] px-2 py-0.5 rounded-full">
                Bio-Equivalent
              </span>
            </div>

            <div>
              <h4 className="font-bold text-base text-gray-900 font-headline">
                {selectedItem.brandName}
              </h4>
              <p className="text-xs text-gray-500">{selectedItem.manufacturer}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-2xl border border-gray-200 text-xs">
              <span className="font-semibold text-gray-700">Quantity (Strips):</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-300 font-bold hover:bg-gray-100 flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-black text-sm w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-300 font-bold hover:bg-gray-100 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pickup Mode Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">Dispense Method:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setPickupOption('counter')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    pickupOption === 'counter'
                      ? 'border-[#005c55] bg-[#f0fbf9] font-bold text-[#005c55]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Counter Hold (Free)
                </button>
                <button
                  onClick={() => setPickupOption('delivery')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    pickupOption === 'delivery'
                      ? 'border-[#005c55] bg-[#f0fbf9] font-bold text-[#005c55]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Home Express (₹25)
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Original Brand Cost:</span>
                <span className="line-through">₹{originalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Generic Formulation ({quantity}x):</span>
                <span>₹{totalCost.toFixed(2)}</span>
              </div>
              {pickupOption === 'delivery' && (
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Bengaluru Delivery Fee:</span>
                  <span>₹25.00</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-bold text-gray-900 text-sm">Total Payable:</span>
                <span className="font-black text-xl text-[#005c55]">
                  ₹{(totalCost + (pickupOption === 'delivery' ? 25 : 0)).toFixed(2)}
                </span>
              </div>
              <div className="bg-[#e6fbf1] p-2 rounded-xl text-center text-xs font-bold text-[#007952]">
                You Save ₹{totalSavings.toFixed(2)} instantly!
              </div>
            </div>

            {/* Reservation / Order Action */}
            {isReserved ? (
              <div className="p-4 bg-[#f0fbf9] border border-[#a3faef] rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 bg-[#007952] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-gray-900">Hold Confirmed at Pharmacist Counter!</div>
                <div className="text-xs font-mono font-black text-[#005c55] text-base">{reservationCode}</div>
                <p className="text-[11px] text-gray-500">
                  Reserved at <strong>Jan Aushadhi Kendra, HAL 2nd Stage</strong>. Present this code at counter. (Valid for 2 Hours)
                </p>
                <button
                  onClick={() => onNavigate('gis-map-locator')}
                  className="w-full py-1.5 bg-[#005c55] text-white text-xs font-semibold rounded-lg hover:bg-[#004741]"
                >
                  View Directions on Map
                </button>
              </div>
            ) : (
              <button
                onClick={handleReserve}
                className="w-full py-3 bg-[#005c55] hover:bg-[#004741] text-white rounded-2xl text-xs font-bold shadow-md transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Reserve at Pharmacist Counter (Hold for 2 Hours)</span>
                <ArrowRight className="w-4 h-4 text-[#6ffbbe]" />
              </button>
            )}

            <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Free cancellation • No advance payment needed
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, Home, MapPin, Printer } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewInvoice?: (order: Order) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose, onViewInvoice }) => {
  if (!isOpen) return null;

  const [trackingCodeInput, setTrackingCodeInput] = useState('HL-948120');
  const [activeOrder, setActiveOrder] = useState<any>({
    code: 'HL-948120',
    statusStep: 3, // 1 to 4
    date: '9 أغسطس 2026',
    customerCity: 'الرياض',
    courier: 'سمسا إكسبريس (SMSA Express)',
    items: ['قميص الهلال الأساسي 2026 (#9 MITROVIĆ)', 'حذاء الهلال الملكي للجري (مقاس 42)'],
  });

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCodeInput.trim()) return;

    setActiveOrder({
      code: trackingCodeInput.trim().toUpperCase(),
      statusStep: Math.floor(Math.random() * 3) + 2,
      date: 'اليوم',
      customerCity: 'الرياض / جدة',
      courier: 'أرامكس (Aramex)',
      items: ['منتجات متجر الهلال المختارة'],
    });
  };

  const steps = [
    { id: 1, title: 'تم استلام الطلب', desc: 'تم تأكيد طلبك والدفع بنجاح', icon: CheckCircle2 },
    { id: 2, title: 'جاري التجهيز', desc: 'يتم تجهيز المنتجات وطباعة الاسم بالرياض', icon: Clock },
    { id: 3, title: 'جاري الشحن', desc: 'الشحنة مع مندوب التوصيل', icon: Truck },
    { id: 4, title: 'تم التوصيل', desc: 'وصلت الشحنة للعميل', icon: Home },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#161618] text-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#222226]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#111113] text-white flex items-center justify-between border-b border-[#222226]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#0047AB]" />
            <h2 className="font-extrabold text-lg">تتبع شحنة متجر الهلال</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Tracking Code Form */}
          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="أدخل كود التتبع (مثال: HL-948120)"
                value={trackingCodeInput}
                onChange={(e) => setTrackingCodeInput(e.target.value)}
                className="w-full pl-3 pr-9 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#0047AB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              تتبع
            </button>
          </form>

          {activeOrder && (
            <div className="space-y-5 border-t border-[#222226] pt-4">
              <div className="flex items-center justify-between bg-[#111113] p-3 rounded-xl border border-[#222226] text-xs">
                <div>
                  <div className="text-zinc-400">رقم الشحنة:</div>
                  <div className="font-black text-[#0047AB] font-mono text-sm">{activeOrder.code}</div>
                </div>
                <div className="text-left">
                  <div className="text-zinc-400">شركة الشحن:</div>
                  <div className="font-bold text-white">{activeOrder.courier}</div>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="space-y-4 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#222226]">
                {steps.map((st) => {
                  const isDone = st.id <= activeOrder.statusStep;
                  const isCurrent = st.id === activeOrder.statusStep;

                  return (
                    <div key={st.id} className="relative flex items-start gap-3 pr-8">
                      <div
                        className={`absolute right-1.5 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isDone
                            ? 'bg-[#0047AB] text-white ring-4 ring-[#0047AB]/20'
                            : 'bg-[#2a2a2e] text-zinc-500'
                        }`}
                      >
                        {st.id}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                          <span>{st.title}</span>
                          {isCurrent && (
                            <span className="bg-[#0047AB]/20 text-blue-300 border border-[#0047AB]/40 text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                              حالة الطلب الحالية
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{st.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Items in order */}
              <div className="bg-[#111113] p-3 rounded-xl border border-[#222226] text-xs space-y-2">
                <div className="font-bold text-zinc-300">محتويات الشحنة:</div>
                <ul className="list-disc list-inside text-zinc-400 space-y-0.5">
                  {activeOrder.items.map((it: string, i: number) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-[#222226] flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">الفاتورة الضريبية ZATCA المعتمدة</span>
                  <button
                    onClick={() => {
                      if (onViewInvoice) {
                        const trackedOrderObj: Order = {
                          id: activeOrder.code,
                          date: activeOrder.date,
                          items: [
                            {
                              cartItemId: 'tr-1',
                              product: {
                                id: 'p1',
                                name: activeOrder.items[0] || 'منتج الهلال الرسمي',
                                category: 'tops',
                                categoryLabel: 'قمصان',
                                price: 299,
                                rating: 4.9,
                                reviewsCount: 120,
                                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800',
                                galleryImages: [],
                                description: 'منتج أصلية',
                                sizes: ['M', 'L'],
                                colors: [{ name: 'أزرق', hex: '#0047AB' }],
                                inStock: true,
                                details: [],
                                reviews: [],
                              },
                              selectedSize: 'L',
                              selectedColor: 'أزرق ملكي',
                              quantity: 1,
                              customName: 'MITROVIĆ',
                              customNumber: '9',
                            },
                          ],
                          subtotal: 299,
                          discount: 0,
                          shipping: 0,
                          total: 299,
                          status: 'shipped',
                          customerInfo: {
                            fullName: 'عميل متجر الهلال',
                            phone: '0501234567',
                            city: activeOrder.customerCity || 'الرياض',
                            address: 'حي النفل - طريق الملك عبدالعزيز',
                            paymentMethod: 'مدى (Mada)',
                          },
                          trackingCode: activeOrder.code,
                        };
                        onViewInvoice(trackedOrderObj);
                      }
                    }}
                    className="px-3 py-1.5 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-300" />
                    <span>طبع الفاتورة 🖨️</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

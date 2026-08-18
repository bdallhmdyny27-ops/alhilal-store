import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, Phone, User, MapPin, Printer, ArrowRight } from 'lucide-react';
import { SAUDI_CITIES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscountCode: string;
  onClearCart: () => void;
  onViewInvoice?: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscountCode,
  onClearCart,
  onViewInvoice,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(SAUDI_CITIES[0]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'applepay' | 'mada' | 'card' | 'cod'>('applepay');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedDiscountCode === 'HILAL1957' ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal >= 200 || cartItems.length === 0 ? 0 : 25;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    const trackingCode = `HL-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: [...cartItems],
      subtotal,
      discount,
      shipping,
      total,
      status: 'received',
      customerInfo: {
        fullName,
        phone,
        city,
        address,
        paymentMethod:
          paymentMethod === 'applepay'
            ? 'Apple Pay'
            : paymentMethod === 'mada'
            ? 'بطاقة مدى'
            : paymentMethod === 'card'
            ? 'بطاقة إئتمانية'
            : 'الدفع عند الاستلام',
      },
      trackingCode,
    };

    setCreatedOrder(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#161618] text-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#222226] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#111113] text-white flex items-center justify-between shrink-0 border-b border-[#222226]">
          <h2 className="font-extrabold text-lg flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#0047AB]" />
            <span>إتمام طلب متجر الهلال</span>
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {createdOrder ? (
            /* Order Success View */
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                  تم تأكيد الطلب بنجاح!
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  شكراً لتسوقك من متجر الهلال الرسمي!
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  تم إرسال تفاصيل الشحنة إلى جوالك. رمز التتبع الخاص بك هو:
                </p>
                <div className="mt-3 inline-block bg-[#111113] border border-[#0047AB]/50 text-blue-400 font-mono font-black text-xl px-4 py-2 rounded-xl">
                  {createdOrder.trackingCode}
                </div>
              </div>

              <div className="bg-[#111113] p-4 rounded-xl border border-[#222226] text-right space-y-2 text-xs">
                <div className="font-bold text-white text-sm border-b border-[#222226] pb-2">ملخص الشحنة:</div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">اسم العميل:</span>
                  <span className="font-bold text-white">{createdOrder.customerInfo.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">عنوان التوصيل:</span>
                  <span className="font-bold text-white">{createdOrder.customerInfo.city} - {createdOrder.customerInfo.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">طريقة الدفع:</span>
                  <span className="font-bold text-white">{createdOrder.customerInfo.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#0047AB] pt-2 border-t border-[#222226]">
                  <span>المبلغ الإجمالي المدفوع:</span>
                  <span>{createdOrder.total} ر.س</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    if (onViewInvoice && createdOrder) {
                      onViewInvoice(createdOrder);
                    } else {
                      window.print();
                    }
                  }}
                  className="px-5 py-2.5 bg-[#0047AB] hover:bg-blue-600 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-lg shadow-[#0047AB]/30 transition-transform active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>طبع الفاتورة الضريبية 🖨️</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1a1a1d] hover:bg-[#222226] border border-[#2a2a2e] text-zinc-300 text-xs font-bold rounded-xl"
                >
                  العودة للمتجر
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Step 1: Customer Info */}
              <div className="space-y-3">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0047AB]" />
                  <span>1. معلومات المستلم والتوصيل</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سعود عبدالله الدوسري"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">رقم الجوال *</label>
                    <input
                      type="tel"
                      required
                      placeholder="05X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0047AB] focus:outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">المدينة *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                    >
                      {SAUDI_CITIES.map((c) => (
                        <option key={c} value={c} className="bg-[#161618] text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">العنوان التفصيلي *</label>
                    <input
                      type="text"
                      required
                      placeholder="الحي، الشارع، رقم المنزل"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="space-y-3 pt-2 border-t border-[#222226]">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#0047AB]" />
                  <span>2. اختر طريقة الدفع</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === 'applepay'
                        ? 'bg-black text-white border-[#0047AB] ring-2 ring-[#0047AB]'
                        : 'bg-[#1a1a1d] border-[#2a2a2e] text-zinc-300 hover:bg-[#222226]'
                    }`}
                  >
                     Apple Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mada')}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === 'mada'
                        ? 'bg-[#0047AB] text-white border-[#0047AB] ring-2 ring-[#0047AB]'
                        : 'bg-[#1a1a1d] border-[#2a2a2e] text-zinc-300 hover:bg-[#222226]'
                    }`}
                  >
                    💳 مدى (Mada)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-[#0047AB]'
                        : 'bg-[#1a1a1d] border-[#2a2a2e] text-zinc-300 hover:bg-[#222226]'
                    }`}
                  >
                    Visa / Master
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-800 text-white border-emerald-700 ring-2 ring-emerald-500'
                        : 'bg-[#1a1a1d] border-[#2a2a2e] text-zinc-300 hover:bg-[#222226]'
                    }`}
                  >
                    💵 عند الاستلام
                  </button>
                </div>
              </div>

              {/* Step 3: Order Summary */}
              <div className="bg-[#111113] p-4 rounded-xl border border-[#222226] space-y-2 text-xs text-zinc-300">
                <div className="font-bold text-white mb-2">ملخص الحساب النهائية:</div>
                <div className="flex justify-between">
                  <span>إجمالي المنتجات ({cartItems.length}):</span>
                  <span className="font-bold text-white">{subtotal} ر.س</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>الخصم المطبق:</span>
                    <span>-{discount} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>التوصيل:</span>
                  <span className="font-bold text-white">{shipping === 0 ? 'مجاني' : `${shipping} ر.س`}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#0047AB] pt-2 border-t border-[#222226]">
                  <span>المبلغ الإجمالي المطلق:</span>
                  <span>{total} ر.س</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#0047AB] hover:bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-[#0047AB]/30 text-base transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <span>تأكيد الطلب والدفع ({total} ر.س)</span>
                <ShieldCheck className="w-5 h-5 text-white" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

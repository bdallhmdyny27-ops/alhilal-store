import React from 'react';
import { X, Printer, Trophy, CheckCircle2, QrCode, FileText, Download, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  // Calculate VAT (15% included or calculated)
  const vatAmount = Math.round((order.total - (order.total / 1.15)) * 100) / 100;
  const subtotalBeforeVat = Math.round((order.total - vatAmount) * 100) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Outer Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#161618] text-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#222226] flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar (Non-Printable) */}
        <div className="p-4 bg-[#111113] border-b border-[#222226] flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0047AB]" />
            <h2 className="font-extrabold text-base sm:text-lg">الفاتورة الضريبية الرسمية - متجر الهلال</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0047AB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الفاتورة 🖨️</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE SHEET AREA */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:m-0 print:w-full print:shadow-none" id="printable-invoice">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-blue-900 pb-6 gap-4">
            
            {/* Store Brand */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0047AB] flex items-center justify-center text-white shadow-md">
                <Trophy className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h1 className="text-xl font-black text-blue-950">متجر الزعيم الهلالي الرسمي</h1>
                <p className="text-xs text-slate-500 font-medium">شركة متجر نادي الهلال للتجارة والملابس الرياضية</p>
                <p className="text-[10px] text-slate-400">الرقم الضريبي VAT: 310098412000003</p>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="text-left sm:text-right w-full sm:w-auto bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="inline-block px-2.5 py-0.5 bg-blue-950 text-white font-bold text-[10px] rounded-md mb-1">
                فاتورة ضريبية مبسطة
              </div>
              <div className="text-xs font-bold text-slate-700">رقم الفاتورة: <span className="font-mono text-blue-900">INV-{order.trackingCode}</span></div>
              <div className="text-xs text-slate-500">التاريخ: {order.date}</div>
              <div className="text-xs text-slate-500">كود التتبع: <span className="font-mono font-bold text-slate-800">{order.trackingCode}</span></div>
            </div>

          </div>

          {/* Customer & Shipping Details */}
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-extrabold text-blue-950 text-xs border-b border-slate-200 pb-1 mb-2">
                بيانات المستلم والتوصيل:
              </div>
              <div><span className="text-slate-500">الاسم:</span> <strong className="text-slate-900">{order.customerInfo.fullName}</strong></div>
              <div><span className="text-slate-500">الجوال:</span> <strong className="text-slate-900 font-mono" dir="ltr">{order.customerInfo.phone}</strong></div>
              <div><span className="text-slate-500">العنوان:</span> <strong className="text-slate-900">{order.customerInfo.city} - {order.customerInfo.address}</strong></div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-extrabold text-blue-950 text-xs border-b border-slate-200 pb-1 mb-2">
                تفاصيل السداد والشحن:
              </div>
              <div><span className="text-slate-500">طريقة الدفع:</span> <strong className="text-slate-900">{order.customerInfo.paymentMethod}</strong></div>
              <div><span className="text-slate-500">حالة الطلب:</span> <strong className="text-emerald-700">مؤكد ومقيد بالنظام ✓</strong></div>
              <div><span className="text-slate-500">شركة الشحن:</span> <strong className="text-slate-900">سمسا أكسبريس (توصيل سريع)</strong></div>
            </div>
          </div>

          {/* Products Table */}
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-right text-xs border-collapse">
              <thead>
                <tr className="bg-blue-950 text-white font-bold">
                  <th className="p-3 rounded-r-xl">#</th>
                  <th className="p-3">تفاصيل المنتج والطباعة</th>
                  <th className="p-3 text-center">المقاس / اللون</th>
                  <th className="p-3 text-center">الكمية</th>
                  <th className="p-3 text-center">سعر الوحدة</th>
                  <th className="p-3 text-left rounded-l-xl">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {order.items.map((item, index) => (
                  <tr key={item.cartItemId || index} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-400">{index + 1}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 text-sm">{item.product.name}</div>
                      {(item.customName || item.customNumber) && (
                        <div className="text-[11px] text-blue-900 font-extrabold mt-0.5 bg-blue-50 px-2 py-0.5 rounded inline-block">
                          ✨ تخصيص طباعة: {item.customName} (#{item.customNumber})
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center font-bold">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-800">{item.selectedSize}</span> / {item.selectedColor}
                    </td>
                    <td className="p-3 text-center font-bold font-mono">{item.quantity}</td>
                    <td className="p-3 text-center font-mono">{item.product.price} ر.س</td>
                    <td className="p-3 text-left font-black font-mono text-slate-900">
                      {(item.product.price * item.quantity).toFixed(2)} ر.س
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & ZATCA QR Code Section */}
          <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            
            {/* ZATCA QR Code & Official Seal */}
            <div className="sm:col-span-7 flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="p-2 bg-white border border-slate-300 rounded-lg shrink-0 text-center">
                <QrCode className="w-20 h-20 text-slate-900 mx-auto" />
                <span className="text-[9px] font-mono text-slate-500 block mt-1">ZATCA QR VERIFIED</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1 font-extrabold text-blue-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>فاتورة ضريبية أصلية ومعتمدة</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  تعتبر هذه الفاتورة سنداً رسمياً لإثبات الشراء والضمان الذهبي لمدة 14 يوماً من تاريخ الاستلام.
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  ZATCA Hash: 8f9b2a1c...e4d320
                </div>
              </div>
            </div>

            {/* Financial Totals Table */}
            <div className="sm:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>المجموع الفرعي (قبل الضريبة):</span>
                <span className="font-mono font-bold">{subtotalBeforeVat.toFixed(2)} ر.س</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-mono font-bold">{vatAmount.toFixed(2)} ر.س</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>رسوم الشحن والتوصيل:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {order.shipping === 0 ? 'مجاني (0.00 ر.س)' : `${order.shipping} ر.س`}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>كود الخصم:</span>
                  <span className="font-mono">-{order.discount} ر.س</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-blue-950 pt-2 border-t border-slate-300">
                <span>الإجمالي النهائي الشامل:</span>
                <span className="font-mono text-base text-blue-900">{order.total.toFixed(2)} ر.س</span>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 space-y-1">
            <p>نشكركم لانتخابكم متجر الهلال الرسمي • للتواصل والدعم الفني: store@alhilal-shop.sa | الرقم المجاني: 8001249000</p>
            <p>© 2026 جميع الحقوق محفوظة لنادي الهلال السعودي</p>
          </div>

        </div>

        {/* Action Bottom Bar (Non-Printable) */}
        <div className="p-4 bg-[#111113] border-t border-[#222226] flex items-center justify-between shrink-0 print:hidden">
          <span className="text-xs text-zinc-400">💡 يمكنك طباعة الفاتورة مباشرة أو حفظها كملف PDF</span>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>طبع الفاتورة الآن</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-[#1a1a1d] hover:bg-[#222226] text-zinc-300 text-xs font-bold rounded-xl border border-[#2a2a2e]"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

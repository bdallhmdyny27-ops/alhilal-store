import React from 'react';
import { Trophy, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0b] text-white pt-12 pb-8 border-t border-[#222226] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#222226]">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0047AB] flex items-center justify-center text-white shadow-md shadow-[#0047AB]/20">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">متجر الزعيم الهلالي</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              المتجر الإلكتروني المعتمد لتوفير أحدث قمصان، أحذية وشورتات نادي الهلال السعودي بشعار النادي وطباعة حرارية أصلية.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>موثق في منصة الأعمال وسجل تجاري رقم 101082910</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#0047AB]">أقسام المتجر</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">بلايز وقمصان الهلال 2026</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أحذية وجزم رياضية بشعار الهلال</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شورتات التمارين والمباريات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أطقم الناشئين والأطفال</a></li>
              <li><a href="#" className="hover:text-white transition-colors">حقائب وكابات ومستلزمات المشجعين</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#0047AB]">خدمة العملاء</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">تتبع الطلب الشحنة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الاستبدال والاسترجاع (14 يوماً)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">دليل المقاسات المعتمد</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أسئلة شائعة الشحن والتوصيل</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#0047AB]">تواصل معنا والرياض</h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span>الرياض، طريق الملك فهد، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span dir="ltr">+966 800 124 9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span>store@alhilal-shop.sa</span>
              </div>
            </div>

            {/* Payment Icons Badges */}
            <div className="pt-2">
              <div className="text-[10px] text-zinc-500 font-bold mb-1.5">طرق الدفع الآمنة المعتمدة:</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 bg-[#161618] border border-[#2a2a2e] rounded-md text-[10px] font-bold text-white"> Apple Pay</span>
                <span className="px-2 py-1 bg-[#0047AB]/20 border border-[#0047AB]/40 rounded-md text-[10px] font-bold text-blue-300">مدى Mada</span>
                <span className="px-2 py-1 bg-[#161618] border border-[#2a2a2e] rounded-md text-[10px] font-bold text-zinc-300">Visa / MasterCard</span>
                <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-800/60 rounded-md text-[10px] font-bold text-emerald-300">الدفع عند الاستلام</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>© 2026 متجر الزعيم الهلالي الرسمي. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُمم بـ <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> لعشاق وموج الهلال الأزرق
          </p>
        </div>
      </div>
    </footer>
  );
};

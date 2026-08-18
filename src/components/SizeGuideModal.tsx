import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [genderTab, setGenderTab] = useState<'men' | 'women' | 'kids' | 'shoes'>('men');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#161618] text-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#222226]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#111113] text-white flex items-center justify-between border-b border-[#222226]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#0047AB]" />
            <h2 className="font-extrabold text-lg">دليل المقاسات الرسمي (رجالي / نسائي / أطفال)</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 text-xs">
          {/* Tab Switcher */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#111113] rounded-xl border border-[#222226] text-center">
            {[
              { id: 'men', label: 'رجالي 👨' },
              { id: 'women', label: 'نسائي 👩' },
              { id: 'kids', label: 'أطفال 👶' },
              { id: 'shoes', label: 'أحذية 👟' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setGenderTab(t.id as any)}
                className={`py-2 font-bold rounded-lg transition-all text-xs ${
                  genderTab === t.id
                    ? 'bg-[#0047AB] text-white shadow-xs font-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {genderTab === 'men' && (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#111113] text-blue-400 font-bold border-b border-[#222226]">
                    <th className="p-2 border border-[#222226]">المقاس (رجالي)</th>
                    <th className="p-2 border border-[#222226]">الصدر (سم)</th>
                    <th className="p-2 border border-[#222226]">الطول (سم)</th>
                    <th className="p-2 border border-[#222226]">الوزن التقريبي</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">S</td><td className="p-2 border border-[#222226]">92 - 96</td><td className="p-2 border border-[#222226]">70</td><td className="p-2 border border-[#222226]">55 - 65 كجم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">M</td><td className="p-2 border border-[#222226]">96 - 102</td><td className="p-2 border border-[#222226]">72</td><td className="p-2 border border-[#222226]">65 - 75 كجم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">L</td><td className="p-2 border border-[#222226]">102 - 108</td><td className="p-2 border border-[#222226]">74</td><td className="p-2 border border-[#222226]">75 - 85 كجم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">XL</td><td className="p-2 border border-[#222226]">108 - 114</td><td className="p-2 border border-[#222226]">76</td><td className="p-2 border border-[#222226]">85 - 95 كجم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">XXL</td><td className="p-2 border border-[#222226]">114 - 120</td><td className="p-2 border border-[#222226]">78</td><td className="p-2 border border-[#222226]">95 - 105 كجم</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {genderTab === 'women' && (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#111113] text-rose-400 font-bold border-b border-[#222226]">
                    <th className="p-2 border border-[#222226]">المقاس (نسائي)</th>
                    <th className="p-2 border border-[#222226]">محيط الصدر (سم)</th>
                    <th className="p-2 border border-[#222226]">محيط الخصر (سم)</th>
                    <th className="p-2 border border-[#222226]">المقاس الأوروبي</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">XS</td><td className="p-2 border border-[#222226]">80 - 84</td><td className="p-2 border border-[#222226]">62 - 66</td><td className="p-2 border border-[#222226]">EU 34</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">S</td><td className="p-2 border border-[#222226]">84 - 88</td><td className="p-2 border border-[#222226]">66 - 70</td><td className="p-2 border border-[#222226]">EU 36</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">M</td><td className="p-2 border border-[#222226]">88 - 94</td><td className="p-2 border border-[#222226]">70 - 76</td><td className="p-2 border border-[#222226]">EU 38 - 40</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">L</td><td className="p-2 border border-[#222226]">94 - 100</td><td className="p-2 border border-[#222226]">76 - 82</td><td className="p-2 border border-[#222226]">EU 42</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">XL</td><td className="p-2 border border-[#222226]">100 - 108</td><td className="p-2 border border-[#222226]">82 - 90</td><td className="p-2 border border-[#222226]">EU 44</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {genderTab === 'kids' && (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#111113] text-amber-400 font-bold border-b border-[#222226]">
                    <th className="p-2 border border-[#222226]">مقاس الأطفال</th>
                    <th className="p-2 border border-[#222226]">العمر التقريبي</th>
                    <th className="p-2 border border-[#222226]">الطول (سم)</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">4-5 سنوات</td><td className="p-2 border border-[#222226]">4 - 5 سنوات</td><td className="p-2 border border-[#222226]">104 - 110 سم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">6-7 سنوات</td><td className="p-2 border border-[#222226]">6 - 7 سنوات</td><td className="p-2 border border-[#222226]">116 - 122 سم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">8-9 سنوات</td><td className="p-2 border border-[#222226]">8 - 9 سنوات</td><td className="p-2 border border-[#222226]">128 - 134 سم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">10-11 سنة</td><td className="p-2 border border-[#222226]">10 - 11 سنة</td><td className="p-2 border border-[#222226]">140 - 146 سم</td></tr>
                  <tr><td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">12-13 سنة</td><td className="p-2 border border-[#222226]">12 - 13 سنة</td><td className="p-2 border border-[#222226]">152 - 158 سم</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {genderTab === 'shoes' && (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#111113] text-blue-400 font-bold border-b border-[#222226]">
                    <th className="p-2 border border-[#222226]">مقاس EUR</th>
                    <th className="p-2 border border-[#222226]">مقاس US</th>
                    <th className="p-2 border border-[#222226]">مقاس UK</th>
                    <th className="p-2 border border-[#222226]">طول القدم (سم)</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr>
                    <td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">40</td>
                    <td className="p-2 border border-[#222226]">7</td>
                    <td className="p-2 border border-[#222226]">6.5</td>
                    <td className="p-2 border border-[#222226]">25.0 سم</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">41</td>
                    <td className="p-2 border border-[#222226]">8</td>
                    <td className="p-2 border border-[#222226]">7.5</td>
                    <td className="p-2 border border-[#222226]">25.5 سم</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">42</td>
                    <td className="p-2 border border-[#222226]">8.5</td>
                    <td className="p-2 border border-[#222226]">8</td>
                    <td className="p-2 border border-[#222226]">26.5 سم</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">43</td>
                    <td className="p-2 border border-[#222226]">9.5</td>
                    <td className="p-2 border border-[#222226]">9</td>
                    <td className="p-2 border border-[#222226]">27.5 سم</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">44</td>
                    <td className="p-2 border border-[#222226]">10</td>
                    <td className="p-2 border border-[#222226]">9.5</td>
                    <td className="p-2 border border-[#222226]">28.0 سم</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222226] font-bold bg-[#1a1a1d] text-white">45</td>
                    <td className="p-2 border border-[#222226]">11</td>
                    <td className="p-2 border border-[#222226]">10.5</td>
                    <td className="p-2 border border-[#222226]">29.0 سم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-[#111113] p-3 rounded-xl border border-amber-500/30 text-[11px] text-amber-300">
            💡 <strong>نصيحة اختيار المقاس:</strong> إذا كنت تفضل القميص أو الحذاء أوسع قليلاً للتمارين الرياضية، يُنصح باختيار مقاس واحد أكبر.
          </div>
        </div>

      </div>
    </div>
  );
};

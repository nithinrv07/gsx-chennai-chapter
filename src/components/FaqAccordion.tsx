import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';

/** Accessible accordion: one answer open at a time, smooth height animation via CSS grid rows. */
export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-white/[0.07] rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
      {FAQ_DATA.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className={`transition-colors ${isOpen ? 'bg-purple-500/[0.06]' : 'hover:bg-white/[0.02]'}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-300"
              >
                <span className={`text-base sm:text-lg font-semibold transition-colors ${isOpen ? 'text-white' : 'text-gray-200'}`}>
                  {item.question}
                </span>
                <span
                  className={`shrink-0 grid place-items-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    isOpen
                      ? 'rotate-45 bg-purple-500 border-purple-400 text-white shadow-[0_0_18px_rgba(168,85,247,0.6)]'
                      : 'border-white/15 text-purple-300'
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="w-4 h-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-7 pb-6 pr-14 text-sm sm:text-base text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;

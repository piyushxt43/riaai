import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  "Quit nicotine cravings",
  "Stay sober and steady",
  "Ease phone & dopamine spikes",
  "Navigate stress triggers",
  "All of the above"
];

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    console.log('Selected:', option);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src="/mainbg1.png"
          alt="Ria agentic recovery background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white drop-shadow">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 text-sm font-semibold text-white ring-1 ring-white/30 mb-6 backdrop-blur">
          Agentic AI Recovery · Hackathon Showcase
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Meet Ria — your proactive AI companion that keeps you ahead of relapse
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
          Ria learns your mood dips, risky hours, and device triggers to adapt recovery plans automatically.
          It checks in before cravings swell, deploys SOS resources, and brings accountability partners
          into the loop without waiting to be asked.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
          {[
            { title: "Agentic AI Coach", desc: "Predicts cravings and adapts intensity daily." },
            { title: "360° Recovery Plan", desc: "Routines, habit swaps, and crisis workflows." },
            { title: "Always-on Support", desc: "Escalates to SOS or community allies instantly." },
          ].map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl bg-black/40 text-white/95 p-5 shadow-lg ring-1 ring-white/10 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            What should Ria help you prevent first?
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-3 text-left flex items-center justify-between hover-elevate backdrop-blur"
              data-testid="button-dropdown-toggle"
            >
              <span className="text-white">{selected || "Choose your answer"}</span>
              <ChevronDown className={`w-5 h-5 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-black/70 border border-white/10 rounded-md shadow-lg backdrop-blur">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 text-white first:rounded-t-md last:rounded-b-md"
                    data-testid={`option-${option.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white px-8 py-6 text-lg rounded-md shadow-lg shadow-rose-200"
          data-testid="button-start-journey"
        >
          Launch the demo
        </Button>
        <p className="mt-4 text-sm text-white/80">
          Built with modern React + Vite. Optimized for Agentic AI Hackathon 2025.
        </p>
      </div>
    </section>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  "Build a new routine",
  "Achieve my goals",
  "Overcome my challenges",
  "All three",
  "Other"
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
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Find Your Ultimate Daily Routine and Make it Stick
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Backed by behavioral science, Fabulous is an accountability partner in your pocket to help
          you make smart changes and build healthy habits. Ready to take your life to the next level?
        </p>

        <div className="max-w-md mx-auto mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            How can Fabulous help you?
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-input rounded-md px-4 py-3 text-left flex items-center justify-between hover-elevate"
              data-testid="button-dropdown-toggle"
            >
              <span className="text-foreground">{selected || "Choose your answer"}</span>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-input rounded-md shadow-lg">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="w-full px-4 py-3 text-left hover-elevate text-foreground first:rounded-t-md last:rounded-b-md"
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
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-md"
          data-testid="button-start-journey"
        >
          Start your journey
        </Button>
      </div>
    </section>
  );
}

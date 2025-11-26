import { Button } from "@/components/ui/button";

export default function BottomCTASection() {
  return (
    <section 
      className="relative py-24 md:py-32 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.thefabulous.co/images/Fab_Home_Visual_Section-Bottom_Desktop.png')"
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          The New You Awaits
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          The days of distraction, procrastination, and overwhelm are over. Claim your focus
          and productivity here.
        </p>
        <Button 
          size="lg"
          className="bg-white/20 backdrop-blur-md text-white border-2 border-white hover:bg-white/30 px-8 py-6 text-lg rounded-md"
          data-testid="button-get-started-bottom"
        >
          Get started
        </Button>
      </div>
    </section>
  );
}

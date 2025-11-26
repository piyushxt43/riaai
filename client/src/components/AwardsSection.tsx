const awards = [
  {
    title: "Best Self-Care App 2018",
    platform: "App Store",
    icon: "https://www.thefabulous.co/images/app-store.svg"
  },
  {
    title: "Best App Finalist",
    platform: "Google Play Awards",
    icon: "https://www.thefabulous.co/images/google-play.svg"
  },
  {
    title: "Design Award Winner",
    platform: "Google Material",
    icon: "https://www.thefabulous.co/images/google-material.svg"
  }
];

export default function AwardsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
          Fabulous awards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {awards.map((award, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img 
                src={award.icon} 
                alt={award.platform} 
                className="w-16 h-16 md:w-20 md:h-20 mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                {award.title}
              </h3>
              <p className="text-muted-foreground">
                {award.platform}
              </p>
            </div>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-center gap-8 mt-12">
          <div className="text-center">
            <img src="https://www.thefabulous.co/images/app.svg" alt="App Store" className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-semibold">Best App</p>
            <p className="text-xs text-muted-foreground">Self-Care 2018</p>
            <p className="text-xs text-muted-foreground">App Store</p>
          </div>
          <div className="text-center">
            <img src="https://www.thefabulous.co/images/play.svg" alt="Google Play" className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-semibold">Best App Finalist</p>
            <p className="text-xs text-muted-foreground">Google Play</p>
            <p className="text-xs text-muted-foreground">Awards</p>
          </div>
          <div className="text-center">
            <img src="https://www.thefabulous.co/images/google.svg" alt="Google Material" className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-semibold">Google Material</p>
            <p className="text-xs text-muted-foreground">Design Award</p>
            <p className="text-xs text-muted-foreground">Winner</p>
          </div>
        </div>
      </div>
    </section>
  );
}

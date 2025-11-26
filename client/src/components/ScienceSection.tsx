export default function ScienceSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-4">
          The science of Fabulous
        </h2>
        <p className="text-lg md:text-xl text-center text-muted-foreground mb-16">
          Fabulous was formed with the goal to improve lives, one habit at a time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://www.thefabulous.co/images/Fab_Home_Icon-1_Science_Desktop.png"
              alt="Duke University"
              className="w-24 h-24 md:w-32 md:h-32 mb-6"
            />
            <p className="text-lg md:text-xl text-foreground">
              Fabulous is a behavior change solution that began at Duke University's Center for
              Advanced Hindsight.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://www.thefabulous.co/images/Fab_Home_Icon-2_Science_Desktop.png"
              alt="Research Team"
              className="w-24 h-24 md:w-32 md:h-32 mb-6"
            />
            <p className="text-lg md:text-xl text-foreground">
              Our team of behavioral economists, psychologists, and data scientists are
              constantly improving Fabulous and finding new ways to share the benefits with more people.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            We have helped 37M people build healthier and happier lives
          </p>
        </div>
      </div>
    </section>
  );
}

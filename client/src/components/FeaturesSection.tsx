const features = [
  {
    title: "Coaching Library 24/7",
    description: "Get a boost in 2 minutes. On demand series available all day, all night.",
    image: "https://www.thefabulous.co/images/Fabulous_Feature_1_Desktop.webp",
    icon: "https://www.thefabulous.co/images/icon1.svg",
    reverse: false
  },
  {
    title: "Your own human coach",
    description: "Book a session with a real live coach to inspire an inner shift.",
    image: "https://www.thefabulous.co/images/Fabulous_Feature_2_Desktop.webp",
    icon: "https://www.thefabulous.co/images/icon2.svg",
    reverse: true
  },
  {
    title: "Create structure in your life",
    description: "Morning, afternoon, evening routines guide you through every day.",
    image: "https://www.thefabulous.co/images/Fabulous_Feature_3_Desktop.webp",
    icon: "https://www.thefabulous.co/images/icon3.svg",
    reverse: false
  },
  {
    title: "Join a community",
    description: "Give and get support with other members just like you.",
    image: "https://www.thefabulous.co/images/5-min.webp",
    icon: "https://www.thefabulous.co/images/icon5.svg",
    reverse: true
  },
  {
    title: "Focus on deep work",
    description: "Learn how to tune out noise. Streamline your mind into a flow state.",
    image: "https://www.thefabulous.co/images/Fabulous_Feature_4_Desktop.webp",
    icon: "https://www.thefabulous.co/images/icon6.svg",
    reverse: false
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24 last:mb-0`}
          >
            <div className="w-full md:w-1/2">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <img
                src={feature.icon}
                alt=""
                className="w-12 h-12 md:w-16 md:h-16 mb-4 mx-auto md:mx-0"
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

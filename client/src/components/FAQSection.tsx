import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Fabulous?",
    answer: "Fabulous is an award-winning self-care coaching app that harnesses the power and wisdom of behavioral science to help you develop lasting healthy habits. You'll learn how to create meaningful daily rituals and stack habits to create routines that guide you towards achieving all your goals."
  },
  {
    question: "How does Fabulous work?",
    answer: "Fabulous was incubated in Duke University's Behavioral Economics Lab, led by Dan Ariely. Using a science-backed approach to habit-building, you'll learn how to turn small daily tasks into profound and lasting change. You'll use the same methods that elite athletes and successful entrepreneurs use to rise to the top of their game. Now it's your turn."
  },
  {
    question: "How much does Fabulous cost?",
    answer: "You can purchase a Premium plan, billed monthly or annually. No extra costs or contracts."
  },
  {
    question: "How do I cancel?",
    answer: "If Fabulous isn't right for you, you can cancel in a few clicks. There are no cancellation fees or contracts. Start or stop your subscription at any time."
  },
  {
    question: "How does the trial work?",
    answer: "Try Fabulous Premium for the duration of the trial period. If you enjoy it, do nothing, and your trial will automatically convert into the agreed-upon subscription duration.\n\nIf Premium isn't for you, make sure you cancel the trial before the end date to avoid it becoming a subscription."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          FAQ
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger 
                className="text-left text-lg md:text-xl font-semibold text-foreground py-6 hover:no-underline"
                data-testid={`faq-question-${index}`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-muted-foreground pb-6 whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

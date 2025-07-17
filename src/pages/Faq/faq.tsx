import { Header } from "../../components/layout/_header"
import { FaqCard } from "../../components/ui/faq/faqCard"
import { useState } from "react"

interface faqProps {
  question: string,
  answer: string
}

export const Faq = () => {
  const [isToggled, setIsToggled] = useState(false);

  const faqItems: faqProps[]= [
    {question: "What fabric do you use?", answer: "Natural and sustainable wool yarn"},
    {question: "How long to make a custom rug?", answer: "1-2 weeks depending on complexity and size. Timeframe will be discussed in request."},
    {question: "Do you do more than just rugs?", answer: "I create rug mirrors, wrist rugs, stickers and do tufting lessons."},
    {question: "Do you only do custom rugs?", answer: "No, you can always browse my pre-made rugs. "},
    {question: "How do I care for my rug?", answer: "Make sure to clean the rug at least every 6-8 months for best longevity. More if in a frequently messy areas."},
  ]
  return (
    <>
      <main aria-label="Frequently Asked Questions Page">
        <Header 
        title="FAQ"
        tagline="Generally asked quesitons, to answer your curiousities."
        />
        {/* TITLE */}
        <section>
          <h1> FAQ </h1>
          <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/Cross_Star_White.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <p> Here are some frequently asked questions. Hope to answer your curiousities. </p>
        </section>
        {/* FAQ DROPDOWN */}
        <section className="py-16 px-4">
          <ul className="
          bg-space_cadet p-4 rounded-xl
          flex flex-col gap-2">
            {faqItems.map(({question, answer}, idx) => (
              <FaqCard
              key={idx}
              question={question}
              answer={answer}
              />
            ))}
          </ul>
        </section>
        <section></section>
      </main>
    </>
  )
}

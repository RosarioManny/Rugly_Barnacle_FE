import { Header } from "../../components/layout/_header"
import { FaqCard } from "../../components/ui/faq/faqCard"

import { ShopBtn } from "../../components/ui/buttons/btn_shop"
import { CtaWavesBg } from "../../components/icons-svgs/ctaWavesBg"

interface faqProps {
  question: string,
  answer: string
}

export const Faq = () => {

  // TEMP DATA
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
        <section className="my-8 flex flex-col gap-4 justify-center text-center">
          <div className="flex justify-center text-center">
            <img 
            className="flex align-start h-10 w-10" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <h1 className="heading_text mx-4"> FAQ </h1>
          </div>
          <p className="body_text"> Here are some frequently asked questions. Hope to answer your curiousities. </p>
        </section>
        {/* FAQ DROPDOWN */}
        <section className="my-8 px-4">
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
        <CtaWavesBg className="fill-mauve"/>
        <section className="flex justify-center items-center pb-16 bg-mauve">
          <img 
            className="flex align-start h-10 w-10 mr-4" 
            src="/assets/design/icons/Cross_Star_White.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
          <ShopBtn/>
        </section>
      </main>
    </>
  )
}

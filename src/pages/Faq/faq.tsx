import { Header } from "../../components/layout/_header"
import { FaqCard } from "./faqCard"
import { ShopBtn } from "../../components/ui/buttons/btn_shop"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { faqItems } from "./faqQuestions"

export const Faq = () => {
  
  return (
    <>
      <main aria-label="Frequently Asked Questions Page">
        <Header 
        title="Frequently Asked Questions "
        tagline="Generally asked quesitons, to answer your curiosities."
        img="/gallery/Product_Display_Pokemon_Wristrug_Edited_2.webp"
        img_alt="Variety of pokemon rugs. "
        />
        {/* TITLE */}
        <section className="my-8 flex flex-col gap-4 justify-center text-center">
          <div className="flex items-center justify-center text-center">
            <img 
            className="flex align-start h-10 w-10" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <h1 className="heading_text mx-4">FAQ </h1>
          </div>
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
        <section className="flex justify-center items-center pb-14 md:pb-36 bg-mauve">
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

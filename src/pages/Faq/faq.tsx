import { Header } from "../../components/layout/_header"
import { FaqCard } from "./faqCard"
// import { ShopBtn } from "../../components/ui/buttons/btn_shop"
import { Spinner } from "../../components/ui/loaders/loadingSpinner"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { faqItems } from "./faqQuestions"
import { StartOrderBtn } from "../../components/ui/buttons"
import { getAllFaq, type FaqResponse} from "../../lib/api/Faq/faqServices"
import { useEffect, useState} from "react"

export const Faq = () => {
  const Fallback_FAQs = faqItems
  // Hold the list of Faqs
  const [faqs, setFaqs ] = useState<FaqResponse[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('idle');
  
  useEffect(()=>{
    const fetchFAQs = async () => {
      setStatus('loading')
      try {
        const data = await getAllFaq();
        setFaqs(data);
      } catch (err) {
        console.error('Failed to fetch FAQs', err);
        setStatus('error')
      } finally {
        setStatus('success');
      }
    }
    fetchFAQs()
  }, [])
  
  const displayFaqs = status === 'error' ? Fallback_FAQs : faqs;
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
        {status === 'loading' ? 
          (
            <section className="h-[50vh] flex items-center justify-center">
              <Spinner width="w-16" height="h-16" />
            </section>
          ) : (
            <section className="my-8 flex items-center justify-center px-4">
              <ul className="
              bg-space_cadet p-4 rounded-xl
              md:w-2/3 
              flex flex-col gap-2">
                {displayFaqs.map((faq: FaqResponse  ) => (
                  <FaqCard
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  />
                ))}
              </ul>
            </section>
          )
        }
      <CtaWavesBg className="fill-mauve"/>
        <section className="flex flex-col justify-center items-center md:pb-40 pb-22  bg-mauve">
          <img 
            className="flex align-start h-10 w-10 mb-4" 
            src="/assets/design/icons/Cross_Star_White.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
          <StartOrderBtn/>
        </section>
      </main>
    </>
  )
}

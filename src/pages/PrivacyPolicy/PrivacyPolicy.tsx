import { Header } from "../../components/layout/_header"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { StartOrderBtn } from "../../components/ui/buttons"
import { PrivacyCard } from "./components/PrivacyCard"
import { privacySections } from "./PrivacyData/privacyData"



export const PrivacyPolicy = () => {
  return (
    <>
      <main aria-label="Privacy Policy Page">
        <Header
          title="Privacy Policy"
          tagline="How we collect, use, and protect your information."
          img="/gallery/Product_Display_Pokemon_Wristrug_Edited_2.webp"
          img_alt="Variety of pokemon rugs."
        />

        {/* TITLE */}
        <section className="my-8 flex flex-col gap-4 justify-center text-center">
          <div className="flex items-center justify-center text-center">
            <img
              className="flex align-start h-10 w-10"
              src="/assets/design/icons/Cross_Star_Teal-Blue.webp"
              aria-hidden="true"
              alt="Cross Star Design Marker"
            />
            <h1 className="heading_text mx-4">Privacy Policy</h1>
          </div>
          <p className="text-white/60 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </section>

        {/* PRIVACY SECTIONS */}
        <section className="my-8 flex items-center justify-center px-4">
          <ul className="
            bg-space_cadet p-4 rounded-xl
            md:w-2/3
            flex flex-col gap-2">
            {privacySections.map((section) => (
              <PrivacyCard
                key={section.id}
                title={section.title}
                content={section.content}
              />
            ))}
          </ul>
        </section>

        <CtaWavesBg className="fill-mauve" />
        <section className="flex flex-col justify-center items-center md:pb-40 pb-22 bg-mauve">
          <img
            className="flex align-start h-10 w-10 mb-4"
            src="/assets/design/icons/Cross_Star_White.webp"
            aria-hidden="true"
            alt="Cross Star Design Marker"
          />
          <StartOrderBtn />
        </section>
      </main>
    </>
  )
}
import { HeartIcon, RugIcon, SmileyfaceIcon, StarIcon, CopyIcon} from "../../components/icons-svgs/SvgIcons"
import { CtaWavesBg } from "../../components/icons-svgs/ctaWavesBg"
import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder"
import { ContactUsBtn } from "../../components/ui/buttons/btn_contactUs"
import { ShopBtn } from "../../components/ui/buttons/btn_shop"
import { CategoryCard } from "../../components/ui/categoryCard"
import { Header } from "../../components/layout/_header"
import type { FC, SVGProps } from "react"
import { Carousel } from "../../components/ui/carousel/Carousel"

interface PromiseIcons {
  Icon: FC<SVGProps<SVGSVGElement>>;
  alt: string;
  description: string;
}

interface TempsProps {
  name: string,
  path: string
}

export const Home = () => {

  const Temp: TempsProps[] = [
    {"name": "Team", "path": "products/rugs/Closeup_AllThat.webp"},
    {"name": "Ghose", "path": "products/rugs/Showcase_Gengar.webp"},
    {"name": "Steal", "path": "products/rugs/Custom_Portrait.webp"},
    {"name": "Self-Portrait", "path": "products/rugs/Custom_Portrait.webp"},
    {"name": "AlFriet", "path": "products/rugs/Closeup_AllThat.webp"},
    {"name": "asdas", "path": "products/rugs/Custom_Thumper.webp"},
    {"name": "Gengar", "path": "products/rugs/Showcase_Gengar.webp"},
    {"name": "All That", "path": "products/rugs/Closeup_AllThat.webp"},
    {"name": "Ter", "path": "products/rugs/Custom_Thumper.webp"},
  ]
  const promiseIcons: PromiseIcons[] = [
    {Icon: HeartIcon, alt: "Heart icon", description: "Personalized & Handcrafted"},
    {Icon: SmileyfaceIcon, alt: "Smiley face icon", description: "Satisfaction Guarenteed"},
    {Icon: RugIcon, alt: "Rug icon", description: "One-of-a-kind Rugs"},
    {Icon: StarIcon, alt: "Star icon", description: "Quality Materials"},
  ]

  const copyEmailBtn = async () => {
    const email = "theruglybarnacle@gmail.com"

    try {
      await navigator.clipboard.writeText(email);
      alert(`Copied ${email} to clipboard.`)
    } catch (err) {
      console.error("Failed to copy:", err)
        const textArea = document.createElement("textarea");
          textArea.value = email;
            document.body.appendChild(textArea);
              textArea.select();
                document.execCommand("copy");
                  document.body.removeChild(textArea);
      alert(`Copied (fallback): ${email}` )
    }
  }

  return (
    <main aria-label="Home Page">
      <Header
        title="Where you dream design becomes a rug reality"
        tagline="Begin your dream rug!"
        btn_1={<StartOrderBtn/>}
        btn_2={<ContactUsBtn/>}
        />
      {/* Promises */}
      <section aria-label="Promises Section" className="section-container">
          <ul className="grid grid-cols-2 md:flex justify-center">
            {promiseIcons.map(({ Icon, alt, description }, idx) => (
              <li key={`${alt}-${idx}`}>
                <CategoryCard 
                  className="flex flex-col items-center text-center p-4 gap-2"
                  key={`promise-icon-${idx}`}
                  svg={<Icon className="transition-all duration-300 hover:scale-105 focus:scale-105 h-20 text-majorelle" />}
                  svgAlt={alt}
                  description={description}
                />
              </li>
            ))}
          </ul>
      </section>
      {/* CUSTOM RUGS */}
      <section className="section-container body_text divide-none divide-4">
        {/* Title */}
        <div className="flex justify-center gap-2 my-4">
          <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/X_Star_Teal-Blue.webp" 
          aria-hidden="true"
          alt="Teal Star decorator" />
          <h1 className="heading_text"> Custom Rugs</h1>
        </div>
        {/* Price and Action */}
        <div className=" flex flex-col items-center text-center gap-4">
          <img 
          className="w-full rounded-xl drop-shadow-md/40" 
          src="/products/prices/General_Pricing_Poster.webp" 
          alt="General Pricing Poster - Pricing's vary by design, size, quantity, colors and intricacy. 
          Estimates are is: 3ft is $150+ ; 4ft is $250; 5ft is $350; 6ft and more is $450." />
          <p className="body-text">
            Submit a form to begin your custom rug!
          </p>
          <StartOrderBtn/>
          <div className="flex flex-col gap-4">
            <p>
            Contact me directly to inquire more!
            </p>
            <div className="flex border-solid pr-2 rounded-2xl bg-breeze drop-shadow-sm border-black justify-center items-center">
              <button 
              onClick={copyEmailBtn}
              aria-describedby="email-address"
              aria-label="Copy Email Button"
              className=" 
              rounded-l-2xl text-space_cadet 
              hover:bg-robin_egg hover:text-fleece hover:scale-110 " > 
                <CopyIcon className="size-5 m-2 text-inherit"/>
              </button>
              <p id="email-address" className="p-2 subheading_text">
                @theruglybarnacle@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <CtaWavesBg className="fill-mauve"/>
      <section className="cta_container">
        {/* Title */}
        <div className="gap-3 mx-2 flex flex-col">
          <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/Cross_Star_White.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <h2 className="heading_text ">For the Fans, By the Fans</h2>
        </div>
        {/* Carousel */}
        <div className="">
            <Carousel items={Temp} />
  
        </div>
        {/* CTA  */}
        <div className="flex justify-center my-2 py-2">
          <ShopBtn />
        </div>
      </section>
    </main>
  )
}

import { HeartIcon, RugIcon, SmileyfaceIcon, StarIcon} from "../../components/ui/icons-svgs/SvgIcons"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder"
import { ContactUsBtn } from "../../components/ui/buttons/btn_contactUs"
import { ShopBtn } from "../../components/ui/buttons/btn_shop"
import { CategoryCard } from "../../components/ui/categoryCard"
import { Header } from "../../components/layout/_header"
import type { FC, SVGProps } from "react"
import { Carousel } from "../../components/ui/carousel/Carousel"
import { Emailbtn } from "../../components/ui/buttons/btn_copyEmail"
import { copyEmailBtn } from "../../hooks/CopyEmail"


interface PromiseIcons {
  Icon: FC<SVGProps<SVGSVGElement>>;
  alt: string;
  description: string;
  title: string;
}

interface TempsProps {
  name: string,
  path: string
}

export const Home = () => {
  // TEMP DATA
  const Temp: TempsProps[] = [
    {"name": "All That", "path": "products/rugs/Closeup_AllThat.webp"},
    {"name": "Gengar", "path": "products/rugs/Showcase_Gengar.webp"},
    {"name": "Self-Portrait", "path": "products/rugs/Custom_Portrait.webp"},
    {"name": "Thumper", "path": "products/rugs/Custom_Thumper.webp"},
  ]
  // Promise Icons
  const promiseIcons: PromiseIcons[] = [
    {Icon: HeartIcon, alt: "Heart icon", description: "Handcrafter with care", title: "Personalized & Handcrafted"},
    {Icon: StarIcon, alt: "Star icon", description: "Soft, durable and quality yarn", title: "Quality Materials"},
    {Icon: SmileyfaceIcon, alt: "Smiley face icon", description: "Exactly as you like. No exceptions!", title: "Satisfaction Guaranteed"},
    {Icon: RugIcon, alt: "Rug icon", description: "No two are ever the same!", title: "One-of-a-kind Rugs"},
  ]

  return (
    <main aria-label="Home Page" className="">
      <Header
        title="Where your dream design becomes a rug reality"
        tagline="Begin your dream rug!"
        btn_1={<StartOrderBtn/>}
        btn_2={<ContactUsBtn/>}
        />
      {/* Promises */}
      <section aria-label="Promises Section" className="w-full">
        <ul className="grid grid-cols-2 md:flex justify-center">
          {promiseIcons.map(({ Icon, alt, description, title }, idx) => (
            <li key={`${alt}-${idx}`}>
              <CategoryCard 
                className="flex flex-col items-center text-center p-4 gap-2"
                key={`promise-icon-${idx}`}
                svg={<Icon className="transition-all duration-300 hover:scale-105 focus:scale-105 h-20 text-majorelle" />}
                svgAlt={alt}
                title={title}
                description={description}
              />
            </li>
          ))}
        </ul>
      </section>
      {/* CUSTOM RUGS */}
      <section className="my-8 md:p-8 w-full body_text">
        {/* Title */}
        <div className="flex justify-center items-center gap-2 my-4 md:my-8">
          <img 
            className="h-8 w-8 md:h-10 md:w-10" 
            src="/assets/design/icons/X_Star_Teal-Blue.webp" 
            aria-hidden="true"
            alt="Teal Star decorator" 
          />
          <h1 className="heading_text text-2xl md:text-3xl lg:text-4xl">Custom Rugs</h1>
        </div>
        
        {/* Price and Action */}
        <div className="flex flex-col lg:flex-row justify-center items-center mx-3 gap-6 md:gap-8 lg:gap-12">
          {/* Image */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <img 
              className="w-full rounded-xl drop-shadow-md object-cover" 
              src="/products/prices/General_Pricing_Poster.webp" 
              alt="General Pricing Poster - Pricing's vary by design, size, quantity, colors and intricacy. 
              Estimates are: 3ft is $150+ ; 4ft is $250; 5ft is $350; 6ft and more is $450." 
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col gap-4 md:gap-6 justify-center items-center text-center w-full max-w-md">
            <p className="text-base md:text-lg lg:text-xl">
              Submit a form to begin your custom rug!
            </p>
            
            <div className="w-fit">
              <StartOrderBtn />
            </div>
            
            <div className="flex flex-col items-center gap-3 md:gap-4 w-full">
              <p className="text-sm md:text-base lg:text-lg">
                Contact me directly to inquire more!
              </p>
              
              <div className="w-fit">
                <Emailbtn onClick={copyEmailBtn} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaWavesBg className="fill-mauve top-2 "/>
      <section className="cta_container  absolute">
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
        <div className="z-20 flex items-center md:justify-end justify-center my-6 mx-20">
          <ShopBtn />
        </div>
      </section>
    </main>
  )
}

import { HeartIcon, RugIcon, SmileyfaceIcon, StarIcon} from "../../components/ui/icons-svgs/SvgIcons"
import { StartOrderBtn, ContactUsBtn, ShopBtn, Emailbtn } from "../../components/ui/buttons/index"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { Carousel } from "../../components/ui/carousel/Carousel"
import { CategoryCard } from "../../components/ui/categoryCard"
import { Header } from "../../components/layout/_header"
import { ReturnToTop } from "../../components/ui/buttons/index"
import { type FC, type SVGProps } from "react"


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
    {
      "name": "Sports", 
      "path": "/products/rugs/Rug_Boston_Celtics_Champions.webp"
    },
    {
      "name": "Pokémon", 
      "path": "products/rugs/Showcase_Gengar.webp"
    },
    {
      "name": "Portraits",
      "path": "/products/rugs/Brent_Faiyez.webp"
    },
    { 
      "name": "Disney", 
      "path": "products/rugs/Custom_Thumper.webp"
    },
    { 
      "name": "Anime", 
      "path": "/products/rugs/Rug_One_Piece_Skull.webp"
    },
    { 
      "name": "Movies", 
      "path": "/products/rugs/Rug_Star_Wars_Rebel_Resistance.webp"
    },
    { 
      "name": "Custom", 
      "path": "/products/rugs/Rug_Kirby_Jigglypuff.webp"
    },

  ]
  // Promise Icons
  const promiseIcons: PromiseIcons[] = [
    {Icon: HeartIcon, alt: "Heart icon", description: "Handmade with care", title: "Personalized & Handcrafted"},
    {Icon: RugIcon, alt: "Rug icon", description: "No two are ever the same!", title: "One-of-a-Kind Rugs"},
    {Icon: StarIcon, alt: "Star icon", description: "Soft, durable and quality yarn", title: "Quality Materials"},
    {Icon: SmileyfaceIcon, alt: "Smiley face icon", description: "Exactly as you like. No exceptions!", title: "Satisfaction Guaranteed"},
  ]

  return (
    <main aria-label="Home Page" className="">
      <Header
        title="Where your dream design becomes a rug reality"
        btn_1={<StartOrderBtn/>}
        btn_2={<ContactUsBtn/>}
        />
      {/* Promises */}
      <section aria-label="Promises Section" className=" w-full">
        <ul className="grid grid-cols-2 md:flex justify-center">
          {promiseIcons.map(({ Icon, alt, description, title }, idx) => (
            <li key={`${alt}-${idx}`}>
              <CategoryCard 
                className="flex flex-col justify-center items-center text-center p-4 gap-2"
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
      <section className=" my-8 md:p-8 w-full body_text">
        {/* Title */}
        <div className="flex justify-center items-center gap-2 my-4 md:my-8">
          <img 
            className="h-8 w-8 md:h-10 md:w-10 " 
            src="/assets/design/icons/X_Star_Teal-Blue.webp" 
            aria-hidden="true"
            alt="Teal Star decorator" 
          />
          <h1 className="heading_text text-2xl md:text-3xl lg:text-4xl">Custom Rugs</h1>
        </div>
        
        {/* Price and Action */}
        <div className="flex flex-col lg:flex-row justify-center items-center mx-3 gap-6 md:gap-8 lg:gap-12">
          {/* Image */}
          <div className="w-full drop-shadow-md drop-shadow-space_cadet/80 max-w-md lg:max-w-lg xl:max-w-xl ">
            <img 
              className="w-full  object-cover rounded-3xl ring-6 ring-space_cadet" 
              src="/products/prices/NEW_8_28_25_General_Price.webp" 
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
                <Emailbtn />
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
          <div>
            <h2 className="heading_text ">For the Fans, By A Fan</h2>
            {/* <p className="text-xs text-space_cadet/50"> Custom rugs suggested and made for customers! </p> */}
          </div>
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
      <ReturnToTop />
    </main>
  )
}

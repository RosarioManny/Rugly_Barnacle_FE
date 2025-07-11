import { Header } from "../../components/layout/_header"
import { StartOrderBtn } from "../../components/ui/Btn_StartOrder"
import { ContactUsBtn } from "../../components/ui/btn_contactUs"
import { CategoryCard } from "../../components/ui/categoryCard"
import { HeartIcon, RugIcon, SmileyfaceIcon, StarIcon, CopyIcon} from "../../components/icons-svgs/SvgIcons"
import type { FC, SVGProps } from "react"
import { ShopBtn } from "../../components/ui/btn_shop"
import { CtaWavesBg } from "../../components/icons-svgs/ctaWavesBg"



interface PromiseIcons {
  Icon: FC<SVGProps<SVGSVGElement>>;
  alt: string;
  description: string;
}

export const Home = () => {

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
    <>
      <Header
        title="Where you dream design becomes a rug reality"
        tagline="Begin your dream rug!"
        btn_1={<StartOrderBtn/>}
        btn_2={<ContactUsBtn/>}
        img="/assets/Logo/RuglyBarnacle_Logo.webp"
        img_alt="Rugly Barnacle Logo"/>
      {/* Promises */}
      <section className="section-container">
          <ul className="grid grid-cols-2 md:flex justify-center">
            {promiseIcons.map(({ Icon, alt, description }, idx) => (
              <CategoryCard 
                className="flex flex-col items-center text-center p-4 gap-2"
                key={`promise-icon-${idx}`}
                svg={<Icon className="transition-all duration-300 hover:scale-105 focus:scale-105 h-20 text-majorelle" />}
                svgAlt={alt}
                description={description}
              />
            ))}
          </ul>
      </section>
      {/* Custom Rugs */}
      <section className="section-container body_text divide-none divide-4">
        {/* Title */}
        <div className="flex justify-center gap-2 my-4">
          <img className="flex justify-start h-10 w-10"src="/assets/Icons/X_Star_Teal-Blue.webp" alt="Teal Star decorator" />
          <h1 className="heading_text"> Custom Rugs</h1>
        </div>
        {/* Price and Action */}
        <div className=" flex flex-col items-center text-center gap-4">
          <img className="w-full rounded-xl" src="/products/prices/General_Pricing_Poster.webp" alt="" />
          <p className="body-text">
            Submit a form to begin your custom rug!
          </p>
          <StartOrderBtn/>
          <div className="flex flex-col gap-4">
            <p>
            Contact me directly to inquire more!
            </p>
            <div className="flex border-solid w-fit pr-2 gap-2 rounded-2xl bg-breeze border-black justify-center items-center">
              <button onClick={copyEmailBtn} className=" rounded-l-[14px] text-space_cadet hover:text-fleece  hover:bg-robin_egg " > 
                <CopyIcon className="size-5 m-2 text-inherit"/>
              </button>
              <p id="email-address" className="p-2 subheading_text">
                @theruglybarnacle@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <CtaWavesBg/>
      <section className="cta_container">
        <div>
          {/* <img src="" alt="" /> */}
          <h1> For the Fans By the Fans</h1>
        </div>
        <div>

        </div>
        <div className="">
          <ShopBtn />
        </div>
      </section>
      <h1  className="text-breeze">
        I am the home page 🏠
      </h1>
    </>
  )
}

import { Header } from "../../components/layout/_header"
import { ShopBtn, StartOrderBtn } from "../../components/ui/buttons/index"
import { Link } from "react-router-dom"

export const About = () => {

  return (
    <main aria-label="About Me Page">
      <Header
        title="About Me"
        tagline="Learn what Rugly Barnacle is about!"
        img="/gallery/Personal_Emilie_22.jpg"
        img_alt="Owner looking at a floor filled with rugs"
        />
        {/* TITLE */}
        <section className="flex m-2 flex-col items-center text-center"> 
          <img 
          className="flex justify-start h-14 w-14" 
          src="/assets/design/icons/X_Star_Pink.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <h1 className="heading_text ">
            What is Rugly Barnacle?
          </h1>
        </section>
        {/* CONTENT */}
        <section className="flex flex-col items-center justify-center text-center my-4 py-4 gap-4 mx-4 ">
          <p className=" body_text max-w-2/3">
            Hi! I'm Emilie, the tuft broad behind the Rugly Barnacle!
            Tufting rugs started as a COVID hobby and quickly became my absolute passion and business. 
            Every Rugly Barnacle piece is a celebration of the fandom community — because it's for the fan, by the fan.
            So, if you're looking for a custom rug that's made just for you, look no further! 
            Let me bring your favorite character, symbol, logo, art piece or any design of your wildest dream to life in rug form! 
            Each rug is one of a kind and 100% handmade to exceed every customer's expectation. 
            Ready?
          </p>
          {/* <div>
            <StartOrderBtn />
          </div> */}
        </section>
        {/* CALL-TO-ACTION */}
        <section className="py-14 mb-32 flex font-medium flex-col items-center text-center ">
          <p className="m-2 body_text">Check out my premade rugs, too!</p>
          <div className="flex items-center my-8">
            <img 
            className="flex justify-start mx-4 h-10 w-10" 
            src="/assets/design/icons/Cross_Star_White.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <ShopBtn/>
          </div>
          <img 
            className="w-full p-2 md:max-h-2/3 md:max-w-2/3 lg:max-h-1/2 lg:max-w-1/2 rounded-2xl" 
            src="/gallery/Personal_Emilie_7.webp" 
            alt="Owner, Emilie C. & their dog, Hercules, sitting on floor filled with rugs" />
          <p className="text-[.7rem]">(Me and my dog Hercules)</p>
        </section>
    </main>
  )
}

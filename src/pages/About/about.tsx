import { Header } from "../../components/layout/_header"
import { ShopBtn } from "../../components/ui/buttons/btn_shop"

export const About = () => {

  return (
    <main aria-label="About Me Page">
      <Header
        title="About Me"
        tagline="Learn what Rugly Barnacle is about!"
        />
        {/* TITLE */}
        <section className="flex flex-col items-center text-center"> 
          <img 
          className="flex justify-start h-14 w-14" 
          src="/assets/design/icons/X_Star_Pink.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <h1 className="heading_text "> What is Rugly Barnacle</h1>
        </section>
        {/* CONTENT */}
        <section className="text-center mx-2">
          <p>
            Hi! I'm Emilie, the tuft broad behind the Rugly Barnacle!
            Tufting rugs started as a COVID hobby and quickly became my absolute passion and business. 
            Every Rugly Barnacle piece is a celebration of the fandom community — because it's for the fan, by the fan.
            So, if you're looking for a custom rug that's made just for you, look no further! 
            Let me bring your favorite character, symbol, logo, art piece or any design of your wildest dream to life in rug form! 
            Each rug is one of a kind and 100% handmade to exceed every customer's expectation. Ready?
          </p>
        </section>
        {/* CALL-TO-ACTION */}
        <section className="py-16 flex flex-col items-center text-center ">
          <p className="m-2">Love what we’re about? Checkout our rug to see which one you like!</p>
          <div className="flex my-8">
            <img 
            className="flex justify-start mx-4 h-10 w-10" 
            src="/assets/design/icons/Cross_Star_White.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <ShopBtn/>
          </div>
          <img className="w-full " src="/assets/design/logo/Banner_Blue_Logo_Phrase.webp" alt="" />
        </section>
    </main>
  )
}

import { Header } from "../../components/layout/_header"
import { ShopBtn } from "../../components/ui/buttons/btn_shop"
import { Shop } from "../Shop/shop"

export const About = () => {

  return (
    <main aria-label="About Me Page">
      <Header
        title="About Me"
        tagline="Learn what Rugly Barnacle is about!"
        img="/assets/design/logo/RuglyBarnacle_Logo.webp"
        img_alt="Rugly Barnacle Logo"/>
        <section>
          <h1>What is Rugly Barnacle</h1>
          <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/Cross_Star_White.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
        </section>
        <section>
          <p>
            Hi! I'm Emilie, the tuft broad behind the Rugly Barnacle!
            Tufting rugs started as a COVID hobby and quickly became my absolute passion and business. 
            Every Rugly Barnacle piece is a celebration of the fandom community — because it's for the fan, by the fan.
            So, if you're looking for a custom rug that's made just for you, look no further! 
            Let me bring your favorite character, symbol, logo, art piece or any design of your wildest dream to life in rug form! 
            Each rug is one of a kind and 100% handmade to exceed every customer's expectation. Ready?
          </p>
        </section>
        <section className="py-16">
          <p>Love what we’re about? Checkout our rug to see which one you like!</p>
          <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/Cross_Star_White.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <ShopBtn/>
          <img src="/assets/design/logo/Banner_Blue_Logo_Phrase.png" alt="" />
        </section>
    </main>
  )
}

import { Header } from "../../components/layout/_header"
import { StartOrderBtn , Emailbtn} from "../../components/ui/buttons/index"

export const Contact = () => {

  return (
    <main aria-label="Contact Page" className="md:pb-20">
      <Header
        img="/gallery/Product_Display_Pokemon_2.jpg"
        img_alt=""
        title="Contact"
        tagline="Let's keep in touch!"
        
        />
        {/* TITLE */}
        <section className="flex flex-col items-center text-center"> 
          <img 
          className="flex justify-start h-14 w-14" 
          src="/assets/design/icons/X_Star_Pink.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <h1 className="heading_text "> Contacts </h1>
        </section>
        {/* CONTENT */}
        <section className="flex flex-col gap-6 text-center pb-20">
          <div className="flex flex-col gap-6 justify-center items-center">
            <p className="underline subheading_text">Email Address:</p>
            <Emailbtn/>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p>Looking to create a custom rug?</p>
            <StartOrderBtn />
          </div>
        </section>
    </main>
  )
}

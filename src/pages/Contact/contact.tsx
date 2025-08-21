import { Header } from "../../components/layout/_header"
import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder"
import { Emailbtn } from "../../components/ui/buttons/btn_copyEmail"

export const Contact = () => {

  return (
    <main aria-label="Contact Page" className="">
      <Header
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
        <section className="flex flex-col gap-6 text-center mb-20">
          <div className="">
            <p>Call number</p>
            <p>218-312-2133</p>
          </div>
          <div className="flex flex-col gap-6 justify-center items-center">
            <p>Email Address</p>
            <Emailbtn />
          </div>
          <div>
            <p>Looking to create a custom rug?</p>
            <StartOrderBtn />
          </div>
        </section>
    </main>
  )
}

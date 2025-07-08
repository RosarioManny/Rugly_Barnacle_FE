import { Header } from "../../components/layout/_header"
import { StartOrderBtn } from "../../components/ui/btn_startOrder"
import { ContactUsBtn } from "../../components/ui/btn_contactUs"

export const Home = () => {

  return (
    <>
      <Header
      title="Where you dream design becomes a rug reality"
      tagline="Begin your dream rug!"
      btn_1={<StartOrderBtn/>}
      btn_2={<ContactUsBtn/>}
      img="/assets/Logo/RuglyBarnacle_Logo.webp"
      img_alt="Rugly Barnacle Logo"
      ></Header>
      <section>
        <div>
          <ul>
          </ul>
        </div>
      </section>
      <h1  className="text-breeze">
        I am the home page 🏠
      </h1>
    </>
  )
}

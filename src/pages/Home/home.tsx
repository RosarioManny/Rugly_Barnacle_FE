import { Header } from "../../components/layout/_header"
import { StartOrderBtn } from "../../components/ui/Btn_StartOrder"
import { ContactUsBtn } from "../../components/ui/btn_contactUs"
import { CategoryCard } from "../../components/ui/categoryCard"
import { CartIcon, HeartIcon, RugIcon, SmileyfaceIcon, StarIcon } from "../../components/icons-svgs/SvgIcons"
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
            <CategoryCard 
            svg={ <HeartIcon className="text-majorelle"/>}
            svg_alt="Heart Svg"
            description="I am the heart Icon"/>
            <CategoryCard 
            svg={ <SmileyfaceIcon className="text-majorelle"/>}
            svg_alt="Heart Svg"
            description="I am the Smile Icon"/>
            <CategoryCard 
            svg={ <StarIcon className="text-majorelle"/>}
            svg_alt="Heart Svg"
            description="I am the Star Icon"/>
            <CategoryCard 
            svg={ <RugIcon className="text-majorelle"/>}
            svg_alt="Heart Svg"
            description="I am the Rug Icon"/>
          </ul>
        </div>
      </section>
      <h1  className="text-breeze">
        I am the home page 🏠
      </h1>
    </>
  )
}

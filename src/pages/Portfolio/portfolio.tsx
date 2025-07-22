import { Header } from "../../components/layout/_header"
interface imageInfoProps {
  path: string,
  alt: string
}
export const Portfolio = () => {

  const imageInfo: imageInfoProps[] = [
    {path: "/products/rugs/Showcase_Gengar.webp", alt: ""},
    {path: "/products/rugs/Showcase_AllThat.webp", alt: ""},
    {path: "/products/rugs/Rug_Naruto.webp", alt: ""},
    {path: "/products/rugs/Custom_Portrait_Closeup.webp", alt: ""},
    {path: "/products/rugs/Custom_JLY.webp", alt: ""},
  ]
  return (
    <main aria-label="Portfolio Page">
      <Header
      title="Portfolio"
      img="/products/rugs/Showcase_AllThat.webp"
      img_alt="TV show All that logo rug"
      ></Header>
      <section>
        <h1 className="heading_text"> 
          Designs 
        </h1>
        <p>
          Step into my tufted universe—where Pokémon pals, sports showdowns, and wild personal creations burst off the floor in rug form! 
          Every piece here (from mirror rugs that jazz up your walls to mug rugs that cozy up your coffee) is handmade with obsessive love for fandoms and
          one-of-a-kind ideas. Whether you're here to browse Snorlax rugs or dream up a custom design that'll make your friends gasp, this gallery proves no
          idea is too nerdy, niche, or wonderfully weird to bring to life in yarn!
        </p>
      </section>
      <section>
        <ul className="grid grid-cols-2 md:grid-cols-3">
          { imageInfo.map(({path, alt }, idx) => (
            <li className="w-full h-58 overflow-hidden" key={`${idx}-${alt}`}>
              <img 
                className="object-cover w-full h-full" 
                src={path} 
                alt={alt} 
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

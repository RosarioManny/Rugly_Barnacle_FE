import { Header } from "../../components/layout/_header"
interface imageInfoProps {
  path: string,
  alt: string
}
export const Portfolio = () => {

  const imageInfo: imageInfoProps[] = [
    {path: "", alt: ""},
    {path: "", alt: ""},
    {path: "", alt: ""},
    {path: "", alt: ""},
    {path: "", alt: ""},
  ]
  return (
    <main aria-label="Portfolio Page">
      <Header
      title="Portfolio"
      img="/products/rugs/Showcase_AllThat.webp"
      
      ></Header>
      <section>
        <h1> Designs </h1>
        <p>
          Step into my tufted universe—where Pokémon pals, sports showdowns, and wild personal creations burst off the floor in rug form! 
          Every piece here (from mirror rugs that jazz up your walls to mug rugs that cozy up your coffee) is handmade with obsessive love for fandoms and
          one-of-a-kind ideas. Whether you're here to browse Snorlax rugs or dream up a custom design that'll make your friends gasp, this gallery proves no
          idea is too nerdy, niche, or wonderfully weird to bring to life in yarn!
        </p>
      </section>
    </main>
  )
}

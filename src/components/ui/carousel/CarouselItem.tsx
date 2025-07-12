import { Link } from "react-router-dom"

interface CardProps {
  img: string,
  title: string,
  link: string
}

export const CarouselItem = ({ img, title, link }: CardProps) => {
  return (
    <>
    <div className="card_item_container size-90 ">
      <Link 
      to={`/${link}`}
      className="size-full">
        <img 
        className="rounded object-cover w-full h-full m-2" 
        src={img}
        alt="" />
      </Link>
      <p className="heading_text"> { title } </p>
    </div>
    </>
  )
}
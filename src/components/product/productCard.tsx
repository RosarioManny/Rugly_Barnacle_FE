import { Link } from "react-router-dom"

interface ProductCardProps {
  id: number,
  path: string,
  price: number,
  title: string,
  img_alt: string,
  dimensions: string,
  genre: string,
}
export const ProductCard = ({ id, path, price, title, img_alt, dimensions, genre }: ProductCardProps) => {
  return (
    <Link to={`/shop/${id}`}>
      <li
        className="
          group transform-color duration-[300ms] 
          hover:text-majorelle focus:text-majorelle active:text-majorelle
          hover:outline-robin_egg focus:outline-robin_egg active:outline-robin_egg 
          outline-solid outline-3 outline-majorelle 
          rounded-2xl w-full"
        aria-label={`${title} product card`}
      >
        {/* Product Content */}
        <div>
          <img className="rounded-t-2xl" src={path} alt={img_alt} />
          {/* Product Info */}
          <div className="p-2">
            <p className="font-semibold transform-color duration-[300ms]"> { title }</p>
            <p> { dimensions }</p>
            <p className="text-majorelle/70"> Genre: { genre }</p>
          </div>
          <div className="flex justify-end px-4 font-bold">
            <p>${price}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
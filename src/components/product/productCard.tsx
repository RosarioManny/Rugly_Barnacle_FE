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
      className="border-solid border-3 border-majorelle rounded-2xl w-full"
      aria-label={`${title} product card`}>
        <div>
          <img className="overflow-hidden"src={path} alt={img_alt} />
          {/* Product Info */}
          <div>
            <p className="font-black"> { title }</p>
            <p> { dimensions }</p>
            <p className="text-majorelle/70"> Genre: { genre }</p>
          </div>
          <p>$ {price} </p>
        </div>
      </li>
    </Link>
  )
}
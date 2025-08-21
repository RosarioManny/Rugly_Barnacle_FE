import { Link } from "react-router-dom"

interface ProductCardProps {
  id: number,
  path: string,
  price: number,
  title: string,
  img_alt: string,
  dimensions: string,
  category: string,
}
export const ProductCard = ({ id, path, price, title, img_alt, dimensions, category }: ProductCardProps) => {
  return (
    <Link to={`/shop/${id}`}>
      <li
        className="
          group transform-color duration-[300ms] 
          hover:text-majorelle focus:text-majorelle active:text-majorelle
          hover:outline-robin_egg focus:outline-robin_egg active:outline-robin_egg 
          outline-solid outline-3 outline-majorelle 
          rounded-2xl max-h-72 h-72 flex flex-col overflow-hidden"
        aria-label={`${title} product card`}
      >
        {/* Product Content */}
        <div className="rounded-t-xl flex-1 relative overflow-hidden">
          <img 
          className="w-full h-[50%] object-cover group-hover:scale-105 transition-transform duration-300" 
          src={path}
          alt={img_alt} 
          loading="lazy"
          />
          {/* Product Info */}
          <div className="p-2 flex flex-col gap-1">
            <p className="font-semibold transform-color duration-[300ms] truncate"> { title }</p>
            <p> { dimensions }</p>
            <p className=""> Category: { category }</p>
          </div>
          <div className="flex justify-end m-2">
            <p className="font-bold text-majorelle">${price}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
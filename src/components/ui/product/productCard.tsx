import { Link } from "react-router-dom"

interface ProductCardProps {
  id?: number,
  path?: string,
  price: number,
  name: string,
  img_alt?: string,
  dimensions: string,
  category: string,
  quantity: number,
}
export const ProductCard = ({ id, path, price, name, img_alt, dimensions, category, quantity }: ProductCardProps) => {
  return (
    <Link to={`/shop/${id}`}>
      <li
        className="
          text-space_cadet
          group transform-color duration-[300ms] 
          hover:text-majorelle focus:text-majorelle active:text-majorelle
          hover:outline-robin_egg focus:outline-robin_egg active:outline-robin_egg 
          outline-solid outline-2 outline-majorelle 
          rounded-xl max-h-72 h-72 flex flex-col overflow-hidden"
        aria-label={`${name} product card`}
      >
        {/* Product Content */}
        <div className=" rounded-t-xl flex-1 relative overflow-hidden">
          <img 
          className="w-full h-[50%] object-cover group-hover:scale-105 transition-transform duration-300" 
          src={path}
          alt={img_alt} 
          loading="lazy"
          />
          {/* Product Info */}
          <div className="p-2 text-[.9rem] flex flex-col body_text">
            <p className="font-medium transform-color duration-[300ms] truncate"> { name }</p>
            <p> { dimensions }</p>
            <p className="text-majorelle">{ category }</p>
          </div>
          <div className="flex justify-end items-center m-2">
            {quantity ? (
              <p className="font-bold text-sm ">${price}</p> 
            ) : (
              <p className="font-bold text-bittersweet">SOLD</p>
            )
            }
          </div>
        </div>
      </li>
    </Link>
  )
}
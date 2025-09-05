import type { CartItem } from "../../../lib/api/Cart/cartServices"
import { TrashIcon } from "../icons-svgs/SvgIcons"

// id: number;
// product: number;
// product_name: string;
// product_price: string;
// quantity: number;
// subtotal: number;
// added_at: string;
export const OccupiedCart = ({ 
  product_name, 
  product_price, 
  quantity, 
  added_at, 
  product,
  dimensions,
  }: 
  CartItem ) => {
  
  return ( 
    <li className="flex flex-col gap-4 w-fit h-fit justify-center py-4 ">
      <div className="w-full md:mx-4 flex flex-col justify-between">
        <img 
          className="w-full h-40 md:size-48 rounded-md min-w-40 object-cover "
          src="/products/rugs/Showcase_Gengar.webp" 
          alt={product_name} />
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm md:text-xl" >{product_name}</p>
            <p>{dimensions}</p>
          </div>
          <TrashIcon className="size-9 text-bittersweet"/>
        </div>
        <div className="flex md:justify-between">
          <p className="text-sm">Quantity: {quantity} </p>
          <p className="font-semibold md:text-xl">${product_price}</p>
          {/* <p>{added_at}</p> */}
        </div>
      </div>
    </li>
  )
}
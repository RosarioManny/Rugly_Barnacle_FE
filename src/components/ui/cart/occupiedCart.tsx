import type { CartItem } from "../../../lib/api/Cart/cartServices"
import { TrashIcon } from "../icons-svgs/SvgIcons"
import { formatCartDate } from "../../../lib/utils/dateFormtater" // Create this utility

export const OccupiedCart = ({ 
  product_name, 
  product_price, 
  quantity, 
  added_at, 
  dimensions,
}: CartItem) => {
  
  return ( 
    <li className="flex flex-col md:flex-row gap-4 p-4 md:p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img 
          className="w-full h-40 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-lg object-cover shadow-sm"
          src="/products/rugs/Showcase_Gengar.webp" 
          alt={product_name} 
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Top Section - Product Info */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base md:text-lg lg:text-xl text-gray-900 truncate">
              {product_name}
            </h3>
            {dimensions && (
              <p className="text-sm text-gray-600 mt-1">{dimensions}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Added: {formatCartDate(added_at)}</p>
          </div>
          
          {/* Delete Button */}
          <button 
            className="flex-shrink-0 p-2 hover:bg-red-50 rounded-full transition-colors duration-200 group"
            aria-label={`Remove ${product_name} from cart`}
          >
            <TrashIcon className="size-6 md:size-7 text-bittersweet group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* Bottom Section - Quantity and Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-base text-gray-700">Qty: {quantity}</span>
            {/* Quantity Controls - Optional */}
            {/* <div className="flex  items-center gap-2">
              <button className="w-6 h-6  text-space_cadet rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm">
                -
              </button>
              <button className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm">
                +
              </button>
            </div> */}
          </div>
          
          <p className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900">
            ${(parseFloat(product_price) * quantity).toFixed(2)}
          </p>
        </div>

        {/* Unit Price */}
        <p className="text-sm text-gray-600 text-right mt-1">
          ${product_price} each
        </p>
      </div>
    </li>
  )
}
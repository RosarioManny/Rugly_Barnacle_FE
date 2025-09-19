import type { CartItem } from "../../../lib/api/Cart/cartServices"
import { TrashIcon } from "../icons-svgs/SvgIcons"
import { formatCartDate } from "../../../lib/utils/dateFormtater" 
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface OccupiedCartProps extends CartItem {
  onRemove?: (productId: number) => void;
}

export const OccupiedCart = ({ 
  product_name, 
  product_price, 
  quantity, 
  added_at, 
  dimensions,
  product,
  id,
  onRemove
}: OccupiedCartProps) => {

  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    e.preventDefault();
    
    try {
      setIsRemoving(true);
      if (onRemove) {
        await onRemove(product);
      }
    } catch(err) {
      console.error("Failed to remove item", err);
    } finally {
      setIsRemoving(false);
    }
  }

  const handleCardClick = () => {
    navigate(`/shop/${product}`);
  }

  return ( 
    <li 
      className="
        flex flex-col md:flex-row gap-4 
        p-4 md:p-6 mb-2 rounded-md 
        border-2 border-space_cadet/5
        hover:bg-majorelle/10 hover:scale-101
        transition-all duration-500
        cursor-pointer relative 
      "
      onClick={handleCardClick}
    >
      {/* Product Image with overlay link */}
      <div className="flex-shrink-0 relative">
        <img 
          className="w-full h-40 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-lg object-cover shadow-sm"
          src="/products/rugs/Showcase_Gengar.webp" 
          alt={product_name} 
        />
        {/* Invisible overlay for better click target */}
        <div className="absolute inset-0 cursor-pointer"></div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Top Section - Product Info */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div 
            className="min-w-0 flex-1 cursor-pointer"
            onClick={handleCardClick}
          >
            <h3 className="font-semibold w-auto text-base md:text-lg lg:text-xl text-space_cadet truncate">
              {product_name}
            </h3>
            {dimensions && (
              <p className="text-sm text-space_cadet mt-1">{dimensions}</p>
            )}
            <p className="text-xs text-space_cadet/50 mt-1"> Item id: {id}</p>
            <p className="text-xs text-space_cadet/50 mt-1">Added: {formatCartDate(String(added_at))}</p>
          </div>
          
          {/* Delete Button - Positioned absolutely to avoid link conflicts */}
          <button 
            className="
              group
              absolute 
              md:top-4 md:right-2 z-10 top-3 right-3
              cursort-pointer rounded-full 
              p-1.5 outline-1 outline-bittersweet 
              bg-space_cadet 
              md:bg-transparent
              transition-all duration-200 
              hover:bg-bittersweet/20 hover:scale-110
            
            "
            aria-label={`Remove ${product_name} from cart`}
            onClick={handleRemove}
          >
            {isRemoving ? 
              <p className="text-xs">Removing...</p> 
              : 
              <TrashIcon 
                className="
                size-6 md:size-7 
                text-bittersweet 
                transition-transform duration-200" 
              /> 
            }
          </button>
        </div>

        {/* Bottom Section - Quantity and Price */}
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-base text-space_cadet/70">Qty: {quantity}</span>
          </div>
          
          <p className="font-bold text-lg md:text-xl lg:text-2xl text-majorelle">
            ${(parseFloat(product_price) * quantity).toFixed(2)}
          </p>
        </div>

        {/* Unit Price */}
        <p 
          className="text-sm text-midnight_green text-right mt-1 cursor-pointer"
          onClick={handleCardClick}
        >
          ${product_price} each
        </p>
      </div>
    </li>
  )
}
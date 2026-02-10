import { StartOrderBtn, ShopBtn } from "../../../components/ui/buttons";
import type { CartItem } from "../../../lib/api/Cart/cartServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCartDate } from "../../../lib/utils/dateFormtater";
import { TrashIcon } from "../../../components/ui/icons-svgs/SvgIcons";

export const EmptyCart = () => {
  return ( 
    <div className="flex flex-col gap-4 justify-center items-center my-4">
      <p className="text-lg font-semibold">Your cart is empty</p>
      <p className="text-sm font-medium text-space_cadet/80">Let's get you started!</p>
      <div className="flex gap-3 items-center mt-2">
        <StartOrderBtn />
        <ShopBtn />
      </div>
    </div>
  )
}

// Occupied Cart Component
interface OccupiedCartProps extends CartItem {
  onRemove: (cartItemId: number) => void;
  onAdd: (cartItemId: number) => void;
}

export const OccupiedCart = ({ 
  product_name, 
  product_price, 
  quantity, 
  added_at, 
  dimensions,
  product,
  id, // This is the cart_item_id
  product_images,
  onRemove,
  onAdd
}: OccupiedCartProps) => {

  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }

  const getImageUrl = (relativePath: string) => {
    const baseUrl = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://localhost:8000';
    return `${baseUrl}${relativePath}`
  }

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when removing
    e.preventDefault();
    
    if (!id || !onRemove) {
      console.error('Cannot remove: missing id or onRemove handler');
      return;
    }
    
    try {
      console.log('Removing cart item ID:', id);
      setIsRemoving(true);
      await onRemove(id); // Pass the cart item ID (not product ID)
    } catch (error) {
      console.error('Remove failed:', error);
    } finally {
      setIsRemoving(false);
    }
  };

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
      <div className={`flex-shrink-0 relative `} >
        { product_images?.primary && !imageError ? (
          <img 
            className="
              w-full h-40 
              md:h-32 md:w-32 lg:h-40 lg:w-40 
              rounded-lg object-cover shadow-sm"
            onError={handleImageError}
            src={getImageUrl(product_images?.primary)}  
            alt={product_name} 
          />
        ) : (
          <>
            <img 
              className="
                py-2
                opacity-80
                bg-majorelle/60
                w-full h-40 
                md:h-32 md:w-32 lg:h-40 lg:w-40 
                rounded-lg object-contain shadow-sm"
              src="/assets/design/logo/Rugly_Barnacle_192x192.png" 
              alt="Rugly Barnacle R & B Logo - Product image unavailable" 
            />
          </>
        )}
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
            <h3 className="font-semibold w-[90%] text-base md:text-lg lg:text-xl text-space_cadet truncate">
              {product_name}
            </h3>
            {dimensions && (
              <p className="text-sm text-space_cadet mt-1">{dimensions}</p>
            )}
            <p className="text-xs text-space_cadet/50 mt-1">Item #: {id}</p>
            <p className="text-xs text-space_cadet/50 mt-1">Added: {formatCartDate(String(added_at))}</p>
          </div>
          
          {/* Delete Button */}
          <button 
            className="
              group
              absolute 
              z-10 top-4 right-4
              cursor-pointer rounded-full 
              p-1.5
              transition-all duration-200 
              hover:bg-bittersweet/80 hover:scale-110
            "
            aria-label={`Remove ${product_name} from cart`}
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? 
              <p className="text-xs">Removing...</p> 
              : 
              <TrashIcon 
                className="
                  size-6 md:size-7 
                  text-space_cadet 
                  transition-transform duration-200
                  group-hover:text-white
                " 
              /> 
            }
          </button>
        </div>

        {/* Bottom Section - Quantity and Price */}
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="flex items-center gap-2">
  <button
    onClick={(e) => { e.stopPropagation(); onRemove(id); }}
    className="
      w-7 h-7 flex items-center justify-center
      rounded-full border border-space_cadet/20
      hover:bg-bittersweet/80 hover:text-white hover:border-transparent
      transition-all duration-200 text-space_cadet font-bold
    "
    aria-label="Remove one"
  >
    −
  </button>

  <span className="text-sm md:text-base text-space_cadet/70 w-6 text-center">
    {quantity}
  </span>

  <button
    onClick={(e) => { e.stopPropagation(); onAdd(id); }}
    className="
      w-7 h-7 flex items-center justify-center
      rounded-full border border-space_cadet/20
      hover:bg-majorelle hover:text-white hover:border-transparent
      transition-all duration-200 text-space_cadet font-bold
    "
    aria-label="Add one"
  >
    +
  </button>
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
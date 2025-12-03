import { Link } from 'react-router-dom'

import { SuccessCheckmark } from '../../../components/ui/icons-svgs/SvgIcons'

export const CheckoutSuccessPage = () => {
  return (
    <main className="min-h-screen py-8" aria-label="Checkout Page">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center justify-center h-[80vh]">
        <div className="flex pl-10 w-full justify-start">
          <img 
            className="star-fade-animation mt-6 h-10 w-10" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <SuccessCheckmark className="text-midnight_green/80 size-16 mx-auto mb-4" />
          <h2 className="font-bold text-space_cadet/90 mb-4">Thank you for your purchase!</h2>
          <p className="text-space_cadet/60 mb-6">Your order has been successfully processed.</p>
          <Link 
            to="/shop" 
            className=""
          >
            <button className='
            px-6 py-2 font-semibold 
            bg-majorelle text-white rounded-lg 
            hover:bg-robin_egg hover:scale-105 transition-all'>
              Continue Shopping
            </button>
          </Link>
        </div>
        <div className="flex pr-8 w-full justify-end">
          <img 
            className="star-fade-animation flex align-start h-10 w-10" 
            src="/assets/design/icons/Cross_Star_Pink.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
        </div>
      </div>
    </main>
  )
}
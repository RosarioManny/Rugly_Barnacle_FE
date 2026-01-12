import { Link } from 'react-router-dom'

import { DangerIcon } from '../../../components/ui/icons-svgs/SvgIcons'

export const CheckoutCancelPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-8" aria-label="Checkout Page">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <DangerIcon className='text-bittersweet/90 size-16 mx-auto mb-4'/>
          <h2 className="font-bold text-space_cadet/90 mb-4">There was an issue with your purchase.</h2>
          <p className="text-space_cadet/60 mb-6">Your order was unsuccessfully. </p>
          <div className='flex space-x-4 justify-center'>
            <Link 
              to="/shop" 
              >
              <button className='
              px-6 py-2 font-semibold 
              bg-majorelle text-white rounded-lg 
              hover:bg-robin_egg hover:scale-105 transition-all'>
                Back to Shop
              </button>
            </Link>
            <Link 
              to="/cart" 
              >
              <button className='
              px-6 py-2 font-semibold 
              bg-majorelle text-white rounded-lg 
              hover:bg-robin_egg hover:scale-105 transition-all'>
                View Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
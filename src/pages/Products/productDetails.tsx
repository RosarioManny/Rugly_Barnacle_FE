import { useState, useEffect, useMemo } from "react"
import { useParams, Link } from "react-router-dom"
// API
import { getProduct, type Product } from "../../lib/api/Product/productservices"
import { getProperties, type Property } from "../../lib/api/Property/properties"
// COMPONENTS
// import { Spinner } from "../../components/ui/loaders/loadingSpinner"
import { DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"
import { AddToCartBtn } from "../../components/ui/buttons/btn_addToCart"
import { LoadingPage } from "../../components/layout/loadingPage"
import { li } from "framer-motion/client"


export const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [status, setStatus] = useState< 'loading' | 'error' | 'success' | 'idle' >('loading')
  const [cartMessage, setCartMessage] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  
  // useParams returns an object, you need to extract the id
  const { id } = useParams<{ id: string }>()

  // Fetch all properties
  const fetchProperties = async () =>{
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
      return [];
    }
  }

  // Fetch product details by ID
  const fetchProduct = async (productId: string) => {
    try {
      setStatus('loading')

      const numericId = Number(productId);

      const data = await getProduct(numericId) 

      setProductDetails(data)
    } catch (err) {
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  }

  // Handlers for Add to Cart button callbacks
  const handleCartMessage = (message: string, isError: boolean) => {
    setCartMessage(message)
    setTimeout(() => { setCartMessage(null)}, isError ? 5000 :3000)
  }

  // Image error handler
  const handleImageError = () => {
    setImageError(true)
  }

  // Fetch product details when component mounts or id changes
  useEffect(() => {
    if (id) {
      fetchProperties()
      fetchProduct(id)
    } else {
      console.log(productDetails)
      setStatus('error')
    }
  }, [id])

  const productProperties = useMemo(() => {
  if (!productDetails?.properties || properties.length === 0) return [];

  return productDetails.properties
    .map(propId => properties.find(prop => prop.id === propId))  // propId is a number, not an object
    .filter((prop): prop is Property => prop !== undefined);
}, [productDetails?.properties, properties]);

console.log('Properties:', properties);
console.log('Product Properties IDs:', productDetails?.properties);
console.log('Mapped Properties:', productProperties);
  if (status === 'loading') return <LoadingPage />;

  
  if (status === 'error' || productDetails === null) {
    return ( 
      <main className="min-h-screen bg-gray-50 py-8" aria-label="Checkout Page">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center justify-center h-[80vh]">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <DangerIcon className='text-bittersweet/90 size-16 mx-auto mb-4'/>
            <h2 className="font-bold text-space_cadet/90 mb-4">Unable to find item</h2>
            <p className="text-space_cadet/60 mb-6">The item does not exist or an error occured.</p>
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

  return (
    <main className="md:mx-20 m-4 mb-96 h-[100vh]" aria-label={`${productDetails.name} details page`}>
      {cartMessage && (
        <div className={`
          fixed top-4 right-4 p-4 rounded-md z-50 
          ${ cartMessage.includes("error") || cartMessage.includes("Error") ? 
            "bg-bittersweet text-white" 
            : 
            "bg-robin_egg top-20 text-space_cadet"
        }`}>
          {cartMessage}
        </div>
      )}
      <section aria-label="Product Infomation" className="h-fit">
        <Link 
          className="
          object-fit
          group pointer duration-200  transform pb-3
          transition-color hover:text-bittersweet 
          flex gap-2 items-center" 
          to='/shop'>
          <div className={`
            caret-left text-space_cadet
            duration-200
            group-hover:text-bittersweet 
            text-fleece body_text 
            `} 
          />
          Back 
        </Link>
        <div className="flex overflow-hidden gap-4 justify-center">
          <img 
            className="md:flex align-start h-8 w-8 mt-2 hidden" 
            src="/assets/design/icons/Cross_Star_White.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" 
          />
          <div className="bg-white h-auto min-h-[25vh] max-h-[50vh] flex items-center justify-center rounded-lg ">
            { productDetails.images && productDetails.images.length > 0 && !imageError ? (
              <img 
              className="object-cover p-2 max-h-[50vh] h-90 rounded-lg "
              src={productDetails.images?.[0].image}
              alt=""
              onError={handleImageError}
              />
              ) : (
              <div className="p-2 flex flex-col justify-center text-center items-center">
                <img 
                  className="opacity-90 size-3/4 my-5 object-cover"
                  src="/assets/design/logo/RuglyBarnacle_Logo.webp" 
                  alt="Rugly Barnacle Full Logo - Product image unavailable" 
                />
                <p className="font-semibold   text-lg text-majorelle object-cover h-full w-full">
                  Image coming Soon!
                </p>
              </div>
              )
            }
          </div>
        </div>
        <div className="body_text flex justify-start flex-col my-4">
          <h2 className="font-bold ">{productDetails.name}</h2>
          <p className="font-light text-majorelle"> Tufted {productDetails.category.name}</p>
          <p className="text-majorelle text-[1.2rem] font-black">${productDetails.price}</p>
          <div className="flex gap-2">
            <p className="font-bold">Dimensions: </p>
            <p className=""> {productDetails.dimensions}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">In Stock: </p>
            <p className=""> 

              {productDetails.quantity }
            </p>
          </div>
        </div>
        {/* Display properties */}
        {productProperties.length > 0 && (
          <div>
            <h3>Properties:</h3>
            <ul>
              {productProperties.map((prop) => (
                <li key={`property-${prop.id}`} className="body_text">
                  {prop.display_name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex w-full justify-center">
          <AddToCartBtn 
            isAvailable={productDetails.quantity > 0}
            productId={Number(id)}
            quantity={1}
            onSuccess={() => handleCartMessage("Item added to cart!", false)}
            onError={(error) => handleCartMessage(error, true)}
          />
        </div>
      </section>
      <section className="h-fit my-4 flex flex-col gap-4">
        <img 
          className="flex align-start h-8 w-8 mt-2" 
          src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
          />
        <div >
          <p className="subheading_text font-semibold underline">Item Description: </p>
          <p> {productDetails.description}</p>
        </div>
        <div>
          <p className="subheading_text font-semibold underline">Shipping: </p>
          <p> 
            Shipping is dependent on product type and customer selection. 
            Most items are not free shipping.
          </p>
        </div>
        <div>
          <p className="subheading_text font-semibold underline">Return Policy: </p>
          <p>  
            There no return policy for Rugly Barnacle products. 
            This applies to both custom and premade products. 
            All sales final upon completion. 
          </p>
        </div>
      </section>
    </main>
  )
}
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
// API
// import { useCart } from "../../hooks/useCart"
import { getProduct } from "../../lib/api/Product/productservices"
import type { Product } from "../../lib/api/Product/productservices"
// COMPONENTS
import { Spinner } from "../../components/ui/loaders/loadingSpinner"
import { DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"
import { AddToCartBtn } from "../../components/ui/buttons/btn_addToCart"

export const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [status, setStatus] = useState< 'loading' | 'error' | 'success' | 'idle' >('idle')
  const [cartMessage, setCartMessage] = useState<string | null>(null)

  // useParams returns an object, you need to extract the id
  const { id } = useParams<{ id: string }>()

  // console.log("Cookie >", document.cookie)
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

  const handleSuccessMsg = () => {
    setCartMessage("Item added to cart successfully!");
    setTimeout(() => setCartMessage(null), 3000); // Clear message after 3 seconds
  };

  const handleErrorMsg = (error: string) => {
    setCartMessage(error);
    setTimeout(() => setCartMessage(null), 5000); // Clear message after 5 seconds
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    } else {
      console.log(productDetails)
      setStatus('error')
    }
  }, [id]) // Add id as dependency  

  useEffect(() => {
    productDetails ? console.log("Got it!", productDetails ) : console.log("Empty Array", productDetails)
  }, [productDetails])

  if (status === 'loading') return <Spinner />
  
  if (status === 'error' || productDetails === null) {
    return ( 
      <div className=" h-[100vh] justify-center flex flex-col gap-5 items-center">
        <DangerIcon className="text-bittersweet"/>
        <div className="error-message text-bittersweet font-bold">Unable to find Item. Check back soon! </div>
      </div>)
  }

  return (
    <main className="md:mx-20 m-4 mb-20 h-fit" aria-label={`${productDetails.name} Details Page`}>
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
        <Link className="group pointer duration-200 transform transition-all hover:text-bittersweet flex gap-2 items-center" to='/shop'>
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
          <div className="bg-white h-auto min-h-[20vh] max-h-[50vh] flex items-center justify-center rounded-lg ">
            { productDetails.images ? (
              <img 
              className="object-cover p-2 "
              src={productDetails.images?.[0]}
              alt="" />
            ) : (
              <img 
              className="object-cover p-2 "
              src="/products/rugs/Custom_Thumper.webp" 
              alt="" />
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
        {productDetails.properties && productDetails.properties.length > 0 && (
          <div>
            <h3>Properties:</h3>
            <ul>
              {productDetails.properties.map((property: { id: number, display_name: string }) => (
                <li key={`property-${property.id}`}> {property.display_name}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex w-full justify-center">
          <AddToCartBtn
            quantity={1}
            product_id={productDetails.id}
            onError={handleErrorMsg}
            onSuccess={handleSuccessMsg}
          />
        </div>
        {/*TODO: Add to Cart Btn */}
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
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../lib/api/Product/productServices"
import type { Product } from "../../lib/api/Product/productServices"
import { Spinner } from "../../components/ui/loaders/loadingSpinner"

export const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // useParams returns an object, you need to extract the id
  const { id } = useParams<{ id: string }>()
  
  // console.log("URL Parameter id:", id); 

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      // console.log("Starting fetch for product ID:", productId);

      const numericId = Number(productId);
      // console.log("Numeric ID:", numericId);

      const data = await getProduct(numericId) 
      // console.log("API Response Data:", data);

      setProductDetails(data)
    } catch (err) {
      setError("Failed to fetch product")
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (id) {
      fetchProduct(id)
    } else {
      setError("Product ID not found")
    }
  }, [id]) // Add id as dependency

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return ( 
      <div className=" h-[100vh] justify-center flex flex-col gap-5 items-center">
        <div className="error-message">Error: {error}</div>
      </div>)
  }
  console.log(productDetails)
  if (productDetails === null) {
    return (
      <div className=" h-[100vh] justify-center flex flex-col gap-5 items-center">
        <p>Product not found</p>
      </div>
      )
  }
  
  return (
    <main aria-label={`${productDetails.name} Details Page`}>
      <div>
        <img 
          className="flex align-start h-8 w-8" 
          src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
        />
        <h1>{productDetails.name}</h1>
        <p>Price: ${productDetails.price}</p>
        <p>Description: {productDetails.description}</p>
        <p>Dimensions: {productDetails.dimensions}</p>
        <p>Category: {productDetails.category.name}</p>
        
        {/* Display properties */}
        {productDetails.properties && productDetails.properties.length > 0 && (
          <div>
            <h3>Properties:</h3>
            <ul>
              {productDetails.properties.map(property => (
                <li key={property.id}>{property.display_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
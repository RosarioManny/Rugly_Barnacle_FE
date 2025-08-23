import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../lib/api/Product/productservices"

export const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  let productId: number = useParams()
  
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(productId)
      setProductDetails(data)
    } catch(err) {
      setError("Failed to fetch product")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])
  
  return (
    <main aria-label="Demo Name Detail's Page">
      <div>
      <img 
        className="flex align-start h-8 w-8" 
        src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
        aria-hidden="true" 
        alt="Cross Star Design Marker" />
       {/* { productDetails.name } */}
      </div>
    </main>
  )
}
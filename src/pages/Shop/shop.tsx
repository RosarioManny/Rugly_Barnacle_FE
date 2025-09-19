import { DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { ProductCard } from "../../components/ui/productCard"
import { getProducts } from "../../lib/api/Product/productservices"
import { StartOrderBtn, ReturnToTop } from "../../components/ui/buttons/index"
import type { Product } from "../../lib/api/Product/productservices"
import { Spinner } from "../../components/ui/loaders/loadingSpinner"
import { useState, useEffect, useRef} from "react"
import { useProductFilters } from "../../hooks/filter/useProductFilter"
import { FilterControls } from "../../components/ui/filter"
import { useParams } from "react-router-dom"


export const Shop = () => {
  const [products, setProducts ] = useState<Product[]>([])
  const [status, setStatus] = useState< 'loading' | 'error' | 'success' | 'idle' >('idle');
  const hasFetched = useRef(false)
  const { category: urlCategory } = useParams<{ category?: string }>();

  const {
    filteredProducts,
    filterState,
    filterFunctions,
    productCount,
    filteredCount
  } = useProductFilters(products);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setStatus('loading');
      const data = await getProducts()
      setProducts(data)
      setStatus('success');
    } catch(err) {
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  };

  // Extract unique categories for the filter
  const categories = Array.from(new Set(products.map(product => product.category.name)));

  // LOADING STATE
  if (status === 'loading') return <Spinner  />;
  
  // ERROR STATE
  if ( status === 'error') {
    return ( 
      <div className=" h-[100vh] mx-8 text-center justify-center flex flex-col gap-5 items-center">
        <DangerIcon className="text-bittersweet animate-pulse"/>
        <div className="error-message flex text-bittersweet font-bold">
          Error: 
            <br/> 
          Difficulty getting products. Check back soon!
        </div>
      </div>)
  }

  return (
    <main aria-label="Shop Page">
      {/* Filter Controls - Add this section */}
      <FilterControls
        filterState={filterState}
        filterFunctions={filterFunctions}
        productCount={productCount}
        filteredCount={filteredCount}
        categories={categories}
      />

      {/* Product Title - Updated to show filtered count */}
      <section className="flex flex-col justify-center py-10">
        <div className="flex justify-center">
          <img 
            className="flex align-start h-8 w-8" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <h1 className="heading_text">
              {filterState.selectedCategory === 'all' ? 'All Products' : filterState.selectedCategory.charAt(0).toUpperCase() + filterState.selectedCategory.slice(1)}
            </h1>
        </div>
        
        {/* Results count - Simplified since FilterControls already shows it */}
        <div className="text-center mt-4">
          <p className="font-semibold opacity-50"> 
            {filteredCount} {filteredCount === 1 ? 'Item' : 'Items'}
            {filteredCount !== productCount && ` of ${productCount}`}
          </p>
        </div>
      </section>

      {/* Product Listings - Use filteredProducts instead of products */}
      <section aria-label="product-listings">
        {filteredProducts.length > 0 ? (
          <ul className="md:mx-8 flex-shink-1 mx-2 grid grid-cols-2 md:gap-4 gap-2 md:grid-cols-3">
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={`${product.name}-${idx}`}
                id={product.id}
                price={product.price}
                name={product.name}
                dimensions={product.dimensions}
                category={product.category.name}
                quantity={product.quantity}
                image={product.images?.[0]?.image}
                img_alt={`${product.name}`}
              />
            ))}
          </ul>
        ) : (
          // No results message
          <div className="text-center mt-10 mb-22 md:mb-44">
            <p className="text-lg font-semibold text-space_cadet/60 mb-8">No products found matching your criteria.</p>
            <button
              onClick={filterFunctions.clearAllFilters}
              className="font-medium px-6 py-2 bg-majorelle text-white rounded-md hover:bg-majorelle-dark transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* Call To Action - Only show if there are products */}
      {filteredProducts.length > 0 && (
        <>
          <CtaWavesBg className="fill-mauve mt-20"/>
          <section className="bg-mauve flex flex-col text-center pb-40 gap-5 justify-center items-center">
            <img 
              className="flex align-start h-8 w-8 " 
              src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" />
              <p className="heading_text">Don't see what you're looking for?</p>
              <StartOrderBtn/>
              <p className="heading_text">Create your custom rug</p>
          </section>
        </>
      )}
      
      <ReturnToTop />
    </main>
  )
}
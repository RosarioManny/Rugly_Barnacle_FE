import { StickerSmileIcon, RoundRugIcon, StarIcon, BrushIcon, MugIcon, KeyboardIcon, MirrorIcon, DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { ProductCard } from "./productCard"
import { getProducts } from "../../lib/api/Product/productservices"
import { StartOrderBtn, ReturnToTop } from "../../components/ui/buttons/index"
import type { Product } from "../../lib/api/Product/productservices"
import { Spinner } from "../../components/ui/loaders/loadingSpinner"
import { useState, useEffect, useRef} from "react"
import type { FC, SVGProps } from "react"
import { useProductFilters } from "../../hooks/filter/useProductFilter"
import { FilterControls } from "../../components/ui/filter"

interface CategoryIconProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  alt: string;
  description: string;
}

export const Shop = () => {
  const [products, setProducts ] = useState<Product[]>([])
  const [status, setStatus] = useState< 'loading' | 'error' | 'success' | 'idle' >('idle');
  const hasFetched = useRef(false)

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
  
  const categoryIcons: CategoryIconProps[] = [
    {Icon: StarIcon, alt: "All Products Category Button - Star Icon", description: "All items"},
    {Icon: BrushIcon, alt: "Custom Rug Category Button - Brush Icon", description: "Custom rugs"},
    {Icon: RoundRugIcon, alt: "Rug Category Button - Round Rug Icon", description: "Rugs"},
    {Icon: MugIcon, alt: "Mug Rugs Category Button - Mug Icon", description: "Mug rugs"},
    {Icon: KeyboardIcon, alt: "Wrist Rug Category Button - Keyboard Icon", description: "Wrist rugs"},
    {Icon: MirrorIcon, alt: "Mirror rugs Category Button - Mirror Icon", description: "Mirror rugs"},
    {Icon: StickerSmileIcon, alt: "Stickers & More Category Button - Smiley Sticker Icon", description: "Stickers & more"},
  ]

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
              {filterState.selectedCategory === 'all' ? 'All Products' : filterState.selectedCategory}
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
                id={product.id}
                key={`${product.name}-${idx}`}
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
          <div className="text-center py-20">
            <p className="text-lg text-gray-500 mb-4">No products found matching your criteria.</p>
            <button
              onClick={filterFunctions.clearAllFilters}
              className="px-6 py-2 bg-majorelle text-white rounded-md hover:bg-majorelle-dark transition-colors"
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
          <section className="bg-mauve heading_text flex flex-col text-center pb-20 gap-5 justify-center items-center">
            <img 
              className="flex align-start h-8 w-8" 
              src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" />
              <p>Don't see what you're looking for?</p>
              <StartOrderBtn/>
              <p>Create your custom rug</p>
          </section>
        </>
      )}
      
      <ReturnToTop />
    </main>
  )
}
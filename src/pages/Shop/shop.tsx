// TODO: import productCard
import { StickerSmileIcon, RoundRugIcon, StarIcon, BrushIcon, MugIcon, KeyboardIcon, MirrorIcon, DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"
import { StartOrderBtn, ReturnToTop } from "../../components/ui/buttons/index"
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { ProductCard } from "./productCard"
import { getProducts } from "../../lib/api/Product/productservices"
import type { Product } from "../../lib/api/Product/productservices"
import { Spinner } from "../../components/ui/loaders/loadingSpinner"
import { useState, useEffect, useRef} from "react"
import type { FC, SVGProps } from "react"

interface CategoryIconProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  alt: string;
  description: string;
}

export const Shop = () => {
  const [products, setProducts ] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false)
  const productCount = products.length


  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchProducts();
      console.log("Products >>", products)
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts()
      setProducts(data)
      setError(null)
    } catch(err) {
      setError("Failed to retrieve products. Please check back soon.")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (products) {
      console.log(productCount)
      console.log(products[80]?.images)
    }
  }, [products])


  // LOADING STATE
  if (loading) return <Spinner  />;
  

  const categoryIcons: CategoryIconProps[] = [
    {Icon: StarIcon, alt: "All Products Category Button - Star Icon", description: "All items"},
    {Icon: BrushIcon, alt: "Custom Rug Category Button - Brush Icon", description: "Custom rugs"},
    {Icon: RoundRugIcon, alt: "Rug Category Button - Round Rug Icon", description: "Rugs"},
    {Icon: MugIcon, alt: "Mug Rugs Category Button - Mug Icon", description: "Mug rugs"},
    {Icon: KeyboardIcon, alt: "Wrist Rug Category Button - Keyboard Icon", description: "Wrist rugs"},
    {Icon: MirrorIcon, alt: "Mirror rugs Category Button - Mirror Icon", description: "Mirror rugs"},
    {Icon: StickerSmileIcon, alt: "Stickers & More Category Button - Smiley Sticker Icon", description: "Stickers & more"},
  ]

  // if (error) return <div >Error: {error}</div>;
  if (error || products === null) {
    return ( 
      <div className=" h-[100vh] mx-8 text-center justify-center flex flex-col gap-5 items-center">
        <DangerIcon className="text-bittersweet animate-pulse"/>
        <div className="error-message flex text-bittersweet font-bold">Error: <br/> {error ? `${error}` : "Difficulty getting products. Check back soon!" }</div>
      </div>)
  }
  return (
    <main aria-label="Shop Page">
      {/* Category Selector */}
      <section>
        <h1 className="heading_text p-4">Categories</h1>
        {/* CATEGORY CAROUSEL */}
        <ul 
          className="md:mx-4 mx-2 overflow-x-auto scrollbar-hide whitespace-nowrap md:justify-center flex items-center"
          style={{ scrollbarWidth: 'none' }} 
          aria-label="Category Selection"
        >
          {categoryIcons.map(({ Icon, alt, description }, idx) => (
            <li
            className=""
            key={`category-${idx}`}
            aria-label={alt}
            > 
              <button className="inline-flex mx-4 group cursor-pointer justify-center items-center flex-col text-center flex-shrink-0"> 
                <Icon className="size-10 md:size-12 text-space_cadet group-hover:text-majorelle"/>  
                <p className="text-sm text-space_cadet group-hover:text-majorelle">{description}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* Product Title */}
      <section className="flex flex-col justify-center py-10">
        <div className="flex justify-center">
          <img 
            className="flex align-start h-8 w-8" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <h1 className="heading_text ">
            {/* Product Category */}
            {/* productCategory */}
              All Products 
            </h1>
        </div>
      {/* SORT BY
      TODO: Create Filter Systems */}
      <div className="flex items-center justify-between px-2">
        <select>
          <option value="featured">Featured</option>
          <option value="">A to Z</option>
          <option value="">Z to A</option>
          <option value="">Low to High</option>
          <option value="">High to Low</option>
          <option value="">Genre</option>
          <option value="">Type</option>
          <option value="">Large to Small</option>
          <option value="">Small to Large</option>
        </select>
        {/* Amount of current Products found in filter results
        TODO: fetchFoundCount */}
        <p className="font-semibold opacity-50"> 
          {/* {fetchCount} */}
          {productCount} Items
        </p>
      </div>
      </section>
      {/* Product Listings 
      TODO: Create Product Card
      */}
      <section aria-label="product-listings">
        <ul className="md:mx-8 flex-shink-1 mx-2 grid grid-cols-2 md:gap-4 gap-2 md:grid-cols-3">
          {products.map((product, idx) => (
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
      </section>
      {/* Call To Action */}
      <CtaWavesBg className="fill-mauve mt-20"/>
      <section className="bg-mauve heading_text flex flex-col text-center pb-20 gap-5 justify-center items-center">
          <img 
            className="flex align-start h-8 w-8" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <p>Don’t see what you’re looking for? </p>
            <StartOrderBtn/>
            <p>Create your custom rug</p>
      </section>
      <ReturnToTop />
    </main>
  )
}

// TODO: import productCard

import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder"
import { ProductCard } from "../../components/product/productCard"
import { StickerSmileIcon, RoundRugIcon, StarIcon, BrushIcon, MugIcon, HandWaveIcon, MirrorIcon} from "../../components/icons-svgs/SvgIcons"
import type { FC, SVGProps } from "react"

interface cardProps {
  path: string,
  price: number,
  title: string,
  img_alt: string,
  dimensions: string,
  genre: string,
  id: number,
}
interface CategoryIconProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  alt: string;
  description: string;
}
export const Shop = () => {

// TODO: Create filter Options
// TODO: fetchAllProducts
// TODO: fetchProductCategory
  // TEMP DATA 
  const cardContent: cardProps[]= [
      { path:"public/products/rugs/Closeup_AllThat.webp",
        img_alt:"Alt That Logo Rug",
        price:123.99,
        title:"All That Logo",
        dimensions:"3 x 3",
        genre:"rug",
        id: 1
      },
      { path:"public/products/rugs/Custom_Thumper.webp",
        img_alt:"Thumper Rug",
        price:2123.99,
        title:"Thumper",
        dimensions:"3 x 3",
        genre:"rug",
        id: 2
      },
      { path:"public/products/rugs/Rug_Naruto.webp",
        img_alt:"Naruto Rug",
        price:12.99,
        title:"Naruto Rug",
        dimensions:"3 x 3",
        genre:"rug",
        id: 3
      },
    ]
  const categoryIcons: CategoryIconProps[] = [
    {Icon: StarIcon, alt: "All Products Category - Star Icon", description: "All items"},
    {Icon: BrushIcon, alt: "Custom Rug Category - Brush Icon", description: "Custom rugs"},
    {Icon: RoundRugIcon, alt: "Rug Category - Round Rug Icon", description: "Rugs"},
    {Icon: MugIcon, alt: "Mug Rugs Category - Mug Icon", description: "Mug rugs"},
    {Icon: HandWaveIcon, alt: "Wrist Rug - Hand Icon", description: "Wrist rugs"},
    {Icon: MirrorIcon, alt: "Mirror rugs Category - Mirror Icon", description: "Mirror rugs"},
    {Icon: StickerSmileIcon, alt: "Stickers & More Category - Smiley Sticker Icon", description: "Stickers & more"},
  ]
  return (
    <main aria-label="Shop Page">
      {/* Category Selector */}
      <section>
        <h1 className="heading_text p-4">Categories</h1>
        {/* CATEGORY CAROUSEL */}
        <ul 
          className="md:mx-4 mx-2 overflow-x-auto scrollbar-hide whitespace-nowrap flex items-center"
          style={{ scrollbarWidth: 'none' }} 
        >
          {categoryIcons.map(({ Icon, alt, description }, idx) => (
            <li
            className="inline-flex mx-4 justify-center items-center flex-col text-center flex-shrink-0"
            key={`category-${idx}`}
            >
              <Icon className="size-10 md:size-16 text-space_cadet hover:text-majorelle"/>
              <p className="text-sm">{description}</p>
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
        <p> 
          {/* {fetchCount} */}
          10/23
        </p>
      </div>
      </section>
      {/* Product Listings 
      TODO: Create Product Card
      */}
      <section id="product-listings">
        <ul className="mx-2 grid grid-cols-2 gap-2 md:grid-cols-3">   
          {cardContent.map(({ path, price, title, img_alt, dimensions, genre, id}, idx) => (
            <ProductCard 
            id={id}
            key={`${title}-${idx}`}
            path={path}
            img_alt={img_alt}
            price={price}
            title={title}
            dimensions={dimensions}
            genre={genre}
            />
          ))}
        </ul>
      
      </section>
      {/* Call To Action */}
      <section className="bg-mauve heading_text flex flex-col text-center  gap-5 justify-center items-center">
        
          <img 
            className="flex align-start h-8 w-8" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" />
            <p>Don’t see what you’re looking for? </p>
            <StartOrderBtn/>
            <p>Create your custom rug</p>
        
      </section>
    </main>
  )
}

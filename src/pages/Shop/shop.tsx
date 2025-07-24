// TODO: import productCard

import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder"
import { ProductCard } from "../../components/product/productCard"

interface cardProps {
  path: string,
  price: number,
  title: string,
  img_alt: string,
  dimensions: string,
  genre: string,
  id: number,
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
  return (
    <main aria-label="Shop Page">
      {/* Category Selector */}
      <section>

      </section>
      {/* Product Title */}
      <section className="flex items-start justify-center heading_text py-10">
        <img 
          className="flex align-start h-8 w-8" 
          src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
          <h1>
          {/* Product Category */}
            All Products 
        </h1>
      </section>
      {/* SORT BY
      TODO: Create Filter Systems */}
      <section className="flex justify-between px-4">
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
        {/* Amount of current Products found in filter results */}
        <p> 10/23</p>
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

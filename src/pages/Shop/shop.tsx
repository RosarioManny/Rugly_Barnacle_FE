// TODO: import productCard

import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder"

export const Shop = () => {

// TODO: Create filter Options
// TODO: fetchAllProducts
// TODO: fetchProductCategory


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
      {/* SORT BY */}
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

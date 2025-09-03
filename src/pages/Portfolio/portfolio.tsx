// import { CtaWavesBg } from "../../components/icons-svgs/ctaWavesBg"
import { Header } from "../../components/layout/_header"
import { useState, useEffect } from "react"
import { ReturnToTop, StartOrderBtn} from "../../components/ui/buttons"
import { portfolioImages } from "./portfolioImages"
import type { imageInfoProps } from "./portfolioImages"
import { PortfolioItem } from "./portfolioItem"





export const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<imageInfoProps | null>(null);

  const handleImageClick = (img: imageInfoProps) => {
    setSelectedImage(img);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <main aria-label="Portfolio Page">
      <Header
        title="Portfolio"
        tagline="A showcase of all my completed commissions."
        img="/gallery/Product_Display_Assorted_Edited_2.webp"
        img_alt="Assorted variety of rugs"
        btn_1={<StartOrderBtn/>}
      />
      
      <section className="flex my-4 gap-2 flex-col items-center text-center"> 
        <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/X_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
        />
      </section>
      
      {/* PORTFOLIO INTRO */}
      <section className="body_text flex justify-center text-center my-4 py-4  mx-4 ">
        <p className="body_text md:max-w-2/3">
        Welcome to my rug hall of fame! Every rug tells a story. From epic sports logos
        and cuddy pet portraits to Pokémon, anime icons, and quirky text rugs, this page
        is packed with some of my favorite tufted creations. Think of it as a highlight
        reel of all the wild, weird and wonderful commissions I've brought to life -- maybe
        yours will be the next one to join the lineup!
        </p>
      </section>
      
      {/* PHOTO GALLERY */}
      <section className="pb-20 mb-20 mx-2 flex flex-1 flex-col justify-center items-center">
        <ul className="
        w-full
        grid gap-1 grid-cols-1 
        md:grid-cols-2 lg:grid-cols-3">
          {portfolioImages.map(({path, alt}, idx) => (
            <PortfolioItem 
              key={`${idx}-${alt}`}
              onClick={handleImageClick}
              index={idx}
              path={path} 
              alt={alt}/>
          ))}
          {/* {portfolioImages.map(({path, alt}, idx) => (
            <li 
              className="w-full h-90 cursor-pointer overflow-hidden group" 
              key={`${idx}-${alt}`}
              onClick={() => handleImageClick({path, alt})}
            >
              <img 
                className=" object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                src={path} 
                alt={alt} 
              />
            </li>
          ))} */}
        </ul>
      </section>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-space_cadet/90 flex flex-col gap-2 justify-center  items-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative flex flex-col gap-4 items-center justify-center max-w-xl max-h-full">
            <button 
              className="-top-10 right-0
                text-fleece text-3xl bg-bittersweet rounded-md size-8 flex items-center text-center justify-center duration-300 ease-in-out
                hover:bg-robin_egg hover:text-space_cadet transition-colors"
              onClick={closeModal}
              aria-label="Close image"
            >
              &times;
            </button>
            <img 
              src={selectedImage.path} 
              alt={selectedImage.alt}
              className="max-w-full max-h-3/4 object-contain rounded"
            />
            <div className="text-white text-center mt-2 text-sm md:text-base">
              {selectedImage.alt}
            </div>
          </div>
        </div>
      )}
      <ReturnToTop />
    </main>
  )
}
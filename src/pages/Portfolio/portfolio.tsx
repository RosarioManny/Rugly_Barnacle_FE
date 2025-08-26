// import { CtaWavesBg } from "../../components/icons-svgs/ctaWavesBg"
import { Header } from "../../components/layout/_header"
import { useState, useEffect } from "react"


interface imageInfoProps {
  path: string,
  alt: string
}

export const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<imageInfoProps | null>(null);

  // rug, mugrug, wristrug, mirror rug, custom rugs
  // TEMP DATA
  const imageInfo: imageInfoProps[] = [
    {path: "/products/rugs/Showcase_Gengar.webp", alt: "Pixel art Gengar rug"},
    {path: "/products/rugs/Showcase_AllThat.webp", alt: "All That tv show logo rug"},
    {path: "/products/rugs/Rug_Naruto.webp", alt: "Naruto Sharigen eyes"},
    {path: "/products/rugs/Custom_Portrait.webp", alt: "Custom self portrait rug"},
    {path: "/products/rugs/Custom_JLY.webp", alt: "Jesus loves you rug"},
    {path: "/gallery/Product_Display_Pokemon_Wristrug_Edited_2.jpg", alt: "Various pokemon wrist rugs - Gengar, Squirtle, Pikachu, Charmander, Bulbasaur and Snorlax"},
    {path: "/products/rugs/Product_Display_Pokemon_1.jpg", alt: "Pixel art of a gameboy pokemon trainer sprite and pikachu"},
  ]

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
        tagline="A showcase of all my works. Checkout what I can do!"
        img="/gallery/Product_Display_Assorted_3.jpg"
        img_alt="Assorted variety of rugs"
      />
      
      <section className="flex m-2 gap-2 flex-col items-center text-center"> 
        <img 
          className="flex justify-start h-10 w-10" 
          src="/assets/design/icons/X_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
        />
        <h1 className="heading_text">
          What I can do!
        </h1>
      </section>
      
      {/* PORTFOLIO INTRO */}
      <section className="body_text text-center my-6 mx-4">
        <p>
          Step into my tufted universe—where Pokémon pals, sports showdowns, and wild personal creations burst off the floor in rug form! 
          Every piece here (from mirror rugs that jazz up your walls to mug rugs that cozy up your coffee) is handmade with obsessive love for fandoms and
          one-of-a-kind ideas. Whether you're here to browse Snorlax rugs or dream up a custom design that'll make your friends gasp, this gallery proves no
          idea is too nerdy, niche, or wonderfully weird to bring to life in yarn!
        </p>
      </section>
      
      {/* PHOTO GALLERY */}
      <section className="pb-20 flex flex-col justify-center items-center">
        <ul className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {imageInfo.map(({path, alt}, idx) => (
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
          ))}
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
    </main>
  )
}
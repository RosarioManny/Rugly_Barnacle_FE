
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
import { NewsLetterForm } from "../../components/ui/newsLetterForm"
import { useNewsletterModal } from "../../hooks/newsletter/newsletterModal"

export const NewsLetterModal = () => {

  const {
    closeNewsletterModal,
    handleNewsletterBackdropClick,
    isOpen,
    isVisible
  } = useNewsletterModal()

  if (!isOpen) return null;
  
  return ( 
    <div 
      onClick={handleNewsletterBackdropClick}
      className={`
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      fixed inset-0 z-40 bg-space_cadet/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300`}>
      <div 
      className={`
      ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      relative flex flex-col w-1/2 h-2/3 min-w-[350px] max-w-lg mx-auto bg-fleece rounded-xl overflow-hidden shadow-sm border-4 border-majorelle`}>
        {/* Close button */}
        <button 
        onClick={closeNewsletterModal}
        className="
          absolute top-3 right-3 z-50 size-8 
          flex items-center justify-center 
          bg-fleece/50 text-space_cadet font-bold text-lg
          hover:bg-fleece transition-colors duration-300 
          rounded shadow-md">
          X
        </button>
        
        {/* Top Section: Banner Image (2/3 of container) */}
        <div className="relative h-full bg-robin_egg flex items-center">
        <picture>
          <source 
            media="(min-width: 768px)" 
            className="object-cover "
            srcSet="/assets/design/logo/Banner_Blue_clean_V2.webp" 
          />
          <img
            className="sm:object-cover h-full"
            src="/assets/design/logo/RuglyBarnacle_Logo.webp"
            alt="Rugly Barnacle Banner"
          />
        </picture>
          
          {/* Overlapping Wave */}
          <div className="absolute  bottom-4 sm:bottom-5 w-full">
            <CtaWavesBg className="w-full h-12 fill-majorelle transform translate-y-1/2" />
          </div>
        </div>
        
        {/* Bottom Section: Form (1/3 of container) */}
        <div className="bg-majorelle px-6 flex flex-grow flex-col justify-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-4xlfont-bold underline pt-2 text-mauve mb-3">
              Join the Newsletter!
            </h1>
              <NewsLetterForm onSuccess={closeNewsletterModal} />
            <p className="text-fleece font-bold text-md">
              Subscribe to receive updates and news
            </p>
          </div>
          

        </div>
      </div>
    </div>
  )
}
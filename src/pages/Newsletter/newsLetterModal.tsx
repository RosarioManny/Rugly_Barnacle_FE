
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg"
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
      fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300`}>
      <div 
      className={`
      ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      relative flex flex-col w-full h-2/3 max-w-md mx-auto bg-fleece rounded-xl overflow-hidden shadow-sm border-4 border-majorelle`}>
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
        <div className="relative h-full bg-robin_egg ">
          <img 
            className="object-cover size-full mb-8" 
            src="/assets/design/logo/Banner_Blue_clean.webp" 
            alt="Rugly Barnacle Banner" 
          />
          
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
            
            <div className="flex flex-row my-4 sm:my-6">
              <button 
                className="bg-breeze text-space_cadet font-bold rounded-l-xl hover:bg-robin_egg flex items-center justify-center"
              >
                Subscribe
              </button>
              <input 
                className="flex-grow py-3 px-2 bg-fleece rounded-r-xl max-w-[200px] sm:max-w-[400px] focus:outline-none focus:border-majorelle focus:ring-2 focus:ring-majorelle/30 transition-colors"
                placeholder="Email Address" 
                type="email" 
                name="email" 
                id="email" 
              />
            </div>
            
            <p className="text-fleece font-bold text-md">
              Subscribe to receive updates and news
            </p>
          </div>
          

        </div>
      </div>
    </div>
  )
}
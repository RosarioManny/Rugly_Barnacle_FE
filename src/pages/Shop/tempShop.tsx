import { StartOrderBtn } from "../../components/ui/buttons"
import { BallOfYarnIcon } from "../../components/ui/icons-svgs/SvgIcons"

export const TempShop = () => {
  return (
    <main className="h-[100vh] mb-60 flex flex-col gap-8 justify-evenly items-center" aria-label="Shop - Custom Orders Available">
      <div className="flex pl-10 w-full justify-start">
        <img 
          className="star-fade-animation mt-6 h-10 w-10" 
          src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
      </div>
      
      <section className="flex flex-col justify-center items-center gap-8 max-w-md mx-auto px-4">
        <BallOfYarnIcon className="yarn-animation fill-majorelle"/>
        <p className="font-bold text-space_cadet"> Shop Coming Soon... </p>
        <div className="text-center space-y-4">
          <h1 className="text-majorelle font-bold text-2xl">
            Custom Orders Now Available!
          </h1>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            Start your custom piece directly through our website
          </p>
        </div>

        {/* Order Process Steps */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4 w-full">
          <h2 className="text-majorelle font-bold text-lg text-center mb-4">
            How It Works:
          </h2>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <span className="bg-majorelle text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <p>Submit your custom order request form</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-majorelle text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <p>We'll connect to discuss design details and pricing</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-majorelle text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <p>Once finalized, complete payment via Venmo</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-majorelle text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <p>I'll create your custom piece and keep you updated!</p>
            </div>
          </div>
        </div>

        {/* Custom Order CTA */}
        <StartOrderBtn />

        {/* Venmo Info */}
        <div className="text-center text-sm text-gray-600">
          <p>Payments securely processed through Venmo</p>
        </div>
      </section>
      
      <div className="flex pr-8 w-full justify-end">
        <img 
          className="star-fade-animation flex align-start h-10 w-10" 
          src="/assets/design/icons/Cross_Star_Pink.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
      </div>
    </main>
  )
}
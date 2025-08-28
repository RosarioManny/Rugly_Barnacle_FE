import { EtsyLogo } from "../../components/ui/icons-svgs/socialMediaIcons"
import { BallOfYarnIcon } from "../../components/ui/icons-svgs/SvgIcons"

export const TempShop = () => {
  return (
    <main className="h-[100vh] flex flex-col gap-10 justify-evenly items-center" aria-label="Shop page - Work in Progress">
      <div className="flex pl-10 w-full justify-start">
        <img 
          className="star-fade-animation h-10 w-10" 
          src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
      </div>
      <section className="flex flex-col justify-center items-center gap-6 ">
        <BallOfYarnIcon className="yarn-animation fill-majorelle"/>
        <p className="text-majorelle font-bold text-xl text-center">
          Still Tufting!
          The Shop is coming soon!
        </p>
        <div className="flex flex-col justify-center items-center gap-6 ">
          <EtsyLogo 
            className="
              pointer duration-300 ease-in-out
              size-10 text-robin_egg 
              hover:text-majorelle hover:scale-110 
              active:text-majorelle active:scale-110
              focus:text-majorelle focus:scale-110" 
          />
          <p className="text-majorelle font-bold text-xl text-center"> Order on Etsy!</p>
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
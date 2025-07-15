import { CtaWavesBg } from "../icons-svgs/ctaWavesBg"
import { NewsLetterForm } from "../ui/newsLetterForm"
// ChangeEvent and FormEvent are effective TS types for the event.targets. 
// Allowing TS to know what will be happening to an element. 
// See handleChange for more.

export const Footer = () => {
  return (
    <footer className="bg-space_cadet w-full">
      <CtaWavesBg className="bg-mauve fill-space_cadet"/>
      <div className="w-full flex justify-end">
        <img className=" size-16" src="assets/design/icons/X_Star_Pink.webp" alt="X-Star Design Marker" />
      </div>
      {/* Newsletter */}
      <div>
        <NewsLetterForm/>
        <section>
          <h1 className="heading_text text-fleece"> Follow Me!</h1>
          <div>
            
          </div>
        </section>

      </div>
    </footer>
  )
}
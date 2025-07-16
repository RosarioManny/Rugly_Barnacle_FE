import { Link } from "react-router-dom";
import { CtaWavesBg } from "../icons-svgs/ctaWavesBg"
import { InstagramLogo, TikTokLogo } from "../icons-svgs/socialMediaIcons"
import { NewsLetterForm } from "../ui/newsLetterForm"
// ChangeEvent and FormEvent are effective TS types for the event.targets. 
// Allowing TS to know what will be happening to an element. 
// See handleChange for more.

export const Footer = () => {
  
  const links: string[] = ["home", "shop",  "about", "portfolio", "faq"];
  return (
    <footer className="bg-space_cadet w-full">
      <CtaWavesBg className="bg-mauve fill-space_cadet h-full -b-[10px]"/>
      <div className="w-full flex justify-end">
        <img className=" size-16" src="assets/design/icons/X_Star_Pink.webp" aria-hidden="true" alt="X-Star Design Marker" />
      </div>
      <main aria-label="Footer Content">
      {/* NEWSLETTER */}
        <NewsLetterForm/>
        {/* SOCIALS */}
        <section>
          <h2 className="heading_text text-fleece"> Follow Me!</h2>
          <div>
            <InstagramLogo className="
              pointer duration-300  ease-in-out
              size-10 text-mauve hover:text-breeze hover:scale-105 
              active:text-breeze active:scale-105 
              focus:text-breeze focus:scale-105"
            />
            <TikTokLogo className="
              pointer duration-300  ease-in-out
              size-10 text-mauve hover:text-breeze hover:scale-105 
              active:text-breeze active:scale-105 
              focus:text-breeze focus:scale-105"/>
          </div>
        </section>
        {/* CONTACT ME */}
        <section>
          <h2> Contact Me!</h2>
          <p> 718-111-2223</p>
          <p> myemail@anaddress.com</p>
        </section>
        <section>
          <h2>Quick link</h2>
          <ul>
          {links.map((link, idx) => (
            <li key={`${link}-${idx}`}>
              <Link to={`${link}`}>
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            </li>
          ))}
          </ul>
        </section>
      </main>
    </footer>
  )
}
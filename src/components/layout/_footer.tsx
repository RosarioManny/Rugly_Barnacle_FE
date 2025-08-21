import { Link } from "react-router-dom";
import { CtaWavesBg } from "../icons-svgs/ctaWavesBg"
import { InstagramLogo, TikTokLogo, EtsyLogo } from "../icons-svgs/socialMediaIcons"
import { NewsLetterForm } from "../ui/newsLetterForm"
import type { FC, SVGProps } from "react"
// ChangeEvent and FormEvent are effective TS types for the event.targets. 
// Allowing TS to know what will be happening to an element. 
// See handleChange for more.

interface SocialMediaProps {
  Social: FC<SVGProps<SVGSVGElement>>,
}
export const Footer = () => {
  
  const socialMedia: SocialMediaProps[] = [
    {Social: EtsyLogo},
    {Social: TikTokLogo},
    {Social: InstagramLogo},
  ];

  const links: string[] = [ "shop",  "about", "portfolio", "faq"];

  return (
      <footer className="bg-space_cadet w-full">
        <div className="relative ">
          <CtaWavesBg className="absolute w-full h-auto fill-space_cadet -translate-y-full"/>
        </div>
        <div className="w-full flex justify-end">
          <img 
            className="size-16" 
            src="assets/design/icons/X_Star_Pink.webp" 
            aria-hidden="true" 
            alt="X-Star Design Marker" 
          />
        </div>
        <main aria-label="Footer Content" className="text-center flex flex-col items-center">
        {/* NEWSLETTER */}
          <NewsLetterForm/>
          {/* SOCIALS */}
          <section className="my-4">
            <h2 className="
            heading_text
            text-mauve 
            underline underline-offset-6 "> 
              Follow Me!
            </h2>
            <ul className="flex space-x-6 m-2">
              {socialMedia.map(({ Social }, idx) => (
                <li key={`${Social}-${idx} group-text-fleece`}>
                  <Social  
                  className="
                  pointer duration-300  ease-in-out
                  size-10 text-fleece hover:text-breeze hover:scale-105 
                  active:text-breeze active:scale-105 
                  focus:text-breeze focus:scale-105"
                  />
                </li>
              ))}
            </ul>
          </section>
          {/* CONTACT ME */}
          <section className="my-4 space-y-4 text-fleece flex flex-col items-center">
            <h2 className="
            heading_text 
            text-mauve
            underline underline-offset-6 "> 
              Contact Me!
            </h2>
            <p> 718-111-2223</p>
            <p> myemail@anaddress.com</p>
          </section>
          {/* QUICK LINKS */}
          <section className="my-4 flex flex-col items-center">
            <h2 className="
              heading_text 
              text-mauve
              underline underline-offset-6 ">
              Quick link
            </h2>
            <ul className="text-fleece flex space-x-4 m-4">
            {links.map((link, idx) => (
              <li key={`${link}-${idx}`}>
                <Link 
                  to={`/${link}`} 
                  className="
                    pointer duration-300  ease-in-out
                    size-10 text-fleece 
                    hover:text-breeze 
                    active:text-breeze  
                    focus:text-breeze">
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              </li>
            ))}
            </ul>
          </section>
          <section className="flex justify-start w-full">
          <img 
            className="m-10 h-10 w-10" 
            src="/assets/design/icons/X_Star_Teal-Blue.webp" 
            aria-hidden="true"
            alt="Teal Star decorator" />
          </section>
        </main>
      </footer>
  )
}
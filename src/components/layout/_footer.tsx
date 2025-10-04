import { Link } from "react-router-dom";
import { CtaWavesBg } from "../ui/icons-svgs/ctaWavesBg"
import { InstagramLogo, TikTokLogo, EtsyLogo } from "../ui/icons-svgs/socialMediaIcons"
import { Emailbtn } from "../ui/buttons";
// import { NewsLetterForm } from "../ui/newsLetterForm"
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

  const links: { title: string; path: string }[] = [  
    {title: "home", path: ""}, 
    {title: "about", path: "about"}, 
    {title: "FAQ", path: "faq"}, 
    {title: "portfolio", path: "portfolio"}, 
    {title: "shop", path: "shop"}, 
    {title: "custom Order", path: "custom-order"}, 
  ];

  return (
      <footer className="bg-space_cadet w-full">
        <div className="relative ">
          <CtaWavesBg className="absolute w-full h-auto fill-space_cadet top-[2px] -translate-y-full"/>
        </div>
        <div className="w-full flex justify-end">
          <img 
            className="size-16" 
            src="/assets/design/icons/X_Star_Pink.webp" 
            aria-hidden="true" 
            alt="Pink X-Star Design Marker" 
          />
        </div>
        <main aria-label="Footer Content" className="text-center flex flex-col items-center">
          {/* NEWSLETTER */}
          {/* <NewsLetterForm/> */}
          {/* SOCIALS */}
          <section className="my-4">
            <h2 className="
            heading_text
            text-mauve 
            underline underline-offset-6 "> 
              Follow Me!
            </h2>
            <ul className="flex space-x-6 m-2">
              {socialMedia.map(({ Social}, idx) => (
                <li key={`${Social}-${idx} group-text-fleece`}>
                  <Social  
                    className="
                      pointer duration-300 ease-in-out
                      size-10 text-fleece 
                      hover:text-breeze hover:scale-105 
                      active:text-breeze active:scale-110
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
            <Emailbtn/>
          </section>
          {/* QUICK LINKS */}
          <section className="my-4 flex flex-col items-center">
            <h2 className="
              heading_text 
              text-mauve
              underline underline-offset-6 ">
              Quick link
            </h2>
            <ul className="text-fleece flex flex-col items-center gap-3 my-4">
            {links.map(( { title, path}, idx) => (
              <li className="flex text-center items-center " key={`${title}-${idx}`}>
                <Link 
                  to={`/${path}`}
                  className=" group"
                >
                  <p className="
                    pointer duration-200 transform transition-all
                    text-fleece body_text 
                    group-hover:text-breeze group-hover:scale-120 
                    group-active:text-breeze group-active:scale-120
                    group-focus:text-breeze group-focus:scale-120 
                    ">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </p>
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
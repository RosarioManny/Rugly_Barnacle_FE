import { Link } from "react-router-dom";
import { CtaWavesBg } from "../ui/icons-svgs/ctaWavesBg"
import { Emailbtn } from "../ui/buttons";
import { socialMediaLogos } from "../../lib/utils/socialMedias";
import { NewsLetterForm } from "../ui/newsLetterForm"

export const Footer = () => {

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
        
        <main aria-label="Footer Content" className="px-4 md:px-8 lg:px-16 py-8">
          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            
            {/* LEFT COLUMN - Newsletter, Socials, Contact */}
            <div className="flex flex-col items-center md:items-start space-y-8">
              {/* NEWSLETTER */}
              <NewsLetterForm/>
              
              {/* SOCIALS */}
              <section>
                <h2 className="
                  heading_text
                  text-mauve 
                  underline underline-offset-6
                  text-center md:text-left"> 
                  Follow Me!
                </h2>
                <ul className="flex space-x-6 mt-4 justify-center md:justify-start">
                  {socialMediaLogos.map(({ Social }, idx) => (
                    <li key={`${Social}-${idx}`}>
                      <Social  
                        className="
                          size-10 text-fleece 
                          hover:text-breeze 
                          active:text-breeze 
                          focus:text-breeze
                          transition-colors duration-200"
                      />
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* CONTACT ME */}
              <section className="flex flex-col items-center md:items-start">
                <h2 className="
                  heading_text 
                  text-mauve
                  underline underline-offset-6"> 
                  Contact Me!
                </h2>
                <div className="mt-4">
                  <Emailbtn/>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN - Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <section>
                <h2 className="
                  heading_text 
                  text-mauve
                  underline underline-offset-6
                  text-center md:text-left">
                  Quick Links
                </h2>
                <ul className="text-fleece flex flex-col items-center md:items-start gap-3 mt-4">
                  {links.map(({ title, path}, idx) => (
                    <li key={`${title}-${idx}`}>
                      <Link 
                        to={`/${path}`}
                        className="group"
                      >
                        <p className="
                          duration-200 transform transition-all
                          text-fleece body_text 
                          group-hover:text-breeze group-hover:scale-110 
                          group-active:text-breeze group-active:scale-110
                          group-focus:text-breeze group-focus:scale-110">
                          {title.charAt(0).toUpperCase() + title.slice(1)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Decorative Star */}
          <div className="flex justify-start mt-8">
            <img 
              className="h-10 w-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true"
              alt="Teal Star decorator" 
            />
          </div>
        </main>
        
        {/* Creator Credit Section */}
        <div className="border-t border-fleece/20 pt-2 pb-3">
          <div className="flex mx-4 justify-between text-center body_text text-fleece/20">
            <p>
              Created by{" "}
              <a 
                href="https://github.com/RosarioManny" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-breeze transition-colors duration-200 underline"
              >
                Emmanuel Rosario
              </a>
            </p>
            <p>
              • Version 1.7.11
            </p>
          </div>
        </div>
      </footer>
  )
}
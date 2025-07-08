interface HeaderProps {
  tag?: string;
  img: string;
  tag_alt?: string;
  img_alt: string;
}

export const Header = ({ tag = "", img, tag_alt="", img_alt }: HeaderProps) => {

  return (
    <>
    <header className="grid grid-cols-[2fr_3fr] justify-center items-center z-[-10] absolute w-full absolute object-cover h-[500px] bg-gradient-to-tr from-space_cadet  to-majorelle p-2">
      <div className="flex flex-wrap gap-4 items-center text-center text-fleece justify-center">
        <p className="heading_text text-4xl">
          Where your dream design becomes a rug reality
        </p>
        <p>Begin your dream rug!</p>
        <div className="flex gap-2">
          <button 
            className="
            btn_general btn_start_order
            hover:bg-robin_egg "> 
              Start Order
          </button>
          <button 
            className="
            btn_contact_us 
            hover:border-robin_egg"> 
              Contact Us
          </button>
        </div>
      </div>

      <div className="w-full">
        <img className="w-full" src="/assets/Logo/RuglyBarnacle_Logo.webp"/>
      </div>
    </header>
    </>
  )
}
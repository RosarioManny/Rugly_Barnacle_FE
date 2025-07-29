
interface HeaderProps {
  title: string;
  img?: string;
  img_alt?: string;
  btn_1?: React.ReactNode;
  btn_2?: React.ReactNode;
  tagline?: string;
}

export const Header = ({ btn_1, btn_2, title="", tagline="", img, img_alt }: HeaderProps) => {

  return (
      <header className=
        {`${img ? "" : "gradient"}
        relative w-full h-[75vh] overflow-hidden object-cover `}
        >
          {/* IMAGE BG (when provided) */}
          {img && (
            <div className="absolute inset-0 -z-10">
              <img 
              className="size-full object-cover "
              src={img} 
              alt={img_alt || "Header background"}  />
              <div className="absolute inset-0 bg-gradient-to-tr from-space_cadet  to-majorelle/20"/>
            </div>
          )}

        {/* CONTENT */}
        <section className="
          relative z-10
          flex flex-col gap-4 justify-center items-center 
          md:flex-row
          h-full text-center text-fleece"
        >
            {/* FALLBACK IMAGE */}
            {!img && (
              <div className="z-20 flex w-full drop-shadow-lg/50 justify-center items-center ">
                <img 
                  className="h-46 md:h-64 floating-item" 
                  src="/assets/design/logo/RuglyBarnacle_Logo.webp" 
                  alt="Rugly Barnacle Logo" 
                />
              </div>
            )}
          <div className="flex mx-8 md:w-[50%] text-center items-center flex-col gap-6 justify-center">
            <p className="
            heading_text 
            justify-self-start
            md:text-5xl 
            text-4xl">
              {title}
            </p>
            { tagline &&(
              <p className="
              rethinkSans-text 
              md:text-2xl 
              text-center
              text-xl italic">
                {tagline}
              </p>
            )}
            <div className="flex text-xl gap-2">
              {btn_1 && (
                <>
                  {btn_1}
                </>
              )}
              { btn_2 && (
                <>
                  {btn_2}
                </>
              )}
            </div>
          </div>
        </section>
      </header>
  )
}
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
      <header 
        className=
        {`${img ? "" : "gradient"}
        relative w-full h-[70vh] overflow-hidden object-fit z-10`}
        >
          {/* IMAGE BG (when provided) */}
          {img && (
            <div className="absolute inset-0 -z-10">
              <img 
              loading="lazy"
              className="size-full object-cover "
              src={img} 
              alt={img_alt || "Header background"}  />
              <div className="absolute inset-0 bg-gradient-to-tr from-space_cadet  to-majorelle/20"/>
            </div>
          )}

        {/* CONTENT */}
        <section className="
          relative z-10
          flex flex-col justify-center items-center gap-4
          md:flex-row-reverse
          h-full text-center text-fleece"
        >
            {/* FALLBACK IMAGE */}
            {!img && (
              <div className="z-20 flex w-full md:max-w-2/3 lg:max-w-1/2 drop-shadow-lg/50 justify-center items-center ">
                <img 
                  loading="lazy"
                  className="md:h-72 sm:h-64 h-48 object-cover floating-item" 
                  src="/assets/design/logo/RuglyBarnacle_Logo.webp" 
                  alt="Rugly Barnacle Logo" 
                />
              </div>
            )}
          <div className="flex mx-4 md:w-2/3 text-center items-center flex-col gap-6 justify-center">
            <p className="
            heading_text 
            justify-self-start
            ">
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
            <div className="flex items-center justify-center gap-2">
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
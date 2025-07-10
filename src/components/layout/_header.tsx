
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
    <>
      <header className="
        gradient
        relative justify-center items-center w-full object-cover h-[500px] 
        ">
        <div className="flex h-full flex-col gap-4 items-center text-center text-fleece justify-center">
          {img && (
            <div className="flex drop-shadow-lg/50 justify-center items-center ">
              <img className="h-40 floating-item" src={img} alt={img_alt} />
            </div>
          )}
          <p className="
          heading_text 
          md:text-5xl 
          text-4xl">
            {title}
          </p>
          { tagline &&(
            <p className="
            rethinkSans-text 
            md:text-2xl 
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
      </header>
    </>
  )
}
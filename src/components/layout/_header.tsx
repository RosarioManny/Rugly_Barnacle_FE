
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
        md:grid md:grid-cols-[2fr_3fr] flex 
        relative justify-center items-center w-full object-cover h-[500px] 
        ">
        <div className="flex flex-col gap-8 items-center text-center text-fleece justify-center">
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
        {img && (
          <div className="md:flex hidden w-full">
            <img className="w-full" src={img} alt={img_alt} />
          </div>
        )}
      </header>
    </>
  )
}
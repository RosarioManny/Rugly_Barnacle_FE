
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
        relative justify-center items-center w-full object-cover h-[75vh] 
        ">
        <section className="
        flex flex-col md:flex-row gap-4 justify-center items-center 
        h-full text-center text-fleece ">
          <div className="">
            {img && (
              <div className="flex w-full drop-shadow-lg/50 justify-center items-center ">
                <img className="h-40 md:h-64 floating-item" src={img} alt={img_alt} />
              </div>
            )}
          </div>
          <div className="flex md:w-[50%] text-center items-center flex-col gap-6 justify-center">
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
              text-justify
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
    </>
  )
}
interface HeaderProps {
  tag?: string;
  img: string;
  tag_alt?: string;
  img_alt: string;
}

export const Header = ({ tag = "", img, tag_alt="", img_alt }: HeaderProps) => {

  return (
    <>
    <header>
      {img ? (
        <>
        <p>Not workign</p>
        </>
      ) 
      : 
      (
        <>
          <span className="w-full absolute object-cover h-[500px] bg-gradient-to-tr from-space_cadet  to-majorelle p-2">  </span>
          <p>{tag}</p>
        </>
      )}
      
    </header>
    </>
  )
}
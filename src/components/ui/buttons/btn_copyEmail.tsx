import { CopyIcon } from "../icons-svgs/SvgIcons"
import { copyEmailBtn } from "../../../hooks/button/CopyEmail"


export const Emailbtn = ( { background="bg-breeze hover:bg-robin_egg hover:text-fleece " }) => (
  // <div className="w-fit flex justify-center rounded-2xl bg-breeze drop-shadow-sm ">
    <button 
    onClick={copyEmailBtn}
    aria-describedby="email-address"
    aria-label="Copy Email Button"
    className=
    {`
    p-2 w-fit
    drop-shadow-sm rounded-lg
    text-space_cadet 
    flex align-center items-center
    hover:scale-105
    ${background}
    `}> 
      <CopyIcon className="size-4 m-2"/>
      <p id="email-address" className="text-sm">
        @theruglybarnacle@gmail.com
      </p>
    </button>

)
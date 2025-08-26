import { CopyIcon } from "../icons-svgs/SvgIcons"

interface EmailbtnProps {
  onClick?: () => void;
}

export const Emailbtn = ({ onClick = () => {} }: EmailbtnProps) => (
  <div className="w-fit flex justify-center border-solid rounded-2xl bg-breeze drop-shadow-sm border-black">
    <button 
    onClick={onClick}
    aria-describedby="email-address"
    aria-label="Copy Email Button"
    className=" 
    rounded-2xl text-space_cadet flex align-center items-center
    hover:bg-robin_egg hover:text-fleece hover:scale-105
    
    " > 
      <CopyIcon className="size-5 m-2 text-inherit"/>
      <p id="email-address" className="p-2">
        @theruglybarnacle@gmail.com
      </p>
    </button>
  </div>
)
import { CopyIcon } from "../../icons-svgs/SvgIcons"

interface EmailbtnProps {
  onClick?: () => void;
}
export const Emailbtn = ({ onClick = () => {} }: EmailbtnProps) => (
  <div className="flex border-solid pr-2 rounded-2xl bg-breeze drop-shadow-sm border-black justify-center items-center">
    <button 
    onClick={onClick}
    aria-describedby="email-address"
    aria-label="Copy Email Button"
    className=" 
    rounded-l-2xl text-space_cadet 
    hover:bg-robin_egg hover:text-fleece hover:scale-110 " > 
      <CopyIcon className="size-5 m-2 text-inherit"/>
    </button>
    <p id="email-address" className="p-2 subheading_text">
      @theruglybarnacle@gmail.com
    </p>
  </div>
)
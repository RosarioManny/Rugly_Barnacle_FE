import { motion } from "framer-motion"
import { useState } from "react"

interface faqCardProps {
  key: string | number,
  question: string,
  answer: string
}

export const FaqCard = ({ key, question, answer }: faqCardProps) => {
  const [isToggled, setIsToggled] = useState(false)

  console.log("KEY >>> ", key)
  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <li 
    key={key}
    onClick={handleToggle}
    className="h-fit hover:outline-2 hover:outline-robin_egg duration-200 cursor-pointer bg-fleece p-4 rounded-xl">
      {/* QUESTION */}
      <div className="
        subheading_text 
        
        text-md my-4 text-bold gap-4
        flex justify-between items-center"
      >
        <p>{question} {key}</p>
        <span 
          className={`
            ${isToggled ? "border-t-bittersweet rotate-x-180" : "border-t-robin_egg"} 
            transition-transform duration-300 border-t-10 border-solid ease-in-out w-2
            caret-down`}
        >
        </span>
      </div>
      {/* ANSWER */}
      <motion.div 
        className={`w-fullrounded-b-2xl bg-firebrick overflow-hidden `}
        initial={false}
        animate={{
          height: isToggled ? 'auto' : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
          delay: isToggled ? 0.15 : 0
        }}
        >
        <p className="body_text text-space_cadet/50">
          {answer}
        </p>
      </motion.div>
    </li>
  )
}
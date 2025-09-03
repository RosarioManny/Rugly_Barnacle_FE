import { motion } from "framer-motion"
import { useState } from "react"
interface faqCardProps {
  question: string,
  answer: string
}

export const FaqCard = ({ question, answer }: faqCardProps) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }
  return (
    <li 
    onClick={handleToggle}
    className="h-fit bg-fleece p-4 rounded-xl">
      {/* QUESTION */}
      <div className="
        subheading_text 
        text-md my-4 text-bold gap-4
        flex justify-between items-center"
      >
        <p>{question}</p>
        <button 
          className={`
            ${isToggled ? "border-t-bittersweet rotate-x-180" : "border-t-robin_egg"} 
            transition-transform duration-300 border-t-10 border-solid ease-in-out
            caret-down`}
        >
        </button>
      </div>
      {/* ANSWER */}
      <motion.div 
        className={`w-full rounded-b-2xl bg-firebrick overflow-hidden `}
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
        <p className="body_text text-gray-500">
          {answer}
        </p>
      </motion.div>
    </li>
  )
}
interface faqCardProps {
  question: string,
  answer: string
}

export const FaqCard = ({ question, answer }: faqCardProps) => {
  return (
    <li className="h-fit bg-gray-300 p-4 rounded-xl">
      {question} {answer}
    </li>
  )
}
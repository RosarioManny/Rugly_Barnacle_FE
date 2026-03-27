export const PrivacyCard = ({ title, content }: { title: string; content: string[] }) => {
  return (
    <li className="bg-space_cadet/60 rounded-xl p-6 flex flex-col gap-3">
      <h2 className="text-white font-semibold text-lg">{title}</h2>
      <ul className="flex flex-col gap-2">
        {content.map((item, index) => (
          <li key={index} className="text-white/80 text-sm leading-relaxed flex gap-2">
            <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
            {item}
          </li>
        ))}
      </ul>
    </li>
  )
}
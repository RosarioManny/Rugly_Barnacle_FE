interface CategoryProps {
  svg: React.ReactNode;
  svgAlt?: string;
  title: string;
  description: string;
  className: string;
}

export const CategoryCard = ({ svg, svgAlt="Svg Icon", title, description="", className }: CategoryProps) => {
  return (
    <div aria-label={svgAlt} className={className} >
      {svg}
      <p className="w-3/4 text-space_cadet subheading_text font-medium"> { title } </p>
      <p className="text-space_cadet body_text md:flex hidden"> { description } </p>
    </div>
  )
}
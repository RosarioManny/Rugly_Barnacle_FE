interface CategoryProps {
  svg: React.ReactNode;
  svgAlt?: string;
  description: string;
  className: string;
}

export const CategoryCard = ({ svg, svgAlt="Svg Icon", description="", className }: CategoryProps) => {
  return (
    <div aria-label={svgAlt} className={className} >
      {svg}
      <p className="text-space_cadet"> { description } </p>
    </div>
  )
}
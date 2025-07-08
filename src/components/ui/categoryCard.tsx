interface CategoryProps {
  svg: React.ReactNode;
  svg_alt: string;
  description: string;
}

export const CategoryCard = ({ svg, svg_alt="Svg Icon", description="" }: CategoryProps) => {
  return (
    <div>
      {svg}
      <p> { description } </p>
    </div>
  )
}
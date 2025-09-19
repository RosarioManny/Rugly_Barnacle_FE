import { Link } from "react-router-dom";

interface CardProps {
  img: string;
  title: string;
  link?: string;
}

export const CarouselItem = ({ img, title, link="" }: CardProps) => {
  return (
    <div className="flex h-full flex-col">
      <Link 
        to={`/${link}`}
        className="
        relative block aspect-square w-full overflow-hidden rounded-lg
        tranisition-all duration-200 hover:-translate-y-2 hover:drop-shadow-lg/50"
      >
        <img 
          className="h-full w-full object-cover transition-transform hover:scale-105 " 
          src={img}
          alt={title}
          loading="lazy"
        />
      </Link>
      <div className="mt-2 text-center">
        <p className="heading_text text-space_cadet">{title}</p>
      </div>
    </div>
  );
};
import { Link } from "react-router-dom";
import type { Blog } from "../blog";
import { ReturnToTop } from "../../../components/ui/buttons";

export const BlogCard = ({ title, description, created_at, id, tags }: Blog) => {
  const truncatedDescription = description.length > 150 
    ? `${description.substring(0, 150)}...` 
    : description;

  return (
    <Link to={`/blog/${id}`}>
      <article className="
        p-6 
        min-h-[100px] md:min-h-[250px]
        rounded-lg border-2 border-majorelle/50
        bg-white
        hover:border-robin_egg hover:scale-102
        transition-all duration-300 cursor-pointer
        shadow-sm hover:shadow-md
      ">
        <h2 className="text-xl font-bold text-space_cadet mb-2">{title}</h2>
        <p className="text-space_cadet/80 mb-4 line-clamp-4">{truncatedDescription}</p>
        <div className="flex items-end justify-end">
          <time className="text-sm text-space_cadet/50">{created_at}</time>
        </div>
        {/* Tags to help identify */}
        <ul className="flex flex-wrap justify-start gap-2 my-3">
          {tags?.map((tag) => {
            const getTagStyles = (tagName: string) => {
              switch(tagName.toLowerCase()) {
                case 'personal':
                  return 'bg-majorelle/20 text-majorelle';
                case 'inspiration':
                  return 'bg-robin_egg/20 text-robin_egg';
                case 'rug making':
                  return 'bg-bittersweet/20 text-bittersweet';
                case 'events':
                  return 'bg-midnight_green/20 text-midnight_green';
                default:
                  return 'bg-gray-200 text-gray-700';
              }
            };

            return (
              <li key={tag} className={`text-xs rounded-full px-2 py-1 ${getTagStyles(tag)}`}>
                <p>{tag}</p>
              </li>
            );
          })}
        </ul>
      </article>
    </Link>
  );
};
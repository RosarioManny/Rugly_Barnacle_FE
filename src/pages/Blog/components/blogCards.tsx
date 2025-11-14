import { Link } from "react-router-dom";
import type { BlogPost } from "../../../lib/api/Blog/blogServices";
import { getTagDisplayName, getTagStyles } from "../../../lib/utils/tagStyles";

export const BlogCard = ({ title, content, created_at, id, tags }: BlogPost) => {
  const truncatedContent = content.length > 150 
    ? `${content.substring(0, 150)}...` 
    : content;

  
  
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
        <p className="text-space_cadet/80 mb-4 line-clamp-4">{truncatedContent}</p>
        <div className="flex items-end justify-end">
          <time className="text-sm text-space_cadet/50">{created_at}</time>
        </div>
        {/* Tags to help identify */}
        <ul className="flex flex-wrap justify-start gap-2 my-3">
          <li key={`${tags}-${id}`} className={`text-xs font-semibold rounded-full px-2 py-1 ${getTagStyles(tags)}`}>
            {getTagDisplayName(tags)}
          </li>
        </ul>
      </article>
    </Link>
  );
};
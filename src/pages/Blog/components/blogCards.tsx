import { Link } from "react-router-dom";
import type { BlogPost } from "../../../lib/api/Blog/blogServices";
import { getTagDisplayName, getTagStyles } from "../../../lib/utils/tagStyles";

const stripMarkdown = (text: string) =>
  text
    .replace(/#{1,6}\s+/g, '')       // headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1')     // italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
    .replace(/`{1,3}.*?`{1,3}/g, '') // code
    .replace(/\n+/g, ' ')            // newlines
    .trim();

export const BlogCard = ({ title, content, created_at, id, tags, image, quick_description=""}: BlogPost) => {
  const plainText = stripMarkdown(content);
  const truncatedContent = plainText.length > 150 
    ? `${plainText.substring(0, 150)}...` 
    : plainText;
  
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
        <img src={image || ""} alt={title} className="h-40 w-full object-cover rounded-md my-4"/>
        <h2 className="text-xl font-bold text-space_cadet mb-2">{title}</h2>
        <p className="text-space_cadet/80 mb-4">{quick_description}</p>
        <p className="text-sm text-space_cadet/70 leading-relaxed">{truncatedContent}</p>
        {/* Tags to help identify */}
        <ul className="flex flex-wrap justify-between gap-2 my-3">
          <li key={`${tags}-${id}`} className={`text-xs rounded-full px-2 py-1 ${getTagStyles(tags)}`}>
            {getTagDisplayName(tags)}
          </li>
          <li>
            <time className="text-sm text-space_cadet/50">{created_at}</time>
          </li>
        </ul>
      </article>
    </Link>
  );
};
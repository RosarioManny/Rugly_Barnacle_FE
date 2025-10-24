import { Header } from "../../components/layout/_header"
import { formatCartDate } from "../../lib/utils/dateFormtater"
import { ReturnToTop } from "../../components/ui/buttons"
// import { BlogPost } from "./blogPost"
import { BlogCard } from "./components/blogCards"
// import 

export interface Blog {
  id: number,
  title: string,
  description: string,
  created_at: string,
  tags: string[],
}

const date = new Date()
const fomattedDate = formatCartDate(date)
const TempBlogs = [
  {
    id: 1,
    title: "My Craziest Rug Yet!",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, illum. Earum nemo libero accusamus dicta! Pariatur autem reprehenderit sint expedita accusamus doloremque numquam earum, nihil consequuntur impedit enim quia vero?",
    created_at: (fomattedDate),
    tags: [ "Personal", "Rug Making", "Events", "Inspiration" ]
  },
  {
    id: 2,
    title: "The time a fan gave me inspiration!",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, illum. Earum nemo libero accusamus dicta! Pariatur autem reprehenderit sint expedita accusamus doloremque numquam earum, nihil consequuntur impedit enim quia vero?",
    created_at: (fomattedDate),
    tags: [ "Rug Making", "Inspiraton"]
  },
  {
    id: 3,
    title: "Why do I create my tufts?",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, illum. Earum nemo libero accusamus dicta! Pariatur autem reprehenderit sint expedita accusamus doloremque numquam earum, nihil consequuntur impedit enim quia vero?",
    created_at: (fomattedDate),
    tags: [ "Personal"]
  },
]
export const Blog = () => {

  return (
  <main className="min-h-screen bg-fleece mb-36 md:mb-48">
    <Header 
    title="Blog"
    tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
    />

    {/* Blog List - organized by most recent */}
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex mb-6 justify-center items-center ">
        <img 
          className="flex items-center mr-4 size-10 " 
          src="/assets/design/icons/X_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
        <h1 className="text-3xl font-bold text-space_cadet ">The Rugly Blogs</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TempBlogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </section>
    <ReturnToTop />
  </main>
);
}
import { Header } from "../../components/layout/_header"
import { useEffect, useState } from "react"
// import { formatCartDate } from "../../lib/utils/dateFormtater"
import { ReturnToTop } from "../../components/ui/buttons"
import { getBlogDetails, getBlogs } from "../../lib/api/Blog/blogServices"
import type { BlogPost } from "../../lib/api/Blog/blogServices"
import { BlogCard } from "./components/blogCards"



export const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState< 'loading' | 'error' | 'success' | 'idle' >('idle');

  useEffect(() => {
    fetchBlogs();

    
  }, [])

  const fetchBlogs = async () => {
    try {
      setStatus('loading');
      const data = await getBlogs();
      setBlogs(data)
      setStatus('success');
    } catch(err) {
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  }

  console.log("Checking single blog >>",blogs[0])
  console.log("Check >>",typeof(blogs[0]?.id))
  return (
  <main className="min-h-screen bg-fleece mb-36 md:mb-48">
    <Header 
    title="Blog"
    tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
    />
    <section>
      <div>
        <p> Upcoming everts? Go to  events page  </p>
        <p>Status:: {status}</p>
      </div>
    </section>
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
        {blogs && (
          blogs.map((blog, idx) => (
            <BlogCard 
            key={idx}
            content={blog.content}
            title={blog.title}
            created_at={blog.created_at}
            tags={blog.tags}
            id={blog.id}
            />
          ))
        )}
      </div>
    </section>
    <ReturnToTop />
  </main>
);
}
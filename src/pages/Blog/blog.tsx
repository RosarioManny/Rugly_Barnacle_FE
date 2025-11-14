import { Header } from "../../components/layout/_header"
import { useEffect, useState } from "react"
import { ReturnToTop } from "../../components/ui/buttons"
import { getBlogs } from "../../lib/api/Blog/blogServices"
import type { BlogPost } from "../../lib/api/Blog/blogServices"
import { BlogCard } from "./components/blogCards"
import { BallOfYarnIcon, DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"

export const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('success');

  useEffect(() => {
    fetchBlogs();
    console.log(blogs.length)

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

  
  // Loading State
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header 
          title="Blog"
          tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
        />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex mb-6 justify-center items-center">
            <img 
              className="flex items-center mr-4 size-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" 
            />
            <h1 className="text-3xl font-bold text-space_cadet">The Rugly Blogs</h1>
          </div>
          
          {/* Skeleton Loading */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-majorelle p-4 animate-pulse">
                <div className="h-6 bg-space_cadet/30 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-space_cadet/30 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-space_cadet/30 rounded"></div>
                  <div className="h-4 bg-space_cadet/30 rounded w-5/6"></div>
                  <div className="h-4 bg-space_cadet/30 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ReturnToTop />
      </main>
    )
  }

  // Error State
  if (status === 'error') {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header 
          title="Blog"
          tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
        />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex mb-6 justify-center items-center">
            <img 
              className="flex items-center mr-4 size-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" 
            />
            <h1 className="text-3xl font-bold text-space_cadet">The Rugly Blogs</h1>
          </div>
          
          <div className="text-center py-12">
            <div className="bg-bittersweet/10 border border-bittersweet items-center rounded-lg p-8 max-w-md mx-auto">
              <div className="text-bittersweet flex items-center justify-center text-6xl mb-4">
                <DangerIcon />
              </div>
              <h2 className="text-xl font-semibold text-space_cadet mb-2">
                Unable to Load Blogs
              </h2>
              <p className="text-space_cadet mb-4">
                Sorry, we encountered an error while loading the blog posts.
              </p>
              <button
                onClick={fetchBlogs}
                className="bg-bittersweet/70 hover:bg-bittersweet duration-300 ease-in-out text-white px-4 py-2 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
        <ReturnToTop />
      </main>
    )
  }

  // Empty State
  if (status === 'success' && blogs.length === 0) {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header 
          title="Blog"
          tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
        />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex mb-6 justify-center items-center">
            <img 
              className="flex items-center mr-4 size-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" 
            />
            <h1 className="text-3xl font-bold text-space_cadet">The Rugly Blogs</h1>
          </div>
          
          <div className="text-center py-4">
            <div className="bg-majorelle/10 border border-majorelle rounded-lg p-10 max-w-md mx-auto">
              <div className="flex justify-center mb-4 ">
                <BallOfYarnIcon className="yarn-animation fill-space_cadet"/>
              </div>
              <h2 className="text-xl font-semibold text-space_cadet mb-2">
                No Blog Posts Yet
              </h2>
              <p className="text-space_cadet">
                Check back soon for new articles and updates!
              </p>
            </div>
          </div>
        </section>
        <ReturnToTop />
      </main>
    )
  }

  // Success State
  return (
    <main className="min-h-screen bg-fleece mb-36 md:mb-48">
      <Header 
        title="Blog"
        tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
      />
      
      {/* Blog List - organized by most recent */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex mb-6 justify-center items-center">
          <img 
            className="flex items-center mr-4 size-10" 
            src="/assets/design/icons/X_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" 
          />
          <h1 className="text-3xl font-bold text-space_cadet">The Rugly Blogs</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, idx) => (
            <BlogCard 
              key={blog.id || idx}
              content={blog.content}
              title={blog.title}
              created_at={blog.created_at}
              tags={blog.tags}
              id={blog.id}
            />
          ))}
        </div>
      </section>
      <ReturnToTop />
    </main>
  );
}
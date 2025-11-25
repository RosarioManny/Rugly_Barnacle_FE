import { Header } from "../../components/layout/_header"
import { formatCartDate } from "../../lib/utils/dateFormtater"
import { ReturnToTop } from "../../components/ui/buttons"
import { getBlogDetails, type BlogPost } from "../../lib/api/Blog/blogServices"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getTagStyles } from "../../lib/utils/tagStyles"
import { socialMediaLogos } from "../../lib/utils/socialMedias"

export const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState<BlogPost | null>(null)
  const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('idle')
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) {
        console.error("No ID found in URL parameters");
        setStatus('error')
        return;
      }
      try {
        setStatus("loading");
        const numericId = Number(id);
        
        if (isNaN(numericId)) {
          throw new Error('Invalid blog ID');
        }

        const data = await getBlogDetails(numericId);
        setBlogDetails(data);
        setStatus("success");
      } 
      catch (err: any) {
        setStatus("error")
        console.error(err.message)
      } 
      finally {
        setStatus("idle")
      }
    }

    fetchBlogDetails();
  }, [id])

  
  // Loading State
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header title="Loading..." />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-space_cadet/50 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-space_cadet/50 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-space_cadet/50 rounded"></div>
              <div className="h-4 bg-space_cadet/50 rounded"></div>
              <div className="h-4 bg-space_cadet/50 rounded w-5/6"></div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  // Error State
  if (status === 'error') {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header title="Error" />
        <section className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-bittersweet/20 border border-bittersweet rounded-lg p-6">
            <h2 className="text-xl font-semibold text-bittersweet mb-2">
              Unable to Load Blog Post
            </h2>
            <p className="text-red-600">
              Sorry, we couldn't find the blog post you're looking for.
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-fleece mb-36 md:mb-48">
      <Header 
        title={blogDetails ? blogDetails.title : "The Rugly Barnacle Blog"}
      />

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div>
          <Link 
            className="
            object-fit
            w-fit pb-3
            group pointer duration-200  transform pb-3
            transition-color hover:text-bittersweet 
            flex gap-2 items-center" 
            to='/blog'>
            <div className={`
              caret-left text-space_cadet
              duration-200
              group-hover:text-bittersweet 
              text-fleece body_text 
              `} 
            />
              Back 
          </Link>
        </div>
        {blogDetails ? (
          <article className="bg-white rounded-lg shadow-sm border border-majorelle p-6 md:p-8">
            {/* Header Section */}
            <header className="border-b text-center border-majorelle pb-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-majorelle mb-4">
                {blogDetails.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-space_cadet">
                {/* Published Date */}
                <div className="flex items-center gap-1">
                  <span className="font-medium">Published:</span>
                  <time dateTime={blogDetails.created_at}>
                    {formatCartDate(blogDetails.created_at)}
                  </time>
                </div>

                {/* Tags */}
                {blogDetails.tags && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {blogDetails.tags.split(',').map((tag, index) => (
                        <span 
                          key={index}
                          className={`inline-blockpx-2 p-2 rounded text-xs ${getTagStyles(tag)}`}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Content Section */}
            <div className="prose prose-lg max-w-none">
              {/* Render content with proper formatting */}
              {blogDetails.content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ) : (
                  <br key={index} />
                )
              ))}
            </div>

            {/* Links Section */}
          {blogDetails.links && blogDetails.links.length > 0 && (
            <footer className="mt-8 pt-6 border-t border-space_cadet grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ">
            
                {/* Related Links Section */}
                <div className="lg:pr-4">
                  <h3 className="font-semibold text-space_cadet/90 mb-4 text-lg sm:text-xl">
                    Related Links
                  </h3>
                  <ul className="space-y-3">
                    {blogDetails.links.map((link, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-majorelle/70 mr-2 mt-1 flex-shrink-0">•</span>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-majorelle/70 hover:text-majorelle underline transition-colors break-words text-sm sm:text-base"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Social Media Section */}
                <div className="flex flex-col items-start md:items-end justify-end">
                  <ul className="flex items-center justify-center md:justify-end space-x-4 sm:space-x-6 w-full">
                    {socialMediaLogos.map(({ Social }, idx) => (
                      <li key={idx} className="flex justify-center">
                        <Social className="hover:text-majorelle" />
                      </li>
                    ))}
                  </ul>
                </div>

            </footer>
          )}
          </article>
        ) : (
          <div className="text-center py-12">
            <p className="text-space_cadet/60 text-lg font-semibold">No blog post found.</p>
          </div>
        )}
      </section>
      <ReturnToTop />
    </main>
  )
}
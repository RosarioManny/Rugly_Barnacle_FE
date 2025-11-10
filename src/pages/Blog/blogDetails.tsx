import { Header } from "../../components/layout/_header"
import { formatCartDate } from "../../lib/utils/dateFormtater"
import { ReturnToTop } from "../../components/ui/buttons"
import { getBlogDetails, type BlogPost } from "../../lib/api/Blog/blogServices"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




export const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState<BlogPost | null>(null)
  const [status, setStatus] = useState< 'loading' | 'error' | 'success' | 'idle' >('idle')

  // useParams returns an object, you need to extract the id
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

  
  return (
  <main className="min-h-screen bg-fleece mb-36 md:mb-48">
    <Header 
    title={blogDetails ? blogDetails?.title : "The Rugly Barnacle Blog"}
    tagline="Where I talk about Rugly Barnacle, events, ideas & more!"
    />

    {/* Blog List - organized by most recent */}
    <section className="max-w-4xl mx-auto px-4 py-8">
      {blogDetails ? (
        <p>Blog Details found</p>
      ) : (
        <p>No Blog Details</p>
      )}
    </section>
    <ReturnToTop />
  </main>
);
}
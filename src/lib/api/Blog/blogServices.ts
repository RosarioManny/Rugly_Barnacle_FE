import api from "../apiConfig";

// BlogPost Object
export interface BlogPost {
  id: number,
  title: string,
  tags: string ,
  content: string,
  created_at: string,
  links: string[], // <- Array of Strings
}

// Get a list of blogs
export const getBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await api.get<BlogPost[]>('blogs/');
    console.log("Response Data",response.data)
    return response.data
  }
  catch(err: any) {
    console.error("Error fetching blogs:", err.response?.data?.error || err.message )
    throw err
  }

}
// Get a specific blog

export const getBlogDetails = async ( blogPostId: number ): Promise<BlogPost> => {
  try {
    const response = await api.get<BlogPost>(`blogs/${blogPostId}`);
    return response.data
  }
  catch(err: any) {
    console.error("Error fetching blog details:", err.response?.data?.error || err.message )
    throw err
  }
}
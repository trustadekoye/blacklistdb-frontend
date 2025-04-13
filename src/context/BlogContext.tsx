import React, { createContext, useContext, useState, ReactNode } from "react";
import { client } from "../lib/sanity";

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  author?: {
    name: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  body: any;
  publishedAt: string;
  readTime?: string;
  featured?: boolean;
};

interface BlogContextProps {
  posts: Post[];
  featuredPost: Post | undefined;
  regularPosts: Post[];
  isLoading: boolean;
  error: Error | null;
  fetchPosts: (limit?: number) => Promise<void>;
  searchPosts: (searchTerm: string) => Post[];
}

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Find featured post, if any
  const featuredPost = posts.find((post) => post.featured);

  // Get regular posts (non-featured)
  const regularPosts = featuredPost
    ? posts.filter((post) => post._id !== featuredPost._id)
    : posts;

  // Function to fetch posts with optional limit
  const fetchPosts = async (limit?: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build the sanity query
      let query = `*[_type == "post"] | order(publishedAt desc)`;

      // Add limit if provided
      if (limit) {
        query += `[0...${limit}]`;
      }

      // Add fields to fetch
      query += `{
        _id, 
        title, 
        slug, 
        "excerpt": pt::text(body[0..1]), 
        "author": author->{name},
        featured,
        "readTime": select(
          length(pt::text(body)) < 2000 => "3 min read",
          length(pt::text(body)) < 4000 => "5 min read",
          length(pt::text(body)) < 8000 => "8 min read",
          "10+ min read"
        ),
        body, 
        publishedAt, 
        mainImage{ 
          asset->{ 
            url 
          } 
        }
        }`;

      const data = await client.fetch<Post[]>(query);
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("We're experience some issues, try reloading the page.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search posts based on search term
  const searchPosts = (searchTerm: string): Post[] => {
    if (!searchTerm.trim()) return regularPosts;

    return regularPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt &&
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  };

  const value = {
    posts,
    featuredPost,
    regularPosts,
    isLoading,
    error,
    fetchPosts,
    searchPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

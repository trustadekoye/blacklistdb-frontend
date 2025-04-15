import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Calendar,
  User,
  Clock,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import { client } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { formatDate } from "../utils/formatDate";
import TwitterEmbed from "./TwitterEmbed";
import { isTweetUrl } from "../utils/tweetHelpers";
import TwitterFollowCard from "./TwitterFollowCard";

// Define types for Sanity content
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
    bio?: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  body: any;
  publishedAt: string;
  readTime?: string;
  categories?: {
    title: string;
  }[];
  relatedPosts?: Post[];
};

// Portable Text components
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <img
            src={value.asset.url}
            alt={value.alt || "Blog image"}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    // Twitter embeds
    twitterEmbed: ({ value }: any) => {
      return <TwitterEmbed tweetUrl={value.url} />;
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }: any) => {
      // Check if this block might contain a Twitter link
      if (
        children &&
        children.length === 1 &&
        typeof children[0] === "object" &&
        children[0].props?.value?.includes &&
        (children[0].props.value.includes("twitter.com/") ||
          children[0].props.value.includes("x.com/")) &&
        children[0].props.value.includes("status/")
      ) {
        return <TwitterEmbed tweetUrl={children[0].props.value} />;
      }

      // For normal text blocks, use a paragraph
      return (
        <p className="text-gray-700 font-regular mb-6 leading-relaxed">
          {children}
        </p>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#812018] pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 font-regular">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 font-regular">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      // If this is a Twitter status URL, render it as an embed
      if (isTweetUrl(value.href)) {
        return <TwitterEmbed tweetUrl={value.href} />;
      }

      // Otherwise, render as a normal link
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#812018] underline hover:text-red-800 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
};

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      try {
        // Fetch post details
        const data = await client.fetch<Post>(
          `*[_type == "post" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            "excerpt": pt::text(body[0..1]),
            "author": author->{
              name,
              bio,
              "image": image.asset->url
            },
            "readTime": select(
              length(pt::text(body)) < 2000 => "3 min read",
              length(pt::text(body)) < 4000 => "5 min read",
              length(pt::text(body)) < 8000 => "8 min read",
              "10+ min read"
            ),
            body,
            publishedAt,
            "categories": categories[]->{ title },
            mainImage{
              asset->{
                url
              }
            }
          }`,
          { slug }
        );

        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Handle social sharing
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://x.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(post?.title || "")}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  // Component for share buttons
  const ShareButtons = () => (
    <div className="flex space-x-2">
      <button
        onClick={shareOnFacebook}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={20} />
      </button>
      <button
        onClick={shareOnTwitter}
        className="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={20} />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </button>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#812018] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  // If post not found
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center text-[#812018] font-medium hover:underline"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to all articles
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Back button and breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 mt-6">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center text-gray-600 hover:text-[#812018] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all articles
          </button>
        </div>
      </div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-8 pb-4"
      >
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-100 text-[#812018] text-xs px-3 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-y-4 border-b border-gray-200 pb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              {post.author?.image ? (
                <img
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full p-2 text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-medium">
                {post.author?.name || "BlacklistDB Team"}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span className="mr-3">{formatDate(post.publishedAt)}</span>
                <Clock size={14} className="mr-1" />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
              <ShareButtons />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Article Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-8">
            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.mainImage?.asset?.url || "/placeholder-1200x600.jpg"}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>

            {/* Tags */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                      liked
                        ? "bg-red-50 border-red-200 text-[#812018]"
                        : "border-gray-200 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <ThumbsUp
                      size={18}
                      className={liked ? "fill-current" : ""}
                    />
                    <span>{liked ? "Liked" : "Like"}</span>
                  </button>

                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                      bookmarked
                        ? "bg-blue-50 border-blue-200 text-blue-600"
                        : "border-gray-200 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <Bookmark
                      size={18}
                      className={bookmarked ? "fill-current" : ""}
                    />
                    <span>{bookmarked ? "Saved" : "Save"}</span>
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Share:</span>
                  <ShareButtons />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <TwitterFollowCard />

              {/* Newsletter Sign-up */}
              <div className="p-6 bg-[#812018] text-white rounded-xl">
                <h3 className="text-xl font-bold mb-3">Stay Protected</h3>
                <p className="mb-4 font-regular">
                  Subscribe to receive the latest scam alerts and safety tips
                  directly to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="border w-full px-4 py-3 rounded-lg text-white border-white font-regular"
                  />
                  <button className="w-full bg-white text-[#812018] font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostDetail;

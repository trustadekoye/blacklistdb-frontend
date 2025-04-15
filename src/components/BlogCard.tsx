import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Calendar, Clock } from "lucide-react";

// Define props type for the BlogCard component
export interface BlogCardProps {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  date: string;
  author?: string;
  imageUrl: string;
  readTime?: string;
  featured?: boolean;
  compact?: boolean;
  className?: string;
  variants?: any;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  slug,
  date,
  author = "BlacklistDB Team",
  imageUrl,
  readTime = "5 min read",
  featured = false,
  compact = false,
  className = "",
  variants,
}) => {
  const cardVariants = variants || {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  // If excerpt is too long, truncate it (as a fallback for CSS truncation)
  const truncatedExcerpt =
    excerpt && excerpt.length > 150
      ? excerpt.substring(0, 150) + "..."
      : excerpt;

  // Determine base URL - assuming the base path is /blog unless compact mode is used
  const baseUrl = "/blog/";

  return (
    <motion.div
      key={id}
      variants={cardVariants}
      whileHover="hover"
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow ${className}`}
    >
      <div className={`${compact ? "h-48" : "h-56"} overflow-hidden relative`}>
        <img
          src={imageUrl || "/api/placeholder/800/500"}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {compact && readTime && (
          <div className="absolute top-4 right-4 bg-[#812018] text-white px-3 py-1 rounded-full text-sm">
            {readTime}
          </div>
        )}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#812018] text-white text-xs px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        {!compact && (
          <a href={`${baseUrl}${slug}`}>
            <h3 className="text-xl font-bold mb-3 cursor-pointer line-clamp-2">
              {title}
            </h3>
          </a>
        )}

        {compact && (
          <>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Calendar size={16} className="mr-2" />
              <span>{date}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 line-clamp-2">{title}</h3>
          </>
        )}

        {excerpt && (
          <p
            className={`text-gray-600 ${
              compact ? "line-clamp-3" : "text-sm"
            } mb-4 font-regular`}
          >
            {truncatedExcerpt}
          </p>
        )}

        {!compact && (
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <User size={14} className="mr-1" />
            <span className="mr-3">{author}</span>
            <Calendar size={14} className="mr-1" />
            <span className="mr-3">{date}</span>
            <Clock size={14} className="mr-1" />
            <span>{readTime}</span>
          </div>
        )}

        <a
          href={`${baseUrl}${slug}`}
          className="flex items-center text-[#812018] text-sm font-medium hover:underline"
        >
          Read more
          <ArrowRight size={14} className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default BlogCard;

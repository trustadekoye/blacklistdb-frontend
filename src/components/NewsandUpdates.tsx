import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useBlog } from "../context/BlogContext";
import BlogCard from "./BlogCard";
import { formatDate } from "../utils/formatDate";

const NewsUpdatesSection: React.FC = () => {
  const { regularPosts, isLoading, fetchPosts } = useBlog();

  useEffect(() => {
    // Fetch only the latest 3 posts
    fetchPosts(3);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="container mx-auto px-4 py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">
          Latest <span className="text-[#812018]">News & Updates</span>
        </h2>
        <p className="text-gray-600 font-regular max-w-2xl mx-auto">
          Find out about how people have been scammed, learn from their
          mistakes, get updates as they unfold.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#812018] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {regularPosts.map((post) => (
            <BlogCard
              key={post._id}
              id={post._id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug.current}
              date={formatDate(post.publishedAt)}
              author={post.author?.name}
              imageUrl={post.mainImage?.asset?.url}
              readTime={post.readTime}
              compact={true}
              variants={itemVariants}
              className="border"
            />
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mt-12"
      >
        <a href="/blog">
          <button className="bg-[#812018] text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
            View All Blog Posts
          </button>
        </a>
      </motion.div>
    </section>
  );
};

export default NewsUpdatesSection;

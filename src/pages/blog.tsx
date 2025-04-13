import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../context/BlogContext";

const BlogPage: React.FC = () => {
  const { featuredPost, isLoading, fetchPosts, searchPosts } = useBlog();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = searchPosts(searchTerm);

  useEffect(() => {
    // Fetch all posts when the component mounts
    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">
          Blog & <span className="text-[#812018]">Updates</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl font-regular text-gray-600 leading-relaxed">
          Stay informed with the latest scam alerts, prevention tips, community
          stories, and updates from BlacklistDB to keep yourself and your loved
          ones protected.
        </p>
      </motion.div>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#812018] focus:border-transparent"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto overflow-hidden">
                <img
                  src={
                    featuredPost.mainImage?.asset?.url ||
                    "/api/placeholder/800/500"
                  }
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-[#812018] text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt ||
                    "Read this featured article from BlacklistDB."}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User size={16} className="mr-1" />
                  <span className="mr-4">
                    {featuredPost.author?.name || "BlacklistDB Team"}
                  </span>
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <Clock size={16} className="mr-1" />
                  <span>{featuredPost.readTime || "5 min read"}</span>
                </div>
                <a
                  href={`/blog/${featuredPost.slug.current}`}
                  className="flex items-center text-[#812018] font-medium hover:underline"
                >
                  Read full article
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#812018] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      )}

      {/* Blog Posts Grid */}
      {!isLoading && (
        <section className="container mx-auto px-4 py-8 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
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
                variants={itemVariants}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Stay <span className="text-[#812018]">Informed</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest scam alerts,
            educational content, and community updates directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#812018] focus:border-transparent"
            />
            <button className="bg-[#812018] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BlogPage;

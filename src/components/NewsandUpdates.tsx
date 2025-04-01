import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Blog1 from "../assets/images/image-one.png";
import Blog2 from "../assets/images/image-two.png";
import Blog3 from "../assets/images/image-three.png";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  readTime?: string;
}

const NewsUpdatesSection: React.FC = () => {
  // Placeholder data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Top 10 Scams to Watch Out for in 2024",
      excerpt:
        "A comprehensive guide to the most prevalent online scams this year and how to protect yourself.",
      date: "March 15, 2024",
      author: "Sarah Johnson",
      imageUrl: Blog1,
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "How to Spot a Phishing Email: Expert Tips",
      excerpt:
        "Learn the red flags and techniques to identify and avoid sophisticated phishing attempts.",
      date: "February 20, 2024",
      author: "Michael Chen",
      imageUrl: Blog2,
      readTime: "4 min read",
    },
    {
      id: "3",
      title: "Cryptocurrency Scams: What You Need to Know",
      excerpt:
        "An in-depth look at the latest trends in crypto fraud and how investors can protect their assets.",
      date: "January 10, 2024",
      author: "Emily Rodriguez",
      imageUrl: Blog3,
      readTime: "6 min read",
    },
  ];

  const contiainerVariants = {
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

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={contiainerVariants}
        className="grid md:grid-cols-3 gap-8"
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover="hover"
            className="bg-white border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#812018] text-white px-3 py-1 rounded-full text-sm">
                {post.readTime}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>

              <h3 className="text-xl font-bold mb-3 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3 font-regular">
                {post.excerpt}
              </p>

              <button className="flex items-center font-regular cursor-pointer text-[#812018] hover:underline">
                Read More
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mt-12"
      >
        <button className="bg-[#812018] text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
          View All Blog Posts
        </button>
      </motion.div>
    </section>
  );
};

export default NewsUpdatesSection;

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Eye, Lock, Globe, FileSearch } from "lucide-react";
import CommunityImage from "../assets/images/community.jpg";
import JourneyImage from "../assets/images/journey.jpg";

const AboutUsPage: React.FC = () => {
  const valueCards = [
    {
      icon: Shield,
      title: "Rigorous Verification",
      description:
        "Every scam report undergoes a comprehensive verification process to ensure accuracy and reliability.",
      color: "text-green-600",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description:
        "We offer anonymous reporting and prioritize the confidentiality of our community members.",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "A united platform where individuals collaborate to combat fraud and protect each other.",
      color: "text-purple-600",
    },
    {
      icon: Globe,
      title: "Digital Safety",
      description:
        "Our mission is to create a safer online environment by empowering users with knowledge.",
      color: "text-red-600",
    },
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">
          About <span className="text-[#812018]">BlacklistDB</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl font-regular text-gray-600 leading-relaxed">
          Uniting individuals to combat fraud, protect communities, and create a
          safer digital world through collective wisdom and transparency.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="text-[#812018]">Journey</span>
            </h2>
            <p className="text-gray-600 mb-4 font-regular text-justify leading-relaxed">
              Our journey began with a simple idea: to create a space where
              individuals could unite against the ever-evolving landscape of
              scams and fraud. We believe that by harnessing the collective
              wisdom of our community, we can build a stronger defense against
              deception.
            </p>
            <p className="text-gray-600 font-regular text-justify leading-relaxed">
              What sets us apart is our commitment to transparency, integrity,
              and user empowerment. Every report submitted to The BlacklistDB
              undergoes rigorous verification to ensure accuracy and
              reliability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={JourneyImage}
              alt="Our Mission"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-[#812018]">Core Values</span>
          </h2>
          <p className="max-w-2xl mx-auto font-regular text-gray-600">
            We are driven by a set of fundamental principles that guide our
            mission to protect and empower our community.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-8"
        >
          {valueCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <div className={`mb-4 flex justify-center ${card.color}`}>
                <card.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="text-[#812018]">Community</span>
            </h2>
            <p className="text-gray-600 mb-4 font-regular text-justify leading-relaxed">
              BlacklistDB is more than just a database of scam reports. It's a
              vibrant community of individuals who are passionate about
              protecting themselves and others from falling victim to fraud.
            </p>
            <p className="text-gray-600 font-regular text-justify leading-relaxed">
              Through our platform, users can access valuable resources, stay
              updated on emerging scams, and connect with like-minded
              individuals who share a common goal: to create a safer digital
              environment for all.
            </p>
            <div className="mt-8">
              <button className="bg-[#812018] text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Join Our Community
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={CommunityImage}
              alt="Our Community"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

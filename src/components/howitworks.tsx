import { FileText, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const HowItWorksSection: React.FC = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stepsData = [
    {
      icon: FileText,
      title: "Report Scam",
      description:
        "Fill the form and submit all details about how you were scammed including the scammer's details",
      color: "text-red-600",
    },
    {
      icon: ShieldCheck,
      title: "Fact Check",
      description:
        "Our team verifies and validates submitted scam reports to ensure accuracy and authenticity.",
      color: "text-green-600",
    },
    {
      icon: Search,
      title: "Access and Stay Informed",
      description:
        "Once verified, reported scams are added to our searchable database, accessible to all users.",
      color: "text-blue-600",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20 bg-gray-50">
      {/* Heading and Subtext */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          How <span className="text-[#812018]">It Works</span>
        </h2>
        <p className="text-gray-600 font-regular max-w-2xl mx-auto">
          Our streamlined process helps you quickly report and learn about
          potential scams
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-8">
        {stepsData.map((step, index) => (
          <motion.div
            key={index}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div
              className={`mb-6 flex items-center justify-center ${step.color}`}
            >
              <step.icon size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How can I contribute to TheFraudFinder?",
      answer:
        "There are several ways you can contribute and help us, you can start by reporting scammers so we update our database regularly, you could also spread awareness so people are aware of us or donate to our mission using our donate page.",
    },
    {
      question: "What do I do if I suspect I'm about to be scammed?",
      answer:
        "You can crosscheck the vendor's name on our Scammer's List, and if you spot their name or phone number on our list, then that vendor has likely scammed someone before and is a potential scammer.",
    },
    {
      question: "How can I check if an Instagram page has scammed someone?",
      answer:
        "It's simple! Go to our scammer's list page and search for the vendor's instagram handle with our search bar.",
    },
    {
      question: "How do you make sure you do not damage people's reputation?",
      answer:
        "When a scammer is reported, we ensure to reach out to the person to clear the allegations against them and if they're unresponsive, we publish their details on our database and list.",
    },
    {
      question: "Can I stay updated on scam reports?",
      answer:
        "Yes, you can subscribe to our newsletter to receive update whenever we publish a scammer.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const contiainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">
          Frequently <span className="text-[#812018]">Asked Questions</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto flex items-center justify-center">
          <HelpCircle className="mr-2 text-[#812018] font-regular" size={24} />
          Get answers to questions you might have in mind. We’re here for you!
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={contiainerVariants}
        className="max-w-4xl mx-auto"
      >
        {faqs.map((faq, index) => (
          <motion.div key={index} variants={itemVariants} className="mb-4">
            <motion.div
              onClick={() => toggleFAQ(index)}
              className="bg-white p-5 rounded-lg shadow-md cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-lg font-bold">{faq.question}</h3>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  className={`text-[#812018] ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  className="bg-white rounded-b-lg p-5 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
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
        <p className="text-gray-600 mb-4">
          Didn't find the answer you were looking for?
        </p>
        <button className="bg-[#812018] text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
          Contact Us
        </button>
      </motion.div>
    </section>
  );
};

export default FAQSection;

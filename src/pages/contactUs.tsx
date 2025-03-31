import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, User, MessageCircle } from "lucide-react";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form Submitted", formData);
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <div className="bg-white">
      {/* Contact Hero */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">
          Contact <span className="text-[#812018]">Us</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl font-regular text-gray-600 leading-relaxed">
          Have questions, suggestions, or need assistance? We're here to help.
          Reach out to us and let's work together to combat fraud.
        </p>
      </motion.div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="mr-4 text-[#812018]" size={24} />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">theblacklistdb@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="mr-4 text-[#812018]" size={24} />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">+234 705 746 6230</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-600">
                Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#812018]"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-gray-600">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#812018]"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-gray-600">
                Subject
              </label>
              <div className="relative">
                <MessageCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#812018]"
                  placeholder="Subject of your message"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#812018]"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#812018] text-white p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Send className="mr-2" size={20} />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUsPage;

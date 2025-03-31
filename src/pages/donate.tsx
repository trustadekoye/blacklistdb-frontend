import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Heart,
  CreditCard,
  ShieldCheck,
  Award,
  Globe,
} from "lucide-react";

const DonatePage: React.FC = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const donationAmounts = [100, 200, 500, 1000, 5000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount =
      selectedAmount || (customAmount ? parseFloat(customAmount) : null);

    if (finalAmount) {
      // TODO: Implement donation processing logic
      console.log("Donation Amount:", finalAmount);
      alert(`Thank you for your generous donation of N${finalAmount}!`);
    } else {
      alert("Please select or enter a donation amount");
    }
  };

  return (
    <div className="bg-white">
      {/* Donation Hero */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">
          Support <span className="text-[#812018]">TheBlacklistDB</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed font-regular">
          Your donation helps us continue our mission of protecting consumers,
          exposing scams, and building a safer digital community.
        </p>
      </motion.div>

      {/* Donation Content */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Your Impact</h2>

          <div className="space-y-6">
            <div className="flex items-center">
              <ShieldCheck className="mr-4 text-[#812018]" size={24} />
              <div>
                <p className="font-bold">Fraud Prevention</p>
                <p className="text-gray-600 font-regular">
                  Support our efforts to verify and expose potential scams
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Globe className="mr-4 text-[#812018]" size={24} />
              <div>
                <p className="font-bold">Community Protection</p>
                <p className="text-gray-600 font-regular">
                  Help us expand our database and reach more potential victims
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Award className="mr-4 text-[#812018]" size={24} />
              <div>
                <p className="font-bold">Educational Resources</p>
                <p className="text-gray-600 font-regular">
                  Develop and distribute fraud awareness materials
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Make a Donation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="mb-4 text-gray-600 font-regular">
                Select Donation Amount
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`
                      p-3 rounded-lg border-2 transition-all
                      ${
                        selectedAmount === amount
                          ? "bg-[#812018] text-white border-[#812018]"
                          : "border-gray-300 text-gray-700 hover:border-[#812018]"
                      }
                    `}
                  >
                    N{amount}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="customAmount"
                className="block mb-2 text-gray-600 font-regular"
              >
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="customAmount"
                  name="customAmount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  min="1"
                  step="0.01"
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#812018]"
                  placeholder="Enter custom amount"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="paymentMethod"
                className="block mb-2 text-gray-600 font-regular"
              >
                Payment Method
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  id="paymentMethod"
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#812018]"
                >
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#812018] text-white p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Heart className="mr-2" size={20} />
              Donate Now
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;

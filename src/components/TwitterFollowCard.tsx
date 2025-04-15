import { Twitter } from "lucide-react";
import React from "react";

const TwitterFollowCard: React.FC = () => {
  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-xl">
      <h3 className="text-lg font-bold mb-4">Follow Us on Twitter</h3>

      {/* Twitter profile preview */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-[#812018] overflow-hidden mr-3 flex items-center justify-center">
          <Twitter size={20} className="text-white" />
        </div>
        <div>
          <p className="font-medium">@TheBlacklistDB</p>
          <p className="text-sm text-gray-600">
            Empowering Shoppers | Exposing Scams
          </p>
        </div>
      </div>

      {/* Brief description */}
      <p className="text-gray-700 font-regular mb-4">
        Follow us for real-time alerts about new scams, safety tips, and
        updates.
      </p>

      {/* Latest tweets preview */}
      <div className="space-y-3 mb-4">
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 font-regular">
            Report those scammers to us today! Visit link in our bio to get
            started.
          </p>
          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
        </div>
      </div>

      {/* Follow button */}
      <a
        href="https://twitter.com/theblacklistdb"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-[#1DA1F2] text-white font-medium px-4 py-3 rounded-lg hover:bg-[#1a91da] transition-colors"
      >
        <Twitter size={18} className="mr-2" />
        Follow @TheBlacklistDB
      </a>
    </div>
  );
};

export default TwitterFollowCard;

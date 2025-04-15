import React from "react";
import { Tweet } from "react-tweet";

interface TwitterEmbedProps {
  tweetUrl: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetUrl }) => {
  // Extract the tweet ID from the URL
  const getTweetId = (url: string): string => {
    // Handle both twitter.com and x.com URLs
    const regex = /(?:twitter|x)\.com\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const tweetId = getTweetId(tweetUrl);

  if (!tweetId) {
    return (
      <div className="my-4 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-600">
        Invalid tweet URL format
      </div>
    );
  }

  return (
    <div className="my-4 tweet-container">
      <Tweet id={tweetId} />
    </div>
  );
};

export default TwitterEmbed;


export const isTweetUrl = (url: string): boolean => {
  return (
    (url.includes("twitter.com/") || url.includes("x.com/")) &&
    url.includes("status/")
  );
};

export const extractTweetId = (url: string): string | null => {
  const match = url.match(/(?:twitter|x)\.com\/\w+\/status\/(\d+)/);
  return match ? match[1] : null;
};
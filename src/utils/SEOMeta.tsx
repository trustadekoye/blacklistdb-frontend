// src/components/SEOMeta.tsx
import React, { useEffect } from "react";

type SEOMetaProps = {
  title: string;
  description?: string;
  imageUrl?: string;
  canonicalUrl: string;
  type?: "website" | "article";
  publishedAt?: string;
  authorName?: string;
  tags?: string[];
  twitterHandle?: string;
  siteName?: string;
};

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  imageUrl,
  canonicalUrl,
  type = "article",
  publishedAt,
  authorName,
  tags = [],
  twitterHandle = "@theBlacklistDB",
  siteName = "TheBlacklistDB",
}) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | ${siteName}`;

    // Update meta tags
    updateMetaTag("description", description);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", imageUrl, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", siteName, true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image", true);
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", imageUrl, true);
    updateMetaTag("twitter:site", twitterHandle, true);

    // Article specific tags
    if (type === "article") {
      if (publishedAt)
        updateMetaTag("article:published_time", publishedAt, true);
      if (authorName) updateMetaTag("article:author", authorName, true);
      tags.forEach((tag) => {
        const element = document.createElement("meta");
        element.setAttribute("property", "article:tag");
        element.setAttribute("content", tag);
        element.setAttribute("data-seo-tag", "true");
        document.head.appendChild(element);
      });
    }

    // Set canonical link
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalElement) {
      canonicalElement.setAttribute("href", canonicalUrl);
    } else {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      canonicalElement.setAttribute("href", canonicalUrl);
      canonicalElement.setAttribute("data-seo-tag", "true");
      document.head.appendChild(canonicalElement);
    }

    // Add JSON-LD structured data
    const jsonLdScript = document.createElement("script");
    jsonLdScript.setAttribute("type", "application/ld+json");
    jsonLdScript.setAttribute("data-seo-tag", "true");

    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "BlogPosting" : "WebPage",
      headline: title,
      image: imageUrl,
      url: canonicalUrl,
      datePublished: publishedAt,
      description: description,
      author: authorName
        ? {
            "@type": "Person",
            name: authorName,
          }
        : undefined,
      publisher: {
        "@type": "Organization",
        name: siteName,
        logo: {
          "@type": "ImageObject",
          url: `${new URL(canonicalUrl).origin}/logo.png`,
        },
      },
    };

    jsonLdScript.textContent = JSON.stringify(jsonLdData);
    document.head.appendChild(jsonLdScript);

    // Cleanup function to remove added tags
    return () => {
      document.querySelectorAll('[data-seo-tag="true"]').forEach((el) => {
        el.parentNode?.removeChild(el);
      });

      // Remove JSON-LD script
      const scripts = document.querySelectorAll('script[data-seo-tag="true"]');
      scripts.forEach((script) => {
        script.parentNode?.removeChild(script);
      });
    };
  }, [
    title,
    description,
    imageUrl,
    canonicalUrl,
    type,
    publishedAt,
    authorName,
    tags,
    twitterHandle,
    siteName,
  ]);

  // Helper function to update meta tags
  function updateMetaTag(name: string, content?: string, isProperty = false) {
    if (!content) return;

    const attr = isProperty ? "property" : "name";
    let element = document.querySelector(`meta[${attr}="${name}"]`);

    if (element) {
      element.setAttribute("content", content);
    } else {
      element = document.createElement("meta");
      element.setAttribute(attr, name);
      element.setAttribute("content", content);
      element.setAttribute("data-seo-tag", "true");
      document.head.appendChild(element);
    }
  }

  return null; // This component doesn't render anything
};

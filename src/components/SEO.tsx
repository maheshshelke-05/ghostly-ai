'use client';

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = "Ghostly AI - Best Free Stealth AI Copilot for Technical Interviews", 
  description = "Ghostly AI is the most powerful free, invisible, screen-share proof AI copilot for technical interviews. Real-time live audio transcription and AI assistance.",
  keywords = "Ghostly AI, Mahesh Shelke, AI Interview Copilot, Technical Interview assistant, Screen-share proof AI, Stealth AI, DevOps Engineer Pune, Cloud Engineer India",
  image = "/og-image.png",
  url = "https://ghostly.ai"
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mahesh Shelke" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
    </Helmet>
  );
}

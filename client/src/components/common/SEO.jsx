import { useEffect } from "react";

export default function SEO({
  title = "Cybergram",
  description = "Cybergram cyber awareness platform",
  keywords = "cybergram, cyber security, scam alerts"
}) {

  useEffect(() => {

    // Title
    document.title = title;

    // Description
    let descTag = document.querySelector("meta[name='description']");
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", description);

    // Keywords
    let keyTag = document.querySelector("meta[name='keywords']");
    if (!keyTag) {
      keyTag = document.createElement("meta");
      keyTag.setAttribute("name", "keywords");
      document.head.appendChild(keyTag);
    }
    keyTag.setAttribute("content", keywords);

  }, [title, description, keywords]);

  return null;
}

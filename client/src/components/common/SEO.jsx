import { useEffect } from "react";

export default function SEO({
  title = "Cybergram – Stay Digitally Safe",
  description = "Cybergram is a cyber awareness platform to report scams, stay safe online, and get real-time cyber alerts.",
  keywords = "cybergram, cyber security, cyber crime, scam alerts, online safety",
  image = "/cybergram-logo.png",
  url = window.location.href
}) {

  useEffect(() => {

    /* ================= TITLE ================= */
    document.title = title;

    /* ================= BASIC META ================= */

    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);

    /* ================= VIEWPORT SAFETY ================= */
    let viewport = document.querySelector("meta[name='viewport']");
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.setAttribute("name", "viewport");
      document.head.appendChild(viewport);
    }
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0"
    );

    /* ================= OPEN GRAPH ================= */

    const setOG = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setOG("og:title", title);
    setOG("og:description", description);
    setOG("og:image", image);
    setOG("og:url", url);
    setOG("og:type", "website");

    /* ================= TWITTER ================= */

    const setTwitter = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setTwitter("twitter:card", "summary_large_image");
    setTwitter("twitter:title", title);
    setTwitter("twitter:description", description);
    setTwitter("twitter:image", image);

  }, [title, description, keywords, image, url]);

  return null;
}

import axios from "axios";

export const getCyberNews = async (req, res) => {

  try {

    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q:
            "online fraud OR cyber fraud OR phishing scam OR banking fraud OR UPI fraud OR identity theft OR digital scam",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 12,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    const keywords = [
      "fraud",
      "scam",
      "phishing",
      "hack",
      "breach",
      "upi",
      "bank",
      "cyber crime",
      "identity",
      "theft"
    ];

    const articles = response.data.articles
      .filter(item => {
        const text = `${item.title} ${item.description || ""}`.toLowerCase();
        return keywords.some(word => text.includes(word));
      })
      .map(item => ({
  title: item.title,
  description: item.description,
  image: item.urlToImage,
  source: item.source.name,
  url: item.url,
  publishedAt: item.publishedAt
}));


    res.status(200).json({
      success: true,
      articles
    });

  } catch (error) {

    console.error("NEWS ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Fraud cyber news fetch failed"
    });

  }

};

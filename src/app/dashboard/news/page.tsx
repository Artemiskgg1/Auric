"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || "";
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=earthquake OR flood OR cyclone&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

export default function DisasterNews() {
  const [indiaNews, setIndiaNews] = useState<any[]>([]);
  const [globalNews, setGlobalNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();

        const indiaRelated = data.articles
          .filter((article: any) =>
            ["India", "Earthquake", "Rainfall", "Flood", "Cyclone"].some(
              (keyword) => article.title.includes(keyword)
            )
          )
          .slice(0, 6);

        const otherDisasters = data.articles
          .filter((article: any) => !indiaRelated.includes(article))
          .slice(0, 6);

        setIndiaNews(indiaRelated);
        setGlobalNews(otherDisasters);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-5">
        📰 Latest Disaster News
      </h2>

      {/* India-Specific News */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">🇮🇳 India-Specific News</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-56 w-full rounded-lg" />
              ))
            : indiaNews.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
        </div>
      </section>

      {/* Global Disaster News */}
      <section>
        <h3 className="text-xl font-semibold mb-3">🌍 Global Disaster News</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-56 w-full rounded-lg" />
              ))
            : globalNews.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
        </div>
      </section>
    </div>
  );
}

const NewsCard = ({ article }: { article: any }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="p-0">
        <img
          src={article.urlToImage || "/placeholder.jpg"}
          alt={article.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {article.title}
        </CardTitle>
        <p className="text-sm text-gray-500">
          {article.source.name} •{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-blue-500 hover:underline text-sm"
        >
          Read more →
        </a>
      </CardContent>
    </Card>
  );
};

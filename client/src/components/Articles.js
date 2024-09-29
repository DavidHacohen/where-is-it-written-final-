import React, { useEffect, useState } from "react";
import "../assets/stylesheets/Articles.css";
import Nav from "./Nav";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Articles");
      console.log("חחח", response.data);

      setArticles(response.data);
      setLoading(false);
      console.log("חחח", response.data);
      console.log(articles.article_name);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to fetch articles");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const ExpandArticle = (content) => {
    alert(content);
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Nav className="nav" />
      <div className="articles-container">
        {/* Display the most recent article */}
        {articles.length > 0 && (
          <div className="main-article">
            <h2>{articles[0].article_name}</h2>
            <h3>{articles[0].article_subject}</h3>
            <p>{articles[0].article_content}</p>
          </div>
        )}

        {/* Display the rest of the articles */}
        <div className="other-articles">
          {articles.slice(1).map((article) => (
            <div key={article.article_id} className="article-card">
              <h3>{article.article_name}</h3>
              <h4>{article.article_subject}</h4>
              <button onClick={() => ExpandArticle(article.article_content)}>
                הרחב
              </button>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Articles;

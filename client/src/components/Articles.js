import React from "react";
import "../assets/stylesheets/Articles.css";
import Nav from "./Nav";


const Articles = () => {
  // Sample articles data, you can replace this with fetched data
  const articles = [
    {
      title: "Article Title 1",
      description: "Brief description of article 1...",
      link: "/article-link-1",
    },
    {
      title: "Article Title 2",
      description: "Brief description of article 2...",
      link: "/article-link-2",
    },
    {
      title: "Article Title 3",
      description: "Brief description of article 3...",
      link: "/article-link-3",
    },
    // Add more articles here
  ];

  return (
    <>
      <Nav className="nav" />
      <section className="articles-page">
        {/* Main Article */}
        <div className="main-article">
          <h2>Latest Article</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <a href="/article-link">Read more</a>
        </div>

        {/* Other Articles */}
        <div className="other-articles">
          {articles.map((article, index) => (
            <article key={index} className="article-box">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.link}>Read more</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Articles;

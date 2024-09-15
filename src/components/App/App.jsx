import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ArticleList from "../ArticleList/ArticleList";

import { ProgressBar } from "react-loader-spinner";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );

        setArticles(response.data.hits);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>

      {loading && (
        <ProgressBar
          visible={true}
          height="180"
          width="280"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}

      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}

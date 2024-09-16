import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ArticleList from "../ArticleList/ArticleList";

import { fetchArticlesWithTopic } from "../../articles-api";

import { ProgressBar } from "react-loader-spinner";
import SearchForm from "../SearchForm/SearchForm";

export default function App() {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);

      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   async function fetchArticles() {
  //     try {
  //       setLoading(true);

  //       const data = await fetchArticlesWithTopic("react");
  //       setArticles(data);
  //     } catch (error) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }

  //     // try {
  //     //   setLoading(true);

  //     //   const response = await axios.get(
  //     //     "https://hn.algolia.com/api/v1/search1?query=react"
  //     //   );

  //     //   setArticles(response.data.hits);
  //     // } catch (error) {
  //     //   setError(true);
  //     // } finally {
  //     //   setLoading(false);
  //     // }
  //   }

  //   fetchArticles();
  // }, []);

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <h1>Latest articles</h1>
      {loading && <ProgressBar />}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}

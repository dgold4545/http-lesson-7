import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ArticleList from "../ArticleList/ArticleList";

import { fetchArticlesWithTopic } from "../../articles-api";

import { ProgressBar } from "react-loader-spinner";
import SearchFormGIT from "../SearchFormGIT/SearchFormGIT";
import SearchForm from "../SearchFormGIT/SearchFormGIT";

import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);

  const [topic, setTopic] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getArtigles() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchArticlesWithTopic(topic, page);

        setArticles((prevArticles) => {
          return [...prevArticles, ...res.articles];
        });

        setTotalPages(res.totalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getArtigles();
  }, [topic, page]);

  const handleSearch = (newTopic) => {
    setTopic(newTopic);
    setPage(1);
    setArticles([]);

    toast.success("Search request!");
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h1>HTTP requests in React</h1>

      <Toaster position="top-center" reverseOrder={false} />

      <SearchForm onSearch={handleSearch} />
      {articles.length > 0 && <ArticleList items={articles} />}

      {error && <b>ERROR!!!</b>}
      {loading && <ProgressBar />}

      {page >= totalPages && <b>Oops... END OF COLLECTION!!!!</b>}

      {articles.length > 0 && !loading && page <= totalPages && (
        <button type="button" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}

///http://hn.algolia.com/api/v1/search
//objectID
//title
//url

// useEffect(() => {
//   async function fetchArticles() {
//     const response = await axios.get("http://hn.algolia.com/api/v1/search");

//     const newArticles = response.data.hits;

//     setArticles(newArticles);
//   }

//   fetchArticles();
// }, []);

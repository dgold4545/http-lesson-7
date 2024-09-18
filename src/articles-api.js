import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

export const fetchArticlesWithTopic = async (topic, page) => {
  // const response = await axios.get(
  //   `/search?query=${topic}&page=${page}&hitsPerPage=5`
  // );

  const response = await axios.get("/search", {
    params: {
      query: topic,
      page,
      hitsPerPage: 7,
    },
  });

  return {
    articles: response.data.hits,
    totalPages: response.data.nbPages,
  };
};

import React from "react";
import Article from "../Article/Article";

export default function ArticleList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <Article key={item.objectID} itemData={item} />
      ))}
    </ul>
  );
}

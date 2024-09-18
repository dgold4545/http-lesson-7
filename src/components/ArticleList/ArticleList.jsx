import css from "./ArticleList.module.css";
import Article from "../Article/Article";

export default function ArticleList({ items }) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.objectID}>
          <a
            className={css.link}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

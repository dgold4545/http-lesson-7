export default function Article({ itemData }) {
  return (
    <a href={itemData.url} target="_blank" rel="noopener noreferrer">
      {itemData.title}
    </a>
  );
}

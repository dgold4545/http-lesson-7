export default function SearchForm({ onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === "") {
      alert("Please enter search term!");
      return;
    }

    onSearch(topic);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Search atricles..." />
      <button type="submit">Search</button>
    </form>
  );
}

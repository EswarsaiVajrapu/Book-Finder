import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooks([]);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();
      if (data.docs.length === 0) {
        setError('No books found.');
      } else {
        setBooks(data.docs);
      }
    } catch {
      setError('Error fetching data.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Book Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter book title"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="books-list">
        {books.map(book => (
          <div className="book-card" key={book.key}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
            <div>
              <h3>{book.title}</h3>
              <p>Author: {book.author_name?.join(', ') || 'Unknown'}</p>
              <p>Year: {book.first_publish_year || 'N/A'}</p>
              <p>Publisher: {book.publisher?.[0] || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const query = document.querySelector('.search-input').value;
    const genre = document.querySelector('.genre-dropdown').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Loading...';
        console.log("Searching query - " + query);
  
    try {
      const response = await fetch(`/api/books/search?q=${encodeURIComponent(query)}&genre=${encodeURIComponent(genre)}`);
      const data = await response.json();
  
      if (data.docs.length === 0) {
        resultsContainer.innerHTML = 'No books found.';
        return;
      }
  
      resultsContainer.innerHTML = data.docs.map(book => `
        <div class="book-card">
          <h3>${book.title}</h3>
          <p>Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
          <p>First Published: ${book.first_publish_year || 'N/A'}</p>
          <p>Genre: ${genre || 'N/A'}</p>
        </div>
      `).join('');
    } catch (error) {
      resultsContainer.innerHTML = 'Error fetching books.';
    }
  });
  
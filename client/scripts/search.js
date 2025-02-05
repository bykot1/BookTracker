document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.querySelector('#title-search-input').value.replace(/ /g, "+");
    const author = document.querySelector('#author-search-input').value.replace(/ /g, "+");
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = 'Loading...';
  
    try {
        console.log("Query\n" 
            + `/api/books/search?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
        );

        const response = await fetch(`/api/books/search?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`);
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
        </div>
        `).join('');
    } catch (error) {
        resultsContainer.innerHTML = 'Error fetching books.';
    }
  });
  
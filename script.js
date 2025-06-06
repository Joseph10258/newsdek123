// ✅ Replace with your actual GNews API key
const apiKey = '391bc945b3c330720aa3109afd88f2c8';

// Search button event listener
document.getElementById('searchButton').addEventListener('click', function (e) {
  e.preventDefault();
  searchNews();
});

// Load default news on page load
window.onload = function () {
  loadDefaultNews();
};

// ✅ Load default news with keyword "scholarship"
function loadDefaultNews() {
  const url = `https://gnews.io/api/v4/search?q=scholarship&lang=en&max=12&token=${apiKey}`;
  fetchAndDisplay(url);
}

// ✅ Handle search functionality
function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert('Please enter a search term.');
    return;
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=12&token=${apiKey}`;
  fetchAndDisplay(url);
}

// ✅ General fetch and display function
function fetchAndDisplay(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      const blogContainer = document.getElementById('blogContainer');
      blogContainer.innerHTML = ''; // Clear previous content

      if (!articles || articles.length === 0) {
        blogContainer.innerHTML = `
          <div style="text-align:center; font-size:18px; padding:20px;">
            😢 Sorry, no news found for your search. Check your spelling or try another topic.
          </div>`;
        return;
      }

      // ✅ Loop through articles and build news cards
      articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('blog-card');

        card.innerHTML = `
          <img src="${article.image || 'https://via.placeholder.com/600x400'}" alt="News Image">
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank" style="display:block; margin: 12px 0; color: darkgreen;">Read More</a>
        `;

        blogContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      document.getElementById('blogContainer').innerHTML = `
        <div style="text-align:center; font-size:18px; padding:20px;">
          ⚠️ Something went wrong. Try again later.
        </div>`;
    });
}

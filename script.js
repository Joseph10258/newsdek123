const apiKey = '391bc945b3c330720aa3109afd88f2c8';

document.getElementById('searchButton').addEventListener('click', function (e) {
  e.preventDefault();
  searchNews();
});

window.onload = function () {
  loadDefaultNews();
};

function loadDefaultNews() {
  const url = `https://gnews.io/api/v4/search?q=scholarship&lang=en&max=10&apikey=${apiKey}`;
  fetchAndDisplay(url);
}

function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert('Please enter a search term.');
    return;
  }
  const url = `https://gnews.io/api/v4/search?q=scholarship&lang=en&max=10&apikey=${apiKey}`;
  fetchAndDisplay(url, query);
}

function fetchAndDisplay(url, query = '') {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      const blogContainer = document.getElementById('blogContainer');
      blogContainer.innerHTML = '';
      if (data.status !== 'ok') {
    blogContainer.innerHTML = `<div style="text-align:center; font-size:18px; padding:20px;">⚠️ ${data.message}</div>`;
    return;
  }

      if (!articles.length) {
        blogContainer.innerHTML = `<div style="text-align:center; font-size:18px; padding:20px;">😢 No news found for "<strong>${query}</strong>". Try again.</div>`;
        return;
      }

      articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('blog-card');

        card.innerHTML = `
          <img src="${article.urlToImage || 'https://via.placeholder.com/600x400'}" alt="News Image">
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;

        blogContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      document.getElementById('blogContainer').innerHTML = `<div style="text-align:center; font-size:18px; padding:20px;">⚠️ Something went wrong. Try again later.</div>`;
    });
}

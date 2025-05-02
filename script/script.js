document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'wpffzYsobAQgu3rClJ3WDUVcd6wdTat1lK59TWBCiCQJeZhO8Cye0Wis';
  const searchInput = document.querySelector('.search-bar');
  const searchButton = document.querySelector('.search-btn');
  const photoGrid = document.getElementById('photo-grid');

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        fetchPhotos(query);
      }
    }
  });

  searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query) {
      fetchPhotos(query);
    }
  });

  function fetchPhotos(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15`, {
      headers: {
        Authorization: API_KEY
      }
    })
    .then(response => response.json())
    .then(data => {
      displayPhotos(data.photos);
    })
    .catch(error => {
      console.error('Error fetching from Pexels:', error);
    });
  }

  function displayPhotos(photos) {
    photoGrid.innerHTML = '';
    photos.forEach(photo => {
      const link = document.createElement('a');
      link.href = photo.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.src = photo.src.medium;
      img.alt = photo.photographer;
      img.loading = 'lazy';

      link.appendChild(img);
      photoGrid.appendChild(link);
    });
  }
});

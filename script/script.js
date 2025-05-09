document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'wpffzYsobAQgu3rClJ3WDUVcd6wdTat1lK59TWBCiCQJeZhO8Cye0Wis';
  const searchInput = document.querySelector('.search-bar');
  const searchButton = document.querySelector('.search-btn');
  const photoGrid = document.getElementById('photo-grid');
  const viewMoreBtn = document.getElementById('view-more-btn');

  let currentQuery = '';
  let currentPage = 1;
  const perPage = 15;
  let totalResults = 0;

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        currentQuery = query;
        currentPage = 1;
        fetchPhotos(currentQuery, currentPage);
      }
    }
  });

  searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query) {
      currentQuery = query;
      currentPage = 1;
      fetchPhotos(currentQuery, currentPage);
    }
  });

  viewMoreBtn.addEventListener('click', function () {
    if (currentQuery) {
      currentPage++;
      fetchPhotos(currentQuery, currentPage, true);
    }
  });

  function fetchPhotos(query, page, append = false) {
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: API_KEY
      }
    })
    .then(response => response.json())
    .then(data => {
      totalResults = data.total_results || 0;
      if (append) {
        appendPhotos(data.photos);
      } else {
        displayPhotos(data.photos);
      }
      toggleViewMoreButton();
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
  
      const container = document.createElement('div');
      container.className = 'media-item'; // Apply uniform aspect ratio
  
      const img = document.createElement('img');
      img.src = photo.src.medium;
      img.alt = photo.photographer;
      img.loading = 'lazy';
  
      container.appendChild(img);
      link.appendChild(container);
      photoGrid.appendChild(link);
    });
  }
  

function appendPhotos(photos) {
  photos.forEach(photo => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const container = document.createElement('div');
    container.className = 'media-item';

    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.photographer;
    img.loading = 'lazy';

    container.appendChild(img);
    link.appendChild(container);
    photoGrid.appendChild(link);
  });
}


  function toggleViewMoreButton() {
    const shownPhotos = photoGrid.children.length;
    if (shownPhotos < totalResults) {
      viewMoreBtn.style.display = 'block';
    } else {
      viewMoreBtn.style.display = 'none';
    }
  }
});


// Add toggleMenu function to toggle "show" class on navbar for hamburger menu
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('show');
  }
}


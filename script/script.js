function toggleMenu() {
    document.getElementById('navbar').classList.toggle('show');
  }

  const API_KEY = 'wpffzYsobAQgu3rClJ3WDUVcd6wdTat1lK59TWBCiCQJeZhO8Cye0Wis'; // Replace with your actual Pexels key
  const searchInput = document.querySelector('.search-bar');
  const photoGrid = document.getElementById('photo-grid');
  
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        fetchPhotos(query);
      }
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
      const img = document.createElement('img');
      img.src = photo.src.medium;
      img.alt = photo.photographer;
      photoGrid.appendChild(img);
    });
  }
  
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
      const link = document.createElement('a');
      link.href = photo.url; // link to the photo on Pexels
      link.target = '_blank'; // open in new tab
      link.rel = 'noopener noreferrer';
  
      const img = document.createElement('img');
      img.src = photo.src.medium;
      img.alt = photo.photographer;
  
      link.appendChild(img);
      photoGrid.appendChild(link);
    });
  }
  
const caption = document.createElement('p');
caption.innerHTML = `Photo by <a href="${photo.photographer_url}" target="_blank">${photo.photographer}</a>`;
link.appendChild(img);
photoGrid.appendChild(link);
photoGrid.appendChild(caption);

img.loading = 'lazy';

document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'wpffzYsobAQgu3rClJ3WDUVcd6wdTat1lK59TWBCiCQJeZhO8Cye0Wis';
    const grid = document.getElementById('explore-grid');
    const nextBtn = document.getElementById('next-btn');
    let currentPage = 1;
  
    function fetchPhotos(page = 1) {
      fetch(`https://api.pexels.com/v1/curated?per_page=12&page=${page}`, {
        headers: {
          Authorization: API_KEY
        }
      })
      .then(res => res.json())
      .then(data => {
        displayPhotos(data.photos);
      })
      .catch(err => console.error('Error loading curated photos:', err));
    }
  
    function displayPhotos(photos) {
      photos.forEach(photo => {
        const link = document.createElement('a');
        link.href = photo.url;
        link.target = '_blank';
  
        const img = document.createElement('img');
        img.src = photo.src.large;
        img.alt = photo.photographer;
  
        link.appendChild(img);
        grid.appendChild(link);
      });
    }
  
    nextBtn.addEventListener('click', () => {
      currentPage++;
      fetchPhotos(currentPage);
    });
  
    fetchPhotos(currentPage);
  });
  
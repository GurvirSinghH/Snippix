// Add toggleMenu function to toggle "show" class on navbar for hamburger menu
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('show');
  }
}

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
      photos.forEach((photo, index) => {
        const link = document.createElement('a');
        link.href = photo.url;
        link.target = '_blank';
        link.setAttribute('role', 'link');
        link.setAttribute('aria-label', `Photo by ${photo.photographer}`);
        link.setAttribute('tabindex', '0');

        // Add keyboard support for the link
        link.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(photo.url, '_blank');
          }
        });

        const img = document.createElement('img');
        img.src = photo.src.large;
        img.alt = `Photo by ${photo.photographer}: ${photo.alt || 'No description available'}`;
        img.setAttribute('loading', 'lazy');

        // Add photographer credit as a caption
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = `By: ${photo.photographer}`;
        caption.style.fontSize = '12px';
        caption.style.padding = '5px';
        caption.style.textAlign = 'center';

        link.appendChild(img);
        link.appendChild(caption);
        grid.appendChild(link);
      });
    }

    nextBtn.addEventListener('click', () => {
      currentPage++;
      fetchPhotos(currentPage);
    });

    fetchPhotos(currentPage);
  });

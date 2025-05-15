// Add toggleMenu function to toggle "show" class on navbar for hamburger menu
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('show');
  }
}

const API_KEY = 'wpffzYsobAQgu3rClJ3WDUVcd6wdTat1lK59TWBCiCQJeZhO8Cye0Wis';
let page = 1;
let query = '';
const grid = document.getElementById('video-grid');
const viewMoreBtn = document.getElementById('view-more-btn');

async function fetchVideos(query = '', page = 1) {
  const endpoint = query
    ? `https://api.pexels.com/videos/search?query=${query}&per_page=9&page=${page}`
    : `https://api.pexels.com/videos/popular?per_page=9&page=${page}`;
  const response = await fetch(endpoint, {
    headers: {
      Authorization: API_KEY
    }
  });
  const data = await response.json();
  return data.videos;
}

function createVideoElement(video) {
  const container = document.createElement('div');
  container.className = 'media-item';
  container.setAttribute('role', 'figure');
  container.setAttribute('aria-label', `Video by ${video.user.name || 'Unknown'}`);

  const videoEl = document.createElement('video');
  videoEl.controls = true;
  videoEl.preload = 'metadata';
  videoEl.setAttribute('tabindex', '0');
  videoEl.setAttribute('aria-label', `Video by ${video.user.name || 'Unknown'}`);

  // Find the SD quality video file or fallback to the first available
  const videoFile = video.video_files.find(file => file.quality === 'sd') || video.video_files[0];
  videoEl.src = videoFile.link;

  // Add keyboard support for video controls
  videoEl.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
    }
  });

  // Add caption with creator info
  const caption = document.createElement('div');
  caption.className = 'video-caption';
  caption.textContent = `By: ${video.user.name || 'Unknown'}`;
  caption.style.fontSize = '12px';
  caption.style.padding = '5px';
  caption.style.textAlign = 'center';

  container.appendChild(videoEl);
  container.appendChild(caption);

  return container;
}


async function loadVideos() {
  const videos = await fetchVideos(query, page);
  videos.forEach(video => {
    const videoEl = createVideoElement(video);
    grid.appendChild(videoEl);
  });

  if (videos.length > 0) {
    viewMoreBtn.style.display = 'block';
  }
}

function searchVideos() {
  query = document.getElementById('searchInput').value.trim();
  page = 1;
  grid.innerHTML = '';
  loadVideos();
}

function loadMoreVideos() {
  page++;
  loadVideos();
}

window.addEventListener('DOMContentLoaded', loadVideos);

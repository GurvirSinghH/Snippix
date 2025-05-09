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

  const videoEl = document.createElement('video');
  videoEl.controls = true;
  videoEl.src = video.video_files.find(file => file.quality === 'sd').link;
  container.appendChild(videoEl);

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

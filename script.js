document.addEventListener('DOMContentLoaded', () => {
    let mediaData = { images: [], videos: [] };

    // Helper function for fullscreen
    function openFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // Create image card
    function createImageCard(item) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 col-sm-12';
        
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.src}" class="card-img-top" alt="${item.title}" style="height: 250px; object-fit: cover; cursor: pointer;">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                </div>
            </div>
        `;
        
        // Add fullscreen click event
        const img = col.querySelector('img');
        img.addEventListener('click', () => {
            openFullscreen(img);
        });
        
        return col;
    }

    // Create video card
    function createVideoCard(item) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 col-sm-12';
        
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <video class="card-img-top" controls style="height: 250px; object-fit: cover;">
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                </div>
            </div>
        `;
        
        return col;
    }

    // Load all images
    function loadAllImages() {
        const imageGallery = document.getElementById('image-gallery');
        
        for (let i = 0; i < mediaData.images.length; i++) {
            const imageCard = createImageCard(mediaData.images[i]);
            imageGallery.appendChild(imageCard);
        }
    }

    // Load all videos
    function loadAllVideos() {
        const videoGallery = document.getElementById('video-gallery');
        
        for (let i = 0; i < mediaData.videos.length; i++) {
            const videoCard = createVideoCard(mediaData.videos[i]);
            videoGallery.appendChild(videoCard);
        }
    }

    // Initialize galleries
    function initializeGalleries() {
        // Load all images
        if (mediaData.images.length > 0) {
            loadAllImages();
        }
        
        // Load all videos
        if (mediaData.videos.length > 0) {
            loadAllVideos();
        }
        
        // Hide load more buttons
        const loadMoreImagesBtn = document.getElementById('load-more-images');
        const loadMoreVideosBtn = document.getElementById('load-more-videos');
        if (loadMoreImagesBtn) loadMoreImagesBtn.style.display = 'none';
        if (loadMoreVideosBtn) loadMoreVideosBtn.style.display = 'none';
    }

    // Load media data from JSON
    fetch('media.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Loaded media data:', data);
            mediaData = data;
            initializeGalleries();
        })
        .catch(error => {
            console.error('Error loading media data:', error);
            // Show error message to user
            const imageGallery = document.getElementById('image-gallery');
            imageGallery.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center" role="alert">
                        <h4>No media found</h4>
                        <p>Please run <code>make-json.py</code> to scan for media files.</p>
                    </div>
                </div>
            `;
        });

    // Load more buttons are now hidden and not needed
});
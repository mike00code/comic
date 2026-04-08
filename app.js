
// app.js

// Mock Database of Comics
const comics = [
    {
        id: "adventure-to-molecules",
        title: "Adventure to molecules",
        coverImage: "images/c1-2.png",
        pages: [
            "images/c1-1.png",
            "images/c1-2.png",
            "images/c1-3.png",
            "images/c1-4.png",
            "images/c1-5.png",
            "images/c1-6.png",
            "images/c1-7.png",
            "images/c1-8.png",
            "images/c1-9.png",
            "images/c1-10.png",
            "images/c1-11.png"
        ]
    },
    // {
    //     id: "magic-forest",
    //     title: "The Magic Forest",
    //     coverImage: "images/magic_forest_cover_1775668040771.png",
    //     pages: [
    //         "images/space_page_1_1775668077532.png", // Re-using placeholder for demonstration
    //         "images/space_page_1_1775668077532.png"
    //     ]
    // },
    // {
    //     id: "super-dog",
    //     title: "Super Dog Saves The Day",
    //     coverImage: "images/super_dog_cover_1775668058739.png",
    //     pages: [
    //         "images/space_page_1_1775668077532.png",
    //         "images/space_page_1_1775668077532.png",
    //         "images/space_page_1_1775668077532.png"
    //     ]
    // }
];

// Initialize app based on which page we are on
document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the homepage
    const comicGrid = document.getElementById("comic-grid");
    if (comicGrid) {
        renderHomepage(comicGrid);
    }

    // Check if we are on the reader page
    const comicPagesContainer = document.getElementById("comic-pages");
    if (comicPagesContainer) {
        renderComicReader(comicPagesContainer);
    }
});

function renderHomepage(container) {
    container.innerHTML = ""; // Clear existing

    comics.forEach(comic => {
        // Create an anchor tag to wrap the card
        const cardLink = document.createElement("a");
        cardLink.href = `comic.html?id=${comic.id}`;
        cardLink.className = "comic-card";

        cardLink.innerHTML = `
            <img src="${comic.coverImage}" alt="${comic.title} Cover" class="comic-cover">
            <div class="comic-info">
                <h3>${comic.title}</h3>
                <span class="btn-read">Read Now 🚀</span>
            </div>
        `;

        container.appendChild(cardLink);
    });
}

function renderComicReader(container) {
    // Get comic ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get("id");

    const titleElement = document.getElementById("comic-title");

    if (!comicId) {
        titleElement.textContent = "Comic Not Found";
        container.innerHTML = "<p class='loading-placeholder'>Oops! We couldn't find that comic 😢</p>";
        return;
    }

    const comic = comics.find(c => c.id === comicId);

    if (comic) {
        titleElement.textContent = comic.title;
        container.innerHTML = ""; // Clear loader

        // Append images vertically
        comic.pages.forEach((pageSrc, index) => {
            const img = document.createElement("img");
            img.src = pageSrc;
            img.alt = `Page ${index + 1}`;
            img.className = "comic-page-img";
            img.loading = "lazy"; // Optimizes for tablets and mobile devices by lazy loading

            container.appendChild(img);
        });
    } else {
        titleElement.textContent = "Comic Not Found";
        container.innerHTML = "<p class='loading-placeholder'>Oops! We couldn't find that comic 😢</p>";
    }
}


// 1. The Data Source
const destinationsData = [
    {
        id: 1,
        title: "Bali, Indonesia",
        location: "Seminyak",
        category: ["beach", "honeymoon"],
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500&auto=format&fit=crop",
        price: "$899",
        oldPrice: "$1,200",
        rating: "4.9",
        reviews: "2k",
        duration: "7 Days Tour",
        tag: "Best Seller",
        tagColor: "bg-white/90 backdrop-blur text-slate-900"
    },
    {
        id: 2,
        title: "Venice, Italy",
        location: "Grand Canal",
        category: ["city", "honeymoon"],
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=500&auto=format&fit=crop",
        price: "$1,530",
        oldPrice: "$1,800",
        rating: "4.8",
        reviews: "850",
        duration: "5 Days Tour",
        tag: "15% OFF",
        tagColor: "bg-red-500 text-white"
    },
    {
        id: 3,
        title: "Tokyo, Japan",
        location: "Shibuya",
        category: ["city"],
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500&auto=format&fit=crop",
        price: "$1,950",
        oldPrice: "$2,100",
        rating: "4.9",
        reviews: "3.1k",
        duration: "9 Days Tour",
        tag: null, // No tag
        tagColor: ""
    },
    {
        id: 4,
        title: "Swiss Alps",
        location: "Switzerland",
        category: ["mountains", "honeymoon"],
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=500&auto=format&fit=crop",
        price: "$2,200",
        oldPrice: "",
        rating: "5.0",
        reviews: "1.2k",
        duration: "6 Days Tour",
        tag: "Top Rated",
        tagColor: "bg-blue-600 text-white"
    },
    {
        id: 5,
        title: "Cinque Terre",
        location: "Italy",
        category: ["beach", "mountains"],
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=500&auto=format&fit=crop",
        price: "$1,100",
        oldPrice: "",
        rating: "4.7",
        reviews: "500",
        duration: "4 Days Tour",
        tag: null,
        tagColor: ""
    }
];

// 2. DOM Elements
const container = document.getElementById('destinations-container');
const tabs = document.querySelectorAll('.tab-btn');

// 3. Styling Classes
const activeClasses = "bg-black text-white border-transparent";
const inactiveClasses = "bg-white text-slate-700 border-slate-200 hover:bg-slate-100";

// 4. Function to generate HTML for a single card
function createCardHTML(item) {
    // Logic to render the tag (only if it exists)
    const tagHTML = item.tag
        ? `<span class="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded shadow-sm z-10 ${item.tagColor}">${item.tag}</span>`
        : '';

    // Logic to render old price (only if it exists)
    const oldPriceHTML = item.oldPrice
        ? `<p class="text-xs text-slate-500 line-through">${item.oldPrice}</p>`
        : `<p class="text-xs text-transparent select-none">.</p>`; // Keep spacing consistent

    return `
        <div class="flex-none w-[85vw] sm:w-[350px] snap-center group relative bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 fade-in-up">
            <div class="relative h-64 overflow-hidden">
                ${tagHTML}
                <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${item.title}">
                <button class="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition-colors">
                    <i data-lucide="heart" class="h-4 w-4"></i>
                </button>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-lg">${item.title}</h3>
                        <div class="flex items-center text-slate-500 text-sm mt-1">
                            <i data-lucide="map-pin" class="h-3 w-3 mr-1"></i> ${item.location}
                        </div>
                    </div>
                    <div class="text-right">
                        ${oldPriceHTML}
                        <p class="font-bold text-primary">${item.price}</p>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                    <span class="flex items-center text-slate-600">
                        <i data-lucide="star" class="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400"></i> ${item.rating} (${item.reviews})
                    </span>
                    <span class="text-slate-400">${item.duration}</span>
                </div>
            </div>
        </div>
        `;
}

// 5. Render Function
function renderDestinations(category) {
    // Filter data
    const filteredData = category === 'all'
        ? destinationsData
        : destinationsData.filter(item => item.category.includes(category));

    // Clear current content
    container.innerHTML = '';

    // Append new content
    if (filteredData.length === 0) {
        container.innerHTML = `<div class="w-full text-center py-10 text-slate-400">No destinations found for this category.</div>`;
    } else {
        filteredData.forEach(item => {
            container.innerHTML += createCardHTML(item);
        });
    }

    // Reset scroll position to start
    container.scrollLeft = 0;

    // Re-initialize Icons (Lucide specific)
    lucide.createIcons();
}

// 6. Event Listeners
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update Tab Styles
        tabs.forEach(t => {
            t.className = `tab-btn px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${inactiveClasses}`;
        });
        tab.className = `tab-btn px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${activeClasses}`;

        // Render Content
        const category = tab.getAttribute('data-category');
        renderDestinations(category);
    });
});

// 7. Initial Load
renderDestinations('all');
lucide.createIcons();

// Initialize Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const brandText = document.getElementById('brand-text');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Apply white background if scrolled down OR if not on home page
    const isHomePage = !document.getElementById('home').classList.contains('hidden');

    if (window.scrollY > 50 || !isHomePage) {
        // Scrolled State / Non-Home State (White Background)
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('border-transparent', 'py-2');
        brandText.classList.remove('text-white');
        brandText.classList.add('text-black');

        navLinks.forEach(link => {
            link.classList.remove('text-white', 'text-white/90');
            link.classList.add('text-black', 'hover:text-primary');
        });
    } else {
        // Top Home State (Transparent)
        navbar.classList.remove('bg-white', 'shadow-md');
        navbar.classList.add('border-transparent', 'py-2');
        brandText.classList.add('text-white');
        brandText.classList.remove('text-black');

        navLinks.forEach(link => {
            link.classList.add('text-white', 'text-white/90');
            link.classList.remove('text-black', 'hover:text-primary');
        });
    }
});

// Tab Switcher (Inside Hero Section)
function switchTab(tabId) {
    document.querySelectorAll('.hero-tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    const buttons = ['flights', 'hotels', 'cars'];
    buttons.forEach(btn => {
        const el = document.getElementById('btn-' + btn);
        if (btn === tabId) {
            el.className = "w-full py-2 text-sm font-medium leading-5 text-black bg-white rounded-md shadow-sm ring-1 ring-black/5 focus:outline-none transition-all";
        } else {
            el.className = "w-full py-2 text-sm font-medium leading-5 text-gray-500 rounded-md hover:text-black hover:bg-white/60 focus:outline-none transition-all";
        }
    });
}

// Chatbot Toggle
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        chatWindow.classList.add('flex', 'chat-enter');
    } else {
        chatWindow.classList.add('hidden');
        chatWindow.classList.remove('flex', 'chat-enter');
    }
}



// Initialize with home page
document.addEventListener('DOMContentLoaded', function () {
    showPage('home');
});

/* --- MODAL LOGIC --- */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = modal.querySelector('.fixed.inset-0');
    const content = modal.querySelector('.fixed.left-\\[50\\%\\]');

    modal.classList.remove('hidden');

    // Reset classes for animation
    overlay.classList.remove('backdrop-exit');
    overlay.classList.add('backdrop-enter');

    content.classList.remove('modal-exit');
    content.classList.add('modal-enter');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = modal.querySelector('.fixed.inset-0');
    const content = modal.querySelector('.fixed.left-\\[50\\%\\]');

    // Add exit animations
    overlay.classList.remove('backdrop-enter');
    overlay.classList.add('backdrop-exit');

    content.classList.remove('modal-enter');
    content.classList.add('modal-exit');

    // Wait for animation to finish before hiding
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 150);
}

function switchToSignup() {
    closeModal('login-modal');
    setTimeout(() => {
        openModal('signup-modal');
    }, 160); // slight delay for smooth transition
}

function switchToLogin() {
    closeModal('signup-modal');
    setTimeout(() => {
        openModal('login-modal');
    }, 160);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
    }
}



// Data mimicking the style of Image 2
const packages = {
    adventure: [
        {
            title: "Chardham Yatra By Helicopter | Fly To Four Dhams",
            image: "https://images.unsplash.com/photo-1598544606622-42173f4e1957?q=80&w=600&auto=format&fit=crop",
            duration: "5N/6D",
            rating: "4.8",
            locations: "1D Dehradun • 1D Yamunotri • 1D Gangotri • +3",
            price: "199,999",
            oldPrice: "267,999",
            save: "68,000"
        },
        {
            title: "Desert Dreams Of Dubai | The Ultimate 5 Day Journey",
            image: "https://images.unsplash.com/photo-1518684079-3c830dcef6c3?q=80&w=600&auto=format&fit=crop",
            duration: "4N/5D",
            rating: "4.7",
            locations: "5D Dubai",
            price: "37,999",
            oldPrice: "49,999",
            save: "12,000"
        },
        {
            title: "Sunny Mauritius Getaway | Grand Bassin & Nature Trails",
            image: "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?q=80&w=600&auto=format&fit=crop",
            duration: "5N/6D",
            rating: "4.9",
            locations: "6D Mauritius",
            price: "42,999",
            oldPrice: "59,999",
            save: "16,999"
        }
    ],
    honeymoon: [
        {
            title: "Romantic Bali Escape | Private Pool Villa Special",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
            duration: "6N/7D",
            rating: "5.0",
            locations: "3N Ubud • 3N Seminyak",
            price: "45,500",
            oldPrice: "60,000",
            save: "14,500"
        },
        {
            title: "Maldives Water Villa | All Inclusive Luxury",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop",
            duration: "4N/5D",
            rating: "4.9",
            locations: "4N Male Atoll",
            price: "98,999",
            oldPrice: "140,000",
            save: "41,001"
        },
        {
            title: "Swiss Paris Delight | The City of Love",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
            duration: "7N/8D",
            rating: "4.8",
            locations: "3N Paris • 4N Zurich",
            price: "155,000",
            oldPrice: "185,000",
            save: "30,000"
        }
    ],
    spiritual: [
        {
            title: "Varanasi & Ayodhya | A Spiritual Awakening",
            image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop",
            duration: "3N/4D",
            rating: "4.6",
            locations: "2N Varanasi • 1N Ayodhya",
            price: "18,999",
            oldPrice: "25,000",
            save: "6,001"
        },
        {
            title: "Tirupati Balaji Darshan",
            image: "https://images.unsplash.com/photo-1623932883301-49033282b046?q=80&w=600&auto=format&fit=crop",
            duration: "2N/3D",
            rating: "4.7",
            locations: "2N Tirupati",
            price: "12,500",
            oldPrice: "15,000",
            save: "2,500"
        },
        {
            title: "Amarnath Yatra By Helicopter",
            image: "https://images.unsplash.com/photo-1626245353169-269c84917537?q=80&w=600&auto=format&fit=crop",
            duration: "3N/4D",
            rating: "4.8",
            locations: "1N Srinagar • 1N Sonmarg",
            price: "35,000",
            oldPrice: "42,000",
            save: "7,000"
        }
    ],
    leisure: [
        {
            title: "Goa Beach Party & Relax | North & South Tour",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop",
            duration: "4N/5D",
            rating: "4.5",
            locations: "2N North Goa • 2N South Goa",
            price: "15,999",
            oldPrice: "22,000",
            save: "6,001"
        },
        {
            title: "Kerala Backwaters & Houseboat",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop",
            duration: "5N/6D",
            rating: "4.8",
            locations: "2N Munnar • 1N Alleppey",
            price: "28,500",
            oldPrice: "35,000",
            save: "6,500"
        },
        {
            title: "Vietnam Essentials",
            image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=600&auto=format&fit=crop",
            duration: "5N/6D",
            rating: "4.7",
            locations: "2N Hanoi • 1N Halong Bay",
            price: "32,999",
            oldPrice: "45,000",
            save: "12,001"
        }
    ]
};

function renderCards(category) {
    const grid = document.getElementById('card-grid');
    const data = packages[category];

    let html = '';

    data.forEach(pkg => {
        html += `
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow">
                    <div class="relative h-48">
                        <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-full object-cover">
                        <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center">
                            <svg class="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ${pkg.rating}
                        </div>
                        <div class="absolute bottom-3 right-3 bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded shadow-sm">
                            ${pkg.duration}
                        </div>
                    </div>

                    <div class="p-4">
                        <h3 class="font-bold text-lg text-slate-900 leading-snug mb-1 line-clamp-2 min-h-[3.5rem]">${pkg.title}</h3>
                        <p class="text-xs text-slate-500 mb-4 line-clamp-1">${pkg.locations}</p>

                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xl font-bold text-red-600">₹${pkg.price}</span>
                            <span class="text-sm text-slate-400 line-through">₹${pkg.oldPrice}</span>
                            <span class="text-xs text-slate-500">/ Adult</span>
                        </div>
                        <div class="inline-block bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200 mb-4">
                            SAVE ₹${pkg.save}
                        </div>

                        <div class="flex gap-2">
                            <button class="bg-[#ff5722] hover:bg-orange-600 text-white p-2.5 rounded-lg transition-colors shadow-md shadow-orange-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </button>
                            <button class="flex-1 border border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-white font-medium py-2 rounded-lg transition-all text-sm">
                                Get in Touch
                            </button>
                        </div>
                    </div>
                </div>
                `;
    });

    grid.innerHTML = html;
}

function switchTab(category) {
    // 1. Reset all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        // Remove Active Styles
        btn.classList.remove('bg-[#ff5722]', 'text-white', 'shadow-md');
        // Add Inactive Styles
        btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
    });

    // 2. Set Active Button
    const activeBtn = document.getElementById(`tab-${category}`);
    activeBtn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
    activeBtn.classList.add('bg-[#ff5722]', 'text-white', 'shadow-md');

    // 3. Render Content
    renderCards(category);
}

// Initialize with Adventure
document.addEventListener('DOMContentLoaded', () => {
    renderCards('adventure');
});


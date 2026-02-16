import { interests, startTopics, contentCards } from './data.js';

// DOM Elements
const screens = {
    interests: document.getElementById('onboarding-interests'),
    start: document.getElementById('onboarding-start'),
    age: document.getElementById('onboarding-age'),
    feed: document.getElementById('main-feed')
};

const containers = {
    interestsGrid: document.getElementById('interests-grid'),
    startList: document.getElementById('start-topics-list'),
    ageList: document.getElementById('age-list'),
    feedTrack: document.getElementById('feed-track')
};

const state = {
    selectedInterests: new Set(),
    startTopic: null,
    age: null
};

// --- Initialization ---
function init() {
    renderInterests();
    renderStartTopics();
    attachEventListeners();
}

// --- Rendering ---
function renderInterests() {
    containers.interestsGrid.innerHTML = interests.map(item => `
        <div class="chip" data-id="${item.id}">
            ${item.text}
        </div>
    `).join('');

    // Chip selection logic
    containers.interestsGrid.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('selected');
            const id = chip.dataset.id;
            if (state.selectedInterests.has(id)) {
                state.selectedInterests.delete(id);
            } else {
                state.selectedInterests.add(id);
            }
        });
    });
}

function renderStartTopics() {
    containers.startList.innerHTML = startTopics.map(item => `
        <button class="list-item" data-id="${item.id}">
            <span class="emoji">${item.icon}</span>
            <span>${item.text}</span>
        </button>
    `).join('');

    // Start topic selection logic
    containers.startList.querySelectorAll('.list-item').forEach(btn => {
        btn.addEventListener('click', () => {
            state.startTopic = btn.dataset.id;
            goToScreen('age');
        });
    });
}

// --- API Integration (OpenAlex) ---
async function fetchResearchPapers(topic) {
    const baseUrl = 'https://api.openalex.org/works';
    const query = topic ? topic.toLowerCase() : 'science';

    // We search for works with the specific concept/topic in title or abstract
    // filter=has_abstract:true ensures we get content to show
    const url = `${baseUrl}?search=${query}&filter=has_abstract:true&sample=20&select=title,publication_year,abstract_inverted_index,id,primary_location,authorships`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(cleanOpenAlexData);
    } catch (error) {
        console.error("API Error:", error);
        return []; // Fallback to empty if fails
    }
}

// Helper to reconstruct abstract from inverted index
function reconstructAbstract(invertedIndex) {
    if (!invertedIndex) return "No abstract available.";

    const wordList = [];
    Object.entries(invertedIndex).forEach(([word, positions]) => {
        positions.forEach(pos => {
            wordList[pos] = word;
        });
    });

    // Truncate to first 300 chars for the card
    const fullText = wordList.join(' ');
    if (fullText.length > 250) {
        return fullText.substring(0, 250) + "...";
    }
    return fullText;
}

function cleanOpenAlexData(work) {
    return {
        id: work.id,
        category: work.primary_location?.source?.display_name || "Research",
        tag: "Science Fact",
        title: work.title,
        text: reconstructAbstract(work.abstract_inverted_index),
        year: work.publication_year,
        // OpenAlex doesn't always provide images, so we use abstract gradients/patterns or a placeholder
        image: null
    };
}

// --- Feed Logic ---
async function renderFeed() {
    containers.feedTrack.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;">Scanning global research database...</div>';

    // FETCH REAL DATA
    const apiData = await fetchResearchPapers(state.startTopic);

    // Mix with local data if API returns few results, or just use API
    const displayData = apiData.length > 0 ? apiData : contentCards;

    containers.feedTrack.innerHTML = displayData.map((card, index) => {
        const bgStyle = card.image
            ? `background-image: url('${card.image}'); background-size: cover;`
            : `background: linear-gradient(${Math.random() * 360}deg, #2d3436, #000000);`;

        return `
        <article class="card">
            <!-- Glass Card Content -->
            <div class="card-glass">
                <div class="card-meta">
                    <span class="card-tag">${card.category.substring(0, 20)}</span>
                    <span class="card-year">${card.year || ''}</span>
                </div>
                
                <h2 class="card-title">${card.title}</h2>
                <p class="card-abstract">${card.text}</p>
                
                <div class="card-actions">
                    <button class="action-btn" title="Save to Library">🔖</button>
                    <button class="action-btn" title="Read Full Paper">📖</button>
                    <button class="action-btn" title="Share">📤</button>
                </div>
            </div>
        </article>
    `}).join('');

    // Scroll to top
    containers.feedTrack.scrollTop = 0;
}

// --- Navigation ---
function goToScreen(screenName) {
    const current = document.querySelector('.screen.active');
    const next = screens[screenName];

    if (current && next) {
        current.classList.remove('active');
        current.classList.add('prev');

        next.classList.remove('next');
        next.classList.add('active');
    }

    // Lifecycle hooks
    if (screenName === 'feed') {
        renderFeed();
    }
}

function attachEventListeners() {
    // Interest Screen Next Button
    document.getElementById('btn-next-1').addEventListener('click', () => {
        goToScreen('start');
    });

    // Back Buttons (Simulated for single page feeling)
    document.getElementById('btn-back-2').addEventListener('click', () => {
        navigateBack('interests');
    });

    document.getElementById('btn-back-3').addEventListener('click', () => {
        navigateBack('start');
    });

    // Age Selection
    containers.ageList.querySelectorAll('.list-item').forEach(btn => {
        btn.addEventListener('click', () => {
            state.age = btn.dataset.age;
            goToScreen('feed');
        });
    });
}

function navigateBack(targetScreen) {
    const current = document.querySelector('.screen.active');
    const target = screens[targetScreen];

    current.classList.remove('active');
    current.classList.add('next');

    target.classList.remove('prev');
    target.classList.add('active');
}

// Run init
init();

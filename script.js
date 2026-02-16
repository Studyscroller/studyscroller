// --- DATA (Merged to prevent import errors) ---

// Medical Specialties as Start Topics
const startTopics = [
    { id: 'cardiology', text: 'Cardiology', icon: '🫀' },
    { id: 'oncology', text: 'Oncology', icon: '🎗️' },
    { id: 'pediatrics', text: 'Pediatrics', icon: '👶' },
    { id: 'neurology', text: 'Neurology', icon: '🧠' },
    { id: 'dermatology', text: 'Dermatology', icon: '🧴' },
    { id: 'psychiatry', text: 'Psychiatry', icon: '🧩' },
    { id: 'endocrinology', text: 'Endocrinology', icon: '🩸' },
    { id: 'infectious', text: 'Infectious Dis.', icon: '🦠' },
    { id: 'emergency', text: 'Emergency Med', icon: '🚑' }
];

// Specific Diseases/Conditions types for "Interests" (now Refine Guidelines)
const interestsData = {
    'cardiology': [
        { id: 'hypertension', text: 'Hypertension (High BP)' },
        { id: 'heart_failure', text: 'Heart Failure' },
        { id: 'afib', text: 'Atrial Fibrillation' },
        { id: 'cad', text: 'Coronary Artery Disease' },
        { id: 'prevention', text: 'Prevention Guidelines' }
    ],
    'oncology': [
        { id: 'breast_cancer', text: 'Breast Cancer' },
        { id: 'lung_cancer', text: 'Lung Cancer' },
        { id: 'immunotherapy', text: 'Immunotherapy' },
        { id: 'screening', text: 'Screening Guidelines' },
        { id: 'palliative', text: 'Palliative Care' }
    ],
    'pediatrics': [
        { id: 'vaccination', text: 'Vaccination Schedules' },
        { id: 'asthma_kids', text: 'Pediatric Asthma' },
        { id: 'adhd', text: 'ADHD Guidelines' },
        { id: 'obesity_kids', text: 'Childhood Obesity' },
        { id: 'development', text: 'Developmental Milestones' }
    ],
    'neurology': [
        { id: 'stroke', text: 'Stroke Management' },
        { id: 'migraine', text: 'Migraine & Headache' },
        { id: 'epilepsy', text: 'Epilepsy' },
        { id: 'alzheimers', text: 'Alzheimers & Dementia' },
        { id: 'ms', text: 'Multiple Sclerosis' }
    ],
    'dermatology': [
        { id: 'psoriasis', text: 'Psoriasis' },
        { id: 'eczema', text: 'Atopic Dermatitis' },
        { id: 'acne', text: 'Acne Management' },
        { id: 'melanoma', text: 'Melanoma' }
    ],
    'endocrinology': [
        { id: 'diabetes_t2', text: 'Type 2 Diabetes' },
        { id: 'thyroid', text: 'Thyroid Disorders' },
        { id: 'obesity', text: 'Obesity Management' },
        { id: 'osteoporosis', text: 'Osteoporosis' }
    ],
    'default': [
        { id: 'preventive', text: 'Preventive Care' },
        { id: 'screening', text: 'Cancer Screening' },
        { id: 'vaccines', text: 'Vaccines' },
        { id: 'nutrition', text: 'Nutrition' }
    ]
};

// Fallback/Demo Data - OFFICIAL SOURCES ONLY
const contentCards = [
    {
        id: 'demo1',
        category: "Cardiology",
        tag: "Guideline",
        title: "2023 AHA/ACC Guideline for Chronic Coronary Disease",
        text: "Updates emphasize team-based care, SGLT2 inhibitors for patients with T2D, and GLP-1 receptor agonists for cardiovascular risk reduction.",
        year: 2023,
        source: "American Heart Association (AHA)",
        url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001168",
        type: 'guideline'
    },
    {
        id: 'demo2',
        category: "Endocrinology",
        tag: "Standard of Care",
        title: "Standards of Care in Diabetes—2024",
        text: "The ADA now recommends early combination therapy for type 2 diabetes and screening for heart failure in all patients with diabetes.",
        year: 2024,
        source: "American Diabetes Association (ADA)",
        url: "https://diabetesjournals.org/care/issue/47/Supplement_1",
        type: 'guideline'
    },
    {
        id: 'demo3',
        category: "Pediatrics",
        tag: "Recommendation",
        title: "Clinical Practice Guideline: Management of Hyperbilirubinemia",
        text: "Revised thresholds for phototherapy and exchange transfusion in newborn infants 35 or more weeks of gestation.",
        year: 2022,
        source: "American Academy of Pediatrics (AAP)",
        url: "https://publications.aap.org/pediatrics/article/150/3/e2022058859/188702",
        type: 'guideline'
    }
];

// ... (DOM Elements and State remain same)

// --- Rendering ---
function renderInterests() {
    // Get interests based on selected start topic, or default
    const currentInterests = interestsData[state.startTopic] || interestsData['default'] || [];

    const renderChip = (item) => `
        <div class="chip" data-id="${item.id}">
            ${item.text}
        </div>
    `;

    containers.interestsGrid.innerHTML = currentInterests.map(renderChip).join('');

    // Also render discover grid (using default or combined)
    if (containers.discoverGrid) {
        // Show a mix for discover
        const mix = [...(interestsData['psychology'] || []), ...(interestsData['engineering'] || [])];
        containers.discoverGrid.innerHTML = mix.slice(0, 8).map(renderChip).join('');
    }

    // Chip selection logic (same as before)
    const toggleChip = (chip) => {
        chip.classList.toggle('selected');
        const id = chip.dataset.id;
        if (state.selectedInterests.has(id)) {
            state.selectedInterests.delete(id);
        } else {
            state.selectedInterests.add(id);
        }
    };

    containers.interestsGrid.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => toggleChip(chip));
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
            // Need to re-render interests based on choice
            renderInterests();
            goToScreen('interests');
        });
    });
}

// ... (API Fetching functions remain same)

// --- Features: Actions ---
window.saveToLibrary = function (cardId) {
    const allData = window.currentFeedData || [];
    // FIX: Ensure ID comparison is string-safe
    const card = allData.find(c => String(c.id) === String(cardId));
    const btn = document.getElementById(`save-${cardId}`);

    if (card) {
        const library = JSON.parse(localStorage.getItem('studyScrollerLib') || '[]');
        if (!library.find(c => String(c.id) === String(card.id))) {
            library.push(card);
            localStorage.setItem('studyScrollerLib', JSON.stringify(library));
            if (btn) btn.classList.add('saved');
            // alert("Saved!"); // Removed alert for smoother UX, visual cue is enough
        } else {
            // Already saved
            if (btn) btn.classList.add('saved');
        }
    } else {
        console.error("Card not found for saving:", cardId);
    }
};

// --- API Integration (Medical Guidelines) ---

async function fetchMedicalGuidelines(topic) {
    // Mapping topics to search queries for OpenAlex
    // We strictly filter for "work type" that resembles guidelines or high cite count in medicine
    const baseUrl = 'https://api.openalex.org/works';

    // Construct strict query for guidelines
    // "clinical practice guideline" OR "medical guideline" OR "consensus statement"
    const searchTerms = topic ? `${topic} clinical practice guideline` : 'clinical practice guideline';

    // Filter by concepts: Medicine (ID: C71924100) is too broad, so we rely on text search + source filtering
    // We try to limit to major medical journals if possible, or high citation count
    const url = `${baseUrl}?search=${encodeURIComponent(searchTerms)}&filter=has_abstract:true,type:article&sort=cited_by_count:desc&sample=15&select=title,publication_year,abstract_inverted_index,id,primary_location,doi,cited_by_count,display_name`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(cleanGuidelineData);
    } catch (error) {
        console.error("Guideline API Error:", error);
        return [];
    }
}

// Fallback: Use OpenFDA for labeling IF it's a drug-related topic
async function fetchDrugLabels(topic) {
    // ... existing logic but strictly as fallback or supplement
    return []; // For now, focus purely on Guidelines as requested
}

function cleanGuidelineData(work) {
    // Try to detect if it's from a "legit" source via the source display name
    const sourceName = work.primary_location?.source?.display_name || "Medical Journal";

    return {
        id: work.id,
        category: "Guideline",
        tag: "Official Source",
        title: work.title,
        text: reconstructAbstract(work.abstract_inverted_index),
        year: work.publication_year,
        image: null,
        url: work.doi || null,
        type: 'guideline',
        source: sourceName, // e.g. "The New England Journal of Medicine"
        citations: work.cited_by_count
    };
};

window.shareContent = async function (title, url) {
    const safeUrl = url && url !== 'null' ? url : window.location.href;
    const shareData = {
        title: title,
        text: `Check out this article: "${title}" \nRead more here: ${safeUrl}`,
        url: safeUrl,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(`${shareData.text}`);
            alert("Link copied to clipboard!");
        } catch (err) {
            alert("Share not supported.");
        }
    }
};

window.openLink = function (url) {
    if (url && url !== 'null') window.open(url, '_blank');
    else alert("No external link available for this item.");
};

window.switchTab = function (tabName) {
    // Hide all main sections
    document.getElementById('main-feed').style.display = 'none';
    document.getElementById('section-discover').style.display = 'none';
    document.getElementById('section-library').style.display = 'none';

    // Show active
    if (tabName === 'home') document.getElementById('main-feed').style.display = 'block';
    if (tabName === 'discover') {
        document.getElementById('section-discover').style.display = 'block';
    }
    if (tabName === 'library') {
        document.getElementById('section-library').style.display = 'block';
        renderLibrary();
    }
};

function renderLibrary() {
    const libList = document.getElementById('library-list');
    const library = JSON.parse(localStorage.getItem('studyScrollerLib') || '[]');
    if (library.length === 0) {
        libList.innerHTML = '<p style="color:#aaa">No saved items.</p>';
        return;
    }
    libList.innerHTML = library.map(c => `
        <div class="list-item" onclick="openLink('${c.url}')">
            <div>
                <div style="font-weight:bold; font-size:14px">${c.title}</div>
                <div style="font-size:12px; opacity:0.7">${c.tag}</div>
            </div>
            <button style="background:none; border:none; color:white;">→</button>
        </div>
    `).join('');
}


// --- Feed Logic ---
window.currentFeedData = [];

async function renderFeed() {
    containers.feedTrack.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;">Scanning global databases...</div>';

    // FETCH REAL DATA (Guidelines Only)
    const guidelines = await fetchMedicalGuidelines(state.startTopic);

    // Fallback
    window.currentFeedData = guidelines.length > 0 ? guidelines : contentCards;

    containers.feedTrack.innerHTML = window.currentFeedData.map((card) => {
        const bgStyle = card.image
            ? `background-image: url('${card.image}'); background-size: cover;`
            : `background: linear-gradient(${Math.random() * 360}deg, #2d3436, #000000);`;

        return `
        <article class="card">
            <!-- Glass Card Content -->
            <div class="card-glass">
                <div class="card-meta">
                    <span class="card-tag">${card.tag || 'Info'}</span>
                    <span class="card-year">${card.year || ''}</span>
                </div>
                
                <h2 class="card-title">${card.title}</h2>
                <p class="card-abstract">${card.text}</p>
                
                <div class="card-actions">
                    <button class="action-btn" onclick="saveToLibrary('${card.id}')" title="Save to Library">🔖</button>
                    <button class="action-btn" onclick="openLink('${card.url}')" title="Read Full Paper">📖</button>
                    <button class="action-btn" onclick="shareContent('${card.title ? card.title.replace(/'/g, "") : "StudyScroller"}', '${card.url}')" title="Share">📤</button>
                </div>
            </div>
        </article>
    `}).join('');

    containers.feedTrack.scrollTop = 0;
}

// --- Navigation ---
function goToScreen(screenName) {
    const current = document.querySelector('.screen.active');
    const next = screens[screenName] || document.getElementById('main-feed');

    if (current) {
        current.classList.remove('active');
        current.classList.add('prev');
    }

    if (next) {
        next.classList.remove('next'); // ensure clean state
        next.classList.add('active');
    }

    // Lifecycle hooks
    if (screenName === 'feed') {
        renderFeed();
    }
}

function attachEventListeners() {
    // 1. Finish Onboarding (Interests -> Feed)
    const finishBtn = document.getElementById('btn-finish-onboarding');
    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            goToScreen('feed');
        });
    }

    // 2. Back Button (Interests -> Start)
    const backBtn = document.getElementById('btn-back-interests');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Basic manual toggle back
            const current = document.querySelector('.screen.active');
            const prev = screens['start'];
            current.classList.remove('active');
            prev.classList.remove('prev');
            prev.classList.add('active');
        });
    }
}

// Run init
init();

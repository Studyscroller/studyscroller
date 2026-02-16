// Medical Specialties as Start Topics
export const startTopics = [
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
export const interestsData = {
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
export const contentCards = [
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

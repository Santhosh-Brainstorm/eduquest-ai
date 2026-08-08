// EduQuest AI Mock Data & Simulation Service

export const INITIAL_USER = {
  name: "Arjun",
  email: "arjun@eduquest.ai",
  school: "ABC Higher Secondary School",
  className: "11",
  board: "Tamil Nadu State Board",
  goal: "JEE",
  language: "Tamil + English",
  xp: 4560,
  diamonds: 180,
  streak: 12,
  longestStreak: 15,
  topicsCompleted: 8,
  quizzesCompleted: 14,
  avgQuizScore: 84,
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Arjun&backgroundColor=b6e3f4"
};

export const LEADERBOARD = [
  { rank: 1, name: "Srinivas K.", school: "KV IIT Madras", xp: 4820, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Srinivas" },
  { rank: 2, name: "Arjun (You)", school: "ABC Higher Secondary School", xp: 4560, isUser: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Arjun" },
  { rank: 3, name: "Meera Nair", school: "PSBB Millennium", xp: 4210, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Meera" },
  { rank: 4, name: "Rahul Sharma", school: "Dav Boys Gopalapuram", xp: 3980, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul" },
  { rank: 5, name: "Divya Balan", school: "St. John's Academy", xp: 3750, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Divya" }
];

export const CONTINUE_LEARNING = [
  {
    id: "atom",
    subject: "Class 11 Chemistry",
    concept: "Structure of Atom",
    progress: 72,
    lastStudied: "2 hours ago",
  },
  {
    id: "bonding",
    subject: "Class 11 Chemistry",
    concept: "Chemical Bonding",
    progress: 45,
    lastStudied: "1 day ago",
  },
  {
    id: "quad",
    subject: "Class 11 Mathematics",
    concept: "Quadratic Equations",
    progress: 90,
    lastStudied: "3 days ago",
  }
];

export const TOPICS_DATABASE = {
  "structure of atom": {
    title: "Structure of Atom",
    subject: "Class 11 Chemistry",
    missingWarning: "4 key concepts are missing from your Tamil Nadu State Board syllabus compared to CBSE (JEE/NEET target).",
    concepts: [
      {
        id: "subatomic",
        name: "Discovery of Subatomic Particles",
        boards: {
          "Tamil Nadu State Board": "covered",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Discovery of electron, proton, and neutron. Discharge tube experiments, cathode rays, canal rays.",
        importance: "Medium",
        relevance: {
          "JEE": { priority: "Low", desc: "Rarely asked directly in JEE; basic foundation." },
          "NEET": { priority: "Low", desc: "Factual questions only." },
          "Board Exam": { priority: "High", desc: "Frequently asked for short-answer definitions and cathode ray properties." },
          "Concept Mastery": { priority: "Medium", desc: "Essential historical context of atomic theory." }
        }
      },
      {
        id: "thomson",
        name: "Thomson's Plum Pudding Model",
        boards: {
          "Tamil Nadu State Board": "covered",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Early atomic model representing electrons embedded in a sphere of positive charge.",
        importance: "Low",
        relevance: {
          "JEE": { priority: "Low", desc: "No direct questions in JEE." },
          "NEET": { priority: "Low", desc: "No direct questions in NEET." },
          "Board Exam": { priority: "High", desc: "Standard 2-mark question explaining its limitations." },
          "Concept Mastery": { priority: "Low", desc: "Historical model subsequently disproved." }
        }
      },
      {
        id: "rutherford",
        name: "Rutherford's Gold Foil Experiment",
        boards: {
          "Tamil Nadu State Board": "covered",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Alpha-particle scattering experiment leading to the discovery of the dense atomic nucleus.",
        importance: "High",
        relevance: {
          "JEE": { priority: "Medium", desc: "Calculations on closest approach distance sometimes asked." },
          "NEET": { priority: "Medium", desc: "Conceptual points on scattering fraction and nuclear size." },
          "Board Exam": { priority: "High", desc: "Extremely important 5-mark question including observations and limitations." },
          "Concept Mastery": { priority: "High", desc: "Critical paradigm shift towards the nuclear model." }
        }
      },
      {
        id: "bohr",
        name: "Bohr's Atomic Model",
        boards: {
          "Tamil Nadu State Board": "covered",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Postulates, derivation of radius, velocity, and energy of hydrogen-like species.",
        importance: "Very High",
        relevance: {
          "JEE": { priority: "High", desc: "Highly weightage calculations of Bohr radius, energy levels, and transitions." },
          "NEET": { priority: "High", desc: "Frequent calculations of excitation energies and velocity ratios." },
          "Board Exam": { priority: "High", desc: "Postulates and formulas are standard long-answer questions." },
          "Concept Mastery": { priority: "High", desc: "Foundational quantum-classical hybrid model." }
        }
      },
      {
        id: "dual_nature",
        name: "Dual Nature of Matter (de Broglie)",
        boards: {
          "Tamil Nadu State Board": "partial",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Dual behavior of matter as particle and wave. de Broglie wavelength relation (λ = h/mv).",
        importance: "High",
        relevance: {
          "JEE": { priority: "High", desc: "High probability of numerical problems relating λ to voltage and kinetic energy." },
          "NEET": { priority: "High", desc: "Formulas applied to microscopic particles." },
          "Board Exam": { priority: "Medium", desc: "Requires simple derivation and stating de Broglie hypothesis." },
          "Concept Mastery": { priority: "High", desc: "Core foundation of modern quantum physics." }
        }
      },
      {
        id: "heisenberg",
        name: "Heisenberg's Uncertainty Principle",
        boards: {
          "Tamil Nadu State Board": "missing",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Impossibility of measuring both position and momentum of a subatomic particle simultaneously (Δx · Δp ≥ h/4π).",
        importance: "High",
        relevance: {
          "JEE": { priority: "High", desc: "Frequently tested using numerical application, energy-time uncertainty, and graphing." },
          "NEET": { priority: "High", desc: "Direct formula applications and physical implications." },
          "Board Exam": { priority: "Medium", desc: "Stating the principle and solving standard numeric problems." },
          "Concept Mastery": { priority: "High", desc: "Revolutionary concept showing the limits of classical determinism." }
        }
      },
      {
        id: "quantum_model",
        name: "Quantum Mechanical Model",
        boards: {
          "Tamil Nadu State Board": "missing",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Schrödinger wave equation (HΨ = EΨ), probability density, wavefunctions, and physical significance of Ψ and Ψ².",
        importance: "Very High",
        relevance: {
          "JEE": { priority: "High", desc: "Radial and angular nodes, node counting, graphs of Ψ vs r, and probability distributions." },
          "NEET": { priority: "Medium", desc: "Conceptual understanding of orbital shapes and wavefunctions." },
          "Board Exam": { priority: "Low", desc: "Qualitative differences between orbit and orbital only." },
          "Concept Mastery": { priority: "Very High", desc: "The contemporary scientific framework describing atomic state." }
        }
      },
      {
        id: "quantum_numbers",
        name: "Quantum Numbers",
        boards: {
          "Tamil Nadu State Board": "partial",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Principal (n), Azimuthal (l), Magnetic (m), and Spin (s) quantum numbers defining electron orbitals.",
        importance: "Very High",
        relevance: {
          "JEE": { priority: "High", desc: "Sets of quantum numbers, orbital capacity calculations, and identifying invalid configurations." },
          "NEET": { priority: "High", desc: "Extremely common questions testing rules and designations (e.g. 3d, 4f)." },
          "Board Exam": { priority: "High", desc: "Short answers detailing physical significance of each quantum number." },
          "Concept Mastery": { priority: "High", desc: "Key tool for navigating electron address in chemistry." }
        }
      },
      {
        id: "electronic_config",
        name: "Rules of Electronic Configuration",
        boards: {
          "Tamil Nadu State Board": "covered",
          "CBSE / NCERT": "covered",
          "ICSE": "covered"
        },
        description: "Aufbau principle, Pauli exclusion principle, Hund's rule of maximum multiplicity, and exceptions (Cr, Cu).",
        importance: "Very High",
        relevance: {
          "JEE": { priority: "High", desc: "Paramagnetic/diamagnetic states, exchange energy, and extra stability of half/fully filled shells." },
          "NEET": { priority: "High", desc: "Writing configurations for transition ions (e.g., Fe²⁺, Cr³⁺) and valence electron counts." },
          "Board Exam": { priority: "High", desc: "Stating the three rules and writing configuration sequences." },
          "Concept Mastery": { priority: "High", desc: "Core foundation of chemical bonding and periodic properties." }
        }
      }
    ]
  }
};

export const CONCEPT_RESOURCES = {
  "heisenberg": {
    concept: "Heisenberg's Uncertainty Principle",
    overview: "Heisenberg's Uncertainty Principle is a fundamental concept in quantum mechanics formulated by German physicist Werner Heisenberg in 1927. It states that the position and momentum of a microscopic moving particle cannot be determined simultaneously with absolute accuracy.",
    keyPoints: [
      "Formula: Δx · Δp ≥ h / 4π (where Δx is uncertainty in position, Δp is uncertainty in momentum, and h is Planck's constant).",
      "It is a consequence of the dual wave-particle nature of matter, not a limitation of measuring instruments.",
      "For macroscopic objects, the uncertainty is extremely small and negligible, but for electrons, it is significant.",
      "It completely rules out the concept of fixed circular 'orbits' (Bohr's model) and introduces the concept of probability 'orbitals'."
    ],
    videos: [
      {
        id: "v1",
        title: "Heisenberg's Uncertainty Principle Explained Simply",
        channel: "Physics Visualized",
        duration: "8:24",
        language: "English",
        reason: "Recommended because this topic is missing from your Tamil Nadu State Board syllabus coverage and is highly asked in JEE.",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "v2",
        title: "Quantum Mechanics for Class 11: Uncertainty Principle",
        channel: "EduQuest Tamil Chemistry",
        duration: "15:45",
        language: "Tamil + English",
        reason: "Matches your preferred language settings (Tamil + English) and explains standard mathematical problems.",
        thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  "quantum_model": {
    concept: "Quantum Mechanical Model of Atom",
    overview: "The Quantum Mechanical Model describes electrons as wavefunctions rather than point particles in circular orbits. The state of an electron is solved using Schrödinger's Wave Equation, outlining three-dimensional regions of high probability called orbitals.",
    keyPoints: [
      "Schrödinger equation: Ĥψ = Eψ, where Ĥ is the Hamiltonian operator, E is total energy, and ψ is the wavefunction.",
      "The value of ψ has no physical significance, but its square |ψ|² represents the probability density of finding an electron.",
      "Orbitals are defined by three quantum numbers (n, l, m) representing size, shape, and orientation in space.",
      "Bohr's fixed shells are replaced by electron clouds representing probable locations of electrons."
    ],
    videos: [
      {
        id: "v3",
        title: "Understanding Schrödinger's Equation & Quantum Model",
        channel: "CrashCourse Chemistry",
        duration: "11:10",
        language: "English",
        reason: "High-yield video explaining probability density (ψ²) and orbital shapes visually. High priority for JEE.",
        thumbnail: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=400&q=80"
      }
    ]
  }
};

export const SIMULATED_TRANSCRIPTS = {
  "v1": {
    "English": [
      { time: "0:00", text: "Welcome back! Today we are looking at Werner Heisenberg's famous principle." },
      { time: "1:15", text: "In classical physics, we assume we can measure everything. We can track a tennis ball's velocity and position." },
      { time: "2:30", text: "But on a microscopic scale, when you try to bounce light off an electron to see it, the photon strikes the electron and alters its momentum." },
      { time: "4:00", text: "So, the more accurately we measure the position (Δx), the less accurately we know its velocity or momentum (Δp)." },
      { time: "5:45", text: "This is mathematically written as Δx times Δp is greater than or equal to h over 4π." },
      { time: "7:00", text: "Because of this uncertainty, Bohr's idea of neat, circular orbits is invalid. We must talk about probability clouds." }
    ],
    "Tamil": [
      { time: "0:00", text: "வரவேற்கிறோம்! இன்று நாம் வெர்னர் ஹைசன்பெர்க்கின் புகழ்பெற்ற விதியைப் பார்க்கப்போகிறோம்." },
      { time: "1:15", text: "கிளாசிக்கல் இயற்பியலில், நாம் எல்லாவற்றையும் அளவிட முடியும் என்று கருதுகிறோம். பந்தின் வேகம் மற்றும் நிலையை நம்மால் துல்லியமாகக் கணிக்க முடியும்." },
      { time: "2:30", text: "ஆனால் ஒரு நுண்ம அளவில், நீங்கள் ஒரு எலக்ட்ரானை பார்க்க அதன் மீது ஒளியை செலுத்தும்போது, போட்டான் எலக்ட்ரானைத் தாக்கி அதன் உந்தத்தை மாற்றுகிறது." },
      { time: "4:00", text: "எனவே, நாம் எலக்ட்ரானின் நிலையை (Δx) எவ்வளவு துல்லியமாக அளவிடுகிறோமோ, அவ்வளவு குறைவாக அதன் உந்தத்தை (Δp) அறிந்து கொள்ள முடியும்." },
      { time: "5:45", text: "இதன் கணித வடிவம்: Δx பெருக்கல் Δp என்பது h/4π-க்கு சமமாகவோ அல்லது அதிகமாகவோ இருக்கும்." },
      { time: "7:00", text: "இந்த நிச்சயமற்ற தன்மை காரணமாகவே, போர் முன்மொழிந்த வட்டப்பாதை கொள்கை தவறானது என நிரூபிக்கப்பட்டது." }
    ],
    "Hindi": [
      { time: "0:00", text: "स्वागत है! आज हम वर्नर हाइजेनबर्ग के प्रसिद्ध अनिश्चितता सिद्धांत को समझेंगे।" },
      { time: "1:15", text: "क्लासिकल फिजिक्स में हम मानते हैं कि हम सब कुछ माप सकते हैं। हम किसी वस्तु की स्थिति और वेग दोनों जान सकते हैं।" },
      { time: "2:30", text: "लेकिन सूक्ष्म स्तर पर, जब आप इलेक्ट्रॉन को देखने के लिए उस पर प्रकाश डालते हैं, तो फोटॉन इलेक्ट्रॉन से टकराकर उसकी गति बदल देता है।" },
      { time: "4:00", text: "इसलिए, जितना सटीक रूप से हम स्थिति (Δx) मापेंगे, उतना ही कम सटीक रूप से हम संवेग (Δp) जान पाएंगे।" },
      { time: "5:45", text: "गणितीय रूप से इसे Δx · Δp ≥ h/4π लिखा जाता है।" },
      { time: "7:00", text: "इसी अनिश्चितता के कारण, बोहर की निश्चित वृत्ताकार कक्षाओं की अवधारणा अमान्य हो जाती है।" }
    ]
  }
};

export const QUIZZES = {
  "structure of atom": [
    {
      id: "q1",
      question: "Which principle states that it is impossible to determine simultaneously both the position and momentum of a subatomic particle?",
      options: [
        "Aufbau Principle",
        "Heisenberg's Uncertainty Principle",
        "Pauli's Exclusion Principle",
        "Hund's Rule of Multiplicity"
      ],
      correctIndex: 1,
      explanation: "Heisenberg's Uncertainty Principle states that Δx · Δp ≥ h/4π. It sets a fundamental limit on how precisely we can measure complementary variables."
    },
    {
      id: "q2",
      question: "What is the physical significance of the square of the wavefunction, |ψ|²?",
      options: [
        "It represents the exact energy of the electron.",
        "It indicates the angular momentum of the orbital.",
        "It represents the probability density of finding the electron at a point.",
        "It defines the velocity of the electron in an orbit."
      ],
      correctIndex: 2,
      explanation: "In the quantum mechanical model, |ψ|² represents the probability density of finding an electron in a 3D region of space (the orbital)."
    },
    {
      id: "q3",
      question: "Which quantum number determines the spatial orientation of an electron orbital?",
      options: [
        "Principal quantum number (n)",
        "Azimuthal quantum number (l)",
        "Magnetic quantum number (m)",
        "Spin quantum number (s)"
      ],
      correctIndex: 2,
      explanation: "The magnetic quantum number (m) determines the spatial orientation of the orbital relative to standard axes, with values ranging from -l to +l."
    },
    {
      id: "q4",
      question: "For a principal quantum number n = 3, what are the allowed values for the azimuthal quantum number l?",
      options: [
        "1, 2, 3",
        "0, 1, 2",
        "-1, 0, +1",
        "0, 1, 2, 3"
      ],
      correctIndex: 1,
      explanation: "The azimuthal quantum number l can have values from 0 to (n - 1). For n = 3, l can be 0 (s), 1 (p), and 2 (d)."
    },
    {
      id: "q5",
      question: "Why do chromium (Cr, Z=24) and copper (Cu, Z=29) deviate from the standard Aufbau configuration?",
      options: [
        "Due to high electron repulsion in s-orbitals.",
        "Due to extra stability associated with half-filled and fully-filled d-subshells.",
        "Due to spin-orbit coupling effects in heavy elements.",
        "Because d-orbitals are closer to the nucleus than s-orbitals."
      ],
      correctIndex: 1,
      explanation: "Chromium has a [Ar] 3d⁵ 4s¹ configuration (half-filled d) and Copper has [Ar] 3d¹⁰ 4s¹ (fully-filled d). These are more stable due to symmetrical distribution of electrons and high exchange energy."
    }
  ]
};

export const STUDY_CALENDAR = [
  { date: "2026-07-28", count: 1, xp: 120 },
  { date: "2026-07-29", count: 2, xp: 250 },
  { date: "2026-07-30", count: 0, xp: 0 },
  { date: "2026-07-31", count: 1, xp: 150 },
  { date: "2026-08-01", count: 3, xp: 420 },
  { date: "2026-08-02", count: 2, xp: 200 },
  { date: "2026-08-03", count: 1, xp: 100 },
  { date: "2026-08-04", count: 4, xp: 550 },
  { date: "2026-08-05", count: 2, xp: 180 },
  { date: "2026-08-06", count: 3, xp: 300 },
  { date: "2026-08-07", count: 2, xp: 220 },
  { date: "2026-08-08", count: 3, xp: 410 },
  { date: "2026-08-09", count: 1, xp: 150 } // Today
];

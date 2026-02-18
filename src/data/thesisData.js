export const LIKERT_SCALE = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
];

export const YES_NO_SCALE = ["Yes", "No"];

export const BLACKBOX_SCALE = [
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Needs Improvement",
];

export const thesisData = {
  title: "Data Interpretation of Survey Results",
  subtitle: "ARVA.ai: Early-stage Home Layout Planning",
  respondents: 60,
  overviewNotes:
    "This interactive report presents survey results (n=60) and interprets findings across demographics, planning challenges, existing practices, openness to AI, usability, perceived support outcomes, and black-box testing criteria.",

  partI: [
    {
      id: "p1_q1",
      title: "Respondent Classification",
      question: "Which of the following best describes you?",
      data: [
        { name: "Culturally curious individual / general public", value: 51 },
        { name: "Architecture or design-related student", value: 8 },
        { name: "Other", value: 1 },
      ],
      notes:
        "Most respondents are non-professionals, indicating that findings primarily reflect public-facing needs and accessibility.",
    },
    {
      id: "p1_q2",
      title: "Access to Professional Services",
      question: "Do you have access to professional architectural or design services?",
      data: [
        { name: "Yes", value: 19 },
        { name: "No", value: 41 },
      ],
      notes:
        "Most respondents do not have access to professional services, reinforcing the need for self-guided planning support tools.",
    },
    {
      id: "p1_q3",
      title: "Home Planning Experience",
      question: "What is your level of experience in home planning or layout design?",
      data: [
        { name: "None", value: 17 },
        { name: "Minimal (conceptual ideas, sketches, or written notes only)", value: 35 },
        { name: "Moderate (use of digital tools or software without formal training)", value: 6 },
        { name: "Extensive (formal training or professional experience)", value: 2 },
      ],
      notes:
        "Most respondents report little to no formal planning experience, showing strong relevance for beginner-friendly decision support.",
    },
    {
      id: "p1_q4",
      title: "Primary Planning Motivation",
      question: "What is your primary reason for planning or visualizing a home layout?",
      data: [
        { name: "Personal home planning", value: 41 },
        { name: "Academic or learning-related purposes", value: 10 },
        { name: "General interest in design or architecture", value: 7 },
        { name: "Other", value: 2 },
      ],
      notes:
        "Personal planning is the dominant motivation, indicating practical, real-world relevance of the study outcomes.",
    },
    {
      id: "p1_q5",
      title: "AI Tool Usage Frequency",
      question: "How often have you used AI-based digital tools to visualize your house layout?",
      data: [
        { name: "Never", value: 26 },
        { name: "Rarely (once a year or less)", value: 23 },
        { name: "Occasionally (a few times a year)", value: 6 },
        { name: "Frequently (monthly or more)", value: 5 },
      ],
      notes:
        "Prior AI usage is limited for most respondents, so acceptance results largely reflect early exposure behavior.",
    },
  ],

  partII: [
    {
      id: "p2_s1",
      title: "Access to Tools",
      question: "My access to professional planning tools affects how I plan a home layout.",
      values: [9, 33, 14, 4, 0],
      mean: 3.78,
      notes:
        "The weighted mean indicates general agreement that access to professional tools significantly affects planning decisions.",
    },
    {
      id: "p2_s2",
      title: "Translating Ideas to Layout",
      question: "I find it difficult to translate my ideas into a clear home layout",
      values: [9, 26, 18, 5, 2],
      mean: 3.58,
      notes:
        "Respondents generally agree that converting ideas into concrete layouts remains a practical challenge.",
    },
    {
      id: "p2_s3",
      title: "Resource Constraints",
      question: "Limited planning resources affect how I plan or visualize a home layout.",
      values: [14, 28, 13, 4, 1],
      mean: 3.83,
      notes:
        "Resource limitations are a key barrier in early-stage planning, as shown by a high weighted mean.",
    },
  ],

  partIII: [
    {
      id: "p3_q1",
      title: "Most Used Planning Method",
      question:
        "Which method do you most often use when planning your home layout in the early stages?",
      data: [
        { name: "Manual sketches or written notes", value: 24 },
        { name: "Digital design tools (applications or software)", value: 21 },
        { name: "Consultation with a design or construction professional", value: 2 },
        { name: "I do not use a specific planning method", value: 13 },
      ],
      notes:
        "Manual and informal methods remain common, showing a need for practical digital support that is easy to adopt.",
    },
    {
      id: "p3_q2",
      title: "Method Outcome Quality",
      question: "How would you describe the outcome of using your chosen method?",
      data: [
        { name: "It provides sufficient structure for organizing ideas", value: 29 },
        { name: "It provides limited structure and leaves some gaps", value: 19 },
        { name: "It provides little to no support for organizing ideas", value: 5 },
        { name: "I am unable to determine its effect", value: 7 },
      ],
      notes:
        "Many respondents gain structure from current methods, but a substantial group still reports gaps in planning support.",
    },
    {
      id: "p3_q3",
      title: "Confidence Impact",
      question:
        "How does your chosen method affect your confidence in your early-stage layout plan?",
      data: [
        { name: "Significantly increases confidence", value: 17 },
        { name: "Slightly increases confidence", value: 28 },
        { name: "Decreases confidence", value: 2 },
        { name: "Has no noticeable effect on confidence", value: 13 },
      ],
      notes:
        "Current methods generally improve confidence, but outcomes still vary by method quality and user familiarity.",
    },
  ],

  partIV: [
    {
      id: "p4_q1",
      title: "Comfort with ARVA.ai",
      question: "Do you feel comfortable interacting with ARVA.ai for early-stage home layout planning?",
      data: [
        { name: "Yes", value: 54 },
        { name: "No", value: 6 },
      ],
      notes:
        "Most respondents report comfort using ARVA.ai, suggesting low interaction barriers for first-time users.",
    },
    {
      id: "p4_q2",
      title: "Willingness to Use AI-assisted Platform",
      question:
        "Would you be willing to use an AI-assisted platform like ARVA.ai that generates floor plans based on user-provided inputs?",
      data: [
        { name: "Yes", value: 57 },
        { name: "No", value: 3 },
      ],
      notes:
        "Willingness to adopt an AI-assisted platform is very high, indicating strong acceptance potential.",
    },
    {
      id: "p4_q3",
      title: "Use Without Professional Involvement",
      question:
        "Would you use ARVA.ai without direct involvement from a professional architect or designer?",
      data: [
        { name: "Yes", value: 45 },
        { name: "No", value: 15 },
      ],
      notes:
        "A strong majority is willing to use ARVA.ai independently, though some users still prefer professional involvement.",
    },
  ],

  partV: [
    {
      id: "p5_s1",
      title: "Ease of Use",
      question: "I find ARVA.ai easy to understand and use.",
      values: [18, 33, 8, 1, 0],
      mean: 4.13,
      notes:
        "Responses indicate high usability, with most users agreeing ARVA.ai is easy to understand and operate.",
    },
    {
      id: "p5_s2",
      title: "Use Without Prior Experience",
      question:
        "I can use ARVA.ai for early-stage home layout planning without prior professional experience.",
      values: [15, 29, 13, 2, 1],
      mean: 3.91,
      notes:
        "Findings suggest ARVA.ai is accessible to non-experts, supporting broader use beyond trained professionals.",
    },
    {
      id: "p5_s3",
      title: "Efficiency Support",
      question:
        "Using ARVA.ai helps me complete tasks in home layout planning more efficiently.",
      values: [12, 38, 7, 3, 0],
      mean: 3.65,
      notes:
        "Users generally report efficiency improvements, indicating ARVA.ai can reduce effort in early planning tasks.",
    },
  ],

  partVI: [
    {
      id: "p6_m1",
      title: "Clear Visualization",
      question: "ARVA.ai helps me visualize home layouts clearly.",
      total: 241,
      n: 60,
      mean: 4.02,
      notes:
        "The weighted mean indicates positive perceived support in helping users visualize home layouts clearly.",
    },
    {
      id: "p6_m2",
      title: "Space Arrangement Support",
      question: "ARVA.ai supports me in planning and arranging spaces effectively.",
      total: 234,
      n: 60,
      mean: 3.9,
      notes:
        "Respondents generally agree ARVA.ai provides meaningful support for planning and arranging spaces.",
    },
    {
      id: "p6_m3",
      title: "Early Error Reduction",
      question: "ARVA.ai helps reduce potential errors in early-stage home design.",
      total: 230,
      n: 60,
      mean: 3.83,
      notes:
        "Users perceive ARVA.ai as helpful in reducing potential mistakes during early-stage design decisions.",
    },
  ],

  blackBox: {
    usability: {
      sectionTitle: "Usability",
      indicators: [
        { id: "bb_u1", title: "Intuitiveness", values: [15, 22, 20, 2, 1], mean: 3.8 },
        { id: "bb_u2", title: "Documentation Requirement", values: [14, 20, 23, 2, 1], mean: 3.73 },
        { id: "bb_u3", title: "Input Flexibility", values: [12, 24, 23, 1, 0], mean: 3.78 },
        { id: "bb_u4", title: "Clarity of Navigation", values: [17, 27, 13, 3, 0], mean: 3.97 },
      ],
      summaryMeans: [
        { name: "Intuitiveness", mean: 3.8 },
        { name: "Documentation Requirement", mean: 3.73 },
        { name: "Input Flexibility", mean: 3.78 },
        { name: "Clarity of Navigation", mean: 3.97 },
      ],
      summaryNotes:
        "Overall usability performance is Very Good (overall mean approximately 3.82), indicating an intuitive and manageable interface.",
    },
    reliability: {
      sectionTitle: "Reliability",
      indicators: [
        { id: "bb_r1", title: "Input Validation", values: [9, 22, 24, 4, 1], mean: 3.57 },
        { id: "bb_r2", title: "Error Handling", values: [10, 24, 20, 5, 1], mean: 3.62 },
        { id: "bb_r3", title: "Security Measures", values: [13, 23, 21, 3, 0], mean: 3.77 },
        { id: "bb_r4", title: "Data Backup", values: [14, 23, 20, 2, 1], mean: 3.78 },
      ],
      summaryMeans: [
        { name: "Input Validation", mean: 3.57 },
        { name: "Error Handling", mean: 3.62 },
        { name: "Security Measures", mean: 3.77 },
        { name: "Data Backup", mean: 3.78 },
      ],
      summaryNotes:
        "Overall reliability is Very Good (overall mean 3.68), with stable input processing and operational consistency.",
    },
    accessibility: {
      sectionTitle: "Accessibility",
      indicators: [
        { id: "bb_a1", title: "Clear and Consistent Navigation", values: [23, 21, 14, 2, 0], mean: 4.08 },
        { id: "bb_a2", title: "Font Size and Style", values: [15, 23, 19, 3, 0], mean: 3.83 },
        { id: "bb_a3", title: "Error Feedback", values: [14, 19, 24, 2, 1], mean: 3.72 },
        { id: "bb_a4", title: "Responsive Design", values: [21, 20, 17, 2, 0], mean: 4.0 },
      ],
      summaryMeans: [
        { name: "Clear/Consistent Navigation", mean: 4.08 },
        { name: "Responsive Design", mean: 4.0 },
        { name: "Font Size and Style", mean: 3.83 },
        { name: "Error Feedback", mean: 3.72 },
      ],
      summaryNotes:
        "Accessibility is Very Good (overall mean 3.91), showing strong navigation clarity and responsive interface behavior.",
    },
    efficiency: {
      sectionTitle: "Efficiency",
      indicators: [
        { id: "bb_e1", title: "Response Time", values: [15, 22, 21, 2, 0], mean: 3.83 },
        { id: "bb_e2", title: "Minimized Clicks/Steps", values: [14, 28, 16, 2, 0], mean: 3.9 },
      ],
      summaryMeans: [
        { name: "Response Time", mean: 3.83 },
        { name: "Minimized Clicks/Steps", mean: 3.9 },
      ],
      summaryNotes:
        "Efficiency is Very Good (overall mean 3.87), reflecting strong response performance and streamlined task flow.",
    },
    functionality: {
      sectionTitle: "Functionality",
      indicators: [
        { id: "bb_f1", title: "Feature Completeness", values: [17, 21, 17, 4, 1], mean: 3.82 },
        { id: "bb_f2", title: "Accuracy of Results", values: [11, 23, 19, 5, 2], mean: 3.6 },
        { id: "bb_f3", title: "Error Handling", values: [10, 22, 24, 4, 0], mean: 3.63 },
      ],
      summaryMeans: [
        { name: "Feature Completeness", mean: 3.82 },
        { name: "Accuracy of Results", mean: 3.6 },
        { name: "Error Handling", mean: 3.63 },
      ],
      summaryNotes:
        "Functionality is Very Good (overall mean 3.68), with core features operating effectively across tested tasks.",
    },
  },

  keyFindings: [
    "Most respondents are non-professionals and many lack access to professional design services.",
    "Resource constraints and idea-to-layout translation remain central home planning challenges.",
    "Openness to ARVA.ai is high, including willingness to use AI-assisted planning workflows.",
    "Usability and perceived support outcomes are generally positive, with strong clarity and accessibility signals.",
    "Black-box testing results indicate Very Good performance across usability, reliability, accessibility, efficiency, and functionality.",
  ],
};

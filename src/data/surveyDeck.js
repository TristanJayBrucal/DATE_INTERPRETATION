export const deck = {
  title: "Data Interpretation of Survey Results",
  subtitle: "ARVA.ai: Early-stage Home Layout Planning",
  meta: { respondents: 60 },
  slides: [
    {
      id: "title",
      type: "title",
      section: "Overview",
      title: "Data Interpretation",
      subtitle: "Survey Results and User Acceptance Findings",
      notes:
        "This interactive report presents survey results (n=60) and interprets findings across demographics, challenges, practices, openness, usability, perceived support, and black-box testing.",
    },

    {
      id: "p1_q1",
      type: "pie",
      section: "Part I. Demographic Profile",
      title: "Respondent Classification",
      question: "Which of the following best describes you?",
      data: [
        { name: "Culturally curious / general public", value: 51 },
        { name: "Architecture/design-related student", value: 8 },
        { name: "Other", value: 1 },
      ],
      notes:
        "Most respondents are non-professionals, indicating broad public relevance rather than expert-only feedback.",
    },
    {
      id: "p1_q2",
      type: "pie",
      section: "Part I. Demographic Profile",
      title: "Experience with Home Layout Planning",
      question: "Have you previously planned a home layout on your own?",
      data: [
        { name: "Yes", value: 42 },
        { name: "No", value: 18 },
      ],
      notes:
        "A substantial majority has attempted layout planning, suggesting respondents can evaluate practical planning pain points.",
    },
    {
      id: "p1_q3",
      type: "pie",
      section: "Part I. Demographic Profile",
      title: "Use of Professional Services",
      question: "Did you use professional architecture or design services?",
      data: [
        { name: "No", value: 44 },
        { name: "Yes", value: 16 },
      ],
      notes:
        "Most respondents rely on self-directed planning, reinforcing the need for accessible decision-support tools.",
    },

    {
      id: "p2_s1",
      type: "bars",
      section: "Part II. Challenges in Home Planning",
      title: "Access to Tools",
      question: "My access to professional planning tools affects how I plan a home layout.",
      categories: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      values: [9, 33, 14, 4, 0],
      mean: 3.78,
      notes:
        "Respondents generally agree that access to planning tools influences their planning quality and confidence.",
    },
    {
      id: "p2_s2",
      type: "bars",
      section: "Part II. Challenges in Home Planning",
      title: "Translating Ideas to Layouts",
      question: "I find it difficult to translate ideas into an actual floor layout.",
      categories: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      values: [13, 28, 12, 6, 1],
      mean: 3.77,
      notes:
        "Idea-to-layout translation remains a central challenge, validating the need for guided visualization.",
    },
    {
      id: "p2_s3",
      type: "bars",
      section: "Part II. Challenges in Home Planning",
      title: "Design Iteration Cost",
      question: "Revising layout decisions during planning is time-consuming for me.",
      categories: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      values: [11, 30, 13, 5, 1],
      mean: 3.75,
      notes:
        "Iteration overhead is perceived as high, suggesting automation can reduce friction in early-stage planning.",
    },

    {
      id: "p3_q1",
      type: "pie",
      section: "Part III. Current Planning Practices",
      title: "Common Planning Method",
      question: "Which method do you usually use for layout planning?",
      data: [
        { name: "Manual sketching", value: 24 },
        { name: "Reference images only", value: 19 },
        { name: "Digital tools/apps", value: 11 },
        { name: "No fixed method", value: 6 },
      ],
      notes:
        "Manual and low-tech approaches dominate, showing an opportunity for easier digital planning workflows.",
    },
    {
      id: "p3_q2",
      type: "pie",
      section: "Part III. Current Planning Practices",
      title: "Use of AI Tools",
      question: "Have you used any AI-assisted tool for home planning before?",
      data: [
        { name: "No", value: 46 },
        { name: "Yes", value: 14 },
      ],
      notes:
        "Low prior AI exposure indicates findings reflect first-time acceptance behavior for AI support.",
    },

    {
      id: "p4_q1",
      type: "pie",
      section: "Part IV. Openness to AI-Assisted Planning",
      title: "Willingness to Try AI Planning",
      question: "How open are you to using AI for early-stage home layout planning?",
      data: [
        { name: "Very Open", value: 25 },
        { name: "Open", value: 26 },
        { name: "Neutral", value: 7 },
        { name: "Not Open", value: 2 },
      ],
      notes:
        "Openness is high overall, indicating strong adoption potential if the interface remains understandable.",
    },
    {
      id: "p4_q2",
      type: "pie",
      section: "Part IV. Openness to AI-Assisted Planning",
      title: "Trust in AI Suggestions",
      question: "Would you consider AI suggestions when deciding room placement and flow?",
      data: [
        { name: "Yes", value: 45 },
        { name: "Maybe", value: 13 },
        { name: "No", value: 2 },
      ],
      notes:
        "Most users are willing to include AI recommendations as part of decision-making, even if not blindly.",
    },

    {
      id: "p5_s1",
      type: "bars",
      section: "Part V. Usability and Acceptance (ARVA.ai)",
      title: "Ease of Use",
      question: "The interface of ARVA.ai is easy to understand and use.",
      categories: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      values: [18, 30, 8, 3, 1],
      mean: 4.02,
      notes:
        "Usability scores indicate the platform is broadly understandable for first-time and non-expert users.",
    },
    {
      id: "p5_s2",
      type: "bars",
      section: "Part V. Usability and Acceptance (ARVA.ai)",
      title: "Planning Efficiency",
      question: "ARVA.ai helped me create layout ideas more quickly.",
      categories: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      values: [16, 29, 10, 4, 1],
      mean: 3.92,
      notes:
        "Respondents generally report time savings and faster ideation with AI-assisted support.",
    },
    {
      id: "p5_s3",
      type: "bars",
      section: "Part V. Usability and Acceptance (ARVA.ai)",
      title: "Recommendation Quality",
      question: "The generated recommendations are relevant to my layout needs.",
      categories: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      values: [14, 31, 10, 4, 1],
      mean: 3.88,
      notes:
        "Recommendation relevance is positively rated, but neutrality suggests room for contextual refinement.",
    },

    {
      id: "p6_means",
      type: "meanBars",
      section: "Part VI. Perceived Support Outcomes",
      title: "Perceived Support (Weighted Means)",
      question: "How strongly does ARVA.ai support each outcome area?",
      data: [
        { name: "Visualization of options", mean: 4.11 },
        { name: "Space planning confidence", mean: 3.97 },
        { name: "Decision speed", mean: 3.9 },
        { name: "Reduction of early errors", mean: 3.86 },
        { name: "Overall planning clarity", mean: 4.03 },
      ],
      notes:
        "Perceived support is consistently positive across all outcome dimensions, strongest in visualization clarity.",
    },

    {
      id: "bb_obj1",
      type: "bars",
      section: "Black-box Testing",
      title: "Objective 1: Input Handling",
      question: "System correctly accepts and validates user constraints and preferences.",
      categories: ["Passed", "Minor Issues", "Failed"],
      values: [52, 7, 1],
      notes:
        "Input handling is reliable overall, with minor validation edge cases observed.",
    },
    {
      id: "bb_obj2",
      type: "bars",
      section: "Black-box Testing",
      title: "Objective 2: Recommendation Generation",
      question: "System returns layout recommendations aligned with provided inputs.",
      categories: ["Passed", "Minor Issues", "Failed"],
      values: [49, 9, 2],
      notes:
        "Recommendation generation passes most cases, though some outputs need tighter input alignment.",
    },
    {
      id: "bb_obj3",
      type: "bars",
      section: "Black-box Testing",
      title: "Objective 3: Response Time",
      question: "System produces results within acceptable time during typical usage.",
      categories: ["Passed", "Minor Delays", "Failed"],
      values: [47, 11, 2],
      notes:
        "Performance is acceptable for most sessions, with occasional delays under heavier prompts.",
    },
    {
      id: "bb_summary",
      type: "bars",
      section: "Black-box Testing",
      title: "Black-box Summary",
      question: "Overall external-behavior quality across tested objectives.",
      categories: ["Passed", "With Issues", "Failed"],
      values: [148, 27, 5],
      notes:
        "Aggregate tests indicate strong external behavior with manageable quality gaps in edge scenarios.",
    },

    {
      id: "key_findings",
      type: "keyFindings",
      section: "Summary",
      title: "Key Findings",
      bullets: [
        "Most respondents are non-professionals and commonly self-plan without expert tools.",
        "Major pain points involve translating ideas into workable layouts and reducing revision cycles.",
        "Openness to AI-assisted planning is high, including willingness to consider AI suggestions.",
        "Usability and acceptance scores for ARVA.ai are positive, especially for clarity and speed.",
        "Perceived support and black-box results indicate practical value with room for iterative improvement.",
      ],
      notes: "These findings summarize major patterns observed across all survey and testing sections.",
    },
  ],
};

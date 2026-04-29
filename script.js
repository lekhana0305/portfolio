const projects = {
  legal: {
    type: "Generative AI",
    title: "Legal Document Analyzer",
    stack: "FastAPI, LangChain, Google Generative AI, ChromaDB",
    sections: [
      {
        heading: "Problem",
        body: "Legal documents are hard to read quickly because important risks, clauses, and obligations are hidden inside dense text.",
      },
      {
        heading: "What I Built",
        items: [
          "A Python backend with FastAPI for document analysis workflows.",
          "A Retrieval-Augmented Generation pipeline using LangChain, Google Generative AI, and ChromaDB.",
          "Features for summarization, risk analysis, and question answering with source citations.",
        ],
      },
      {
        heading: "Engineering Focus",
        items: [
          "Vector storage and retrieval for source-grounded answers.",
          "Modular backend flow from upload to retrieval to response generation.",
          "Clear output design for users who need fast document understanding.",
        ],
      },
    ],
  },
  smart: {
    type: "Assistive Wearable Device",
    title: "Smart Specs",
    stack: "Python, OpenCV, YOLOv8, BotSort, PyTorch, ESP32-CAM",
    sections: [
      {
        heading: "Problem",
        body: "Assistive navigation needs fast obstacle awareness, especially when multiple moving objects appear in the camera frame.",
      },
      {
        heading: "What I Built",
        items: [
          "A real-time monocular vision system for obstacle detection and spatial awareness.",
          "Depth approximation using focal length calibration and pixel-width based estimation.",
          "Multi-object tracking with BotSort and nearest-obstacle priority alerts.",
        ],
      },
      {
        heading: "Engineering Focus",
        items: [
          "Real-time prediction and object tracking workflow.",
          "Persistent object identities to reduce noisy repeated alerts.",
          "Edge-ready modular architecture for ESP32-CAM and future embedded AI integration.",
        ],
      },
    ],
  },
  tour: {
    type: "Travel Assistance App",
    title: "Tour Buddy",
    stack: "Next.js, Node.js, Google Generative AI, MongoDB",
    sections: [
      {
        heading: "Problem",
        body: "Travel planning requires combining preferences, places, timing, and dynamic context into a usable itinerary.",
      },
      {
        heading: "What I Built",
        items: [
          "An AI-powered travel planning platform for personalized itinerary generation.",
          "A responsive frontend with schema-based validation and optimized state management.",
          "Geospatial visualization and asynchronous data fetching for dynamic travel insights.",
        ],
      },
      {
        heading: "Engineering Focus",
        items: [
          "Multi-tier system structure with frontend, backend workflows, and database persistence.",
          "MongoDB-backed data model for travel plans and generated results.",
          "Reliable cross-device interface for a practical user workflow.",
        ],
      },
    ],
  },
};

const modal = document.querySelector("#projectModal");
const modalType = document.querySelector("#modalType");
const modalTitle = document.querySelector("#modalTitle");
const modalStack = document.querySelector("#modalStack");
const modalContent = document.querySelector("#modalContent");
const closeButton = document.querySelector(".modal-close");

function sectionMarkup(section) {
  const content = section.items
    ? `<ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : `<p>${section.body}</p>`;

  return `<section><h3>${section.heading}</h3>${content}</section>`;
}

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  modalType.textContent = project.type;
  modalTitle.textContent = project.title;
  modalStack.textContent = project.stack;
  modalContent.innerHTML = project.sections.map(sectionMarkup).join("");
  modal.hidden = false;
  closeButton.focus();
}

function closeProject() {
  modal.hidden = true;
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

closeButton.addEventListener("click", closeProject);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProject();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeProject();
});

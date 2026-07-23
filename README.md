# DevIdentity Visualizer

> A visually rich, animated interpretation of developer identity powered by the GitHub REST API.

<!-- Tech Stack Badges -->
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://github-visualizer-eta.vercel.app)
[![Demo Video](https://img.shields.io/badge/🎬_Demo_Video-Google_Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1Hu2x4kb5dma4ShRwSXhbtwtHuGhP8gf7/view?usp=drive_link)

---

## 📌 Overview

DevIdentity Visualizer transforms raw GitHub API data into an engaging, animated visual experience. Built as a frontend engineering showcase, this project prioritizes smooth transitions, resilient error handling, and a custom-built SVG data visualization engine—all without relying on heavy third-party charting libraries.

![DevIdentity Visualizer Preview](./public/preview.png)

---

## ✨ Core Features

* **Custom Data Visualization:** Features a **100% hand-built SVG radial donut chart** to display language distribution. Includes interactive hover states, dynamic center text, and custom mathematical calculations for `stroke-dasharray`—no Chart.js or Recharts required.
* **Comprehensive Profile Identity:** Displays user avatars, names, biographies, follower/following counts, and repository metrics in a clean, glassmorphism-inspired UI.
* **Top Performance Metrics:** Renders top repositories as interactive cards detailing primary languages, star counts, fork counts, and descriptions.
* **Fluid Animations:** Utilizes Framer Motion for smooth state transitions (Loading → Loaded, Error states) and micro-interactions, ensuring the UI never feels rigid or jarring.
* **Responsive & Intentional Design:** Built with Tailwind CSS, adapting seamlessly across all screen sizes while maintaining a strict, modern dark theme.

---

## 🛠️ Tech Stack

* **Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Data Source:** [GitHub REST API](https://docs.github.com/en/rest)

---

## 📁 Project Structure

```text
github-visualizer/
├── public/               # Static assets & preview images
├── src/
│   ├── components/      # UI components (Cards, Search, Charts)
│   ├── hooks/           # Custom hooks for GitHub API fetching
│   ├── utils/           # SVG math calculations
│   ├── App.jsx          # Root application component
│   └── main.jsx         # Vite entry point
├── .env.example         # Template for environment variables
└── README.md
```


## 🛡️ API Resilience & Edge Case Handling
This application is engineered to be highly fault-tolerant against GitHub REST API limits and unexpected payloads:

Rate Limit Detection: Gracefully catches 403 errors and explicitly alerts the user when the unauthenticated rate limit (60 requests/hr) is reached, preventing app crashes.

Missing Users (404): Displays a user-friendly prompt if a searched developer profile does not exist.

Zero-Repository Accounts: Implements fallback state UI for accounts with no public repositories.

Empty Bio Fallbacks: Automatically injects default messaging when a user leaves their bio blank ("This developer prefers to let their source code do the talking").

## 🔑 Environment Variables & Rate Limits
By default, the app uses unauthenticated GitHub REST API calls (limited to 60 requests/hour per IP). To expand this limit to 5,000 requests/hour during local testing:

Create a .env file in the root directory.

Add your GitHub Personal Access Token:

```text
VITE_GITHUB_TOKEN=your_token_here
```

## 🚀 Getting Started (Local Development)
```text
To run this project locally on your machine:

Bash
# 1. Clone the repository
git clone [https://github.com/RaHuLxDeV1201/github-visualizer.git](https://github.com/RaHuLxDeV1201/github-visualizer.git)

# 2. Navigate into the directory
cd github-visualizer

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

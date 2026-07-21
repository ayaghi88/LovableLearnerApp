# Lovable Learner

**A sensory-friendly AI learning companion that adapts complex topics into digestible, neurodivergent-friendly study guides using Google's Gemini.**

Lovable Learner is designed from the ground up for neurodiverse minds (ADHD, Autism, Dyslexia, Dyscalculia, and Sensory Processing). It takes any learning topic and instantly breaks it down into structured visual summaries, interactive flashcards, hands-on activities, memory hacks, and high-yield exam anchors tailored to the learner's unique profile.

---

## ⚡ Quick Start

Get Lovable Learner running locally in under a minute:

```bash
git clone https://github.com/ayaghi88/LovableLearnerApp.git
cd LovableLearnerApp
npm install && npm run dev
```

---

## 🛠️ Built With

Lovable Learner is powered by a modern, high-performance tech stack:

*   **[Google AI Studio](https://aistudio.google.com/)** – Developer platform to prototype and tune prompts.
*   **[Gemini API](https://ai.google.dev/)** – Powered by `gemini-3.5-flash` for blazing fast, highly contextual, and adaptive responses.
*   **[React](https://react.dev/)** (with TypeScript) – For a rich, responsive, and type-safe user interface.
*   **[Vite](https://vite.dev/)** – For lightning-fast local development and highly optimized production builds.
*   **[Tailwind CSS](https://tailwindcss.com/)** – A modern utility-first CSS framework for clean, sensory-friendly visual styling.
*   **[Mermaid.js](https://mermaid.js.org/)** – To dynamically render elegant visual flowcharts and conceptual mind maps.

---

## ☁️ Cloudflare Pages Deployment Guide

Lovable Learner is fully optimized to run serverless on **Cloudflare Pages** using Cloudflare Page Functions. Follow these exact settings to deploy successfully:

### 1. Build & Preset Settings
When configuring your project in the Cloudflare Pages Dashboard, use the following settings under **Build configuration**:
*   **Framework preset**: Select `Vite`.
*   **Build command**: `npm run build`
*   **Build output directory**: `dist`
*   **Root directory**: ⚠️ **Leave this empty** (or set to the root of your repository). **Do NOT** set this to `/functions`, otherwise Cloudflare will not find the main React application.

### 2. Configure Your Free Gemini API Key
Lovable Learner uses a Cloudflare Page Function (`/functions/api/generate-guide.ts`) to securely communicate with the Gemini API. To enable it:
1.  Go to the **Google AI Studio** and get a [free Gemini API Key](https://aistudio.google.com/).
2.  In the Cloudflare Pages Dashboard, navigate to your project -> **Settings** -> **Variables and secrets** (as shown in your screenshot).
3.  Scroll down to **Environment variables** and click **Add variable** (or **Edit variables**).
4.  Add a new variable:
    *   **Name**: `GEMINI_API_KEY`
    *   **Value**: *[Your API key from Google AI Studio]*
    *   *Note: Ensure this is set for both the **Production** and **Preview** environments.*
5.  Click **Save**.
6.  ⚠️ **Crucial Step**: You **must redeploy** your site for the new environment variable to take effect! Go to the **Deployments** tab, click your latest build, and choose **Redeploy**.

---

## 🌟 Key Features

*   **Neurodivergent Customization**: Adapt any topic for ADHD, Autism, Dyslexia, Dyscalculia, or Sensory Processing.
*   **Age Adaptation**: Formats language, tone, and examples for children, teens, adults, or seniors.
*   **Interactive Learning**: Includes flashcards, hands-on practice, and exam anchors.
*   **Visual Diagrams**: Dynamically converts complex concepts into Mermaid.js mind maps.

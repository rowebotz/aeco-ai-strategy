# AECO AI Strategy Canvas

**A Strategic Decision-Support Tool for Architecture, Engineering, Construction, and Operations**

**Created by [Stephen Rowe](https://www.digitalrowe.com)**

The AECO AI Strategy Canvas helps architecture, engineering, construction, and operations leaders prioritize applied AI investments with clarity and discipline. It is not a demo chatbot. It is a structured strategy framework that translates AI capabilities into ranked, outcome-driven recommendations using transparent scoring logic.

**Live Site:** [https://rowebotz.github.io/aeco-ai-strategy/](https://rowebotz.github.io/aeco-ai-strategy/)

---

## What This Tool Does

The canvas evaluates three inputs:

- Industry segment
- Digital maturity level
- Strategic objective

It then applies a weighted scoring model to identify and rank high-impact AI use cases across planning, design, construction, and operations.

The output includes:

- Prioritized AI initiatives
- ROI-weighted scoring logic
- Implementation complexity indicators
- A phased roadmap covering immediate, mid-term, and long-term horizons

The goal is to help executive teams move from AI exploration to disciplined portfolio decisions.

---

## Why This Exists

AI in AECO is shifting from experimentation to operational impact. Most firms struggle with fragmented AI initiatives, unclear ROI prioritization, misalignment between digital maturity and ambition, and hype-driven investment decisions. This tool demonstrates how structured strategy, not hype, should drive AI investment.

---

## Strategic Framework

The ranking engine uses a transparent weighted model:

| Factor | Weight |
|---|---|
| Strategic objective alignment | 40% |
| Digital maturity fit | 30% |
| Base ROI / value potential | 30% |

The methodology is intentionally transparent to support executive-level conversations.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State and routing | React Router, Zustand |
| Package manager | Bun |
| Deployment | GitHub Pages |

The application is built as a static single-page application for portability and simplicity.

---

## Getting Started

### Prerequisites

- **Bun** or Node.js
- A modern browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rowebotz/aeco-ai-strategy.git
cd aeco-ai-strategy
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

The app will be available at `http://localhost:3000`.

### Building for Production
```bash
bun run build
```

Output will be in the `dist` directory.

---

## Contributing

1. Fork the repository and open a pull request
2. Run `bun install && bun dev` to get started locally
3. Follow the existing TypeScript and ESLint conventions

---

## About

Built by [Stephen Rowe](https://www.digitalrowe.com), a digital strategist focused on applied AI, systems thinking, and executive-level technology strategy.

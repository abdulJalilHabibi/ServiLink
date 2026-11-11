# ServiLink — Local Services Marketplace Platform

> **NetLinks Software Engineering Bootcamp 2026 • Upskill Program**  
> Executive Project Proposal, Multi-Role Architecture & Comprehensive System Specification

---

## 👥 Project Team Members
* **Abduljalil Habibi** — Component-driven React 19 architecture, design token enforcement, global state infrastructure (Language and Booking Contexts), Zod schema engineering, and Vercel cloud deployment.
* **Iftekharullah Sadid** — User requirements elicitation, user story definition, information architecture, implementation of auxiliary portal pages (About Us, Contact & Dispatch Hub, Categories Directory), and mock data modeling.
* **Suhail Salim** — Multi-device Figma prototype design (Desktop 1440px, Tablet 768px, Mobile 375px), responsive design validation, verification checklist execution (Appendix C), cross-browser accessibility (WCAG AA), and edge-case form testing.

🎨 **Figma Prototype:** [https://www.figma.com/design/kqJddRTSmNnq6I1iHfR66n/Servlink-Website](https://www.figma.com/design/kqJddRTSmNnq6I1iHfR66n/Servlink-Website)  
📄 **Complete Project Proposal & Specification:** See [PROJECT_PROPOSAL.md](./PROJECT_PROPOSAL.md)

---

## 🛠️ Tech Stack & Architecture
* **Frontend Library:** React 19 (`react` 19.3.1, `react-dom` 19.3.1)
* **Build Tool:** Vite 8 (`vite` 8.3.6) with `@vitejs/plugin-react`
* **Styling & Design System:** Tailwind CSS v4 (`@tailwindcss/vite` & `tailwindcss` 4.3.5)
* **Animations:** Motion (`motion` 14.10.1)
* **Icons:** Lucide React (`lucide-react` 1.70.0)
* **Routing:** React Router DOM v7 (`react-router-dom` 7.18.5)
* **Form Validation:** React Hook Form (`react-hook-form` 7.91.0) + Zod (`zod` 4.6.7) with `@hookform/resolvers`
* **Client State & Persistence:** React Context API + browser `localStorage`

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd servlink
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📋 Comprehensive System Specification
For the full 4-page system specification, including:
- **Appendix A:** Problem Statement, Evidence, and Stakeholder Personas
- **Section 2:** Project Scope Matrix & Deliverables
- **Section 3:** Functional (FR-01 to FR-10) and Non-Functional Requirements (NFR-01 to NFR-04)
- **Section 4:** Site Navigation Hierarchy & Conceptual ERD Data Model
- **Appendix C:** Complete QA Testing Checklist (TC-01 to TC-10) with verified PASS statuses

👉 Please review **[PROJECT_PROPOSAL.md](./PROJECT_PROPOSAL.md)**.

# WellSync - Health AI Companion Frontend

Welcome to the frontend application for **WellSync**, a comprehensive health AI companion platform featuring distinct portals for Patients and Healthcare Professionals.

## 🚀 Tech Stack & Architecture

This application is built with a modern, scalable, and responsive technology stack:

- **Core Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) for fast development and highly optimized production builds.
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) providing accessible and customizable Radix UI primitives.
- **State Management & Data Fetching:** [React Query (@tanstack/react-query)](https://tanstack.com/query/latest) for robust server-state management.
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) integrated with [Zod](https://zod.dev/) schema validation.
- **Data Visualization & Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📁 Project Structure

The codebase is organized primarily by feature and user persona, ensuring clean separation of concerns:

```text
src/
├── assets/          # Static assets like images and global CSS
├── components/      # Reusable UI components
│   ├── ui/          # Base shadcn/ui components (buttons, dialogs, inputs, etc.)
│   └── ...          # Domain-specific components (Sidebars, StatCards, RiskBadges, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions (e.g., tailwind merge utility: cn)
├── pages/           # Application views and routing
│   ├── patient/     # Patient Portal views (Dashboard, AI Check-in, Plan, Profile)
│   ├── professional/# Professional Portal views (Dashboard, Patients List, Chat, Reports)
│   ├── LandingPage.tsx
│   └── NotFound.tsx
├── services/        # API integration (e.g., aiChatApi.ts)
└── App.tsx          # Main application router and providers wrapper
```

## 🧑‍⚕️ Key Portals

### 1. Patient Portal (`/patient/*`)

A dedicated interface for patients to manage their health journey:

- **Dashboard:** At-a-glance overview of health metrics and upcoming events.
- **AI Check-in Assistant:** Interactive symptom checking and preliminary health assessment (`PatientCheckin.tsx`).
- **Care Plan:** Detailed tracking for ongoing treatments and regimens.
- **Profile & Settings:** Personal data and preference management.

### 2. Professional Portal (`/professional/*`)

A comprehensive suite for healthcare providers and data administrators:

- **Dashboard:** Top-level metrics and urgent alerts across the patient panel.
- **Patient Management:** Detailed lists and views of assigned patients (`ProfessionalPatients.tsx`).
- **Direct Chat:** Secure messaging interface for patient communication (`ProfessionalChat.tsx`).
- **Reports & Analytics:** Tools to synthesize patient data and view trends over time.
- **Templates:** Reusable structures for quick reporting and documentation.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (or `bun` depending on your preference; a `bun.lockb` exists, so Bun is natively supported)

### Installation

Clone the repository and install the required dependencies:

```bash
# Using npm
npm install

# Or using bun
bun install
```

### Development Server

Start the local Vite development server:

```bash
npm run dev
# or
bun run dev
```

The application will be accessible at `http://localhost:5173` by default.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
bun run build
```

This command generates the static assets inside the `dist/` folder, ready for deployment.

### Linting & Testing

Run the linter to ensure code quality:

```bash
npm run lint
```

Run unit tests via Vitest:

```bash
npm run test
```

## 🎨 Styling Guidelines

This project heavily relies on **Tailwind CSS** and **shadcn/ui**. If you need to add new base components, please consult the [shadcn documentation](https://ui.shadcn.com/docs) and generate them into the `src/components/ui` directory to maintain design consistency. Custom feature components should be placed directly in the `src/components` folder or co-located with their respective pages if they aren't globally reused.

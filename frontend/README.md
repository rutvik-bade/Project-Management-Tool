# Frontend - Project Manager's Tool Client

This directory contains the React client application for the Project Manager's Tool. It is built with Vite, TypeScript, and Zustand for a fast, modern, and scalable user experience.

## 🛠️ Tech Stack

-   **Framework**: React 19
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS with shadcn/ui
-   **State Management**: Zustand
-   **API Communication**: Apollo Client for GraphQL
-   **Dependencies**: See `package.json`

## ⚙️ Local Development Setup

Follow these steps to get the React application running on your local machine.

### Prerequisites

-   Node.js v18+ and `npm` (or `yarn`/`pnpm`)

### Installation & Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

2.  **Ensure the backend is running:**
    This frontend application requires the [backend server](../backend/README.md) to be running on `http://localhost:8000` to function correctly.

### Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Compiles and bundles the application for production.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run preview`: Serves the production build locally for testing.
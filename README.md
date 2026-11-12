# Project Setup, Execution, and Testing Guide

This document provides instructions on how to install dependencies, run the Room Booking System locally, and execute the automated test suite.

---

## 1. Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** (v18.0 or higher recommended)
* **npm** (comes bundled with Node.js)

---

## 2. Installation

1. Open your terminal and navigate to the project root directory.
2. Install the required project dependencies:

```bash
npm install
```

---

## 3. Running the Application

To start the local development server (Vite + React):

```bash
npm run dev
```

Once started, open your browser and navigate to the local URL shown in the terminal (typically `http://localhost:5173`).

---

## 4. Running Automated Tests

The test suite (`src/room-booking.test.ts`) uses **Vitest** to verify all business rules, boundary conditions, and UI feedback behaviors.

### Run all tests once (CI / Single Run mode):
```bash
npx vitest run
```

### Run specific test file:
```bash
npx vitest run src/room-booking.test.ts
```

### Run tests in interactive watch mode:
```bash
npx vitest
```

---

## 5. Troubleshooting

* **`No test files found` error:**
  * Ensure `room-booking.test.ts` is located inside the `src/` directory (e.g., alongside `main.tsx`).
  * Verify the file extension ends with `.test.ts` or `.spec.ts`.
* **Port already in use:**
  * If port `5173` is occupied, Vite will automatically select the next available port. Check the terminal output for the exact URL.
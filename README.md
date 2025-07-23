# Veridian Grove Dashboard

A modern and responsive dashboard for managing hotel bookings, built with React, TypeScript, and Supabase.

## Features

*   **Dashboard:** An overview of key metrics, including sales, check-ins, and occupancy rates.
*   **Bookings:** View, create, and manage bookings.
*   **Suites:** Manage hotel suites, including their capacity, price, and amenities.
*   **Authentication:** Secure user authentication with Supabase.
*   **Dark Mode:** A sleek dark mode for a better user experience.
*   **Data Visualization:** Interactive charts to visualize data.
*   **Real-time Updates:** Real-time data synchronization with Supabase.

## Tech Stack

*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Vite](https://vitejs.dev/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [React Router](https://reactrouter.com/)
    *   [TanStack Query](https://tanstack.com/query/v4/)
    *   [Radix UI](https://www.radix-ui.com/)
    *   [Recharts](https://recharts.org/)
*   **Backend:**
    *   [Supabase](https://supabase.io/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v14 or later)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/veridian-grove-dashboard.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables by creating a `.env` file in the root of the project and adding the following:
    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_KEY=your_supabase_anon_key
    ```
4.  Run the development server
    ```sh
    npm run dev
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

`VITE_SUPABASE_URL`: The URL of your Supabase project.

`VITE_SUPABASE_KEY`: The anonymous key of your Supabase project.

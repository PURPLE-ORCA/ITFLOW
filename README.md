### Yet Another Project Management Tool... But This One Has a Robot Brain and a Doodle Pad.

## About The Project

ITFLOW was built as a comprehensive final year project (PFE) to demonstrate a full-stack skillset using a modern, monolithic tech stack. It's an opinionated platform designed to streamline a specific, phased software development workflow (Analysis -> Design -> Development -> Testing -> Wrapping).

While it solves the "problem" of disorganized project tracking, its real purpose is to serve as a canvas for integrating advanced, and fun features. It's less about trying to compete with Jira and more about showing what's possible with modern web technologies.

**The core idea:** Combine the rigidity of a phased workflow with the chaotic creativity of a real-time whiteboard and the analytical power of a multimodal AI assistant.

---

## Features

#### ✅ Core Functionality
- **Project & Task Management:** Full CRUD operations for projects and their associated tasks.
- **Phased Workflow:** A structured five-phase workflow (Analysis, Design, Development, Testing, Wrapping) to guide projects from conception to completion.
- **User Authentication:** Secure user registration, login, and profile management powered by Laravel Breeze.
- **Team Collaboration:** Assign users to projects with specific roles.

#### ✨ The Fun Stuff (The "Look What I Can Do" Features)
- **🧠 Multimodal AI Assistant:** An integrated chat interface powered by the Google Gemini API. It can:
    -   Answer questions and provide assistance.
    -   Analyze uploaded images (`gemini-1.5-flash-latest`).
    -   Read and summarize the text content of uploaded PDF files.
- **🎨 Infinite Whiteboard:** A persistent, auto-saving digital whiteboard for each project, powered by **Excalidraw**. Perfect for architecture diagrams, brainstorming, or just doodling.
- **🌐 Internationalization (i18n):** The entire UI supports English, French, and Arabic, with a seamless language switcher in the header. It even handles RTL layouts for Arabic. **(DISABLED IN THIS VERSION)**
- **🔔 Real-Time(ish) Notifications:** A polling-based notification system alerts users when they're assigned to a new task, without needing WebSockets **(DISABLED IN THIS VERSION)**. 

---

## Tech Stack

This project is built on the TALL stack's cooler cousin, the LIRP stack (Laravel, Inertia, React, PostgreSQL).

| Backend       | Frontend       | Database     | Styling & UI        |
|---------------|----------------|--------------|---------------------|
| **Laravel 12**| **React 19**   | **PostgreSQL** | **Tailwind CSS**    |
| **PHP 8.2+**  | **Inertia.js** |              | **shadcn/ui**       |
|               | **Vite**       |              | **Framer Motion** (for flair) |

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:
- PHP >= 8.2
- Composer
- Node.js >= 18.0
- PostgreSQL

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/PURPLE-ORCA/ITFLOW.git
    cd ITFLOW
    ```

2.  **Install PHP dependencies**
    ```sh
    composer install
    ```

3.  **Install NPM dependencies**
    ```sh
    npm install
    ```

4.  **Set up your environment file**
    -   Copy the example environment file:
        ```sh
        cp .env.example .env
        ```
    -   Open the `.env` file and configure your database credentials:
        ```env
        DB_CONNECTION=pgsql
        DB_HOST=127.0.0.1
        DB_PORT=5432
        DB_DATABASE=itflow_db
        DB_USERNAME=your_username
        DB_PASSWORD=your_password
        ```
    -   **CRITICAL:** Add your Google Gemini API key for the AI Assistant to work:
        ```env
        GEMINI_API_KEY="your_secret_api_key"
        ```

5.  **Generate your application key**
    ```sh
    php artisan key:generate
    ```

6.  **Run the database migrations and seeders**
    -   The seeders will create a default admin user and a sample project to get you started.
    ```sh
    php artisan migrate --seed
    ```

7.  **Link the storage directory**
    -   This is necessary for uploaded files (like in the chat) to be publicly accessible.
    ```sh
    php artisan storage:link
    ```

8.  **Fire it up!**
    -   Run the Vite development server in one terminal:
        ```sh
        npm run dev
        ```
    -   Run the Laravel development server in another terminal:
        ```sh
        php artisan serve
        ```

You should now be able to access the application at `http://localhost:8000`.

**Default Login:**
-   **Email:** `admin@itflow.com`
-   **Password:** `password`

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Your Name - medms2005@gmail.com . misskaouthar9@gmail.com

# Backend - Project Manager's Tool API

This directory contains the Django and Graphene-Django backend for the Project Manager's Tool. It provides a robust GraphQL API for managing organizations, projects, and tasks.

## 🛠️ Tech Stack

-   **Framework**: Django
-   **API**: Graphene-Django (GraphQL)
-   **Database**: SQLite (for local development)
-   **Dependencies**: See `requirements.txt`

## ⚙️ Local Development Setup

Follow these steps to get the backend server running on your local machine.

### Prerequisites

-   Python 3.8+ and `pip`
-   A virtual environment tool (`venv` is recommended)

### Installation & Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For macOS/Linux
    python3 -m venv .venv && source .venv/bin/activate

    # For Windows
    python -m venv .venv && .venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Create database migrations:**
    ```bash
    python manage.py makemigrations organizations
    python manage.py makemigrations projects
    ```

5.  **Apply migrations to create the database schema:**
    ```bash
    python manage.py migrate
    ```

### Running the Server

1.  **Start the Django development server:**
    ```bash
    python manage.py runserver
    ```
    The API server will be running at `http://localhost:8000`.

2.  **Access the GraphiQL interface:**
    Navigate to `http://localhost:8000/graphql` in your browser to interact with the API.

### Important: Creating the Demo Organization

The frontend application is hard-coded to use a specific organization for demonstration purposes. You must create this organization in the Django admin panel.

1.  **Create a superuser:**
    ```bash
    python manage.py createsuperuser
    ```
    (Follow the prompts to set a username and password).

2.  **Navigate to the Django Admin:**
    Go to `http://localhost:8000/admin` and log in.

3.  **Add a new Organization:**
    -   Click on "Organizations".
    -   Click "Add organization".
    -   Set the **Slug** field to `acme-inc`.
    -   Fill in the other fields as you wish and save.

The application is now ready to accept API requests from the frontend!
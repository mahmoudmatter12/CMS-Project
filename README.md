# 🎓 College Management System (CMS)

The College Management System (CMS) is a web-based application designed to automate and streamline academic and administrative processes within a college. 
It enhances efficiency, reduces manual work, and provides a user-friendly interface for students, faculty, and administrators.

## 🧭 Project Structure

This repository is divided into two main sections:

- **Frontend** (Located in `/Frontend`)
- **Backend** (Located in `/Backend`)

---

## 🖥️ Frontend

The frontend is built using **Next.js** and **TypeScript**, styled with **Tailwind CSS**.

### 📁 Directory Overview

- `app/` – Contains Next.js pages and routes.
- `components/` – Reusable UI components.
- `lib/` – Utility libraries or configurations (e.g., API handlers, auth).
- `public/` – Static files like images and fonts.
- `types/` – Global TypeScript types.
- `utils/` – Helper functions.
- `middleware.ts` – Middleware logic for request handling.
- `tailwind.config.js` – Tailwind CSS configuration.
- `next.config.ts` – Next.js configuration.

### 🛠️ Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **ESLint & Prettier** for linting and formatting
- **PostCSS** for extended CSS support

### 🚀 Getting Started (Frontend)

```bash
cd Frontend
npm install
npm run dev
````

---

## ⚙️ Backend

The backend is built with **ASP.NET Core** using C#. It follows a layered architecture for separation of concerns and better scalability.

### 📁 Directory Overview

* `Controllers/` – API controllers that handle HTTP requests.
* `Core/` – Core business logic and domain models.
* `Infrastructure/` – Data access layer and external service integrations.
* `Migrations/` – Entity Framework migrations.
* `Properties/` – Configuration files and settings.
* `Program.cs` – Main application entry point.

### 🛠️ Tech Stack

* **ASP.NET Core 6/7**
* **Entity Framework Core**
* **C#**
* **SQL Server** (or any preferred DB)
* **REST API**

### 🚀 Getting Started (Backend)

Make sure you have .NET SDK installed.

```bash
dotnet restore
dotnet ef database update  # Apply migrations
dotnet run
```

---

## ✅ Features

* 🧑‍🎓 Student registration and management
* 👩‍🏫 Faculty information and scheduling
* 📚 Course and subject assignment
* 🗓️ Timetable and calendar management
* 📝 Assignment and grading support
* 🛡️ Authentication & Authorization (Planned/Implemented as needed)

---

## Contact
For inquiries, please reach out to the development team.
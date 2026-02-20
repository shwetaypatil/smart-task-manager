# Smart Task Manager

A full-stack productivity web application built using **Flask (Python)** and **React**, designed to help users manage tasks efficiently with real-time updates and summary analytics.

---

## 🚀 Project Overview

Smart Task Manager is a lightweight task management application that allows users to:

- Add new tasks
- Mark tasks as completed
- Delete tasks
- View real-time task summary (Total / Completed / Pending)

The application follows a clean separation of concerns between frontend and backend, with a RESTful API architecture.

---

## 🏗️ Architecture

Frontend (React)  
⬇ HTTP (Axios)  
Backend (Flask REST API)  
⬇  
SQLite Database (instance folder)

### Key Design Decisions

- Used **Flask** for lightweight API development
- Used **React functional components + hooks**
- Used **SQLite** for fast local persistence
- Stored database inside `backend/instance/` for clean separation of runtime data
- Used environment variables for API configuration
- Implemented RESTful CRUD operations

---

## 🛠️ Tech Stack

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- SQLite

### Frontend
- React
- Axios
- CSS (custom modern UI styling)

---

## 🤖 AI Usage & Guidance Documentation

AI tools were used as development assistants to improve productivity, clarity, and debugging efficiency during this project. All architectural decisions and implementation logic were manually reviewed, tested, and validated.

### 🔹 AI Usage Scope

AI was used for:

- Scaffolding initial Flask project structure
- Generating RESTful CRUD endpoint templates
- Reviewing SQLAlchemy model patterns
- Debugging environment configuration issues (Windows venv, SQLite path resolution)
- Suggesting UI improvements and layout refinements
- Improving documentation clarity and structure
- Refining walkthrough structure and explanation flow


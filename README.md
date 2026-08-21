# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# TaskFlow – Task Management Frontend

TaskFlow is a modern and responsive task management application frontend built with React.js. It provides an intuitive dashboard for users to create, manage, update, filter, and delete tasks efficiently.

## 🚀 Features

- User Login and Registration
- JWT-based authentication
- Responsive dashboard
- Create tasks
- Edit and update tasks
- Delete tasks
- View all tasks
- Filter tasks by status
- Pending tasks
- Completed tasks
- Task priority management
- Task due dates
- Task location
- Weather information
- File attachment support
- Responsive sidebar navigation
- Logout functionality
- Modern dark-themed UI

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Lucide React
- REST APIs
- Fetch API

## 📂 Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── TaskCard.jsx
│   ├── TaskFormModal.jsx
│   └── ...
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── App.jsx
├── main.jsx
└── ...
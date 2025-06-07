# Insurance Application Portal

This project is a **responsive, modern insurance application portal** built with React, Material UI (MUI), and React Query. It provides a robust platform for managing insurance applications, including dynamic forms, data tables, and user-friendly navigation.

---

## Features

- **Dynamic Multi-Step Forms:**  
  Create and submit insurance applications with dynamic fields, conditional logic, and validation. Form steps and fields are driven by backend data.

- **Responsive Data Table:**  
  View, search, filter, and export insurance applications in a responsive MUI DataGrid with column settings, quick search, and CSV/print export.

- **Theming & Accessibility:**  
  Toggle between light and dark mode. The UI is accessible and adapts to all screen sizes.

- **React Query Integration:**  
  Efficient data fetching, caching, and mutation using React Query for a smooth user experience.

- **Custom Hooks:**  
  Modular hooks for API queries, form state, and dynamic option fetching (e.g., states by country).

- **Routing & Layout:**  
  Clean routing structure with a shared layout, navigation, and error handling for unknown routes.

---

## Tech Stack

- **React** (with functional components and hooks)
- **Material UI (MUI)**
- **React Query**
- **React Router**
- **Axios** (with interceptor for API calls)
- **react-hot-toast**
- **PropTypes** for type safety

---

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Duplicate `.env.example` and save it as `.env`, or rename it directly.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
Insuranc-Application-Portal/
├── public/
│   └── ... (static assets)
├── src/
│   ├── assets/
│   │   └── constants.js
│   ├── components/
│   │   ├── DataTable/
│   │   │   ├── DataTable.jsx
│   │   │   └── ToolbarElement.jsx
│   │   ├── DynamicForm/
│   │   │   ├── DynamicForm.jsx
│   │   │   └── FieldElement.jsx
│   │   ├── layout/
│   │   |   └── Layout.jsx
|   |   └── NewApplication/
│   |      └── NewApplication.jsx
│   ├── hooks/
│   │   ├── useApiMutation.js
│   │   ├── useApiQuery.js
│   │   ├── useForms.js
│   │   ├── useLocalStorage.js
│   │   ├── useStateName.js
│   │   ├── useSubmissions.js
│   │   └── useSubmitForm.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── NewApplicationPage.jsx
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── services/
│   │   └── axiosInterceptor.js
│   ├── themes/
│   │   └── theme.js
│   ├── App.jsx
│   ├── global.css
│   └── main.jsx
├── package.json
├── README.md
└── ... (other config files)
```

---

## Customization

- **Add new form fields or steps:**  
  Update the backend or constants in `src/assets/constants.js`.
- **API endpoints:**  
  Configure in `src/services/axiosInterceptor.js` and hooks.
- **Theming:**  
  Edit `src/themes/theme.js` for custom colors and typography.

---

## License

Ali Abdi

---

**Built with ❤️ using React and MUI.**

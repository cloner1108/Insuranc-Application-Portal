import { useMemo } from "react";
import "./global.css";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// React Hot Toast
import { Toaster } from "react-hot-toast";

// MUI
import { ThemeProvider, CssBaseline } from "@mui/material";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Custom hooks and modules
import useLocalStorage from "./hooks/useLocalStorage";
import getTheme from "./themes/theme";
import AppRouter from "./routes/AppRouter";

// Create QueryClient outside the component to avoid recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Number of retry attempts for failed queries
      staleTime: 1000 * 60 * 0.5, // 0.5 minutes
      cacheTime: 1000 * 60 * 1, // 1 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    },
  },
});

const App = () => {
  // Persist theme mode in localStorage
  const [mode, setMode] = useLocalStorage("mode", "light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRouter mode={mode} setMode={setMode} />
        </Router>
        <Toaster position="top-center" reverseOrder />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

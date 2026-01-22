import AppRoutes from "./routes/AppRoutes";
import { useAuthInit } from "./hooks/useAuthInit";
import { useAuth } from "./stores/authStore";

export default function App() {
  useAuthInit();
  const isLoading = useAuth((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppRoutes />
    </>
  );
}

//Code-Based Route
//File-Based Route

//Buổi sau:
// - Multi Layout
// - Protected Route

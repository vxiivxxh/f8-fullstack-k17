import { useEffect } from "react";
import { useAuth } from "../stores/authStore";

export function useAuthInit() {
  const restoreAuth = useAuth((state) => state.restoreAuth);
  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);
}

import { Navigate } from "react-router-dom";
import { useEntries } from "./GlobalContext/Entries";
export default function AuthGuard({ children }) {
  const { currentUser } = useEntries();

  if (!currentUser?.id) {
    return <Navigate to="/" replace />;
  }

  return children;
}

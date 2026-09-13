import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("punebookstall_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (authResponse) => {
    const { token, ...profile } = authResponse;
    localStorage.setItem("punebookstall_token", token);
    localStorage.setItem("punebookstall_user", JSON.stringify(profile));
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem("punebookstall_token");
    localStorage.removeItem("punebookstall_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

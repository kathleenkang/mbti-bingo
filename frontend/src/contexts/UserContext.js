import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ defaultValue = null, children }) {
  const [user, setUser] = useState(defaultValue);

  const fetchUser = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      return;
    }

    const response = await fetch(`https://api.mbtibingo.com/users/${uid}`);
    const body = await response.json();
    setUser(body);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("반드시 UserProvider 안에서 사용해야 합니다.");
  }

  return context["user"];
}

export function useSetUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("반드시 UserProvider 안에서 사용해야 합니다.");
  }

  return context["setUser"];
}

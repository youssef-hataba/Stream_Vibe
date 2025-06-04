"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children , userFromServer }) => {
  const [user, setUser] = useState(userFromServer || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userFromServer) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("User not authenticated");

        const data = await res.json();

        
        if (data.status === "success") {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userFromServer,user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

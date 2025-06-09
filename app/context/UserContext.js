"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children, userFromServer }) => {
  const [user, setUser] = useState(userFromServer?.user || null);
  const [reviews, setReviews] = useState(userFromServer?.reviews || []);
  const [loading, setLoading] = useState(!userFromServer);

  useEffect(() => {
    if (userFromServer) return ;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("User not authenticated");

        const data = await res.json();

        if (data.status === "success") {
          setUser(data.user);
          setReviews(data.reviews || []);
        } else {
          setUser(null);
          setReviews([]);
        }
      } catch (err) {
        setUser(null);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userFromServer]);

  return (
    <UserContext.Provider value={{ user, setUser, reviews, setReviews, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

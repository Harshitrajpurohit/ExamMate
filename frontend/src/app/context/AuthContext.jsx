"use client"
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setIsAuthenticated] = useState(false);
    // ADD THIS: It prevents the app from guessing the auth status while fetching
    const [loading, setLoading] = useState(true); 

    const checkAuth = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/auth/me`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error("Auth check failed", err);
            setIsAuthenticated(false);
        } finally {
            // SET TO FALSE: The check is now finished
            setLoading(false); 
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

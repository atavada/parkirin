"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Tipe untuk AuthContext
interface AuthContextType {
	token: string | null;
	setToken: (token: string | null) => void;
}

// Inisialisasi context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(() => {
		// Ambil token dari localStorage jika ada
		return typeof window !== "undefined" ? localStorage.getItem("token") : null;
	});

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

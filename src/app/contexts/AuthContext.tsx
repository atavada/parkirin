"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface User {
	id: string;
	name: string;
	phone_number: string;
	role: string;
}

interface AuthContextType {
	token: string | null;
	setToken: (token: string | null) => void;
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(() => {
		return typeof window !== "undefined" ? localStorage.getItem("token") : null;
	});

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	const logout = () => {
		setToken(null);
		localStorage.removeItem("token");
	};

	return <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

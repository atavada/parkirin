"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

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
	logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(() => {
		const token = typeof window !== "undefined" ? Cookies.get("token") : null;
		return token ?? null;
	});

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (token) {
			Cookies.set("token", token, { expires: 7 });
		} else {
			Cookies.remove("token");
		}
	}, [token]);

	const logOut = () => {
		setToken(null);
		Cookies.remove("token");
	};

	return <AuthContext.Provider value={{ token, setToken, user, setUser, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface User {
	id: string;
	name: string;
	phone_number: string;
	role: string;
}

export const useUserSession = () => {
	const { token, setUser } = useAuth();
	const [user, setUserState] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserSession = async () => {
			if (token) {
				try {
					const response = await fetch("/api/user-dashboard", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const result = await response.json();
						setUserState(result.data);
						setUser(result.data);
						setLoading(false);
					} else {
						const errorResult = await response.json();
						setError(errorResult.message || "Failed to fetch user session");
						setLoading(false);
					}
				} catch (error) {
					setError("An error occurred while fetching user session");
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		fetchUserSession();
	}, [token, setUser]);

	return { user, loading, error };
};

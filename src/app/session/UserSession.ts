"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface User {
	id: string;
	name: string;
	phone_number: string;
	role: string;
}

interface Store {
	id: number;
	user: User;
	store_name: string;
	address: string;
	latitude: number;
	longitude: number;
	working_hours: string;
	is_hiring: boolean;
	is_paid: boolean;
	created_at: number;
	url_image: string;
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

export const useStoreSession = () => {
	const { token } = useAuth();
	const [store, setStore] = useState<Store | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStoreSession = async () => {
			if (token) {
				try {
					const response = await fetch("/api/store-dashboard", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const result = await response.json();
						setStore(result.data);
						setLoading(false);
					} else {
						const errorResult = await response.json();
						setError(errorResult.message || "Failed to fetch store session");
						setLoading(false);
					}
				} catch (error) {
					setError("An error occurred while fetching store session");
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		fetchStoreSession();
	}, [token]);

	return { store, loading, error };
};

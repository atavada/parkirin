"use client";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Footer } from "@/components/home-page/Footer";
import { useAuth } from "../contexts/AuthContext";
import ListMitra from "@/components/jukir/ListMitra";
import { NavbarJukir } from "@/components/jukir/NavbarJukir";

interface UserData {
	data: {
		name: string;
		role: string;
	};
}

export default function Page() {
	const { token } = useAuth();
	const [data, setData] = useState<UserData | null>(null);
	const [isLoading, setLoading] = useState(false);
	const user = data?.data;

	useEffect(() => {
		const fetchData = async () => {
			if (token) {
				try {
					const response = await fetch("/api/user-dashboard", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const result = await response.json();
					if (response.ok) {
						setData(result);
					} else {
						console.error("Failed to fetch dashboard:", result.message);
					}
				} catch (error) {
					console.error("Failed to fetch dashboard:", error);
				}
			}
		};

		fetchData();
	}, [token]);

	return (
		<>
			<NavbarJukir />
			<div className="p-10 font-bold text-2xl">
				<h1>Hallo selamat datang Juru Parkir {user?.name}</h1>
			</div>
			<div className="p-10">
				<Input type="text" placeholder="Cari mitra Anda..." className="mb-10" />
				<Separator />
				<ListMitra />
			</div>
			<Footer />
		</>
	);
}

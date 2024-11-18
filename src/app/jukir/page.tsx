"use client";

import React, { useEffect, useState } from "react";
import { FooterJukir } from "@/components/jukir/FooterJukir";
import { useAuth } from "../contexts/AuthContext";
import { ListMitra } from "@/components/jukir/ListMitra";
import { NavbarJukir } from "@/components/jukir/NavbarJukir";
import Loading from "@/components/home-page/Loading";

interface UserData {
	data: {
		name: string;
		role: string;
	};
}

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
	const { token } = useAuth();
	const [data, setData] = useState<UserData | null>(null);
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

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
      }, []);

      if (isLoading) {
        return <Loading />;
      }

	return (
		<>
			<NavbarJukir />
			<div className="p-10 font-bold text-2xl">
				<h1>Hallo selamat datang Juru Parkir {user?.name}</h1>
			</div>
			<div className="p-10">
				<ListMitra />
			</div>
			<FooterJukir />
		</>
	);
}

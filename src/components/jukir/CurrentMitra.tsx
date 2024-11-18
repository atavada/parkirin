"use client";

import Link from "next/link";
import { Card, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

interface Mitra {
	id: string;
	store_name: string;
	address: string;
	status: string;
	working_hours: string;
	url_image: string;
}

export const CurrentMitra = () => {
	const { token } = useAuth();
	const [currentMitraList, setCurrentMitraList] = useState<Mitra[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/application/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			const data = result.data;
			const filteredData = data.filter((mitra: Mitra) => mitra.status === "accepted");
			// console.log(filteredDat a);
			setCurrentMitraList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<p>Mohon tunggu...</p>
			</div>
		);
	}

	if (!currentMitraList) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<p className="text-gray-500">Belum ada mitra saat ini.</p>
			</div>
		);
	}

	return (
		<>
			<div className="mb-4">
				<h1 className="font-bold text-[2rem] mb-5">Mitra Saat Ini</h1>
				<div className="w-full">
					{currentMitraList.map((mitra) => (
						<Link href={`/jukir/detail-mitra/${mitra.id}`}>
							<Card className="w-full p-4">
								<div className="flex justify-start items-start">
									<div className="mr-4">
										<img src="/1.jpg" alt={mitra.store_name} className="w-auto h-[100px] object-cover rounded-xl" />
									</div>
									<div className="flex justify-between items-start w-full">
										<div>
											<h1 className="text-xl font-semibold">{mitra.store_name}</h1>
											<CardDescription>{mitra.address}</CardDescription>
										</div>
										<div>
											<p className="font-semibold text-sm">{mitra.working_hours}</p>
										</div>
									</div>
								</div>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

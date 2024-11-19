"use client";

import Link from "next/link";
import { Card, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

interface Mitra {
	id: string;
	store_id: string;
	store_name: string;
	address: string;
	status: string;
	working_hours: string;
	url_image: string;
}

interface FetchResponse {
	data: Mitra[];
}

const MitraCard = ({ mitra }: { mitra: Mitra }) => (
	<Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.store_id}`}>
		<Card className="w-full p-4 mb-4">
			<div className="flex justify-start items-start">
				<div className="w-[100px] h-[100px] mr-4">
					<img src={mitra.url_image} alt={mitra.store_name} className="w-full h-full object-cover rounded-xl" />
				</div>
				<div className="flex justify-between items-start w-full">
					<div>
						<h1 className="text-xl font-semibold">{mitra.store_name}</h1>
						<CardDescription>{mitra.address}</CardDescription>
					</div>
					<div>
						<p className="font-semibold">{mitra.working_hours}</p>
					</div>
				</div>
			</div>
		</Card>
	</Link>
);

export const CurrentMitra = () => {
	const { token } = useAuth();
	const [currentMitraList, setCurrentMitraList] = useState<Mitra[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async (isDirectHire: boolean) => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/application/user?is_direct_hire=${isDirectHire}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result: FetchResponse = await response.json();
			return result.data;
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const fetchAllData = async () => {
			setCurrentMitraList([]);
			const directHireData = await fetchData(true);
			const nonDirectHireData = await fetchData(false);
			setCurrentMitraList([...(directHireData || []), ...(nonDirectHireData || [])]);
		};
		fetchAllData();
	}, [token]);

	if (isLoading) {
		return (
			<div className="flex items-center">
				<p className="text-gray-500">Mohon tunggu...</p>
			</div>
		);
	}

	const acceptedMitraList = currentMitraList.filter((mitra) => mitra.status === "accepted");

	if (!acceptedMitraList.length) {
		return (
			<div className="flex items-center">
				<p className="text-gray-500">Belum ada mitra saat ini.</p>
			</div>
		);
	}

	return (
		<>
			<div className="w-full">
				{acceptedMitraList.map((mitra) => (
					<MitraCard key={mitra.id} mitra={mitra} />
				))}
			</div>
		</>
	);
};

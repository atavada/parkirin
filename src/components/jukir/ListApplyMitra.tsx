"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/app/contexts/AuthContext";
import { Badge } from "../ui/badge";
import { DirectHireList } from "./DirectHireList";

interface Mitra {
	id: string;
	store_id: string;
	store_name: string;
	address: string;
	working_hours: string;
	url_image: string;
	status: string;
}

export const ListApplyMitra = () => {
	const { token } = useAuth();
	const [mitraList, setMitraList] = useState<Mitra[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/application/user`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			const stores = result.data;
			setMitraList(stores);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="my-10">
				<h1 className="font-bold text-[2rem] mb-5">Rekrut Dari Mitra</h1>
				<DirectHireList />
			</div>
			<h1 className="font-bold text-[2rem] mb-5">Daftar Lamaran</h1>
			{isLoading ? (
				<div className="flex items-center">
					<p className="text-gray-500">Mohon tunggu...</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
					{mitraList.map((mitra) => (
						<Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.store_id}`}>
							<Card className="shadow-lg mx-auto">
								<CardHeader>
									<div>
										<CardTitle>{mitra.store_name}</CardTitle>
										<CardDescription>{mitra.address}</CardDescription>
										<p className="text-sm">{mitra.working_hours}</p>
									</div>
									<div>
										{mitra.status === "sent" ? (
											<Badge>Menunggu Persetujuan</Badge>
										) : mitra.status === "accepted" ? (
											<Badge className="bg-green-500 hover:bg-green-400">Lamaran Diterima</Badge>
										) : (
											<Badge className="bg-red-500 hover:bg-red-400">Lamaran Ditolak</Badge>
										)}
									</div>
								</CardHeader>
								<CardContent>
									<img
										src={mitra.url_image}
										alt={mitra.store_name}
										className="w-full h-[250px] object-cover rounded-xl"
									/>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
		</>
	);
};

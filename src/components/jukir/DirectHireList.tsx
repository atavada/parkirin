"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { UpdateApplyStatus } from "./UpdateApplyStatus";

interface Mitra {
	id: string;
	store_id: string;
	store_name: string;
	address: string;
	working_hours: string;
	url_image: string;
	status: string;
}

export const DirectHireList = () => {
	const { token } = useAuth();
	const [mitraList, setMitraList] = useState<Mitra[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/application/user?is_direct_hire=true`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			const stores = result.data;
			console.log(stores);
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
			{!mitraList ? (
				<div className="flex items-center">
					<p className="text-gray-500">Belum ada rekrut dari mitra.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
					{mitraList.map((mitra) => (
						<Card key={mitra.id} className="shadow-lg mx-auto">
							<Link href={`/jukir/detail-mitra/${mitra.store_id}`}>
								<CardHeader>
									<div>
										<CardTitle>{mitra.store_name}</CardTitle>
										<CardDescription>{mitra.address}</CardDescription>
										<p className="text-sm">{mitra.working_hours}</p>
									</div>
								</CardHeader>
								<CardContent>
									<img
										src={mitra.url_image}
										alt={mitra.store_name}
										className="w-full h-[250px] object-cover rounded-xl"
									/>
								</CardContent>
							</Link>
							<CardFooter>
								{mitra.status === "sent" ? (
									<UpdateApplyStatus application_id={mitra.id} />
								) : mitra.status === "accepted" ? (
									<Button className="bg-green-500 hover:bg-green-400" disabled>
										Lamaran Diterima
									</Button>
								) : (
									<Button className="bg-red-500 hover:bg-red-400" disabled>
										Lamar an Ditolak
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</>
	);
};

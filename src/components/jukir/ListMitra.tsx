"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CurrentMitra } from "./CurrentMitra";
import { History, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Mitra {
	id: string;
	user_id: string;
	store_name: string;
	address: string;
	longitude: string;
	latitude: string;
	working_hours: string;
	url_image: string;
	is_hiring: boolean;
	is_paid: boolean;
	created_at: string;
}

export const ListMitra = () => {
	const [mitraList, setMitraList] = useState<Mitra[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredMitra, setFilteredMitra] = useState<Mitra[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/stores?isHiring=true");
			const result = await response.json();
			const stores = result.data?.stores;
			setMitraList(stores);
			setFilteredMitra(stores);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSearch = () => {
		if (searchQuery) {
			const filtered = mitraList.filter(
				(mitra) =>
					mitra.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					mitra.address.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredMitra(filtered);
		} else {
			setFilteredMitra(mitraList);
		}
	};

	return (
		<div>
			<div className="mt-10 mb-5">
				<div className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-full shadow mb-5">
					<Input
						type="text"
						placeholder="Cari Mitra berdasarkan nama atau alamat..."
						className="flex-1 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 rounded-full"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
					/>
					<Button variant="link" onClick={handleSearch}>
						<Search className="text-gray-500 dark:text-gray-400 w-6 h-6" />
					</Button>
				</div>

				{searchQuery ? (
					<>
						<Separator className="my-12" />
						<h1 className="font-bold text-[2rem] mb-5 flex items-center gap-3">
							Hasil Pencarian Mitra <History />
						</h1>
						{isLoading ? (
							<div className="flex justify-center">
								<p>Loading...</p>
							</div>
						) : filteredMitra.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
								{filteredMitra.map((mitra) => (
									<Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.id}`}>
										<Card className="shadow-lg mx-auto">
											<CardHeader>
												<div>
													<CardTitle>{mitra.store_name}</CardTitle>
													<CardDescription>{mitra.address}</CardDescription>
													<p className="text-sm">{mitra.working_hours}</p>
												</div>
												<div>
													{mitra.is_hiring ? (
														<Badge>Sedang Merekrut</Badge>
													) : (
														<Badge className="bg-red-500 hover:bg-red-400">Tidak Merekrut</Badge>
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
						) : (
							<div className="text-center col-span-full">
								<p className="text-gray-500">Tidak ada mitra yang ditemukan.</p>
							</div>
						)}
					</>
				) : (
					<>
						<Separator className="my-12" />
						<div className="mb-12">
							<h1 className="font-bold text-[2rem] mb-5">Mitra Saat Ini</h1>
							<CurrentMitra />
						</div>
						<h1 className="font-bold text-[2rem] mb-5" id="list-mitra">
							Mitra Lainnya
						</h1>
						{isLoading ? (
							<div className="flex items-center">
								<p className="text-gray-500">Mohon tunggu...</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
								{mitraList.map((mitra) => (
									<Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.id}`}>
										<Card className="shadow-lg mx-auto">
											<CardHeader>
												<div>
													<CardTitle>{mitra.store_name}</CardTitle>
													<CardDescription>{mitra.address}</CardDescription>
													<p className="text-sm">{mitra.working_hours}</p>
												</div>
												<div>
													{mitra.is_hiring ? (
														<Badge>Sedang Merekrut</Badge>
													) : (
														<Badge className="bg-red-500 hover:bg-red-400">Tidak Merekrut</Badge>
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
				)}
			</div>
		</div>
	);
};

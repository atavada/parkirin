"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CurrentMitra } from "./CurrentMitra";

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
				<Input
					placeholder="Cari Mitra berdasarkan nama atau alamat..."
					className="mb-5"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSearch();
					}}
				/>
				<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-5" onClick={handleSearch}>
					Cari
				</button>

				{searchQuery ? (
					<>
						<h1 className="font-bold text-[2rem] mb-5 mt-5">Hasil Pencarian Mitra</h1>
						{isLoading ? (
							<div className="flex justify-center">
								<p>Loading...</p>
							</div>
						) : filteredMitra.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
								{filteredMitra.map((mitra) => (
									<Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.id}`}>
										<Card className="w-[350px] shadow-lg mx-auto">
											<CardHeader>
												<CardTitle>{mitra.store_name}</CardTitle>
												<CardDescription>{mitra.address}</CardDescription>
											</CardHeader>
											<CardContent>
												<img src={mitra.url_image} alt="banner" className="w-full h-[250px] object-cover rounded-xl" />
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
						<CurrentMitra />
						<Separator className="my-12" />
						<h1 className="font-bold text-[2rem] mb-5">Mitra Lainnya</h1>
						{isLoading ? (
							<div className="flex justify-center">
								<p>Mohon tunggu...</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
								{mitraList.map((mitra) => (
									<Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.id}`}>
										<Card className="w-[350px] shadow-lg mx-auto">
											<CardHeader>
												<CardTitle>{mitra.store_name}</CardTitle>
												<CardDescription>{mitra.address}</CardDescription>
											</CardHeader>
											<CardContent>
												<img src={mitra.url_image} alt="banner" className="w-full h-[250px] object-cover rounded-xl" />
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

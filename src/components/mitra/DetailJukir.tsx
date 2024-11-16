"use client";

import { useEffect, useState } from "react";

interface Jukir {
	id: string;
	nama: string;
	phone_number: string;
	role: string;
}

export const DetailJukir = ({ jukir_id }: { jukir_id: string }) => {
	const [jukir, setJukir] = useState<Jukir | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/users/${jukir_id}`);
				const result = await response.json();
				const data = result.data;
				setJukir({
					id: data.id,
					nama: data.name,
					phone_number: data.phone_number,
					role: data.role,
				});
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [jukir_id]);

	if (isLoading) {
		return <div className="text-gray-500">Mohon tunggu...</div>;
	}

	if (!jukir) {
		return <div className="text-gray-500">Data tidak ditemukan</div>;
	}

	return (
		<>
			<div className="bg-gray-100 p-6 rounded-lg space-y-2">
				<h4 className="text-xl font-semibold">{jukir.nama}</h4>
				<p className="text-gray-600">{jukir.phone_number}</p>
			</div>
		</>
	);
};

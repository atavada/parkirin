"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { Button, ButtonLoading } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export const OfferJukir = ({ jukir_id }: { jukir_id: any }) => {
	const { token } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleHire = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/apply-user/${jukir_id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const data = await response.json();
				toast({
					title: "Gagal Melakukan Hiring",
					description: data.data,
					variant: "destructive",
				});
			} else {
				toast({
					title: "Berhasil Melakukan Hiring",
					description: "Hiring juru parkir berhasil",
				});

				window.location.reload();
			}
			setIsLoading(false);
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Gagal Melakukan Hiring",
				description: "Hiring juru parkir gagal",
				variant: "destructive",
			});
		}
	};

	return (
		<>
			{isLoading ? (
				<ButtonLoading />
			) : (
				<Button className="w-24" onClick={handleHire}>
					Hire
				</Button>
			)}
		</>
	);
};

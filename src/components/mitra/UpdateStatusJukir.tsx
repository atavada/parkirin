"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UpdateStatusJukir = ({ application_id }: { application_id: string }) => {
	const { token } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const handleAccepted = async (id: string) => {
		setIsLoading(true);
		try {
			const status = "accepted";
			const response = await fetch(`/api/status-apply-store/${id}?update=${status}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const res = await response.json();
			if (res.success) {
				router.refresh();
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleRejected = async (id: string) => {
		setIsLoading(true);
		try {
			const status = "rejected";
			const response = await fetch(`/api/status-apply-store/${id}?update=${status}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const res = await response.json();
			if (res.success) {
				router.refresh();
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger
					className={buttonVariants({
						variant: "default",
						className: "bg-emerald-500 hover:bg-emerald-400",
					})}
				>
					Terima
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Apakah anda yakin menerima jukir ini?</AlertDialogTitle>
						<AlertDialogDescription>
							Dengan menerima jukir ini, maka jukir tersebut akan menjadi jukir anda.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleAccepted(application_id)}>Ya</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog>
				<AlertDialogTrigger
					className={buttonVariants({
						variant: "default",
						className: "bg-red-500 hover:bg-red-400",
					})}
				>
					Tolak
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Apakah anda yakin menolak jukir ini?</AlertDialogTitle>
						<AlertDialogDescription>
							Dengan menolak jukir ini, maka jukir tersebut tidak akan menjadi jukir anda.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleRejected(application_id)}>Ya</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

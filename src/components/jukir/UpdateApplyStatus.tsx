import { useAuth } from "@/app/contexts/AuthContext";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
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

export const UpdateApplyStatus = ({ application_id }: { application_id: string }) => {
	const { token } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleAccepted = async (id: string) => {
		try {
			const status = "accepted";
			const response = await fetch(`/api/status-apply-user/${id}?update=${status}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const res = await response.json();
			if (res.success) {
				window.location.reload();
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleRejected = async (id: string) => {
		setIsLoading(true);
		try {
			const status = "rejected";
			const response = await fetch(`/api/status-apply-user/${id}?update=${status}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const res = await response.json();
			if (res.success) {
				window.location.reload();
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
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
							<AlertDialogTitle>Apakah anda yakin menerima mitra ini?</AlertDialogTitle>
							<AlertDialogDescription>
								Dengan menerima mitra ini, maka mitra tersebut akan menjadi mitra anda.
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
							<AlertDialogTitle>Apakah anda yakin menolak mitra ini?</AlertDialogTitle>
							<AlertDialogDescription>
								Dengan menolak mitra ini, maka mitra tersebut tidak akan menjadi mitra anda.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Batal</AlertDialogCancel>
							<AlertDialogAction onClick={() => handleRejected(application_id)}>Ya</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</>
	);
};

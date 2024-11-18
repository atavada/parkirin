"use client";

import { Button, ButtonLoading, buttonVariants } from "../ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Ban, BanIcon } from "lucide-react";
import { CancelApply } from "./CancelApply";

export const ApplyMitra = ({ id }: { id: any }) => {
	const { token } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
	const [applications, setApplications] = useState<any[]>([]);
	const [applicationId, setApplicationId] = useState<string | null>(null);
	const [applicationIsDirectHire, setApplicationIsDirectHire] = useState<boolean>(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/application/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			setApplications(result.data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	useEffect(() => {
		const application = applications.find((data: any) => {
			return data.store_id === Number(id);
		});
		setApplicationStatus(application ? application.status : null);
		setApplicationId(application ? application.id : null);
		setApplicationIsDirectHire(application ? application.is_direct_hire : false);
	}, [applications, id]);

	const handleApply = async () => {
		setIsSubmitting(true);
		try {
			const response = await fetch(`/api/apply-store/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				toast({
					title: "Selamat!",
					description: "Lamaran berhasil dikirim.",
				});

				window.location.reload();
			} else {
				toast({
					variant: "destructive",
					title: "Gagal mengirim lamaran",
					description: "Maaf, terjadi kesalahan saat mengirim lamaran. Silahkan coba lagi.",
				});
			}

			setIsSubmitting(false);
		} catch (error) {
			console.error("Error applying:", error);
			alert("Terjadi kesalahan saat mengirim lamaran.");
		}
	};

	return (
		<>
			{!applicationIsDirectHire ? (
				applicationStatus === "sent" ? (
					<CancelApply id={applicationId} />
				) : applicationStatus === "accepted" ? (
					<Button variant="default" disabled className="w-full rounded-xl">
						<BanIcon />
						Anda sudah melamar di tempat ini.
					</Button>
				) : (
					<Dialog>
						<DialogTrigger className={buttonVariants({ variant: "default", className: "w-full rounded-xl" })}>
							Lamar Sekarang
						</DialogTrigger>
						<DialogContent>
							<DialogTitle>Apakah Anda yakin untuk Melamar?</DialogTitle>
							<DialogDescription>
								Dengan melamar, Anda akan mengirimkan data diri Anda untuk melamar di tempat ini.
							</DialogDescription>
							{isSubmitting ? (
								<ButtonLoading />
							) : (
								<Button className="mt-5" onClick={handleApply}>
									Ya, Setuju
								</Button>
							)}
						</DialogContent>
					</Dialog>
				)
			) : (
				<>
					<Button variant="default" disabled className="w-full rounded-xl">
						Terima Rekrut
					</Button>
					<Button variant="default" disabled className="w-full rounded-xl">
						Tolak Rekrut
					</Button>
				</>
			)}
		</>
	);
};

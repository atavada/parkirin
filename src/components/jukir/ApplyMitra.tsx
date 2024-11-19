"use client";

import { Button, ButtonLoading, buttonVariants } from "../ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Ban, BanIcon } from "lucide-react";
import { CancelApply } from "./CancelApply";
import { UpdateApplyStatus } from "./UpdateApplyStatus";

interface Mitra {
	id: string;
	store_id: string;
	store_name: string;
	address: string;
	status: string;
	working_hours: string;
	is_direct_hiring: boolean;
	url_image: string;
}

export const ApplyMitra = ({ id }: { id: any }) => {
	const { token } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
	const [applications, setApplications] = useState<Mitra[]>([]);
	const [applicationId, setApplicationId] = useState<string | null>(null);
	const [applicationIsDirectHire, setApplicationIsDirectHire] = useState<boolean>(false);

	const fetchData = async (isDirectHire: boolean) => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/application/user?is_direct_hire=${isDirectHire}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			setIsLoading(false);
			return result.data;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const fetchAllData = async () => {
			setApplications([]);
			const directHireData = await fetchData(true);
			const nonDirectHireData = await fetchData(false);
			setApplications([...directHireData, ...nonDirectHireData]);
		};
		fetchAllData();
	}, [id]);

	useEffect(() => {
		const application = applications.find((data: any) => {
			return data.store_id === Number(id);
		});
		console.log(application);
		setApplicationStatus(application ? application.status : null);
		setApplicationId(application ? application.id : null);
		setApplicationIsDirectHire(application ? application.is_direct_hiring : false);
		console.log(applicationIsDirectHire);
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
					<UpdateApplyStatus application_id={applicationId || ""} />
				</>
			)}
		</>
	);
};

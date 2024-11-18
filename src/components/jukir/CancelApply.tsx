"use client";

import { Button, ButtonLoading, buttonVariants } from "../ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Ban } from "lucide-react";

export const CancelApply = ({ id }: { id: any }) => {
	const { token } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCancel = async () => {
		setIsSubmitting(true);
		try {
			const response = await fetch(`/api/applicants/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				toast({
					title: "Berhasil!",
					description: "Lamaran berhasil dibatalkan.",
				});

				window.location.reload();
			} else {
				toast({
					variant: "destructive",
					title: "Gagal Membatalkan lamaran",
					description: "Maaf, terjadi kesalahan saat membatalkan lamaran. Silahkan coba lagi.",
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
			<Dialog>
				<DialogTrigger className={buttonVariants({ variant: "destructive", className: "w-full rounded-xl" })}>
					<Ban /> Batalkan Lamaran
				</DialogTrigger>

				<DialogContent>
					<DialogTitle>Apakah Anda yakin untuk Membatalkan Lamaran?</DialogTitle>
					<DialogDescription>
						Dengan membatalkan lamaran, lamaran Anda akan dihapus dan tidak dapat dikembalikan.
					</DialogDescription>
					{isSubmitting ? (
						<ButtonLoading />
					) : (
						<Button variant="destructive" className="mt-5" onClick={handleCancel}>
							Ya, Setuju
						</Button>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

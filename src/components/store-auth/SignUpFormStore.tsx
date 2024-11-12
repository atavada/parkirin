"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { Button, ButtonLoading } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { Textarea } from "../ui/textarea";
import TimeRangePicker from "../ui/time-picker";

interface TimeRange {
	start: string;
	end: string;
}

export const SignUpFormStore = () => {
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const coordinates = value.split(",");
		setLatitude(parseFloat(coordinates[0]));
		setLongitude(parseFloat(coordinates[1]));
	};

	const formSchema = z.object({
		name: z.string().min(3, { message: "Username must be at least 3 characters." }),
		phone_number: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
		password: z.string().min(8, "Minimal 8 karakter."),
		store_name: z.string().min(3, { message: "Store name must be at least 3 characters." }),
		address: z.string().min(3, { message: "Address must be at least 3 characters." }),
		working_hours: z.string().min(3, { message: "Working hours must be at least 3 characters." }),
	});

	type UserFormValue = z.infer<typeof formSchema>;

	const form = useForm<UserFormValue>({ resolver: zodResolver(formSchema) });

	async function onSubmit(data: UserFormValue) {
		console.log(data);
		setIsLoading(true);
		const role = "store";
		const completeData = { ...data, role, latitude, longitude };
		console.log(completeData);
		try {
			const res = await fetch(`/api/user/register`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(completeData),
			});
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
			toast({
				title: "Registrasi Berhasil",
				description: (
					<div>
						Silahkan{" "}
						<Link href="/mitra-sign-in" className="underline">
							LOGIN
						</Link>
					</div>
				),
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Registrasi Gagal",
				description: "Terjadi kesalahan jaringan. Silahkan coba lagi.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	function onError(error: any) {
		if (error.confirm) {
			return toast({
				variant: "destructive",
				title: "Registrasi Gagal",
				description: "Silahkan periksa kembali",
			});
		}
	}

	return (
		<>
			<Card className="mx-auto max-w-[1000px] rounded-xl">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>Silahkan masukkan data anda sesuai form berikut</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nama Lengkap</FormLabel>
												<FormControl>
													<Input type="text" placeholder="" {...field} />
												</FormControl>
												<FormDescription>Masukkan nama lengkap anda.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phone_number"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nomor Telepon</FormLabel>
												<FormControl>
													<PhoneInput defaultCountry="ID" placeholder="Masukkan Nomor Telepon" {...field} />
												</FormControl>
												<FormDescription>Masukkan nomor telepon anda.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input type="password" placeholder="" {...field} />
												</FormControl>
												<FormDescription>Password minimal 8 karakter.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="store_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nama Toko</FormLabel>
												<FormControl>
													<Input type="text" placeholder="" {...field} />
												</FormControl>
												<FormDescription>Masukkan nama toko anda.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="working_hours"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Jam Kerja Toko</FormLabel>
												<FormControl>
													<TimeRangePicker
														value={typeof field.value === "string" ? { start: "09:00", end: "17:00" } : field.value}
														onChange={(newValue) => field.onChange(newValue)}
													/>
												</FormControl>
												<FormDescription>Masukkan jam kerja toko anda.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Alamat Toko</FormLabel>
												<FormControl>
													<Textarea placeholder="" {...field} />
												</FormControl>
												<FormDescription>Masukkan alamat toko anda.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="space-y-4">
									<FormItem>
										<FormLabel>Titik Koordinat Toko</FormLabel>
										<FormControl>
											<Input placeholder="" onChange={handleCoordinateChange} />
										</FormControl>
										<FormDescription>
											Pastikan titik koordinat dan alamat domisili yang Anda tuliskan telah sesuai. Lihat{" "}
											<Link
												className="text-blue-500 hover:underline"
												href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DAndroid"
											>
												panduan
											</Link>
											.
										</FormDescription>
										<FormMessage />
									</FormItem>
									<div className="mt-2">
										{longitude || latitude ? (
											<iframe
												src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
												title="Google Maps"
												width="100%"
												height="300px"
												style={{ border: 0 }}
												loading="lazy"
												allowFullScreen
											></iframe>
										) : null}
									</div>
								</div>
							</div>

							<div className="pt-6 text-start text-sm">
								Sudah memiliki akun?{" "}
								<Link href="/mitra-sign-in" className="underline">
									Sign in
								</Link>
							</div>

							{isLoading ? (
								<ButtonLoading className="ml-auto w-full" />
							) : (
								<Button disabled={isLoading} type="submit" className="ml-auto w-full">
									Daftar
								</Button>
							)}
						</form>
					</Form>
				</CardContent>
			</Card>
			<Toaster />
		</>
	);
};

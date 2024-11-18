"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, ButtonLoading } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Toaster } from "../ui/toaster";

export const SignUpFormJukir = () => {
	const [isLoading, setIsLoading] = useState(false);

	const formSchema = z.object({
		name: z.string().min(3, { message: "Username must be at least 3 characters." }),
		phone_number: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
		password: z.string().min(8, "Minimal 8 karakter."),
	});

	type UserFormValue = z.infer<typeof formSchema>;

	const form = useForm<UserFormValue>({ resolver: zodResolver(formSchema) });

	async function onSubmit(data: UserFormValue) {
		setIsLoading(true);
		const role = "tukang";
		const dataWithRole = { ...data, role };
		console.log(dataWithRole);
		try {
			const res = await fetch(`/api/user/register`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(dataWithRole),
			});
			if (!res.ok) {
				const errorData = await res.json();
				console.error("Error dari server:", errorData);
				toast({
					variant: "destructive",
					title: "Registrasi Gagal",
					description: "Silahkan Periksa Kembali",
				});
			} else {
				toast({
					title: "Registrasi Berhasil",
					description: (
						<div>
							Silahkan{" "}
							<Link href="/jukir-sign-in" className="underline">
								LOGIN
							</Link>
						</div>
					),
				});
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Registrasi Gagal",
				description: "Terjadi kesalahan jaringan. Silahkan coba lagi.",
			});
		}
		setIsLoading(false);
	}

	function onError(error: any) {
		if (error.confirm) {
			return toast({
				variant: "destructive",
				title: "Registrasi Gagal",
				description: error.confirm.message,
			});
		}
	}

	return (
		<>
			<Card className="mx-auto max-w-sm rounded-xl">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>Silahkan masukkan data anda sesuai form berikut</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
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
										<FormMessage className="text-xs italic" />
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
										<FormMessage className="text-xs italic" />
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
										<FormMessage className="text-xs italic" />
									</FormItem>
								)}
							/>

							<div className="mt-4 text-end text-sm">
								Sudah memiliki akun?{" "}
								<Link href="/jukir/sign-in" className="underline">
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

"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, Phone, ChevronLeft, LocateIcon, ArrowRightToLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/home-page/Loading";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { ApplyMitra } from "@/components/jukir/ApplyMitra";

interface Mitra {
	id: string;
	store_name: string;
	phone_number: string;
	address: string;
	longitude: string;
	latitude: string;
	working_hours: string;
	url_image: string;
	is_hiring: boolean;
	is_paid: boolean;
	created_at: string;
}

export default function Page() {
	const { id } = useParams();
	const [mitra, setMitra] = useState<Mitra | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/store/${id}`);
				const result = await response.json();
				setMitra(result.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching mitra detail:", error);
			}
		};

		fetchData();
	}, [id]);

	if (isLoading) {
		return <Loading />;
	}

	const handleBack = () => {
		router.back();
	};

	return (
		<>
			<div className="mt-10 flex items-center">
				<Button variant="ghost" onClick={handleBack}>
					<ChevronLeft className="h-6 w-6" />
					Kembali
				</Button>
			</div>
			<div className="md:p-12 space-y-8">
				<h2 className="text-4xl font-bold mb-6">{mitra?.store_name}</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 md:space-y-0 space-y-8">
					<div className="col-span-2 space-y-8">
						<Card>
							<CardContent className="p-6">
								<div className=" overflow-hidden rounded-lg">
									<img
										src={mitra?.url_image}
										alt={mitra?.store_name}
										className="w-full max-h-[500px] object-cover rounded-lg shadow"
									/>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="aspect-video w-full h-full">
									<iframe
										src={`https://maps.google.com/maps?q=${mitra?.latitude},${mitra?.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
										title="Google Maps"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										loading="lazy"
										allowFullScreen
									></iframe>
								</div>
							</CardContent>
							<CardFooter>
								<Link
									href={`https://www.google.com/maps/search/?api=1&query=${mitra?.latitude},${mitra?.longitude}`}
									target="_blank"
									rel="noreferrer"
									className="flex items-center space-x-2 text-primary hover:underline underline-offset-4"
								>
									<LocateIcon className="h-5 w-5" />
									<span>Buka di Google Maps</span>
								</Link>
							</CardFooter>
						</Card>
					</div>
					<div className="space-y-8">
						<Card>
							<CardHeader>
								<CardTitle>Informasi Kontak</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-2">
									<MapPin className="h-5 w-5 text-muted-foreground" />
									<span>{mitra?.address}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Phone className="h-5 w-5 text-muted-foreground" />
									<span>{mitra?.phone_number}</span>
								</div>
								<div className="flex items-center space-x-2">
									<ArrowRightToLine className="h-5 w-5 text-muted-foreground" />
									<span>
										Bergabung,{" "}
										{mitra?.created_at &&
											new Date(mitra.created_at).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
									</span>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Jam Operasional</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-2">
									<Clock className="h-5 w-5 text-muted-foreground" />
									<span>{mitra?.working_hours}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Briefcase className="h-5 w-5 text-muted-foreground" />
									<Badge variant={mitra?.is_hiring ? "default" : "secondary"}>
										{mitra?.is_hiring ? "Sedang Merekrut" : "Tidak Merekrut"}
									</Badge>
								</div>
							</CardContent>
						</Card>
						<div className="flex justify-center">
							<ApplyMitra id={id} />
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
}

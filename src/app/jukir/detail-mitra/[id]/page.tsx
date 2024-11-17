"use client";

import { Navbar } from "@/components/home-page/Navbar";
import { Footer } from "@/components/home-page/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/home-page/Loading";

interface Mitra {
	id: string;
	store_name: string;
	address: string;
	longitude: string;
	latitude: string;
	working_hours: string;
	url_image: string;
	is_hiring: boolean;
	email: string;
	phone: string;
	description: string;
}

export default function Page() {
	const { id } = useParams();
	const [mitra, setMitra] = useState<Mitra | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/store/${id}`);
				const result = await response.json();
				setMitra(result.data);
			} catch (error) {
				console.error("Error fetching mitra detail:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (isLoading) {
		return <Loading />;
	}

	if (!mitra) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="min-h-screen flex flex-col">
				<main className="flex-grow container mx-auto px-4 py-8">
					<article className="max-w-4xl mx-auto">
						<h2 className="text-4xl font-bold mb-6">{mitra.store_name}</h2>

						<div className="mb-8 aspect-video relative rounded-lg overflow-hidden">
							<iframe
								src={`https://maps.google.com/maps?q=${mitra.latitude},${mitra.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
								title="Google Maps"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
							></iframe>
						</div>

						<div className="grid gap-6 md:grid-cols-2 mb-8">
							<Card>
								<CardHeader>
									<CardTitle>Informasi Kontak</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center space-x-2">
										<MapPin className="h-5 w-5 text-muted-foreground" />
										<span>{mitra.address}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Mail className="h-5 w-5 text-muted-foreground" />
										<span>{mitra.email}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Phone className="h-5 w-5 text-muted-foreground" />
										<span>{mitra.phone}</span>
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
										<span>{mitra.working_hours}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Briefcase className="h-5 w-5 text-muted-foreground" />
										<Badge variant={mitra.is_hiring ? "default" : "secondary"}>
											{mitra.is_hiring ? "Sedang Merekrut" : "Tidak Merekrut"}
										</Badge>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className="flex justify-center">
							<Button size="lg">Lamar Sekarang</Button>
						</div>
					</article>
				</main>
			</div>
			<Footer />
		</>
	);
}

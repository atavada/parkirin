// Contoh tampilan detail mitera

import { MapPin, Clock, Briefcase, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavbarJukir } from "@/components/jukir/NavbarJukir";
import { FooterJukir } from "@/components/jukir/FooterJukir";

interface MitraData {
	name: string;
	address: string;
	mapImageUrl: string;
	workingHours: string;
	isHiring: boolean;
	email: string;
	phone: string;
	description: string;
}

const mitraData: MitraData = {
	name: "PT Mitra Sejahtera",
	address: "Jl. Raya Bogor No. 123, Jakarta Timur",
	mapImageUrl: "/placeholder.svg?height=400&width=800",
	workingHours: "Senin - Jumat: 08.00 - 17.00",
	isHiring: true,
	email: "info@mitrasejahtera.com",
	phone: "+62 21 1234 5678",
	description:
		"PT Mitra Sejahtera adalah perusahaan yang bergerak di bidang teknologi informasi. Kami berfokus pada pengembangan solusi perangkat lunak inovatif untuk berbagai industri. Dengan tim yang berpengalaman dan berdedikasi, kami berkomitmen untuk memberikan layanan terbaik kepada klien kami.",
};

export default async function Page({ params }: { params: any }) {
	return (
        <>
        <NavbarJukir />
		<div className="min-h-screen flex flex-col">

			<main className="flex-grow container mx-auto px-4 py-8">
				<article className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold mb-6">{mitraData.name}</h2>

					<div className="mb-8 aspect-video relative rounded-lg overflow-hidden">
						<iframe
							src={`https://maps.google.com/maps?q=-7.23123,111.1234123&t=&z=15&ie=UTF8&iwloc=&output=embed`}
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
									<span>{mitraData.address}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Mail className="h-5 w-5 text-muted-foreground" />
									<span>{mitraData.email}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Phone className="h-5 w-5 text-muted-foreground" />
									<span>{mitraData.phone}</span>
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
									<span>{mitraData.workingHours}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Briefcase className="h-5 w-5 text-muted-foreground" />
									<Badge variant={mitraData.isHiring ? "default" : "secondary"}>
										{mitraData.isHiring ? "Sedang Merekrut" : "Tidak Merekrut"}
									</Badge>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* <section className="prose max-w-none mb-8">
						<h3 className="text-2xl font-semibold mb-4">Tentang {mitraData.name}</h3>
						<p>{mitraData.description}</p>
					</section> */}

					<div className="flex justify-center">
						<Button size="lg">Lamar Sekarang</Button>
					</div>
				</article>
			</main>

		</div>
        <FooterJukir />
        </>
	);
}

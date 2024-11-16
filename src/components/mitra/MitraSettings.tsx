"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, Calendar, Upload } from "lucide-react";
import { Badge } from "../ui/badge";
import { useStoreSession } from "@/app/session/UserSession";
import Link from "next/link";

export default function MitraSettings() {
	const { store, loading, error } = useStoreSession();

	if (loading) {
		return <div className="text-gray-500">Mohon Tunggu Rek...</div>;
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left Column */}
				<div className="space-y-6">
					<Card>
						<CardContent className="p-6">
							<div className="aspect-square overflow-hidden rounded-lg mb-4">
								{!store?.url_image ? (
									<div className="text-gray-500 flex items-center justify-center w-full h-full border rounded-lg">
										Belum ada gambar mitra.
									</div>
								) : (
									<img
										src={store?.url_image}
										alt={store?.store_name}
										className="w-full h-full object-cover rounded-lg shadow"
									/>
								)}
							</div>
							<h2 className="text-xl font-semibold mb-1">{store?.store_name}</h2>
							<p className="text-blue-500">{store?.user.role}</p>
							{!store?.url_image && (
								<>
									<div className="flex gap-2 mt-4">
										<Link
											href="/mitra/settings/upload-image"
											className={buttonVariants({
												size: "default",
												variant: "outline",
												className: "flex-1",
											})}
										>
											<Upload className="w-4 h-4 mr-2" />
											Upload Foto
										</Link>
									</div>
								</>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<h3 className="font-semibold mb-4">Informasi Mitra</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<MapPin className="w-4 h-4 text-muted-foreground" />
									<span>{store?.address}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4 text-muted-foreground" />
									<span>{store?.working_hours}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-muted-foreground" />
									<span>
										Bergabung,{" "}
										{store?.created_at &&
											new Date(store.created_at).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column */}
				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardContent className="p-6">
							<div className="space-y-6">
								<div>
									<h3 className="font-semibold mb-4">Informasi Kontak</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<Phone className="w-4 h-4 text-muted-foreground" />
											<span>{store?.user.phone_number}</span>
										</div>
									</div>
								</div>
								<div>
									<h3 className="font-semibold mb-4">Informasi Tambahan</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<Badge
												variant="default"
												className={store?.is_hiring ? "bg-primary text-white" : "bg-red-500 text-white"}
											>
												{store?.is_hiring ? "Hiring" : "Not Hiring"}
											</Badge>
										</div>
										<div className="flex items-center gap-2">
											<Badge
												variant="default"
												className={store?.is_paid ? "bg-primary text-white" : "bg-red-500 text-white"}
											>
												{store?.is_paid ? "Paid" : "Not Paid"}
											</Badge>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6">
							<h3 className="font-semibold mb-4">Lokasi Mitra</h3>
							<div className="aspect-video w-full h-full">
								<iframe
									width="100%"
									height="100%"
									style={{ border: 0 }}
									loading="lazy"
									allowFullScreen
									referrerPolicy="no-referrer-when-downgrade"
									src={`https://maps.google.com/maps?q=${store?.latitude},${store?.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
								></iframe>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}

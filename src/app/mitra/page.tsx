"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ListChecks, UserRound } from "lucide-react";
import Link from "next/link";
import { useStoreSession } from "../session/UserSession";

export default function Page() {
	const { store, loading, error } = useStoreSession();

	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">Home</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			{/* Main Content */}
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="container mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">
						Beranda Mitra <span className="text-primary underline underline-offset-4">{store?.store_name}</span>
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card className="w-full">
							<CardContent className="p-4 flex gap-3 flex-col">
								<div>
									<Avatar className="h-10 w-10">
										<AvatarFallback className="bg-primary">
											<UserRound className="w-6 h-6 text-white" />
										</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<h2 className="text-xl font-bold">Daftar Juru Parkir</h2>
									<p className="text-gray-600">Daftar jukir yang tersedia untuk dipekerjakan</p>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between p-4">
								<Link href="/mitra/list-jukir/all">
									<Button className="">Lihat Semua</Button>
								</Link>
							</CardFooter>
						</Card>
						<Card className="w-full">
							<CardContent className="p-4 flex gap-3 flex-col">
								<div>
									<Avatar className="h-10 w-10">
										<AvatarFallback className="bg-primary">
											<ListChecks className="w-6 h-6 text-white" />
										</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<h2 className="text-xl font-bold">Daftar Apply Juru Parkir</h2>
									<p className="text-gray-600">Daftar jukir yang telah mengajukan diri</p>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between p-4">
								<Link href="/mitra/list-jukir/apply">
									<Button className="">Lihat Semua</Button>
								</Link>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

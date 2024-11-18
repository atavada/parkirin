"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { DetailJukir } from "./DetailJukir";
import { UpdateStatusJukir } from "./UpdateStatusJukir";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";

interface Jukir {
	id: string;
	user_id: string;
	user_name: string;
	status: string;
}

export const ListApplyJukir = () => {
	const { token } = useAuth();
	const [daftarJukir, setDaftarJukir] = useState<Jukir[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchData = async () => {
		try {
			const response = await fetch(`/api/application/store`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			const data = result.data;
			if (Array.isArray(data)) {
				const formattedData = data.map((user: any) => ({
					id: user.id,
					user_id: user.user_id,
					user_name: user.user_name,
					status: user.status,
				}));
				setDaftarJukir(formattedData);
				setIsLoading(false);
			} else {
				console.error("Data is not an array:", data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) {
		return <div className="text-gray-500">Mohon Tunggu Rek...</div>;
	}

	return (
		<>
			<Tabs defaultValue="listJukir" className="max-w-full">
				<TabsList>
					<TabsTrigger value="listJukir">Jukir Apply</TabsTrigger>
					<TabsTrigger value="history">History</TabsTrigger>
				</TabsList>
				<TabsContent value="listJukir">
					{daftarJukir.map((jukir) =>
						jukir.status === "sent" ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
								<Card key={jukir.id} className="w-full">
									<CardContent className="p-4 flex gap-3">
										<div>
											<Avatar className="h-10 w-10">
												<AvatarFallback>
													<UserRound className="w-6 h-6" />
												</AvatarFallback>
											</Avatar>
										</div>
										<div>
											<h2 className="text-xl font-semibold">{jukir.user_name}</h2>
											<p className="text-gray-600">{jukir.status}</p>
										</div>
									</CardContent>
									<CardFooter className="flex justify-between p-4">
										<div className="flex gap-2">
											<UpdateStatusJukir application_id={jukir.id} />
										</div>
										<Dialog>
											<DialogTrigger
												className={buttonVariants({
													variant: "default",
													size: "default",
												})}
											>
												Detail
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Detail Jukir {jukir.user_name}</DialogTitle>
												</DialogHeader>
												<DetailJukir jukir_id={jukir.user_id} />
												<DialogFooter>
													<UpdateStatusJukir application_id={jukir.id} />
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</CardFooter>
								</Card>
							</div>
						) : (
							<>
								<div className="text-gray-500 mt-4">Tidak ada data.</div>
							</>
						)
					)}
				</TabsContent>
				<TabsContent value="history">
					{daftarJukir.map((jukir) =>
						jukir.status !== "sent" ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
								<Card key={jukir.id} className="w-full pb-2">
									<CardContent className="p-4 flex items-center gap-3">
										<div>
											<Avatar className="h-10 w-10">
												<AvatarFallback>
													<UserRound className="w-6 h-6" />
												</AvatarFallback>
											</Avatar>
										</div>
										<div>
											<h2 className="text-xl font-semibold">{jukir.user_name}</h2>
											<Badge>{jukir.status}</Badge>
										</div>
									</CardContent>
								</Card>
							</div>
						) : (
							<>
								<div className="text-gray-500 mt-4">Tidak ada data.</div>
							</>
						)
					)}
				</TabsContent>
			</Tabs>

			<div className="mt-12">
				{/* <Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination> */}
			</div>
		</>
	);
};

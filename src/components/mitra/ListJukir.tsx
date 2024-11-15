"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DetailJukir } from "./DetailJukir";

interface Jukir {
	id: string;
	name: string;
	phone_number: string;
}

export const ListJukir = () => {
	const [daftarJukir, setDaftarJukir] = useState<Jukir[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);

	const fetchData = async (page: number) => {
		try {
			const response = await fetch(`/api/users?page=${page}&limit=12`);
			const result = await response.json();
			const data = result.data?.users;
			if (Array.isArray(data)) {
				const formattedData = data.map((user: any) => ({
					id: user.id,
					name: user.name,
					phone_number: user.phone_number,
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
		fetchData(currentPage);
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		setIsLoading(true);
	};

	if (isLoading) {
		return <div className="text-gray-500">Mohon Tunggu Rek...</div>;
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{daftarJukir.map((jukir) => (
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
								<h2 className="text-xl font-semibold">{jukir.name}</h2>
								<p className="text-gray-600">{jukir.phone_number}</p>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between p-4">
							<Dialog>
								<DialogTrigger>
									<Button>Detail</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Detail Jukir {jukir.name}</DialogTitle>
									</DialogHeader>
									<DetailJukir jukir_id={jukir.id} />
									<DialogFooter>
										<Button className="w-24">Hire</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="mt-12">
				<Pagination>
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
				</Pagination>
			</div>
		</>
	);
};

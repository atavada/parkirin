import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

export const NotifJukir = () => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="relative rounded-full">
						<Bell className="h-4 w-4" />
						<div className="absolute top-1 right-1 px-1 min-w-[12px] h-[12px] flex items-center justify-center bg-red-500 rounded-full"></div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-80">
					<DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<div className="flex flex-col">
							<span className="font-medium">Anda diterima sebagai Jukir</span>
							<span className="text-sm text-gray-500">Lokasi: Parkir Mall Central</span>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex flex-col">
							<span className="font-medium">Lamaran Anda ditolak</span>
							<span className="text-sm text-gray-500">Lokasi: Parkir Stasiun Kota</span>
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

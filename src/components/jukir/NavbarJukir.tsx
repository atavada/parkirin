"use client";

import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { House, LogOut, Menu, User, UserRound } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserSession } from "@/app/session/UserSession";
import { NotifJukir } from "./NotifJukir";

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: "/jukir",
		label: "Beranda",
	},
	{
		href: "/jukir/#list-mitra",
		label: "Daftar Mitra",
	},
	{
		href: "/jukir/list-apply",
		label: "Daftar Lamaran",
	},
	{
		href: "/jukir/subscription",
		label: "Langganan",
	},
];

export const NavbarJukir = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { user, loading, error } = useUserSession();
	const { logOut } = useAuth();
	const router = useRouter();

	const handlelogOut = () => {
		logOut();
		router.push("/");
	};

	return (
		<>
			<header className="sticky shadow top-0 z-40 w-full bg-white text-black">
				<NavigationMenu className="mx-auto">
					<NavigationMenuList className="container h-20 px-4 w-screen flex justify-between">
						<NavigationMenuItem className="font-bold flex">
							<Link rel="noreferrer noopener" href="/" className="ml-2 font-bold text-lg flex items-center">
								<Image src="/logo.png" alt="Parkirin Logo" width={70} height={40} />
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<span className="flex md:hidden">
								<Sheet open={isOpen} onOpenChange={setIsOpen}>
									<SheetTrigger className="md:hidden absolute right-4 top-4 mt-3 mr-5">
										<Menu className="flex md:hidden h-5 w-5" onClick={() => setIsOpen(true)} />
									</SheetTrigger>

									<SheetContent side={"left"}>
										<SheetHeader>
											<SheetTitle className="font-semibold text-lg">Parkirin</SheetTitle>
										</SheetHeader>
										<nav className="flex flex-col justify-center items-center gap-2 mt-4">
											{routeList.map(({ href, label }: RouteProps) => (
												<Link
													rel="noreferrer noopener"
													key={label}
													href={href}
													onClick={() => setIsOpen(false)}
													className={buttonVariants({ variant: "link" })}
												>
													{label}
												</Link>
											))}

											<Button variant="destructive" className="rounded-full" onClick={handlelogOut}>
												<LogOut className="mr-2" />
												Log out
											</Button>
										</nav>
									</SheetContent>
								</Sheet>
							</span>
							<nav className="hidden md:flex gap-4">
								{routeList.map((route: RouteProps, i) => (
									<Link
										rel="noreferrer noopener"
										href={route.href}
										key={i}
										className={buttonVariants({
											variant: "ghost",
											className:
												"font-extrabold hover:bg-transparent border border-transparent hover:border hover:border-secondary rounded-full",
										})}
									>
										{route.label}
									</Link>
								))}
							</nav>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<div className="hidden md:flex gap-4">
								{/* notif */}
								<NotifJukir />

								{/* nav-jukir */}
								<DropdownMenu>
									<DropdownMenuTrigger
										className={buttonVariants({ variant: "ghost", size: "icon", className: "border rounded-[100rem]" })}
									>
										<UserRound className="w-4 h-4" />
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56">
										<DropdownMenuLabel>
											<p>{user?.name}</p>
											<p>{user?.phone_number}</p>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<User />
												<Link href="/jukir/apply-form">Profil Saya</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<House />
												<Link href="/jukir">Halaman Jukir</Link>
											</DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem className="text-red-500 hover:text-red-500" onClick={handlelogOut}>
												<LogOut />
												<span>Log out</span>
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</header>
		</>
	);
};

"use client";

import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "#about",
		label: "About Us",
	},
	{
		href: "#services",
		label: "Services",
	},
];

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { token } = useAuth();

	return (
		<>
			<header className="sticky border-b top-0 z-40 w-full bg-white text-black">
				<NavigationMenu className="mx-auto">
					<NavigationMenuList className="container h-20 px-4 w-screen flex justify-between">
						<NavigationMenuItem className="font-bold flex">
							<Link rel="noreferrer noopener" href="/" className="ml-2 font-bold text-lg flex items-center">
								{/* Logo */}
								<MapPin className="h-10 w-10 mr-2 border rounded-full text-white bg-primary py-2" />
								Parkirin
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							{/* mobile */}
							<span className="flex md:hidden">
								<Sheet open={isOpen} onOpenChange={setIsOpen}>
									<SheetTrigger className="px-2">
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
											<Link
												href="/dashboard"
												className={buttonVariants({
													variant: "outline",
													className: "font-semibold text-black",
												})}
											>
												Dashboard
											</Link>
										</nav>
									</SheetContent>
								</Sheet>
							</span>

							{/* desktop */}
							<nav className="hidden md:flex gap-4">
								{routeList.map((route: RouteProps, i) => (
									<Link
										rel="noreferrer noopener"
										href={route.href}
										key={i}
										className={buttonVariants({
											variant: "ghost",
											className:
												"font-medium underline-offset-4 hover:bg-transparent border border-transparent hover:border hover:border-secondary rounded-full",
										})}
									>
										{route.label}
									</Link>
								))}
							</nav>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<div className="hidden md:flex gap-2">
								{!token ? (
									<>
										<Link
											href="/jukir/sign-in"
											className={buttonVariants({
												variant: "ghost",
												className: "font-semibold",
											})}
										>
											Sign in Jukir
										</Link>
										<Link
											href="/jukir/sign-up"
											className={buttonVariants({
												variant: "outline",
												className: "font-semibold text-black",
											})}
										>
											Sign in Mitra
										</Link>
									</>
								) : (
									<>
										<Link
											href="/dashboard"
											className={buttonVariants({
												variant: "outline",
												className: "font-semibold text-gray-500 border-gray-500 rounded-full",
											})}
										>
											Dashboard
										</Link>
									</>
								)}
							</div>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</header>
		</>
	);
};

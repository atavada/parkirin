"use client";

import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, Bell, LogOut, LucideIcon, MapPin, Menu, SquareTerminal } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

interface RouteProps {
    href: string;
    label: string;
    icon: LucideIcon;
}

const routeList: RouteProps[] = [
    {
        href: "/",
        label: "Home",
        icon: SquareTerminal,
    },
    // {
    //     href: "/jukir/apply-form",
    //     label: "Apply",
    //     icon: SquareTerminal,
    // },
    {
        href: "/jukir/subscription",
        label: "Subscription",
        icon: SquareTerminal
    },
];

export const NavbarJukir = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { token, logOut, user } = useAuth();
    const router = useRouter();

    const handlelogOut = () => {
        logOut();
        router.push("/");
    }

    return (
        <>
            <header className="sticky border-b top-0 z-40 w-full bg-white text-black">
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
                                            href="/mitra/sign-in"
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="relative">
                                            <Bell className="h-5 w-5" />
                                            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center">2</Badge>
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

                                    <DropdownMenu>
                                        <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href={"/jukir/apply-form"}>
                                                Profil Saya
                                                </Link>
                                           </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={"/jukir"}>
                                                Halaman Jukir
                                                </Link>
                                           </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full flex justify-start items-center gap-2 h-12 text-red-500"
                                                    onClick={handlelogOut}
                                                >
                                                    <LogOut size={10} />
                                                    Logout
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

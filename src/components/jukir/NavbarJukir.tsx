"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, User, MessageCircle, Users, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export function NavbarJukir() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logOut, user } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logOut();
        router.push("/");
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [menuOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 border-b bg-white z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                        <h1 className="text-xl font-bold">Parkirin</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                            >
                                {menuOpen ? <X size={24} className="mr-10" /> : <Menu size={24} />}
                            </Button>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <Button variant="ghost" className="flex items-center">
                                <Users className="mr-2" size={20} />
                                Find People
                            </Button>
                            <Button variant="ghost" className="flex items-center">
                                <MessageCircle className="mr-2" size={20} />
                                Messages
                            </Button>
                            <Button variant="ghost" className="flex items-center">
                                <User className="mr-2" size={20} />
                                My Contacts
                            </Button>
                            <Avatar>
                                <AvatarImage src="/placeholder.svg" alt="Profile" />
                                <AvatarFallback>{user?.name?.[0] || "PF"}</AvatarFallback>
                            </Avatar>
                            <Button
                                variant="ghost"
                                className="flex items-center text-red-500"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-2" size={20} />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}>
                        <div
                            className="fixed top-[60px] right-0 h-full w-[80%] max-w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-center gap-2 h-12"
                                    >
                                        <Users size={20} />
                                        Find People
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-center gap-2 h-12"
                                    >
                                        <MessageCircle size={20} />
                                        Messages
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-center gap-2 h-12"
                                    >
                                        <User size={20} />
                                        My Contacts
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-center gap-2 h-12 text-red-500"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </Button>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg" alt="Profile" />
                                            <AvatarFallback>{user?.name?.[0] || "PF"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user?.name || "Your Profile"}</p>
                                            <p className="text-sm text-gray-500">View and edit profile</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <div className="h-[60px]" />
        </>
    );
}

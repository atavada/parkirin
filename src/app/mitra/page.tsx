import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ListChecks, UserRound } from "lucide-react";
import Link from "next/link";

export default function Page() {
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
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            {/* Main Content */}
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
                            <p className="text-gray-600">
                                Daftar jukir yang tersedia untuk dipekerjakan
                            </p>
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
                            <p className="text-gray-600">
                                Daftar jukir yang telah mengajukan diri
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">
                        <Link href="/mitra/list-jukir/apply">
                            <Button className="">Lihat Semua</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

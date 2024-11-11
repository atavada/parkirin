"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";

const ListMitra = () => {
    interface Mitra {
        id: string;
        store_name: string;
        address: string;
        imageUrl?: string;
        is_hiring: boolean;
    }

    const [mitraList, setMitraList] = useState<Mitra[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/stores");
                const result = await response.json();
                const stores = result.data?.stores || [];

                const hiringStores = stores.filter((store: Mitra) => store.is_hiring === true);
                setMitraList(hiringStores);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="mt-10 mb-5">
                <h1 className="font-bold text-[2rem] mb-5">Mitra Anda Saat Ini</h1>
                <div className="flex justify-center sm:justify-start w-full">
                    {mitraList.length > 0 && (
                        <Link href={`/jukir/mitra/${mitraList[0].id}`} target="blank">
                            <Card className="w-[350px] shadow-lg mx-auto sm:mx-0">
                                <CardHeader>
                                    <CardTitle>{mitraList[0].store_name}</CardTitle>
                                    <CardDescription>{mitraList[0].address}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Image
                                        src={mitraList[0].imageUrl || "/dummy-image.jpg"}
                                        alt="banner"
                                        width={550}
                                        height={550}
                                        className="rounded-xl mx-auto"
                                    />
                                </CardContent>
                            </Card>
                        </Link>
                    )}
                </div>
                <Separator className="mt-10" />
                <h1 className="font-bold text-[2rem] mb-5 mt-16">Mitra Anda Lainnya</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mitraList.slice(1).map((mitra) => (
                        <Link key={mitra.id} href={`/jukir/mitra/${mitra.id}`} target="blank">
                            <Card className="w-[350px] shadow-lg mx-auto">
                                <CardHeader>
                                    <CardTitle>{mitra.store_name}</CardTitle>
                                    <CardDescription>{mitra.address}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Image
                                        src={mitra.imageUrl || "/dummy-image.jpg"}
                                        alt="banner"
                                        width={550}
                                        height={550}
                                        className="rounded-xl mx-auto"
                                    />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListMitra;

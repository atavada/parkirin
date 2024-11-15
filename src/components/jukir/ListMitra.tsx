"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Mitra {
  id: string;
  store_name: string;
  address: string;
  url_image: string;
  is_hiring: boolean;
}

const ListMitra = () => {
  const [mitraList, setMitraList] = useState<Mitra[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/stores?is_hiring=true");
        const result = await response.json();
        const stores = result.data?.stores || [];
        setMitraList(stores);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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
            <Link href={`/jukir/detail-mitra`}>
              <Card className="w-[350px] shadow-lg mx-auto sm:mx-0">
                <CardHeader>
                  <CardTitle>{mitraList[0].store_name}</CardTitle>
                  <CardDescription>{mitraList[0].address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={mitraList[0].url_image}
                    alt="banner"
                    className="w-full h-[250px] object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
        <Separator className="mt-10" />
        <h1 className="font-bold text-[2rem] mb-5 mt-16">Mitra Anda Lainnya</h1>
        {isLoading ? (
          <div className="flex justify-center">
            {/* Loader can be placed here */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mitraList.slice(1).map((mitra) => (
              <Link key={mitra.id} href={`/jukir/detail-mitra/${mitra.id}`} target="_blank">
                <Card className="w-[350px] shadow-lg mx-auto">
                  <CardHeader>
                    <CardTitle>{mitra.store_name}</CardTitle>
                    <CardDescription>{mitra.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={mitra.url_image}
                      alt="banner"
                      className="w-full h-[250px] object-cover rounded-xl"
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMitra;

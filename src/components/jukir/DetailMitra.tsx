"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Mitra {
  id: string;
  store_name: string;
  address: string;
  url_image: string;
  is_hiring: boolean;
}

interface DetailMitraProps {
  id: string;
}

const DetailMitra = ({ id }: DetailMitraProps) => {
  const [mitra, setMitra] = useState<Mitra | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMitraDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/store/${id}`);
        const result = await response.json();
        setMitra(result.data?.store || null);
      } catch (error) {
        console.error("Error fetching mitra detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMitraDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!mitra) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Mitra tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{mitra.store_name}</CardTitle>
          <CardDescription className="text-lg">{mitra.address}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={mitra.url_image}
            alt={mitra.store_name}
            className="w-full h-[400px] object-cover rounded-xl mb-6"
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                mitra.is_hiring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {mitra.is_hiring ? 'Membuka Lowongan' : 'Tidak Ada Lowongan'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailMitra;
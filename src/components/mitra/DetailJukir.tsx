"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, User } from "lucide-react"

interface Jukir {
  id: number
  nama: string
  nomor: string
  rating: number
  foto: string
}

// Contoh data jukir (dalam implementasi nyata, ini bisa diambil dari API atau props)
const jukir: Jukir = {
  id: 1,
  nama: "Budi Santoso",
  nomor: "081234567890",
  rating: 4.5,
  foto: "/placeholder.svg?height=100&width=100"
}

export const DetailJukir = () => {
  const handleTerima = () => {
    console.log(`Jukir ${jukir.nama} diterima`)
  }

  const handleTolak = () => {
    console.log(`Jukir ${jukir.nama} ditolak`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Detail Juru Parkir</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle className="text-2xl">Biodata Jukir</CardTitle>
            <CardDescription>Berikut adalah informasi pribadi jukir.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* <div className="flex items-center space-x-4 mb-4">
            <img
              src={jukir.foto}
              alt={jukir.nama}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-semibold">{jukir.nama}</h4>
              <p className="text-gray-600">{jukir.nomor}</p>
            </div>
          </div> */}
          {/* <div className="flex items-center mb-4">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(jukir.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2">{jukir.rating.toFixed(1)}</span>
          </div> */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="text-xl font-semibold">{jukir.nama}</h4>
            <p className="text-gray-600">{jukir.nomor}</p>
            <div className="flex items-center mt-4">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(jukir.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2">{jukir.rating.toFixed(1)}</span>
          </div>
          </div>
          {/* <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(jukir.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2">{jukir.rating.toFixed(1)}</span>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <Button onClick={handleTerima} className="bg-green-500 hover:bg-green-600">
            Terima
          </Button>
          <Button onClick={handleTolak} className="bg-red-500 hover:bg-red-600">
            Tolak
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
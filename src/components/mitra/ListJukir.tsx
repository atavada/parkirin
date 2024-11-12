import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Jukir {
  id: number
  nama: string
  nomor: string
}

const daftarJukir: Jukir[] = [
  { id: 1, nama: "Budi Santoso", nomor: "081234567890" },
  { id: 2, nama: "Ani Wijaya", nomor: "082345678901" },
  { id: 3, nama: "Citra Lestari", nomor: "083456789012" },
  { id: 4, nama: "Dedi Kurniawan", nomor: "084567890123" },
]

export const ListJukir = () => {
  const handleTerima = (id: number) => {
    console.log(`Jukir dengan ID ${id} diterima`)
  }

  const handleTolak = (id: number) => {
    console.log(`Jukir dengan ID ${id} ditolak`)
  }

  const handleDetail = (id: number) => {
    console.log(`Menampilkan detail jukir dengan ID ${id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Juru Parkir</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daftarJukir.map((jukir) => (
          <Card key={jukir.id} className="w-full">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{jukir.nama}</h2>
              <p className="text-gray-600">{jukir.nomor}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button onClick={() => handleTerima(jukir.id)} className="bg-green-500 hover:bg-green-600">
                Terima
              </Button>
              <Button onClick={() => handleTolak(jukir.id)} className="bg-red-500 hover:bg-red-600">
                Tolak
              </Button>
              <Button onClick={() => handleDetail(jukir.id)} variant="outline">
                Review
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
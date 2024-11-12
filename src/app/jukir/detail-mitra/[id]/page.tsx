// // app/jukir/detail-mitra/[id]/page.tsx
// "use client"

// import { useEffect, useState } from "react"
// import Image from "next/image"
// import { MapPin, Clock, Briefcase, Mail, Phone } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Navbar } from '@/components/home-page/Navbar'
// import { Skeleton } from "@/components/ui/skeleton"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useParams } from "next/navigation"

// interface MitraDetail {
//     id: string
//     store_name: string
//     address: string
//     imageUrl?: string
//     is_hiring: boolean
//     email: string
//     phone: string
//     working_hours: string
// }

// const FALLBACK_IMAGE = "/dummy-image.jpg"

// const MitraDetailSkeleton = () => (
//     <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow container mx-auto px-4 py-8">
//             <article className="max-w-4xl mx-auto">
//                 <Skeleton className="h-12 w-72 mb-6" />
//                 <Skeleton className="w-full aspect-video rounded-lg mb-8" />
//                 <div className="grid gap-6 md:grid-cols-2 mb-8">
//                     <Card>
//                         <CardHeader>
//                             <Skeleton className="h-8 w-40" />
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             {[1, 2, 3].map((i) => (
//                                 <Skeleton key={i} className="h-6 w-full" />
//                             ))}
//                         </CardContent>
//                     </Card>
//                     <Card>
//                         <CardHeader>
//                             <Skeleton className="h-8 w-40" />
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             {[1, 2].map((i) => (
//                                 <Skeleton key={i} className="h-6 w-full" />
//                             ))}
//                         </CardContent>
//                     </Card>
//                 </div>
//                 <div className="flex justify-center">
//                     <Skeleton className="h-12 w-40" />
//                 </div>
//             </article>
//         </main>
//     </div>
// )

// const MitraDetailPage = () => {
//     const params = useParams()
//     const id = params?.id as string

//     const [mitra, setMitra] = useState<MitraDetail | null>(null)
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)

//     useEffect(() => {
//         const fetchMitraDetail = async () => {
//             if (!id) return

//             try {
//                 setIsLoading(true)
//                 setError(null)
//                 const response = await fetch(`/api/stores/${id}`)

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`)
//                 }

//                 const result = await response.json()

//                 if (!result.data) {
//                     throw new Error("Data tidak ditemukan")
//                 }

//                 setMitra(result.data)
//             } catch (error) {
//                 setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data")
//                 console.error("Error fetching mitra detail:", error)
//             } finally {
//                 setIsLoading(false)
//             }
//         }

//         fetchMitraDetail()
//     }, [id])

//     if (isLoading) {
//         return <MitraDetailSkeleton />
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <Alert variant="destructive" className="max-w-[350px] mx-auto mt-10">
//                     <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//             </div>
//         )
//     }

//     if (!mitra) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <Alert className="max-w-[350px] mx-auto mt-10">
//                     <AlertDescription>Data mitra tidak ditemukan</AlertDescription>
//                 </Alert>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />

//             <main className="flex-grow container mx-auto px-4 py-8">
//                 <article className="max-w-4xl mx-auto">
//                     <h2 className="text-4xl font-bold mb-6">{mitra.store_name}</h2>

//                     <div className="mb-8 aspect-video relative rounded-lg overflow-hidden">
//                         <Image
//                             src={mitra.imageUrl || FALLBACK_IMAGE}
//                             alt={`${mitra.store_name} banner`}
//                             fill
//                             className="object-cover"
//                             sizes="(max-width: 1024px) 100vw, 1024px"
//                             priority
//                         />
//                     </div>

//                     <div className="grid gap-6 md:grid-cols-2 mb-8">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Informasi Kontak</CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div className="flex items-center space-x-2">
//                                     <MapPin className="h-5 w-5 text-muted-foreground" />
//                                     <span>{mitra.address}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <Mail className="h-5 w-5 text-muted-foreground" />
//                                     <span>{mitra.email}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <Phone className="h-5 w-5 text-muted-foreground" />
//                                     <span>{mitra.phone}</span>
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Jam Operasional</CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div className="flex items-center space-x-2">
//                                     <Clock className="h-5 w-5 text-muted-foreground" />
//                                     <span>{mitra.working_hours}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <Briefcase className="h-5 w-5 text-muted-foreground" />
//                                     <Badge variant={mitra.is_hiring ? "default" : "secondary"}>
//                                         {mitra.is_hiring ? "Sedang Merekrut" : "Tidak Merekrut"}
//                                     </Badge>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>

//                     {mitra.is_hiring && (
//                         <div className="flex justify-center">
//                             <Button size="lg">
//                                 Lamar Sekarang
//                             </Button>
//                         </div>
//                     )}
//                 </article>
//             </main>

//             <footer className="bg-muted py-6">
//                 <div className="container mx-auto px-4 text-center text-muted-foreground">
//                     <p>&copy; 2024 {mitra.store_name}. Hak Cipta Dilindungi.</p>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default MitraDetailPage

export default function Page() {
	return <div>detail</div>;
}

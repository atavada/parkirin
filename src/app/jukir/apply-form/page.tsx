'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Navbar } from '@/components/home-page/Navbar'
import { Footer } from '@/components/home-page/Footer'

export default function Page() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise(resolve => setTimeout(resolve, 2000))

        setName('')
        setPhone('')
        setIsSubmitting(false)
        alert('Aplikasi pekerjaan berhasil dikirim!')
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Aplikasi Pekerjaan</CardTitle>
                        <CardDescription>Silakan isi form di bawah ini untuk melamar pekerjaan Anda.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    placeholder="Masukkan nama Anda"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Handphone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Masukkan nomor handphone Anda"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Mengirim...' : 'Kirim Aplikasi'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>

    )
}
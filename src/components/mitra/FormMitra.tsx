'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const FormMitra = () => {
  const [formData, setFormData] = useState({
    jamMulai: '',
    jamSelesai: '',
    gaji: '',
    lokasi: '',
    deskripsi: '',
    tipeGaji: 'harian'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipeGaji: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Data lowongan:', formData)
    // Di sini Anda akan menambahkan logika untuk mengirim data ke backend
    alert('Lowongan berhasil dibagikan!')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Bagikan Lowongan Jukir</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jamMulai">Jam Mulai</Label>
                <Input
                  id="jamMulai"
                  name="jamMulai"
                  type="time"
                  value={formData.jamMulai}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jamSelesai">Jam Selesai</Label>
                <Input
                  id="jamSelesai"
                  name="jamSelesai"
                  type="time"
                  value={formData.jamSelesai}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gaji">Gaji</Label>
              <div className="flex space-x-2">
                <Input
                  id="gaji"
                  name="gaji"
                  type="number"
                  placeholder="Masukkan jumlah gaji"
                  value={formData.gaji}
                  onChange={handleInputChange}
                  required
                  className="flex-grow"
                />
                {/* <Select value={formData.tipeGaji} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih tipe gaji" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harian">Per Hari</SelectItem>
                    <SelectItem value="mingguan">Per Minggu</SelectItem>
                    <SelectItem value="bulanan">Per Bulan</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input
                id="lokasi"
                name="lokasi"
                placeholder="Masukkan lokasi kerja"
                value={formData.lokasi}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi Pekerjaan</Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Jelaskan detail pekerjaan dan persyaratan"
                value={formData.deskripsi}
                onChange={handleInputChange}
                rows={4}
              />
            </div> */}
            <Button type="submit" className="w-full">Bagikan Lowongan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
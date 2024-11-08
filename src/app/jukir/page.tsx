import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/home-page/Navbar'
import { Footer } from '@/components/home-page/Footer'

const page = () => {
    return (
        <>
        <Navbar />
        <div className='p-10'>
            <Input type='text' placeholder="Cari mitra Anda..." className="mb-10" />
            <Separator />
            <div className="mt-10 mb-5">
                <h1 className='font-bold text-[2rem] mb-5'>
                    Mitra Anda Saat Ini
                </h1>
                <div className="flex justify-center sm:justify-start w-full">
                    <Link href='/jukir/mitra/1' target='blank'>
                        <Card className="w-[350px] shadow-lg mx-auto sm:mx-0">
                            <CardHeader>
                                <CardTitle>Create project</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image src="/dummy-image.jpg" alt="banner" width={550} height={550} className="rounded-xl mx-auto" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <Separator className="mt-10" />
                <h1 className='font-bold text-[2rem] mb-5 mt-16'>
                    Mitra Anda Lainnya
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <Link href='/jukir/mitra/1' target='blank'>
                        <Card className="w-[350px] shadow-lg mx-auto">
                            <CardHeader>
                                <CardTitle>Create project</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image src="/dummy-image.jpg" alt="banner" width={550} height={550} className="rounded-xl mx-auto" />
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href='/jukir/mitra/1' target='blank'>
                        <Card className="w-[350px] shadow-lg mx-auto">
                            <CardHeader>
                                <CardTitle>Create project</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image src="/dummy-image.jpg" alt="banner" width={550} height={550} className="rounded-xl mx-auto" />
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href='/jukir/mitra/1' target='blank'>
                        <Card className="w-[350px] shadow-lg mx-auto">
                            <CardHeader>
                                <CardTitle>Create project</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image src="/dummy-image.jpg" alt="banner" width={550} height={550} className="rounded-xl mx-auto" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>

            </div>
        </div>
        <Footer />
        </>
    )
}

export default page

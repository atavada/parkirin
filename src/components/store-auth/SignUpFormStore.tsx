"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";
import { useState } from 'react';

export const SignUpFormStore = () => {
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    const handleCoordinateChange = (e: any) => {
        const { name, value } = e.target;
        setCoordinates({
            ...coordinates,
            [name]: value,
        });
    }; 

    // split coordinat long lat 

    const formSchema = z.object({
        name: z.string().min(3, { message: "Username must be at least 3 characters." }),
		phone_number: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
		password: z.string().min(8, "Minimal 8 karakter."),
        store_name: z.string().min(3, { message: "Store name must be at least 3 characters."}),
        address: z.string().min(3, {message: "Address must be at least 3 characters."}),
        coordinates: z.string().min(3, {message: "Coordinates must be at least 3 characters."}),
    });
    

    type UserFormValue = z.infer<typeof formSchema>;

    const form = useForm<UserFormValue>({ resolver: zodResolver(formSchema)});

    async function onSubmit(data:UserFormValue) {
        
    }

    return (
        <>
            <Card className="mx-auto max-w-[1000px] rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Silahkan masukkan data anda sesuai form berikut</CardDescription>
                </CardHeader>
                <CardContent className="space">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Lengkap</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormDescription>Masukkan nama lengkap anda.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nomor Telepon</FormLabel>
                                                <FormControl>
                                                    <PhoneInput defaultCountry="ID" placeholder="Masukkan Nomor Telepon" {...field} />
                                                </FormControl>
                                                <FormDescription>Masukkan nomor telepon anda.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="" {...field} />
                                                </FormControl>
                                                <FormDescription>Password minimal 8 karakter.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="store_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Toko</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormDescription>Masukkan nama toko anda.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Alamat Toko</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormDescription>Masukkan alamat toko anda.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>    
                                {/* <div className="space-y-4">
                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold">Titik Koordinat Toko</h4>
                                            <FormField
                                                control={form.control}
                                                name="coordinates"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder=""{...field}
                                                                onChange={handleCoordinateChange}                                                                
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        <div className="mt-2">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3510171134676!2d112.61482427476777!3d-7.962629192062097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7883221729d1d7%3A0xe97f9d1f1fa1a77d!2sUniversitas%20Negeri%20Malang!5e0!3m2!1sen!2sid!4v1731026819548!5m2!1sen!2sid" 
                                        title="Google Maps"
                                        width="100%" 
                                        height="300px"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen>
                                        </iframe>
                                        </div>
                                    </div>    
                                </div> */}
                            </div>

                            <div className="mt-4 text-center text-sm">
                                Sudah memiliki akun?{" "}
                                <Link href="/jukir/sign-in" className="underline">
                                    Sign in
                                </Link>
                            </div>

                            <Button type="submit" className="w-full">
                                Masuk
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>

    )
};
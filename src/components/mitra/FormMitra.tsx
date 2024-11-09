"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonLoading } from "../ui/button";
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const FormMitra = () => {
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = z.object({
		phone_number: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
		password: z.string().min(8, "Minimal 8 karakter."),
    });

    type UserFormValue = z.infer<typeof formSchema>;

    const form = useForm<UserFormValue>({ resolver: zodResolver(formSchema)});
    
    async function onSubmit(data:UserFormValue) {
//
    }

    return(
        <>
            <Card className="mx-[300px] max-w-[1000px] rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Formulir</CardTitle>
                    <CardDescription>Silahkan mengisi formulir berikut</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="p"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jam Kerja</FormLabel>
                                <FormControl>
                                <Input type="text" />
                                </FormControl>
                                <FormDescription>Masukkan nomor telepon anda.</FormDescription>
                                <FormMessage className="text-xs italic" />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="p"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gaji / direct customer</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>Password minimal 8 karakter.</FormDescription>
                                <FormMessage className="text-xs italic" />
                            </FormItem>
                            )}
                        />

                        <div className="mt-4 text-end text-sm">
                            Belum memiliki akun?{" "}
                            <Link href="/sign-up" className="underline">
                            Sign up
                            </Link>
                        </div>

                        {isLoading ? (
                            <ButtonLoading className="w-full" />
                        ) : (
                            <Button disabled={isLoading} type="submit" className="w-full">
                            Masuk
                            </Button>
                        )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
};
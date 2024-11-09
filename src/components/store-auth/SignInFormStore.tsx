"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, ButtonLoading } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Toaster } from "../ui/toaster";

export const SignInFormStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    phone_number: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
    password: z.string().min(8, "Minimal 8 karakter."),
  });

  type UserFormValue = z.infer<typeof formSchema>;

  const form = useForm<UserFormValue>({ resolver: zodResolver(formSchema) });

  async function onSubmit(data: UserFormValue) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/user/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error dari server:", errorData);
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Nomor telepon atau password salah",
        });
      } else {
        const responseData = await res.json();
        // Simpan token atau data user ke localStorage/cookies jika diperlukan
        localStorage.setItem('token', responseData.token);

        toast({
          title: "Login Berhasil",
          description: "Anda akan dialihkan ke halaman dashboard",
        });

        // Redirect ke halaman dashboard setelah login berhasil
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: "Terjadi kesalahan jaringan. Silahkan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function onError(error: any) {
    if (error.confirm) {
      return toast({
        variant: "destructive",
        title: "Login Gagal",
        description: error.confirm.message,
      });
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-sm rounded-xl shadow border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Silahkan masuk dengan akun yang sudah terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
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
                    <FormMessage className="text-xs italic" />
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
      <Toaster />
    </>
  );
};
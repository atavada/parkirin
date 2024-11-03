import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-center">
            <h1 className="text-4xl mb-16">
                LOGO PARIKIRIN 
            </h1>
        </div>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Silahkan masukkan masuk dengan akun yang sudah terdaftar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">No. Handphone</Label>
            <Input
              id="email"
              type="text"
              placeholder="contoh: 081234567890"
              required
            />
          </div>
          {/* <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Kata Sandi</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Lupa Kata Sandi?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div> */}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

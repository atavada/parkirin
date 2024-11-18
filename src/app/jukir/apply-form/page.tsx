'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { NavbarJukir } from '@/components/jukir/NavbarJukir'
import { FooterJukir } from '@/components/jukir/FooterJukir'
import { useAuth } from '@/app/contexts/AuthContext'

interface UserData {
	data: {
		name: string;
		role: string;
	};
}

export default function Page() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { token } = useAuth();
	const [data, setData] = useState<UserData | null>(null);
    const user = data?.data;

    useEffect(() => {
		const fetchData = async () => {
			if (token) {
				try {
					const response = await fetch("/api/user-dashboard", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const result = await response.json();
					if (response.ok) {
						setData(result);
					} else {
						console.error("Failed to fetch dashboard:", result.message);
					}
				} catch (error) {
					console.error("Failed to fetch dashboard:", error);
				}
			}
		};

		fetchData();
	}, [token]);

    return (
        <div>
            <NavbarJukir />
            <div className="flex justify-center items-start pt-20 bg-gray-100 min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Identias Anda</CardTitle>
                        <CardDescription>Berikut adalah detail data diri Anda.</CardDescription>
                    </CardHeader>
                    <form>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama</Label>
                                <p> {user?.name}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Handphone</Label>
                                <p> {user?.phone_number}</p>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
            <FooterJukir />
        </div>

    )
}
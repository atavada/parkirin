"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUserSession } from "@/app/session/UserSession";

export default function Page() {
	const { user, loading, error } = useUserSession();

	return (
		<>
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
		</>
	);
}

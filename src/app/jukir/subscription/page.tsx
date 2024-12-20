import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	return (
		<>
			<div className="flex items-center justify-center h-[700px]">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl font-bold">Premium Subscription</CardTitle>
						<CardDescription>Unlimited job applications</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-center">
							<span className="text-4xl font-bold">Rp 100.000</span>
							<span className="text-muted-foreground">/bulan</span>
						</div>
						<ul className="space-y-2">
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								Aplikasi pekerjaan tidak terbatas
							</li>
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								Prioritas dalam antrian aplikasi
							</li>
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								Akses ke lowongan eksklusif
							</li>
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								Notifikasi lowongan real-time
							</li>
						</ul>
					</CardContent>
					<CardFooter>
						<Button className="w-full">
							<Zap className="mr-2 h-5 w-5" />
							Berlangganan Sekarang
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}

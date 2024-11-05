import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const Hero = () => {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-3">
								<Badge
									variant="outline"
									className="rounded-full px-3 py-1 text-sm text-secondary-foreground font-medium border-secondary-foreground"
								>
									Explore The Parkirin App →
								</Badge>
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									Elevate Your
									<br />
									Parking Experience
									<br />
									with <span className="text-purple-600 inline-block border-b-4 border-purple-600">Parkirin</span>
								</h1>
								<p className="max-w-[600px] text-gray-500 md:text-xl">
									Parkirin connects businesses with reliable parking attendants. Find the perfect parking solution for
									your establishment today.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button className="inline-flex h-12 items-center justify-center px-8 font-semibold rounded-full">
									Get Started
								</Button>
							</div>
						</div>

						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-green-300 rounded-full blur-3xl opacity-50" />
							<Image
								alt="App preview"
								className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square border border-gray-200 shadow-xl"
								height="550"
								src="/dummy-image.jpg"
								width="550"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

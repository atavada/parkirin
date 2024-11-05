import Image from "next/image";

export const Demo = () => {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="space-y-2">
						<h2 className="text-4xl font-extrabold">
							How to order
							<span className="block w-20 h-1 bg-purple-600"></span>
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
								1
							</div>
							<div className="rounded-2xl h-full">
								<Image
									src="/dummy-image.jpg"
									alt="Enter location details"
									width={300}
									height={200}
									className="w-full h-auto rounded-3xl mb-4"
								/>
								<h3 className="text-xl font-bold mb-2">Enter Your Location</h3>
								<p className="text-gray-600">
									Type in your business address or use your current location to find nearby parking attendants.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
								2
							</div>
							<div className="rounded-2xl h-full">
								<Image
									src="/dummy-image.jpg"
									alt="Enter location details"
									width={300}
									height={200}
									className="w-full h-auto rounded-3xl mb-4"
								/>
								<h3 className="text-xl font-bold mb-2">Enter Your Location</h3>
								<p className="text-gray-600">
									Type in your business address or use your current location to find nearby parking attendants.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
								3
							</div>
							<div className="rounded-2xl h-full">
								<Image
									src="/dummy-image.jpg"
									alt="Enter location details"
									width={300}
									height={200}
									className="w-full h-auto rounded-3xl mb-4"
								/>
								<h3 className="text-xl font-bold mb-2">Enter Your Location</h3>
								<p className="text-gray-600">
									Type in your business address or use your current location to find nearby parking attendants.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

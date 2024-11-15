import Image from "next/image";

export const Demo = () => {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="space-y-2">
						<h2 className="text-4xl font-extrabold">
							Gimana cara kerjanya?
							<span className="block w-20 h-1 bg-primary"></span>
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
								1
							</div>
							<div className="rounded-2xl h-full">
								<Image
									src="/1.jpg"
									alt="Enter location details"
									width={300}
									height={200}
									className="rounded-3xl mb-4 h-auto w-full md:h-[25rem] md:w-[30rem]"
								/>
								<h3 className="text-xl font-bold mb-2">
                                    Daftar ke Website Parkirin
                                </h3>
								<p className="text-gray-600">
                                    Daftar sebagai juru parkir di website Parkirin.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
								2
							</div>
							<div className="rounded-2xl h-full">
								<Image
									src="/2.jpg"
									alt="Enter location details"
									width={300}
									height={200}
									className="rounded-3xl mb-4 h-auto w-full md:h-[25rem] md:w-[30rem]"
								/>
								<h3 className="text-xl font-bold mb-2">
                                    Cari Mitra Anda
                                </h3>
								<p className="text-gray-600">
                                    Cari mitra dan apply lowongan yang sesuai dengan keinginan Anda.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
								3
							</div>
							<div className="rounded-2xl h-full">
								<Image
									src="/3.jpg"
									alt="Enter location details"
									width={300}
									height={200}
									className="rounded-3xl mb-4 h-auto w-full md:h-[25rem] md:w-[30rem]"
								/>
								<h3 className="text-xl font-bold mb-2">
                                    Mulai Bekerja
                                </h3>
								<p className="text-gray-600">
                                    Selamat! Anda sudah siap untuk memulai bekerja di Parkirin
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

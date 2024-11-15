import Image from "next/image";
import { Card } from "../ui/card";

export const About = () => {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid gap-12 lg:grid-cols-[1fr_1fr] px-4 md:px-20">
						<div className="relative bg-blue-50 rounded-3xl p-12">
							<h2 className="text-4xl font-extrabold mb-4">
								Kenapa harus
								<br />
								<span className="relative">
									Parkirin?
									<div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
								</span>
							</h2>
							<p className="text-gray-600 mb-8">
                                Kami menghadirkan solusi terbaik untuk memudahkan juru parkir dalam mencari tempat bekerja yang nyaman.
							</p>
							<Image
								alt="Why choose illustration"
								className="w-full h-auto rounded-xl"
								height="500"
								src="/logo.png"
								width="500"
							/>
						</div>
						<div className="space-y-8 py-4 flex flex-col items-center lg:items-start">
							<Card className="border-none shadow-md p-6 flex gap-4 rounded-3xl w-full lg:w-auto mx-auto lg:mx-0">
								<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
									<div className="w-6 h-6 rounded-full bg-primary" />
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">Integrasi Juru Parkir dan Mitra</h3>
									<p className="text-gray-500">
                                        Kolaborasi Cerdas antara Juru Parkir dan Mitra Bisnis Anda.
                                    </p>
								</div>
							</Card>
							<Card className="border-none shadow-md p-6 flex gap-4 rounded-3xl w-full lg:w-auto mx-auto lg:mx-0">
								<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
									<div className="w-6 h-6 rounded-full bg-green-600" />
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">
                                        Pembayaran Mudah
                                    </h3>
									<p className="text-gray-500">
                                        Pembayaran dengan Qris Mempermudah Transaksi Pelanggan.
                                    </p>
								</div>
							</Card>
							<Card className="border-none shadow-md p-6 flex gap-4 rounded-3xl w-full lg:w-auto mx-auto lg:mx-0">
								<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
									<div className="w-6 h-6 rounded-full bg-primary" />
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">Membuka Lowongan</h3>
									<p className="text-gray-500">
                                        Lowongan Parkir di Parkirin mempermudah pencarian pekerjaan.
                                    </p>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

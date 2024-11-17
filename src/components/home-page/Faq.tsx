import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Faq = () => {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<h2 className="text-3xl font-bold">
							FAQ
							<div className="mt-1 h-1 w-12 bg-primary mx-auto" />
						</h2>
					</div>
					<div className="mx-auto max-w-3xl mt-8">
						<Accordion type="single" defaultValue="item-1" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									Bagaimana cara melacak lokasi petugas parkir saya?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Anda dapat melacak lokasi petugas parkir secara real-time melalui aplikasi. Setelah pemesanan
									terkonfirmasi, Anda akan melihat peta yang menampilkan progres petugas menuju lokasi Anda.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-2">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									Apakah saya bisa menjadwalkan layanan parkir sebelumnya?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Ya, Anda dapat menjadwalkan layanan parkir hingga 30 hari sebelumnya. Fitur ini sangat berguna untuk
									acara atau jam sibuk.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-3">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									Apakah ada biaya pembatalan?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Pembatalan yang dilakukan lebih dari 24 jam sebelum layanan yang dijadwalkan tidak dikenakan biaya.
									Pembatalan yang terlambat dapat dikenakan biaya kecil.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-4">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									Bagaimana cara menghubungi petugas parkir saya?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Setelah petugas parkir ditugaskan, Anda dapat menghubungi mereka secara langsung melalui sistem pesan
									atau fitur panggilan dalam aplikasi.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>
		</>
	);
};

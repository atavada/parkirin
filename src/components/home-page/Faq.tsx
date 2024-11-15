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
									How can I track my attendant's location?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									You can track your attendant's location in real-time via the app. After booking is confirmed, you'll
									see a map displaying your attendant's progress towards your location.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-2">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									Can I schedule parking services in advance?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Yes, you can schedule parking services up to 30 days in advance. This is especially useful for events
									or peak business hours.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-3">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									Is there a cancellation fee?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Cancellations made more than 24 hours before the scheduled service are free. Late cancellations may
									incur a small fee.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-4">
								<AccordionTrigger className="font-bold text-xl hover:no-underline">
									How can I contact my parking attendant?
								</AccordionTrigger>
								<AccordionContent className="text-md font-medium text-gray-500">
									Once an attendant is assigned, you can contact them directly through the app's messaging system or
									call feature.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>
		</>
	);
};

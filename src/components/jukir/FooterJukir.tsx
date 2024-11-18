import { Facebook, Instagram, MapPin, Twitter, Youtube, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FooterSection = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
	<div className="space-y-4">
		<h4 className="text-lg font-semibold text-primary">{title}</h4>
		<ul className="space-y-2">
			{links.map((link) => (
				<li key={link.label}>
					<Link href={link.href} className="text-gray-600 hover:text-primary">
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	</div>
);

const SocialLinks = () => (
	<div className="space-y-4">
		<h4 className="text-lg font-semibold text-primary">Find More !</h4>
		<div className="flex space-x-4">
			{/* <Link href="#" className="text-gray-600 hover:text-primary" aria-label="Facebook">
				<Facebook className="h-6 w-6" />
			</Link> */}
			<Link href="#" className="text-gray-600 hover:text-primary" aria-label="Instagram">
				<Instagram className="h-6 w-6" />
			</Link>
			{/* <Link href="#" className="text-gray-600 hover:text-primary" aria-label="Twitter">
				<Twitter className="h-6 w-6" />
			</Link> */}
			<Link href="#" className="text-gray-600 hover:text-primary" aria-label="Phone">
				<Phone className="h-6 w-6" />
			</Link>
		</div>
		{/* <p className="text-sm text-gray-600">
			1234 Main Street, Suite 567
			<br />
			Anytown, USA 12345
		</p> */}
	</div>
);

export const FooterJukir = () => {
	return (
		<>
			<section className="w-full pb-10 pt-12 md:pt-24">
				<div className="border-t my-10" />
				<div className="container flex flex-col md:flex-row items-center justify-between mx-auto px-4 md:px-6 space-y-4 md:space-y-0">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 flex items-center justify-center">
							<Image src="/icon.png" alt="Parkirin" width={32} height={32} />
						</div>
						<span className="text-xl font-bold text-primary">Parkirin</span>
					</div>
					<SocialLinks />
					<p className="text-sm text-gray-600">© Parkirin 2024</p>
				</div>
			</section>
		</>
	);
};

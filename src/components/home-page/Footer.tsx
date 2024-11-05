import { Facebook, Instagram, MapPin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const FooterSection = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
	<div className="space-y-4">
		<h4 className="text-lg font-semibold text-purple-600">{title}</h4>
		<ul className="space-y-2">
			{links.map((link) => (
				<li key={link.label}>
					<Link href={link.href} className="text-gray-600 hover:text-purple-600">
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	</div>
);

const SocialLinks = () => (
	<div className="space-y-4">
		<h4 className="text-lg font-semibold text-purple-600">Follow us</h4>
		<div className="flex space-x-4">
			<Link href="#" className="text-gray-600 hover:text-purple-600" aria-label="Facebook">
				<Facebook className="h-6 w-6" />
			</Link>
			<Link href="#" className="text-gray-600 hover:text-purple-600" aria-label="Instagram">
				<Instagram className="h-6 w-6" />
			</Link>
			<Link href="#" className="text-gray-600 hover:text-purple-600" aria-label="Twitter">
				<Twitter className="h-6 w-6" />
			</Link>
			<Link href="#" className="text-gray-600 hover:text-purple-600" aria-label="TikTok">
				<Youtube className="h-6 w-6" />
			</Link>
		</div>
		<p className="text-sm text-gray-600">
			1234 Main Street, Suite 567
			<br />
			Anytown, USA 12345
		</p>
	</div>
);

export const Footer = () => {
	return (
		<>
			<section className="w-full pb-10 pt-12 md:pt-24 lg:pt-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-2 gap-8 md:grid-cols-5">
						<FooterSection
							title="Product"
							links={[
								{ href: "#", label: "Parkirin Basic" },
								{ href: "#", label: "Parkirin Plus" },
								{ href: "#", label: "Parkirin Enterprise" },
								{ href: "#", label: "Parkirin Events" },
							]}
						/>
						<FooterSection
							title="Support"
							links={[
								{ href: "#", label: "FAQs" },
								{ href: "#", label: "Contact Support" },
								{ href: "#", label: "Forums" },
							]}
						/>
						<FooterSection
							title="Career"
							links={[
								{ href: "#", label: "Job Listing" },
								{ href: "#", label: "Our Team" },
								{ href: "#", label: "Hiring Process" },
							]}
						/>
						<FooterSection
							title="Blog"
							links={[
								{ href: "#", label: "Latest Post" },
								{ href: "#", label: "Product Reviews" },
								{ href: "#", label: "Company News" },
							]}
						/>
						<SocialLinks />
					</div>
				</div>
				<div className="border-t my-10" />
				<div className="container flex flex-col md:flex-row items-center justify-between mx-auto px-4 md:px-6 space-y-4 md:space-y-0">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
							<MapPin className="h-4 w-4 text-white" />
						</div>
						<span className="text-xl font-bold text-purple-600">Parkirin</span>
					</div>
					<nav className="flex flex-wrap gap-4 md:gap-6">
						<Link href="#" className="text-sm text-gray-600 hover:text-purple-600">
							Privacy Policy
						</Link>
						<Link href="#" className="text-sm text-gray-600 hover:text-purple-600">
							Terms of Service
						</Link>
						<Link href="#" className="text-sm text-gray-600 hover:text-purple-600">
							Security
						</Link>
						<Link href="#" className="text-sm text-gray-600 hover:text-purple-600">
							Data Record
						</Link>
					</nav>
					<p className="text-sm text-gray-600">© Parkirin 2024</p>
				</div>
			</section>
		</>
	);
};

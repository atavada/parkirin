import { FooterJukir } from "@/components/jukir/FooterJukir";
import { NavbarJukir } from "@/components/jukir/NavbarJukir";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavbarJukir />
			<div className="container mx-auto px-4 md:px-6">{children}</div>
			<FooterJukir />
		</>
	);
}

import { About } from "@/components/home-page/About";
import { Demo } from "@/components/home-page/Demo";
import { Faq } from "@/components/home-page/Faq";
import { Footer } from "@/components/home-page/Footer";
import { Hero } from "@/components/home-page/Hero";
import { Navbar } from "@/components/home-page/Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<About />
			<Demo />
			<Faq />
			<Footer />
		</>
	);
}

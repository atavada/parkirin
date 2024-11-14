import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Image alt="banner" className="h-40 w-full rounded-xl mx-auto" height="550" src="/logo.png" width="550" />
			{children}
		</>
	);
}

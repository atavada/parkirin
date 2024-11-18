import { SignInFormStore } from "@/components/store-auth/SignInFormStore";
import Image from "next/image";

export default function Page() {
	return (
		<>
			<Image alt="banner" className="h-40 w-[23rem] rounded-xl mx-auto" height="300" src="/logo.png" width="250" />
			<SignInFormStore />
		</>
	);
}

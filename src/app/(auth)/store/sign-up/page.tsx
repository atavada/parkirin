import { SignUpFormStore } from "@/components/store-auth/SignUpFormStore";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="space-y-6 p-4">
                <div className="rounded-xl shadow">
					<Image
						alt="banner"
						className="h-40 w-full rounded-xl mx-auto"
						height="550"
						src="/dummy-image.jpg"
						width="550"
					/>
				</div>
                <SignUpFormStore/>
            </div>
        </div>
    );
}
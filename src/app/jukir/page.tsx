"use client";

import { ListMitra } from "@/components/jukir/ListMitra";
import { useUserSession } from "../session/UserSession";

export default function Page() {
	const { user, loading, error } = useUserSession();

	return (
		<>
			<div className="mt-10 font-bold text-2xl">
				<h1>
					Hallo Selamat Datang Juru Parkir{" "}
					<span className="text-primary underline underline-offset-4">{user?.name}</span>
				</h1>
			</div>
			<ListMitra />
		</>
	);
}

import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useAuth } from "@/app/contexts/AuthContext";

export const UpdateHiringStatus = ({ is_hiring }: { is_hiring: any }) => {
	const { token } = useAuth();

	const handleCheckedChange = async (checked: boolean) => {
		try {
			const response = await fetch("/api/store-hiring", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ is_hiring: checked }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			window.location.reload();
			const data = await response.json();
			console.log("Success:", data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<Label className="text-base">Aktifkan Mencari Lowongan Jukir</Label>
				<Switch checked={is_hiring} onCheckedChange={handleCheckedChange} />
			</div>
		</>
	);
};

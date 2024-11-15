"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function UploadImage() {
	const { token } = useAuth();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			setSelectedImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleUpload = async () => {
		setIsLoading(true);
		if (!selectedImage) return;

		const formData = new FormData();
		formData.append("img", selectedImage);

		try {
			const response = await fetch("/api/store-img", {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const result = await response.json();
			console.log("Upload successful:", result);
			setIsLoading(false);

			router.push("/mitra/settings");
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">Upload Image</CardTitle>
				<CardDescription>Drag and drop an image or click to select a file.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onClick={() => document.getElementById("fileInput")?.click()}
					className="flex h-48 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground p-6 text-center cursor-pointer"
				>
					<div className="space-y-2">
						<input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
						<label htmlFor="fileInput" className="cursor-pointer">
							<p className="text-sm text-muted-foreground">Drag and drop an image or click to select a file</p>
						</label>
					</div>
				</div>
				{preview && (
					<div className="space-y-2 mt-4">
						<h2 className="text-lg font-semibold">Preview</h2>
						<img
							src={preview}
							alt="Image preview"
							className="h-72 w-full rounded-md object-cover"
							width="400"
							height="300"
							style={{ aspectRatio: "400/300", objectFit: "cover" }}
						/>
					</div>
				)}
				<div className="flex justify-end">
					<Button onClick={handleUpload} disabled={!selectedImage}>
						Upload
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

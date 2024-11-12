export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="flex justify-center items-center min-h-screen">
				<div className="space-y-6 p-4">{children}</div>
			</div>
		</>
	);
}

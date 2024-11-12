import { AppSidebar } from "@/components/mitra/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>{children}</SidebarInset>
			</SidebarProvider>
		</>
	);
}

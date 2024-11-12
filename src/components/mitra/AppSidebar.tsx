"use client";

import * as React from "react";
import { Bot, Command, Frame, LifeBuoy, Send, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/mitra/NavMain";
import { NavSecondary } from "@/components/mitra/NavSecondary";
import { NavUser } from "@/components/mitra/NavUser";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useStoreSession } from "@/app/session/UserSession";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { store, loading, error } = useStoreSession();

	const data = {
		user: {
			name: store?.user.name || "User",
			phone_number: store?.user.phone_number || "+62xxxxxxxxxx",
			avatar: "/avatars/shadcn.jpg",
		},
		navMain: [
			{
				title: "Home",
				url: "/mitra",
				icon: SquareTerminal,
			},
			{
				title: "List Juru Parkir",
				url: "/mitra/list",
				icon: Bot,
			},
			{
				title: "Tawarkan Jasa",
				url: "/mitra/form",
				icon: Frame,
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2,
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
			},
			{
				title: "Feedback",
				url: "#",
				icon: Send,
			},
		],
	};

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{store?.store_name}</span>
									<span className="truncate text-xs">{store?.working_hours}</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}

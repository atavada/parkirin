"use client";

import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Fragment } from "react";
import Link from "next/link";

interface NavMainItem {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	type: "link" | "dropdown";
	items: {
		title: string;
		url: string;
	}[];
}
[];

export function NavMain({ items }: { items: NavMainItem[] }) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<Fragment key={item.title}>
						{item.type === "link" ? (
							<SidebarMenuItem>
								<SidebarMenuButton asChild tooltip={item.title} className="hover:bg-primary hover:text-white text-lg">
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						) : (
							<Collapsible asChild defaultOpen>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton className="w-full justify-between hover:bg-primary hover:text-white text-lg">
											<div className="flex items-center">
												<item.icon className="mr-2 w-4 h-4" />
												<span>{item.title}</span>
											</div>
											<ChevronDown className="h-4 w-4" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title} className="hover:bg-primary hover:text-white">
													<SidebarMenuSubButton asChild>
														<Link href={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						)}
					</Fragment>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

import { ReactNode } from 'react';

export interface SidebarRoutes {
	index?: boolean;
	path?: string;
	child?: SidebarRoutes[];
	sidebarProps?: {
		title: string;
		icon?: ReactNode;
	};
}

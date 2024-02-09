import { ReactNode } from 'react';

export interface SidebarRoutes {
	path?: string;
	child?: SidebarRoutes[];
	sidebarProps?: {
		displayText: string;
		icon?: ReactNode;
	};
}

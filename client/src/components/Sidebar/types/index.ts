import { ReactNode } from 'react';

// TODO: Separate to another file? Also verify the values based on the database?
export type Role =
	| 'super_admin'
	| 'admin'
	| 'manager'
	| 'encoder'
	| 'sales_person'
	| 'sales';

export interface SidebarRoutes {
	path?: string;
	child?: SidebarRoutes[];
	allowedRoles: Role[];
	sidebarProps?: {
		displayText: string;
		icon?: ReactNode;
	};
}

export interface SidebarListItems {
	id: string;
	path?: string;
	permissionId: number[];
	children?: SidebarListItems[];
	itemProps?: {
		title: string;
		icon?: ReactNode;
	};
}

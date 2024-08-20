import { useAuth } from '@/context/AuthContext';
import SidebarLogo from '../components/SidebarLogo';
import { SidebarRoutesGrouped } from '../routes/SidebarRoutesGrouped';
import { SidebarItem } from '../components/items/SidebarItem';
import { Role } from '../types';
import { SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components';
import { all } from 'axios';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
	const { auth, logout } = useAuth();
	const { pathname } = useLocation();
	const [openedItem, setOpenedItem] = useState<string | undefined>();

	// Extract the list of permission IDs for the current user
	const permissionsList = auth.rolePermissions?.map(
		permission => permission.permission_id,
	);

	console.log('User Permissions:', permissionsList);

	return (
		<>
			<div className="relative flex w-1/6 min-w-[230px] max-w-[230px] flex-row border-e border-slate-500/20 text-sm text-slate-800">
				<nav className="sidebar bg-primary-white z-20 flex h-full w-full flex-col items-center gap-y-6 overflow-y-hidden shadow-[1px_0_9px_0_rgba(0,0,0,0.1)]">
					<div className="flex w-full items-center justify-center px-12 pb-2 pt-8">
						<SidebarLogo />
					</div>
					<ScrollArea
						className="w-full"
						type="always"
						style={{ '--border': '216 12% 84%' } as React.CSSProperties}
					>
						<ul className="items-star flex w-full flex-col gap-1 overflow-y-auto px-2">
							{SidebarRoutesGrouped.map((group, groupIndex) => {
								// Filter the items within each group based on permissions
								const allowedItems = group.items.filter(item => {
									// Check if the user has any of the permissions required for this item
									const hasPermission = item.permissionId.some(id =>
										permissionsList?.includes(id),
									);

									// Filter children based on permissions if they exist
									if (item.children) {
										item.children = item.children.filter(child =>
											child.permissionId.some(id =>
												permissionsList?.includes(id),
											),
										);
									}

									// Only return true if the user has permission for the parent or any of its children
									return (
										hasPermission ||
										(item.children && item.children.length > 0)
									);
								});

								// Skip rendering the group if there are no allowed items
								if (allowedItems.length === 0) return null;

								return (
									<div className="w-full" key={groupIndex}>
										{group.groupName && (
											<div className="px-4 pb-1 pt-4">
												<span className="text-xs font-semibold text-slate-500/80">
													{group.groupName}
												</span>
											</div>
										)}
										{allowedItems.map((item, itemIndex) => (
											<SidebarItem
												key={itemIndex}
												item={item}
												pathname={pathname}
												openedItem={openedItem}
												setOpenedItem={setOpenedItem}
											/>
										))}
									</div>
								);
							})}
						</ul>
					</ScrollArea>
					<div className="mt-auto w-full px-2 pb-2">
						<Button
							fill={'empty'}
							onClick={() => logout()}
							className="flex w-full cursor-pointer flex-row rounded-md px-3 py-1 text-sm font-medium text-slate-700 hover:bg-red-100 hover:text-red-700"
						>
							<div className="item-center flex justify-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center">
									<LogOut size={20} strokeWidth={1.75} />
								</div>
								<span className="flex items-center">Log out</span>
							</div>
						</Button>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Sidebar;

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
	const { pathname } = useLocation(); // Get the current pathname/URL
	const [openedItem, setOpenedItem] = useState<string | undefined>(); // State for opened item

	const permissionsList = auth.rolePermissions?.map(
		permission => {return permission.permission_id}
	);

	return (
		<>
			<div className="relative flex w-1/6 min-w-[230px] max-w-[230px] flex-row border-e border-slate-500/20 text-sm text-slate-800">
				<nav className="sidebar bg-primary-white z-20 flex h-screen w-full flex-col items-center gap-y-6 overflow-y-hidden shadow-[1px_0_9px_0_rgba(0,0,0,0.1)]">
					<div className="flex w-full items-center justify-center px-12 pb-2 pt-8">
						<SidebarLogo />
					</div>
					<ul className="items-star flex w-full flex-col gap-1 overflow-y-auto px-2">
						{SidebarRoutesGrouped.map((group, index) => {
							// Check if user's role is included in the allowed roles of the group items
							const allowedItems = group.items.filter(item => {
								if (item.permissionId.some(id => permissionsList?.includes(id))) {
									return item;
								};
							});
							const groupAllowed = allowedItems.length > 0;
							return group.groupName ? (
								// If group has a name, display group name
								// Group name is used to categorize the items contextually
								<div className="w-full" key={index}>
									{/* Just hide the group name if no items inside */}
									{groupAllowed && (
										<div className="px-4 pb-1 pt-4">
											<span className="text-xs font-semibold text-slate-500/80">
												{group.groupName}
											</span>
										</div>
									)}
									{group.items.map(
										(item, index) =>
											// Check if user's role is included in the allowed roles of the item
											// Don't display the item if user's role isn't allowed
											item.permissionId.some(id => permissionsList?.includes(id)) && (
												<SidebarItem
													key={index}
													item={item}
													pathname={pathname}
													openedItem={openedItem}
													setOpenedItem={setOpenedItem}
												/>
											),
									)}
								</div>
							) : (
								group.items.map((item, index) => (
									item.permissionId.some(id => permissionsList?.includes(id)) && (
										<SidebarItem
											key={index}
											item={item}
											pathname={pathname}
											openedItem={openedItem}
											setOpenedItem={setOpenedItem}
										/>
									)
								))
							);
						})}
					</ul>
					<div className="mt-auto min-h-[2.5rem] w-full px-2 pb-2">
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

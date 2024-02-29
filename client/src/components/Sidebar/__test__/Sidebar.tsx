import { useAuth } from '@/context/AuthContext';
import SidebarLogo from '../components/SidebarLogo';
import { SidebarRoutesGrouped } from '../routes/SidebarRoutesGrouped';
import { SidebarItem } from '../components/items/SidebarItem';
import { Role } from '../types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
	const auth = useAuth();
	const { pathname } = useLocation(); // Get the current pathname/URL
	const [openedItem, setOpenedItem] = useState<string | undefined>(); // State for opened item

	return (
		<>
			<div className="relative flex w-1/6 min-w-[250px] max-w-[250px] flex-row overflow-y-hidden border-e border-slate-500/20 text-sm text-slate-800">
				<nav className="sidebar bg-primary-white z-20 flex h-screen w-full flex-col items-center gap-y-8 py-10 shadow-[1px_0_9px_0_rgba(0,0,0,0.1)]">
					<SidebarLogo />
					<ul className="items-star flex h-full w-full flex-col gap-1 overflow-y-auto px-2">
						{SidebarRoutesGrouped.map((group, index) => {
							return group.groupName ? (
								// If group has a name, display group name
								// Group name is used to categorize the items contextually
								<div className="w-full" key={index}>
									<div className="px-4 pb-1 pt-4">
										<span className="text-xs font-semibold text-slate-500/80">
											{group.groupName}
										</span>
									</div>
									{group.items.map((item, index) => (
										<SidebarItem
											key={index}
											item={item}
											pathname={pathname}
											openedItem={openedItem}
											setOpenedItem={setOpenedItem}
										/>
									))}
								</div>
							) : (
								group.items.map((item, index) => (
									<SidebarItem
										key={index}
										item={item}
										pathname={pathname}
										openedItem={openedItem}
										setOpenedItem={setOpenedItem}
									/>
								))
							);
						})}
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Sidebar;

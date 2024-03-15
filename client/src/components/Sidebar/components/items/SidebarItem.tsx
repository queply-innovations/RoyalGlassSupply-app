import { Link } from 'react-router-dom';
import { SidebarListItems } from '../../types';
import { SubmenuItem } from './SubmenuItem';
import { ChevronDown } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion';

interface SidebarItemProps {
	item: SidebarListItems;
	pathname: string | null | undefined;
	openedItem: string | undefined;
	setOpenedItem: (id: string | undefined) => void;
}

// Motion prop values for submenu items
const submenuMotion = {
	initial: { height: 0 },
	animate: {
		height: 'auto',
		transition: { duration: 0.175 },
	},
	exit: { height: 0, transition: { duration: 0.175 } },
};

export const SidebarItem = ({
	item,
	pathname,
	openedItem,
	setOpenedItem,
}: SidebarItemProps) => {
	const isItemOpened = openedItem === item.id;
	// Handle expandable dropdown
	const expandItem = () => {
		if (item.children && item.children.length > 0) {
			// If isItemOpened true, set openedItem to undefined
			// Else, set openedItem to current item's id
			setOpenedItem(isItemOpened ? undefined : item.id);
		}
	};

	return (
		<li
			className={`w-full divide-y divide-slate-400/20 overflow-clip rounded-md font-medium ${
				isItemOpened && 'bg-slate-400/10'
			}`}
		>
			{/* If item has children, display as an expandable dropdown */}
			{item.children && item.children.length > 0 ? (
				<div
					key={item.id}
					className={`group relative flex w-full cursor-pointer flex-row justify-between px-3 py-1 hover:bg-slate-200/50
					${
						pathname &&
						pathname.includes(item.id.slice(0, -1)) &&
						'bg-slate-100/30 font-bold text-slate-700'
					}`}
					onClick={expandItem}
				>
					{pathname && pathname.includes(item.id.slice(0, -1)) && (
						<div className="absolute left-0 top-0 flex h-full w-1 items-center">
							<span className="block h-3 w-1 rounded-full bg-slate-700 transition-all group-hover:h-4"></span>
						</div>
					)}
					<div className="item-center flex justify-center gap-3">
						{item.itemProps?.icon && (
							<div className="flex h-8 w-8 items-center justify-center">
								{item.itemProps?.icon}
							</div>
						)}
						<span className="flex items-center">
							{item.itemProps?.title}
						</span>
					</div>
					<span
						className={`flex items-center transition-transform duration-200 ${isItemOpened && 'rotate-180'}`}
					>
						<ChevronDown
							size={18}
							strokeWidth={2}
							className="opacity-60"
						/>
					</span>
				</div>
			) : (
				<Link
					to={item.path as string}
					className={`group relative flex w-full flex-row px-3 py-1 hover:bg-slate-200/50 ${
						pathname &&
						pathname === item.path &&
						'bg-slate-100/30 font-bold text-slate-700'
					}`}
				>
					{pathname && pathname === item.path && (
						<div className="absolute left-0 top-0 flex h-full w-1 items-center">
							<span className="block h-3 w-1 rounded-full bg-slate-700 transition-all group-hover:h-4"></span>
						</div>
					)}
					<div className="item-center flex justify-center gap-3">
						{item.itemProps?.icon && (
							<div className="flex h-8 w-8 items-center justify-center">
								{item.itemProps?.icon}
							</div>
						)}
						<span className="flex items-center">
							{item.itemProps?.title}
						</span>
					</div>
				</Link>
			)}
			{/* Render submenu if isItemOpened state is true */}
			<AnimatePresence>
				{isItemOpened && item.children && (
					<m.ul
						key={item.id}
						variants={submenuMotion}
						initial={'initial'}
						animate={'animate'}
						exit={'exit'}
						className="divide-y divide-slate-600/10"
					>
						{item.children.map(childItem => (
							<SubmenuItem
								key={childItem.id}
								item={childItem}
								pathname={pathname}
							/>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</li>
	);
};

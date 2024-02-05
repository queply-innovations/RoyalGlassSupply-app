import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
	link: string;
	icon: ReactNode;
	title: string;
}

const SidebarItem = ({ link, icon, title }: SidebarItemProps) => {
	return (
		<>
			<li
				className="sidebar-menu-row relative w-full cursor-pointer px-4 py-2 hover:bg-gray-200"
				key={link}
				onClick={() => {}}
			>
				<Link to={link} className="flex w-full cursor-pointer flex-row">
					<div className="sidebar-row-container flex cursor-pointer items-center gap-x-4 p-2 px-5 text-sm">
						{icon}
						<span className="sidebar-row-title">{title}</span>
						{}
					</div>
				</Link>
			</li>
		</>
	);
};

export default SidebarItem;

import { Link } from 'react-router-dom';
import { SidebarRoutes } from '../types';

interface SidebarItemProps {
	item: SidebarRoutes;
}

const SidebarItem = ({ item }: SidebarItemProps) => {
	return item.sidebarProps && item.path ? (
		<>
			<Link to={item.path} className="flex w-full cursor-pointer flex-row">
				<li className="flex w-full cursor-pointer justify-between gap-x-4 px-10 py-4 text-sm hover:bg-gray-200">
					<div className="item-center flex justify-center gap-5">
						{item.sidebarProps.icon ? (
							<div className="flex h-6 w-6 items-center">
								{item.sidebarProps.icon}
							</div>
						) : null}

						<span className="flex items-center">
							{item.sidebarProps.displayText}
						</span>
					</div>
				</li>
			</Link>
		</>
	) : null;
};

export default SidebarItem;

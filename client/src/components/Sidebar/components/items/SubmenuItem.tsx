import { Link } from 'react-router-dom';
import { SidebarListItems } from '../../types';

interface SubmenuItemProps {
	item: SidebarListItems;
	pathname: string | null | undefined;
}

export const SubmenuItem = ({ item, pathname }: SubmenuItemProps) => {
	return (
		<li className="w-full">
			<Link
				to={item.path as string}
				className={`flex w-full flex-row px-3 py-1 hover:bg-slate-200/50 ${
					pathname
						? pathname === item.path
							? 'bg-slate-100/30 font-bold text-slate-700'
							: 'font-medium'
						: ''
				}`}
			>
				<div className="item-center flex justify-center gap-3">
					{item.itemProps?.icon ? (
						<div className="flex h-8 w-8 items-center justify-center">
							{item.itemProps?.icon}
						</div>
					) : (
						<div className="flex h-8 w-8 items-center justify-center"></div>
					)}

					<span className="flex items-center">
						{item.itemProps?.title}
					</span>
				</div>
			</Link>
		</li>
	);
};

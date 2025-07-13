import { useState } from 'react';
import { SidebarRoutes } from '../types';
import { Link } from 'react-router-dom';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

interface SidebarItemVisibleProps {
	item: SidebarRoutes;
	handleClick: any;
	id: string;
	open: any;
}

const SidebarItemVisible = ({ item, id, handleClick, open }: SidebarItemVisibleProps) => {

	return item.sidebarProps ? (
		<>
			<li
				className="relative flex w-full cursor-pointer flex-row items-center"
				onClick={() => { 
					if (open === id) {
						handleClick("");
					} else{
						handleClick(id); 
					}
				}}
			>
				<div
					className={`flex w-full cursor-pointer justify-between gap-x-4 px-10 py-4 text-sm hover:bg-gray-200 ${
						open === id ? 'bg-gray-200' : ''
					}`}
				>
					<div className="item-center flex justify-center gap-5">
						<div className="flex h-6 w-6 items-center">
							{item.sidebarProps.icon}
						</div>
						<span className="flex items-center">
							{item.sidebarProps.displayText}
						</span>
					</div>
					{open === id  ? (
						<div className="flex items-center">
							<BiSolidLeftArrow />
						</div>
					) : (
						<div className="flex items-center">
							<BiSolidRightArrow />
						</div>
					)}
				</div>
				{open === id && (
					//TODO FIX POSITIONING
					<ul className="submenu-active bg-primary-white absolute left-full top-0 z-30 w-full rounded rounded-bl-none rounded-br rounded-tl-none rounded-tr border-b border-r border-t font-semibold shadow-[2px_0_10px_0] shadow-black/10">
						{item.child?.map((route, index) =>
							route.sidebarProps ? (
								route.child ? (
									<SidebarItemVisible 
										id={id} 
										item={route} 
										handleClick={handleClick} 
										open={open} />
								) : (
									<SidebarItem key={index} item={route} />
								)
							) : null,
						)}
					</ul>
				)}
			</li>
		</>
	) : null;
};

export default SidebarItemVisible;

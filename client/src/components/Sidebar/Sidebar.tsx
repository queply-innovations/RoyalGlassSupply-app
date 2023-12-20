import { Link } from 'react-router-dom';
import Logo from '/RGS-logo.png';
import SidebarData from './SidebarData';
import { useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';

export const Sidebar = () => {
	const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

	const toggleSubMenu = (title: string) => {
		setActiveSubMenu(prevSubMenu => (prevSubMenu === title ? null : title));
	};
	return (
		<aside className="bg-primary-white z-10 flex h-screen w-1/6 max-w-[250px] flex-col items-center gap-y-16 pt-10 shadow-[1px_0_9px_0_rgba(0,0,0,0.1)]">
			<div className="">
				<Link to="/Dashboard">
					<img src={Logo} alt="RoyalGlassSupply Logo" />
				</Link>
			</div>
			<ul className="sidebar-menu flex h-full w-full flex-col items-start justify-evenly">
				{SidebarData.map((item, index) => (
					<li
						className="sidebar-menu-row relative w-full cursor-pointer px-4 py-2 hover:bg-gray-200"
						key={index}
						onClick={() => item.subMenu && toggleSubMenu(item.title)}
					>
						{item.link ? (
							<Link
								to={item.link}
								className="flex w-full cursor-pointer flex-row "
							>
								<div className="sidebar-row-container flex cursor-pointer items-center gap-x-4 p-2 px-5 text-sm">
									{item.icon}
									<span className="sidebar-row-title">
										{item.title}
									</span>
									{item.subMenu && <BiSolidRightArrow />}
								</div>
							</Link>
						) : (
							<div className="sidebar-row-container flex cursor-pointer items-center gap-x-4 p-2 px-5 text-sm">
								{item.icon}
								<span className="sidebar-row-title">{item.title}</span>
								{item.subMenu && <BiSolidRightArrow />}
							</div>
						)}
						{item.subMenu && activeSubMenu === item.title && (
							<ul className="submenu-active bg-primary-white absolute left-full top-0 z-10 w-full rounded rounded-bl-none rounded-br rounded-tl-none rounded-tr border-b border-r border-t font-semibold shadow-[2px_0_10px_0] shadow-black/10">
								{item.subMenu.map((subItem, subIndex) => (
									<li key={subIndex} className="submenu-row">
										<Link
											className="submenu-link flex cursor-pointer items-center gap-x-4 p-2 px-5 text-sm hover:bg-gray-200"
											to={subItem.link}
										>
											{subItem.title}
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;

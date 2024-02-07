import { Link, useLocation } from 'react-router-dom';
import Logo from '/RGS-logo.png';
import SidebarData from './SidebarData';
import { FC, useEffect, useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '..';
// import { useAuth } from '@/context/__test__AuthContext';

interface SidebarProps {
	sidemenu: string;
	overlay: boolean;
	width: number;
}

// interface SidebarProps {
// 	state: Array<unknown>;
// }

export const Sidebar = () => {
	const { logout } = useAuth();
	const [sidebarProperties, setSidebarProperties] = useState<SidebarProps>({
		sidemenu: 'hidden',
		overlay: true,
		width: 0,
	});

	const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
	const [isOverlayHidden, setIsOverlayHidden] = useState(true);
	const [sidebarWidth, setSidebarWidth] = useState(0);

	const toggleSubMenu = (title: string) => {
		setActiveSubMenu(prevSubMenu => (prevSubMenu === title ? null : title));
		setIsOverlayHidden(activeSubMenu !== null);
	};

	const closeActiveSubMenu = () => {
		if (activeSubMenu) {
			setActiveSubMenu(null);
		}
		setIsOverlayHidden(true);
	};

	const getSidebarWidth = () => {
		const sidebar = document.querySelector('.sidebar');
		if (sidebar) {
			return sidebar.getBoundingClientRect().width;
		}
		return 0;
	};

	useEffect(() => {
		const sidebarWidth = getSidebarWidth();
		setSidebarWidth(sidebarWidth);
	}, []);

	useEffect(() => {
		setIsOverlayHidden(activeSubMenu === null);
	}, [activeSubMenu]);

	return (
		<div className="relative flex w-1/6 max-w-[250px] flex-row">
			<aside className="sidebar bg-primary-white z-20 flex h-screen w-full flex-col items-center gap-y-16 pt-10 shadow-[1px_0_9px_0_rgba(0,0,0,0.1)]">
				<div className="">
					<Link to="/app/dashboard">
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
									//state={state}
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
									<span className="sidebar-row-title">
										{item.title}
									</span>
									{item.subMenu && <BiSolidRightArrow />}
								</div>
							)}
							{item.subMenu && activeSubMenu === item.title && (
								<>
									<ul className="submenu-active bg-primary-white absolute left-full top-0 z-30 w-full rounded rounded-bl-none rounded-br rounded-tl-none rounded-tr border-b border-r border-t font-semibold shadow-[2px_0_10px_0] shadow-black/10">
										{item.subMenu.map((subItem, subIndex) => (
											<li key={subIndex} className="submenu-row">
												<Link
													className="submenu-link flex cursor-pointer items-center gap-x-4 p-2 px-5 text-sm hover:bg-gray-200"
													to={subItem.link}
													//state={state}
												>
													{subItem.title}
												</Link>
											</li>
										))}
									</ul>
								</>
							)}
						</li>
					))}
					<li className="sidebar-menu-row relative w-full cursor-pointer px-4 py-2 hover:bg-gray-200">
						<div className="sidebar-row-container flex cursor-pointer items-center gap-x-4 p-2 px-5 text-sm">
							<Link to={'/'}>
								<Button fill={'red'} onClick={logout}>
									logout
								</Button>
							</Link>
						</div>
					</li>
				</ul>
			</aside>
			<div
				className={`absolute z-10 h-screen w-screen${
					isOverlayHidden ? ' hidden' : ''
				} overflow-hidden bg-black/5`}
				style={{ left: `${sidebarWidth}px` }}
				onClick={closeActiveSubMenu}
			></div>
		</div>
	);
};

export default Sidebar;

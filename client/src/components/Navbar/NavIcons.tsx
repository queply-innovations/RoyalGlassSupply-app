import React, { ReactNode, useState } from 'react';

import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { HiUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';

interface NaviconsProps {
	icon: ReactNode;
	title: string;
	dropdown?: boolean;
	link?: string;
}

export const NavIcons: React.FC<NaviconsProps> = ({
	title,
	icon,
	dropdown,
}) => {
	const accountMenu = [
		{
			title: 'Profile',
			icon: <HiUser />,
			link: '/profile',
		},
		{
			title: 'Settings',
			icon: <BsFillGearFill />,
			link: '/settings',
		},
		{
			title: 'Logout',
			icon: <RiLogoutBoxRLine />,
			link: '/dashboard',
		},
	];
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};
	return (
		<div
			className={`navicon flex flex-col items-center ${
				dropdown ? 'default' : 'dropdown'
			}`}
			onClick={() => dropdown && toggleDropdown()}
		>
			{dropdown ? (
				<>
					<div className="navicon-container flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-gray-200">
						{icon}
					</div>
					<div className="navicon-dropdown flex flex-row items-center">
						<span className="nav-title text-primary-dark-gray text-xs font-bold">
							{title}
						</span>
						{dropdownVisible ? (
							<>
								<BiSolidUpArrow className="dropdown-arrow text-primary-dark-gray text-xs" />
								<div className="dropdown-container absolute right-5 top-20 flex flex-col rounded-md bg-white p-4">
									<ul className="dropdown-menu flex flex-col gap-y-2">
										{accountMenu.map((item, index) => (
											<Link to={item.link} key={index}>
												<li className="dropdown-item flex flex-row items-center gap-x-2 rounded-md pr-16 hover:bg-gray-200">
													<div className="dropdown-icon-container bg-light-gray rounded-full p-2">
														{item.icon}
													</div>
													<span className="dropdown-title text-sm">
														{item.title}
													</span>
													{/* {accountItem} */}
												</li>
											</Link>
										))}
									</ul>
								</div>
							</>
						) : (
							<BiSolidDownArrow className="dropdown-arrow text-primary-dark-gray text-xs " />
						)}
					</div>
				</>
			) : (
				<>
					<div className="navicon-container flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-gray-200">
						{icon}
					</div>
					<span className="nav-title text-primary-dark-gray text-xs font-bold mt-2">
						{title}
					</span>
				</>
			)}
		</div>
	);
};

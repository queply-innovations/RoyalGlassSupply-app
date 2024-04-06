import React, { ReactNode, useState } from 'react';

import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { HiUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Boxes, ExternalLink } from 'lucide-react';

interface NaviconsProps {
	icon: ReactNode;
	title: string;
	dropdown?: boolean;
	link?: string;
	pendingProdPrices?: any;
	pendingTransfers?: any;
}

export const NavIcons: React.FC<NaviconsProps> = ({
	title,
	icon,
	dropdown,
	pendingProdPrices,
	pendingTransfers,
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
						<span className="nav-title text-primary-dark-gray mr-2 mt-2 text-xs font-bold">
							{title}
						</span>
						{dropdownVisible ? (
							<>
								<BiSolidUpArrow className="dropdown-arrow text-primary-dark-gray mt-2 text-xs" />
								<div className="dropdown-container absolute right-5 top-20 z-50 mt-4 flex flex-col space-y-2 rounded-md border bg-white p-4 shadow-xl">
									<h3 className="text-lg font-bold">Notifications</h3>
									<ul className="dropdown-menu flex flex-col gap-y-2">
										{/* {accountMenu.map((item, index) => (
											<Link to={item.link} key={index}>
												<li className="dropdown-item flex flex-row items-center gap-x-2 rounded-md pr-16 hover:bg-gray-200">
													<div className="dropdown-icon-container bg-light-gray rounded-full p-2">
														{item.icon}
													</div>
													<span className="dropdown-title text-sm">
														{item.title}
													</span>
												</li>
											</Link>
										))} */}
										<Link to="/pending/transfer">
											<li className="dropdown-item flex flex-row items-center gap-x-4 rounded-md bg-white px-4 py-2 hover:bg-gray-200">
												<div className="dropdown-icon-container bg-light-gray rounded-full">
													<ExternalLink
														size={20}
														strokeWidth={1.75}
													/>
												</div>
												<span className="dropdown-title text-sm font-medium">
													You have {pendingTransfers.length}{' '}
													pending <br /> transfers waiting for
													approval.
												</span>
											</li>
										</Link>

										<Link to="/products/listings">
											<li className="dropdown-item flex flex-row items-center gap-x-4 rounded-md bg-white px-4 py-2 hover:bg-gray-200">
												<div className="dropdown-icon-container bg-light-gray rounded-full">
													<Boxes size={20} strokeWidth={1.75} />
												</div>
												<span className="dropdown-title text-sm font-medium">
													You have {pendingProdPrices.length}{' '}
													pending product <br /> prices waiting for
													approval.
												</span>
											</li>
										</Link>
									</ul>
								</div>
							</>
						) : (
							<BiSolidDownArrow className="dropdown-arrow text-primary-dark-gray mt-2 text-xs" />
						)}
					</div>
				</>
			) : (
				<>
					<div className="navicon-container flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-gray-200">
						{icon}
					</div>
					<span className="nav-title text-primary-dark-gray mt-2 text-xs font-bold">
						{title}
					</span>
				</>
			)}
		</div>
	);
};

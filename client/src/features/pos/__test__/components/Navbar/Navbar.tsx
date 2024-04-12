import { NavbarRoutes } from './NavbarRoutes';
import { NavbarItem } from './NavbarItem';
import Logo from '/RGS-logo.png';
import { LogoutButton } from './LogoutButton';

import { SearchReturns } from './SearchReturns';
import { useAuth } from '@/context/AuthContext';
import { Role } from '../../types';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
	const { auth } = useAuth();

	// console.log(auth.role);
	return (
		<>
			<nav
				id="navbar"
				className="bg-pos-primary-background flex h-screen min-w-[52px] max-w-[80px] flex-col"
			>
				<div>
					<ul className="flex flex-col items-center justify-center">
						<div className="flex justify-center p-3">
							<img
								src={Logo}
								alt="RoyalGlassSupply-Logo"
								className="h-11 w-11 rounded-full bg-white p-1"
							/>
						</div>
						{NavbarRoutes.map((route, index) => {
							if (auth.role && route.navbarProps) {
								if (
									!!route.allowedRoles.find(role =>
										role.includes(auth.role!.split('_')[0] as Role),
									)
								) {
									return <NavbarItem key={index} item={route} />;
								}
							} else {
								return null;
							}
						})}
						<SearchReturns />
					</ul>
				</div>
				<div className="mt-auto">
					<LogoutButton />
				</div>
			</nav>
		</>
	);
};

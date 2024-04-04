import { NavbarRoutes } from './NavbarRoutes';
import { NavbarItem } from './NavbarItem';
import Logo from '/RGS-logo.png';
import { LogoutButton } from './LogoutButton';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
	return (
		<>
			<nav
				id="navbar"
				className="bg-pos-primary-background flex h-screen min-w-[52px] max-w-[80px] flex-col"
			>
				<div>
					<ul>
						<div className="flex justify-center p-3">
							<img
								src={Logo}
								alt="RoyalGlassSupply-Logo"
								className="h-11 w-11 rounded-full bg-white p-1"
							/>
						</div>
						{NavbarRoutes.map((route, index) => {
							if (route.navbarProps) {
								return <NavbarItem key={index} item={route} />;
							} else {
								return null;
							}
						})}
					</ul>
				</div>
				<div className="mt-auto">
					<LogoutButton />
				</div>
			</nav>
		</>
	);
};

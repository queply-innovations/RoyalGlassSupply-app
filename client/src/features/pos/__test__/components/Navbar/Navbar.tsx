import Logo from '/RGS-logo.png';
import { LogoutButton } from './LogoutButton';
import { useAuth } from '@/context/AuthContext';
import { NavRoutes } from './Routes/NavRoutes';
import { NavItem } from './Routes/NavItem';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
	const { auth } = useAuth();
	const userPermissions = auth.rolePermissions.map(
		//@ts-ignore
		item => item.permission.title,
	);

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
						{NavRoutes.map(route => {
							return route.isAdmin && auth.role === 'admin' ? (
								<NavItem
									key={route.navProps.path}
									navProps={route.navProps}
								/>
							) : route.permissions.every(permission =>
									userPermissions.includes(permission),
							  ) ? (
								<NavItem
									key={route.navProps.path}
									navProps={route.navProps}
								/>
							) : null;
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

import { useAuth } from '@/context/AuthContext';
import SidebarLogo from '../components/SidebarLogo';
import { SidebarRoute } from '../routes/SidebarRoutes';
import SidebarItemVisible from './SidebarItemVisible';
import SidebarItem from './SidebarItem';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
	const auth = useAuth();

	return (
		<>
			<div className="relative flex w-1/6 max-w-[250px] flex-row">
				<aside className="sidebar bg-primary-white z-20 flex h-screen w-full flex-col items-center gap-y-16 pt-10 shadow-[1px_0_9px_0_rgba(0,0,0,0.1)]">
					<SidebarLogo />
					<ul className="flex h-full w-full flex-col items-start">
						{SidebarRoute.map((route, index) => {
							// Check if route has sidebarProps
							if (route.sidebarProps) {
								// Check if route has children
								if (route.child && route.child.length > 0) {
									// Render SidebarItemVisible for routes with children
									return (
										<SidebarItemVisible key={index} item={route} />
									);
								} else {
									// Render SidebarItem for routes without children
									return <SidebarItem key={index} item={route} />;
								}
							} else {
								// Return null if route doesn't have sidebarProps
								return null;
							}
						})}
					</ul>
				</aside>
			</div>
		</>
	);
};

export default Sidebar;

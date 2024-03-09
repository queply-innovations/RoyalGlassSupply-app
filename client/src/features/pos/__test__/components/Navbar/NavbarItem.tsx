import { NavbarRoute } from '../../types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';

interface NavbarItemProps {
	item: NavbarRoute;
}

export const NavbarItem = ({ item }: NavbarItemProps) => {
	const location = useLocation();
	console.log(location);
	return item.navbarProps && item.path ? (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to={item.path}
							className={`flex w-full cursor-pointer flex-row justify-center  ${
								location.pathname === item.path
									? 'bg-primary-background hover:bg-white'
									: 'hover:bg-white/5'
							}`}
						>
							<div className="item-center flex justify-center gap-5 p-4">
								{item.navbarProps.icon ? (
									<div className="flex items-center">
										{item.navbarProps.icon}
									</div>
								) : null}
							</div>
						</Link>
					</TooltipTrigger>
					{location.pathname === item.path ? (
						''
					) : (
						<>
							<TooltipContent
								align="center"
								className="bg-pos-primary-background"
								side="right"
								sideOffset={0}
							>
								<span className="p-2 text-white">
									{item.navbarProps.displayText}
								</span>
							</TooltipContent>
						</>
					)}
				</Tooltip>
			</TooltipProvider>
		</>
	) : null;
};

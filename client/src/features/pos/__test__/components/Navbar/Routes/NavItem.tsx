import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

interface NavItemProps {
	navProps: {
		path: string;
		displayText: string;
		icon: JSX.Element;
	};
}

export const NavItem = ({ navProps }: NavItemProps) => {
	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to={navProps.path}
							className={`flex w-full cursor-pointer flex-row justify-center  ${
								location.hash.substring(1) === navProps.path ||
								(location.hash.substring(1) === '/pos' &&
									navProps.path === '/pos/add-order')
									? 'bg-primary-background hover:bg-white'
									: 'hover:bg-white/5'
							}`}
						>
							<div className="item-center flex justify-center gap-5 p-4">
								{navProps.icon ? (
									<div className="flex items-center">
										{navProps.icon}
									</div>
								) : null}
							</div>
						</Link>
					</TooltipTrigger>
					{location.pathname === navProps.path ? (
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
									{navProps.displayText}
								</span>
							</TooltipContent>
						</>
					)}
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

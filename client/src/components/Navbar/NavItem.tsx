import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	icon: React.ReactNode;
	isActive?: boolean;
}

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
	({ title, icon, isActive, ...props }, ref) => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							ref={ref}
							variant={'secondary'}
							size={'lg'}
							className={`h-12 w-12 rounded-full border bg-white p-1 text-gray-700 hover:bg-gray-400/40 hover:text-gray-900 ${isActive && 'bg-gray-400/30 text-gray-900'}`}
							{...props}
						>
							{icon}
						</Button>
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						className="text-sm font-medium text-gray-700"
					>
						<p>{title}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	},
);

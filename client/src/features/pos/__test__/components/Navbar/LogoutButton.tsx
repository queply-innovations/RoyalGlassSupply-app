import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export const LogoutButton = () => {
	const { logout } = useAuth();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						onClick={() => logout()}
						className="flex w-full cursor-pointer flex-row justify-center p-4 hover:bg-white/5"
					>
						<LogOut size={40} className="text-[#CCCCCC]" />
					</div>
				</TooltipTrigger>
				<TooltipContent
					align="center"
					className="bg-pos-primary-background"
					side="right"
					sideOffset={0}
				>
					<span className="p-2 text-white">Log out</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

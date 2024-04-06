import { Button } from '@/components/ui/button';
import { MouseEventHandler } from 'react';

interface ActionButtonProps {
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ActionButton = ({
	title,
	subtitle,
	icon,
	onClick,
}: ActionButtonProps) => {
	return (
		<Button
			className="flex h-fit flex-1 flex-col gap-8 rounded-xl bg-gray-300 p-16 pb-12 text-slate-800 hover:text-white"
			onClick={onClick ? onClick : () => {}}
		>
			{icon && icon}
			<span>
				<p className="text-lg font-bold">{title}</p>
				{subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
			</span>
		</Button>
	);
};

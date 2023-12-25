import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

const infoCardVariants = cva('info-card', {
	variants: {
		variant: {
			default:
				'flex w-1/4  flex-col items-center justify-between gap-y-1 rounded-md px-6 py-5',
		},
		background: {
			default: 'bg-gray-200 hover:bg-gray-400',
			gradient: 'bg-gradient-to-bl from-yellow-500 via-red-500 to-red-600',
			white: 'bg-white',
			gray: 'bg-primary-gray',
		},
	},
	defaultVariants: {
		variant: 'default',
		background: 'default',
	},
});
interface InfoCardProps extends VariantProps<typeof infoCardVariants> {
	className?: string;
	children?: ReactNode;
}

const InfoCard: FC<InfoCardProps> = ({
	className,
	children,
	variant,
	background,
}) => {
	return (
		<>
			<div
				className={cn(infoCardVariants({ className, variant, background }))}
			>
				{children}
			</div>
		</>
	);
};

export { InfoCard, infoCardVariants };

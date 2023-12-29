import { cn } from '@/utils/cn.utils';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, ReactNode } from 'react';

const layoutVariants = cva('layout', {
	variants: {
		variant: {
			default: 'flex',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface LayoutProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof layoutVariants> {
	children: ReactNode;
}

const LayoutWrapper: FC<LayoutProps> = ({
	className,
	variant,
	children,
	...props
}) => {
	return (
		<div className={cn(layoutVariants({ className, variant }))} {...props}>
			{children}
		</div>
	);
};

export default LayoutWrapper;

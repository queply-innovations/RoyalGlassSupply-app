import { Navbar } from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/utils/cn.utils';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, ReactNode } from 'react';

const layoutVariants = cva('layout', {
	variants: {
		variant: {
			default: 'flex flex-auto p-5 flex-col h-screen max-h-screen',
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
		<>
			<div className="flex h-screen w-screen overflow-hidden">
				<Sidebar />
				<div
					className={cn(layoutVariants({ className, variant }))}
					{...props}
				>
					<Navbar />
					{children}
				</div>
			</div>
		</>
	);
};

export default LayoutWrapper;

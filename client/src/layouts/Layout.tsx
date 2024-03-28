import { Navbar } from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/__test__/Sidebar';
import useNetwork from '@/useNetwork';
// import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/utils/cn.utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Circle } from 'lucide-react';
import { FC, HTMLAttributes, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

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
	//state,
	...props
}) => {
	// console.log(state);
	// console.log("layout");
	const networkState = useNetwork();
	const { online } = networkState;

	return (
		<>
			<div className="flex h-screen w-screen overflow-hidden">
				<Sidebar />
				<div
					className={cn(layoutVariants({ className, variant }))}
					{...props}
				>
					{children}
					<div className="flex flex-row justify-end text-xl pt-4">
						<div className={`w-7 h-7 rounded-full ${online ? 'bg-green-500' : 'bg-gray-500'} mr-2`}>
							<div className={`w-7 h-7 rounded-full ${online ? 'bg-green-500 animate-ping' : 'bg-gray-500'} mr-2`}>
							</div>
						</div>
						{online ? "You're currently online" : "You're currently offline"}
					</div>
				</div>
			</div>
		</>
	);
};

export default LayoutWrapper;

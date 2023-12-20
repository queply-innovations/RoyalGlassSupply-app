import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';

const buttonVariants = cva('button', {
	variants: {
		variant: {
			default: 'gap-2 rounded-full px-3 py-1 gap-x-2',
		},
		fill: {
			default: 'bg-gray-200',
			primary: 'bg-blue-500',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ className, fill, variant, ...props }) => {
	return (
		<button
			className={cn(buttonVariants({ variant, fill, className }))}
			{...props}
		/>
	);
};

export { Button, buttonVariants };

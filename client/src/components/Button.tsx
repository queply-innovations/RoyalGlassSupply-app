import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';

const buttonVariants = cva('button', {
	variants: {
		variant: {
			default: 'gap-2 rounded-full px-4 py-1 gap-x-2',
			empty: '',
		},
		fill: {
			default: 'bg-gray-200 hover:bg-gray-400',
			primary: 'bg-blue-300 hover:bg-blue-400',
			red: 'bg-primary-red hover:bg-primary-red/80',
			green: 'bg-primary-green hover:bg-primary-green/80',
			yellow: 'bg-primary-yellow hover:bg-primary-yellow/80',
		},
		textColor: {
			default: 'text-white',
			black: 'text-black',
			green: 'text-green',
			yellow: 'text-yellow',
		},
	},
	defaultVariants: {
		variant: 'default',
		fill: 'default',
		textColor: 'default',
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

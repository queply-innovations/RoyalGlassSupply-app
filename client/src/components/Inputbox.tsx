import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, FC } from 'react';

const inputVariants = cva('input', {
	variants: {
		variant: {
			default:
				'rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:shadow-lg placeholder:text-gray-400 placeholder:font-lg',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface InputboxProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Inputbox: FC<InputboxProps> = ({ className, variant, ...props }) => {
	return (
		<input className={cn(inputVariants({ variant, className }))} {...props} />
	);
};

export { Inputbox, inputVariants };

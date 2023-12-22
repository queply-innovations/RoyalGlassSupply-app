import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { FormHTMLAttributes, FC } from 'react';

const formVariants = cva('form', {
	variants: {
		variant: {
			default: 'flex gap-2 items-center justify-center',
		},
		flexDirection: {
			default: 'flex-col',
			row: 'flex-row',
		},
	},
	defaultVariants: {
		variant: 'default',
		flexDirection: 'default',
	},
});

interface FormProps
	extends FormHTMLAttributes<HTMLFormElement>,
		VariantProps<typeof formVariants> {}

const Form: FC<FormProps> = ({
	className,
	variant,
	flexDirection,
	...props
}) => {
	return (
		<form
			className={cn(formVariants({ variant, flexDirection, className }))}
			{...props}
		/>
	);
};

export { Form, formVariants };

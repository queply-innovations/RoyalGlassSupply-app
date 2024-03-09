import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, SelectHTMLAttributes } from 'react';

const selectboxVariants = cva('selectbox', {
	variants: {
		variant: {
			default:
				'rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:shadow-mg placeholder:text-gray-400 placeholder:font-lg',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface SelectboxProps
	extends SelectHTMLAttributes<HTMLSelectElement>,
		VariantProps<typeof selectboxVariants> {
	options: string[];
	hasFrequency?: boolean;
	frequencyOptions?: string[];
	placeholder: string;
}

const Selectbox: FC<SelectboxProps> = ({
	className,
	variant,
	options,
	placeholder,
	hasFrequency,
	frequencyOptions,
	...props
}) => {
	return (
		<>
			<select
				defaultValue={'DEFAULT'}
				className={cn(selectboxVariants({ variant, className }))}
				{...props}
			>
				<option value="DEFAULT" hidden>
					{placeholder}
				</option>
				{options.map((option, index) => (
					<option
						className="hover:bg-primary-red flex cursor-pointer rounded-none border-none"
						key={index}
						value={option}
					>
						{option}
					</option>
				))}
			</select>
			{hasFrequency && (
				<select
					defaultValue={'DEFAULT'}
					className={cn(selectboxVariants({ variant, className }))}
					{...props}
				>
					<option value="DEFAULT" hidden>
						Sort By
					</option>
					{frequencyOptions?.map((freq, index) => (
						<option
							className="hover:bg-primary-red flex cursor-pointer rounded-none border-none"
							key={index}
							value={freq}
						>
							{freq}
						</option>
					))}
				</select>
			)}
		</>
	);
};

export { Selectbox, selectboxVariants };

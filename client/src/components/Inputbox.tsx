import { cn } from '@/utils/cn.utils';
import { cva, VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, FC } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '@components/Button';

const inputVariants = cva('inputbox', {
	variants: {
		variant: {
			default:
				'rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:shadow-lg placeholder:text-gray-400 placeholder:font-lg',
			searchbar: 'searchbar w-2/5 self-center',
		},
		buttonIcon: {
			default:
				'flex w-full items-center rounded-full border border-black/10 bg-white pl-5 p-2',
			outside:
				'flex w-full items-center justify-between rounded-full border border-black/10 bg-white',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface InputboxProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Inputbox: FC<InputboxProps> = ({
	className,
	variant,
	buttonIcon,
	...props
}) => {
	return (
		<>
			{variant === 'searchbar' ? (
				<div
					className={cn(inputVariants({ variant, buttonIcon, className }))}
				>
					{buttonIcon === 'default' && (
						<>
							<HiOutlineMagnifyingGlass className="searchbar-icon text-2xl" />
							<input
								className="searchbar-input ml-3 mr-4 w-full focus-visible:outline-none "
								{...props}
							/>
						</>
					)}
					{buttonIcon === 'outside' && (
						<>
							<input
								className="searchbar-input ml-3 mr-4 w-full focus-visible:outline-none "
								{...props}
							/>
							<Button
								variant={'empty'}
								className="rounded-r-full"
								type="submit"
							>
								<HiOutlineMagnifyingGlass className="searchbar-icon bg-primary-gray/50 rounded-br-full rounded-tr-full p-2 text-4xl" />
							</Button>
						</>
					)}
				</div>
			) : (
				<input
					className={cn(inputVariants({ variant, className }))}
					{...props}
				/>
			)}
		</>
	);
};

export { Inputbox, inputVariants };

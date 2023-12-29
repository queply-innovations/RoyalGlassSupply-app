import { cn } from '@/utils/cn.utils';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, InputHTMLAttributes } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Inputbox } from './Inputbox';

const searchbarVariants = cva('searchbar', {
	variants: {
		variant: {
			default: 'w-2/5 self-center',
		},
		buttonIcon: {
			default:
				'flex w-full items-center rounded-full border border-black/10 bg-white p-2 pl-5',
			outside:
				'flex w-full items-center justify-between rounded-full border border-black/10 bg-white',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface SearchbarProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof searchbarVariants> {}

const Searchbar: FC<SearchbarProps> = ({
	className,
	variant,
	buttonIcon,
	...props
}) => {
	return (
		<div
			className={cn(searchbarVariants({ variant, className, buttonIcon }))}
			{...props}
		>
			{buttonIcon === 'outside' && (
				<>
					<HiOutlineMagnifyingGlass className="searchbar-icon text-2xl" />
					<Inputbox />
				</>
			)}
			<Inputbox />
			<HiOutlineMagnifyingGlass className="searchbar-icon text-2xl" />
		</div>
	);
};

export { Searchbar, searchbarVariants };

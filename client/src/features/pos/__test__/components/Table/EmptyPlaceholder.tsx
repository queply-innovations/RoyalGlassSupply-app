import { ShoppingCart } from 'lucide-react';

interface TablePlacholderProps {}

export const TablePlacholder = ({}: TablePlacholderProps) => {
	return (
		<>
			<div className="flex h-full flex-1 flex-col items-center justify-center gap-6 opacity-70">
				<ShoppingCart
					width={150}
					height={150}
					color="#888888"
					strokeWidth={-1}
				/>
				<span className="max-w-[300px] text-center text-[#888]">
					Cart is empty. Start adding items by searching products.
				</span>
			</div>
		</>
	);
};

import { ShoppingCart } from 'lucide-react';

interface TablePlacholderProps {}

export const TablePlacholder = ({}: TablePlacholderProps) => {
	return (
		<>
			<div className="flex flex-1 flex-col items-center justify-center">
				<ShoppingCart
					width={150}
					height={150}
					color="#888888"
					strokeWidth={-1}
				/>
				<span className="max-w-[300px] text-center text-[#888]">
					Start entering products / product code / serial number / brand
				</span>
			</div>
		</>
	);
};

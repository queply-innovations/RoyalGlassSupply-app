import { Inputbox } from '@/components';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { getDate } from '@/utils/timeUtils';

interface ProductFormProps {}

export const ProductForm = ({}: ProductFormProps) => {
	const { auth } = useAuth();
	const { selectedProduct } = useProducts();
	return (
		<>
			<div className="flex flex-col gap-5">
				<div className="flex flex-row justify-between gap-4">
					<div>
						<p>
							Created by:
							<span>{auth.user.firstname}</span>
						</p>
					</div>
					<div>
						<span>{getDate()}</span>
					</div>
				</div>
				<div className="flex flex-row gap-4">
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Product ID
						</span>
						<Inputbox
							name="product_id"
							value={selectedProduct.product_id}
							type="number"
							disabled={true}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Product Prices ID
						</span>
						<Inputbox
							name="id"
							value={selectedProduct.id}
							type="number"
							disabled={true}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Serial Number
						</span>
						<Inputbox
							name="serial_number"
							value={selectedProduct.product.serial_no || ''}
							type="text"
							onChange={e => e.target.value}
							placeholder="E.g 123456789"
							className="rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-row gap-4">
					<div className="flex w-full flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Product Name
						</span>
						<Inputbox
							name="product_name"
							value={selectedProduct.product.name || ''}
							type="text"
							onChange={e => e.target.value}
							placeholder="E.g Nails"
							className="rounded-full"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

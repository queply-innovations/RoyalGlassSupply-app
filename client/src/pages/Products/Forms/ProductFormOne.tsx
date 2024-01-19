import { Button, Inputbox } from '@/components';
import { useState } from 'react';

export const ProductFormOne = () => {
	const productNextId = isUpdate ? data?.id || '' : getNextId(data);
	const [productId, setProductId] = useState(productNextId);
	const [productName, setProductName] = useState('');
	const [serialNumber, setSerialNumber] = useState('');
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [note, setNote] = useState('');
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-row gap-4">
				<div className="flex flex-col gap-2">
					<span className="text-sm font-bold uppercase">Product ID</span>
					<Inputbox
						name="id"
						value={productId}
						type="number"
						disabled={true}
						className="rounded-full"
						onChange={e => setProductId(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-sm font-bold uppercase">
						Serial Number
					</span>
					<Inputbox
						name="serial_number"
						value={serialNumber || ''}
						type="text"
						onChange={e => setSerialNumber(e.target.value)}
						placeholder="E.g 123456789"
						className="rounded-full"
					/>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col gap-2">
					<span className="text-sm font-bold uppercase">
						Size / Dimensions
					</span>
					<Inputbox
						name="size"
						value={size || ''}
						type="text"
						onChange={e => setSize(e.target.value)}
						placeholder="E.g 10x10x10"
						className="rounded-full"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-sm font-bold uppercase">Color</span>
					<Inputbox
						name="color"
						value={color || ''}
						placeholder="Silver"
						onChange={e => setColor(e.target.value)}
						className="rounded-full"
					/>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex w-full flex-col gap-2">
					<span className="text-sm font-bold uppercase">Product Name</span>
					<Inputbox
						name="product_name"
						value={productName || ''}
						type="text"
						onChange={e => setProductName(e.target.value)}
						placeholder="E.g Nails"
						className="rounded-full"
					/>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex w-full flex-col gap-2">
					<span className="text-sm font-bold uppercase">Notes</span>
					<Inputbox
						name="notes"
						value={note || ''}
						type="text"
						onChange={e => setNote(e.target.value)}
						placeholder=""
						className="h-20 rounded-2xl"
					/>
				</div>
			</div>
			<div className="flex justify-center">
				<Button fill="green">Add Product</Button>
			</div>
		</div>
	);
};

import { Form, Inputbox } from '@/components';
import { Product, ProductData } from '@/entities/Products';
import { useProducts } from '@/api/Products';
import { useProductMutation } from '@/api/testProducts';
import { getDate } from '@/utils/timeUtils';
import { useQueryClient } from '@tanstack/react-query';
import { parse } from 'postcss';
import { FC, useEffect, useState } from 'react';

interface ProductsFormProps {
	data?: Product[];
	isUpdate?: boolean;
}
export const ProductsForm: FC<ProductsFormProps> = ({
	isUpdate = false,
	data,
}) => {
	const queryClient = useQueryClient();
	const { data: products } = useProducts();

	const [id, setId] = useState(parseInt(''));
	const [name, setName] = useState('');
	const [serialNumber, setSerialNumber] = useState(parseInt(''));
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [notes, setNotes] = useState('');

	const ProductFormData = {
		id: id,
		name: name,
		serial_number: serialNumber,
		size: size,
		color: color,
		notes: notes,
	};

	const mutationConfig = () => {
		setId(parseInt(''));
		setName('');
		setSerialNumber(parseInt(''));
		setSize('');
		setColor('');
		setNotes('');
	};

	useEffect(() => {
		if (isUpdate && data) {
			data.map((product: Product) => {
				setId(product.id);
				setName(product.name);
				setSerialNumber(product.serial_number);
				setSize(product.size);
				setColor(product.color);
				setNotes(product.notes);
			});
		}
	}, [isUpdate, data]);

	const addProduct = useProductMutation(ProductFormData, mutationConfig);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addProduct;
	};
	return (
		<>
			<Form onSubmit={handleSubmit} className="flex-col gap-5">
				<div className="flex flex-col gap-5">
					<div className="flex flex-row justify-between gap-4">
						<div>
							{/* <p>
								Created by:
								<span>{createdBy}</span>
							</p> */}
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
								name="id"
								value={id}
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
								value={serialNumber || ''}
								type="number"
								onChange={e =>
									setSerialNumber(parseInt(e.target.value))
								}
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
								value={name || ''}
								type="text"
								onChange={e => setName(e.target.value)}
								placeholder="E.g Nails"
								className="rounded-full"
							/>
						</div>
					</div>
				</div>
			</Form>
		</>
	);
};

import { Form } from '@/components';
import { Product, ProductData } from '@/entities/Products';
import { useProducts } from '@/utils/api/Products';
import { useProductMutation } from '@/utils/api/testProducts';
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
			<Form onSubmit={handleSubmit} className="flex-col gap-5"></Form>
		</>
	);
};

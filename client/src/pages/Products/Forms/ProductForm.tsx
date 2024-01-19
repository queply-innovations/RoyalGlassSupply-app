import { Button, Inputbox, Modal } from '@/components';
import { ProductData } from '@/entities/Products';
import { UseModalProps, useModal } from '@/utils/Modal';
import { getNextId } from '@/utils/api/Helpers';
import { addProduct, updateProduct } from '@/utils/api/Products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

interface ProductFormProps extends ProductData {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
}

export const ProductForm: FC<ProductFormProps> = ({
	data,
	onClose,
	isUpdate = false,
}) => {
	const queryClient = useQueryClient();

	const productNextId = isUpdate ? data?.id || '' : getNextId(data);

	const [isLoading, setIsLoading] = useState(false);
	const [productId, setProductId] = useState(productNextId);
	const [productName, setProductName] = useState('');
	const [serialNumber, setSerialNumber] = useState('');
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [note, setNote] = useState('');

	const { closeModal } = useModal();

	const formData = {
		id: productId,
		product_name: productName,
		serial_number: serialNumber,
		size: size,
		color: color,
		note: note,
	};

	useEffect(() => {
		if (isUpdate && data) {
			setProductId(data.id);
			setProductName(data.product_name);
			setSerialNumber(data.serial_number);
			setSize(data.size);
			setColor(data.color);
			setNote(data.note);
		}
	}, [isUpdate, data]);

	const mutationConfig = {
		onSuccess: async () => {
			setIsLoading(false);
			setProductId('');
			setProductName('');
			setSerialNumber('');
			setSize('');
			setColor('');
			setNote('');
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			onClose();
		},
		onError: (error: any) => {
			setIsLoading(false);
			console.error('Product Form Data submission failed', error);
		},
	};

	const { mutateAsync: addProductMutation } = useMutation({
		mutationKey: ['addProduct:', formData.id],
		mutationFn: addProduct,
		...mutationConfig,
	});

	const { mutateAsync: updateProductMutation } = useMutation({
		mutationKey: ['addProduct:', formData.id],
		mutationFn: updateProduct,
		...mutationConfig,
	});

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (isUpdate) {
				await updateProductMutation(formData);
			} else {
				await addProductMutation(formData);
			}
		} catch (error) {
			console.error('Product Data submission failed', error);
		}
	};

	return (
		<>
			<form
				className="p-5"
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">
								Product ID
							</span>
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
							<span className="text-sm font-bold uppercase">
								Product Name
							</span>
							<Inputbox
								name="product_name"
								value={productName || ''}
								type="text"
								onChange={e => setProductName(e.target.value)}
								placeholder="E.g 10x10x10"
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
								placeholder="E.g 10x10x10"
								className="h-20 rounded-2xl"
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<Button fill="green">Add Product</Button>
					</div>
				</div>
			</form>
			{isLoading && (
				<Modal isOpen={true} onClose={closeModal}>
					<div className="flex w-60 flex-col gap-5 p-5">
						<div className="flex justify-center">Loading</div>
						<div>
							<p>
								{`Product ${formData.id} - ${formData.product_name}`}
							</p>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

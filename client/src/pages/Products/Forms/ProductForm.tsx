import { Button, Inputbox, Modal, Selectbox } from '@/components';
import { ProductData } from '@/entities/Products';
import { UseModalProps, useModal } from '@/utils/Modal';
import { getNextId } from '@/utils/api/Helpers';
import {
	addProduct,
	addProductPrice,
	updateProduct,
	updateProductPrice,
} from '@/utils/api/Products';
import { getDate } from '@/utils/timeUtils';
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
	const [currentStep, setCurrentStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [productId, setProductId] = useState(productNextId);
	const [productName, setProductName] = useState('');
	const [serialNumber, setSerialNumber] = useState('');
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [note, setNote] = useState('');

	const [productPricesId, setProductPricesId] = useState(productNextId);
	const [type, setType] = useState('');
	const [quantity, setQuantity] = useState('');
	const [unit, setUnit] = useState('');
	const [capitalPrice, setCapitalPrice] = useState('');
	const [markupPrice, setMarkupPrice] = useState('');
	const [retailPrice, setRetailPrice] = useState('');
	const [onSale, setOnSale] = useState('');
	const [salePrice, setSalePrice] = useState('');
	const [status, setStatus] = useState('');
	const [createdBy, setCreatedBy] = useState('');
	const [approvedBy, setApprovedBy] = useState('');
	const [warehouseId, setWarehouseId] = useState('');
	const [createdAt, setCreatedAt] = useState('');
	const [updatedAt, setUpdatedAt] = useState('');

	const { closeModal } = useModal();

	const formProductsData = {
		id: productId,
		product_name: productName,
		serial_number: serialNumber,
		size: size,
		color: color,
		note: note,
	};

	const formProductPricesData = {
		id: productId,
		product_id: productPricesId,
		type: type,
		quantity: quantity,
		unit: unit,
		capital_price: capitalPrice,
		markup_price: markupPrice,
		retail_price: retailPrice,
		on_sale: onSale,
		sale_price: salePrice,
		status: status,
		created_by: createdBy,
		approved_by: approvedBy,
		warehouse_id: warehouseId,
		created_at: createdAt,
		updated_at: updatedAt,
	};

	useEffect(() => {
		if (isUpdate && data) {
			setProductId(data.id);
			setProductName(data.product_name);
			setSerialNumber(data.serial_number);
			setSize(data.size);
			setColor(data.color);
			setNote(data.note);
			setProductPricesId(data.productPricesId);
			setType(data.type);
			setQuantity(data.quantity);
			setUnit(data.unit);
			setCapitalPrice(data.capital_price);
			setMarkupPrice(data.markup_price);
			setRetailPrice(data.retail_price);
			setOnSale(data.on_sale);
			setSalePrice(data.sale_price);
			setStatus(data.status);
			setCreatedBy(data.created_by);
			setApprovedBy(data.approved_by);
			setWarehouseId(data.warehouse_id);
			setCreatedAt(data.created_at);
			setUpdatedAt(data.updated_at);
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
			setProductPricesId('');
			setType('');
			setQuantity('');
			setUnit('');
			setCapitalPrice('');
			setMarkupPrice('');
			setRetailPrice('');
			setOnSale('');
			setSalePrice('');
			setStatus('');
			setCreatedBy('');
			setApprovedBy('');
			setWarehouseId('');
			setCreatedAt('');
			setUpdatedAt('');
			await queryClient.invalidateQueries({
				queryKey: ['products', 'product_prices'],
			});
			onClose();
		},
		onError: (error: any) => {
			setIsLoading(false);
			console.error('Product Form Data submission failed', error);
		},
	};

	const { mutateAsync: addProductMutation } = useMutation({
		mutationKey: ['addProduct:', formProductsData.id],
		mutationFn: addProduct,
		...mutationConfig,
	});
	const { mutateAsync: addProductPricesMutation } = useMutation({
		mutationKey: ['addProduct:', formProductPricesData.id],
		mutationFn: addProductPrice,
		...mutationConfig,
	});

	const { mutateAsync: updateProductMutation } = useMutation({
		mutationKey: ['updateProduct:', formProductsData.id],
		mutationFn: updateProduct,
		...mutationConfig,
	});
	const { mutateAsync: updateProductPricesMutation } = useMutation({
		mutationKey: ['updateProductPrice:', formProductPricesData.id],
		mutationFn: updateProductPrice,
		...mutationConfig,
	});

	const handleNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const handlePreviousStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const renderFormOne = () => {
		return (
			<>
				<div className="flex flex-row gap-4">
					<div className="flex w-full flex-col gap-2">
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
					<div className="flex w-full flex-col gap-2">
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
					<Button fill="yellow" onClick={() => handleNextStep()}>
						Next
					</Button>
				</div>
			</>
		);
	};
	const renderFormTwo = () => {
		return (
			<>
				<div className="flex flex-row gap-4">
					<div className="flex w-1/2 flex-col gap-2">
						<span className="text-sm font-bold uppercase">Type</span>
						<Selectbox
							name="type"
							options={['Single', 'Bundle']}
							defaultValue={type || 'Single'}
							onChange={e => setType(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">Quantity</span>
						<Inputbox
							name="quantity"
							value={quantity || ''}
							onChange={e => setQuantity(e.target.value)}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">Unit</span>
						<Inputbox
							name="unit"
							value={unit || ''}
							onChange={e => setUnit(e.target.value)}
							className="rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-row gap-4">
					<div className="flex w-1/2 flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Capital Price
						</span>
						<Inputbox
							name="capital_price"
							value={capitalPrice || ''}
							onChange={e => setCapitalPrice(e.target.value)}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Markup Price
						</span>
						<Inputbox
							name="markup_price"
							value={markupPrice || ''}
							onChange={e => setMarkupPrice(e.target.value)}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Retail Price
						</span>
						<Inputbox
							name="retail_price"
							value={retailPrice || ''}
							onChange={e => setRetailPrice(e.target.value)}
							className="rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-row gap-4">
					<div className="flex w-1/2 flex-col gap-2">
						<span className="text-sm font-bold uppercase">On Sale?</span>
						<Selectbox
							name="on_sale"
							options={['Yes', 'No']}
							defaultValue={onSale || 'No'}
							onChange={e => setOnSale(e.target.value)}
						/>
					</div>
					<div className="flex w-1/2 flex-col gap-2">
						<span className="text-sm font-bold uppercase">
							Sale Price
						</span>
						<Inputbox
							name="sale_price"
							value={salePrice || ''}
							onChange={e => setSalePrice(e.target.value)}
							className="rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-row justify-between">
					<Button fill="yellow" onClick={() => handlePreviousStep()}>
						Back
					</Button>
					<Button fill="green" type="submit">
						{isUpdate ? 'Update Product' : 'Add Product'}
					</Button>
				</div>
			</>
		);
	};
	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (isUpdate) {
				await updateProductMutation(formProductsData);

				await updateProductPricesMutation(formProductPricesData);
			} else {
				await addProductMutation(formProductsData);
				console.log(formProductPricesData, 'formProductPricesData');
				await addProductPricesMutation(formProductPricesData);
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
					<div className="flex flex-row justify-between gap-4">
						<div>
							<p>
								Created by:
								<span>{createdBy}</span>
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
								name="id"
								value={productId}
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
								name="product_id"
								value={productPricesId}
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
								type="text"
								onChange={e => setSerialNumber(e.target.value)}
								placeholder="E.g 123456789"
								className="rounded-full"
								disabled={currentStep === 2}
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
								placeholder="E.g Nails"
								className="rounded-full"
								disabled={currentStep === 2}
							/>
						</div>
					</div>
					{currentStep === 1 ? renderFormOne() : renderFormTwo()}
				</div>
			</form>
			{isLoading && (
				<Modal isOpen={true} onClose={closeModal}>
					<div className="flex w-60 flex-col gap-5 p-5">
						<div className="flex justify-center">Loading</div>
						<div>
							<p>
								{`Product ${formProductsData.id} - ${formProductsData.product_name}`}
							</p>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

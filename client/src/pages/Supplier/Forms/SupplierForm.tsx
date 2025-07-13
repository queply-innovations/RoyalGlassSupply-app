import { Modal, Inputbox, Button } from '@/components';
import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseModalProps, useModal } from '@/utils/Modal';
import { getNextId } from '@/utils/Helpers';
import { SupplierData } from '@/entities/Supplier';
import { addSupplier, updateSupplier } from '@/api/Supplier';

interface SupplierFormProps extends SupplierData {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
}

export const SupplierForm: FC<SupplierFormProps> = ({
	data,
	onClose,
	isUpdate = false,
}) => {
	const queryClient = useQueryClient();

	const { closeModal } = useModal();

	const supplierNextId = isUpdate ? data?.id || '' : getNextId(data);

	const [isLoading, setIsLoading] = useState(false);
	const [supplierId, setSupplierId] = useState(supplierNextId);
	const [supplierName, setSupplierName] = useState('');
	const [supplierAddress, setSupplieraddress] = useState('');
	const [supplierContactNumber, setSupplierContactNumber] = useState('');

	const formData = {
		id: supplierId,
		name: supplierName,
		address: supplierAddress,
		contact_number: supplierContactNumber,
	};

	useEffect(() => {
		if (isUpdate && data) {
			setSupplierId(data.id);
			setSupplierName(data.name);
			setSupplieraddress(data.address);
			setSupplierContactNumber(data.contact_number);
		}
	}, [isUpdate, data]);

	const mutationConfig = {
		onSuccess: async () => {
			setIsLoading(false);
			setSupplierId(supplierNextId);
			setSupplierName('');
			setSupplieraddress('');
			setSupplierContactNumber('');
			await queryClient.invalidateQueries({ queryKey: ['supplier'] });
			onClose();
		},
		onError: (error: any) => {
			setIsLoading(false);
			console.error('supplier Data submission failed', error);
		},
	};

	const { mutateAsync: addSupplierMutation } = useMutation({
		mutationKey: ['addSupplier:', formData.id],
		mutationFn: addSupplier,
		...mutationConfig,
	});

	const { mutateAsync: updateSupplierMutation } = useMutation({
		mutationKey: ['updateSupplier:', formData.id],
		mutationFn: updateSupplier,
		...mutationConfig,
	});

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (isUpdate) {
				await updateSupplierMutation(formData);
			} else {
				await addSupplierMutation(formData);
			}
		} catch (error) {
			console.error('supplier Data submission failed', error);
		}
	};

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Supplier ID
							</span>
							<Inputbox
								name="id"
								value={supplierId || ''}
								type="number"
								disabled={true}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Supplier Name
							</span>
							<Inputbox
								name="name"
								placeholder="Supplier Name"
								value={supplierName || ''}
								onChange={e => setSupplierName(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold uppercase">
							Supplier address
						</span>
						<Inputbox
							name="address"
							placeholder="Supplier address"
							type="string"
							value={supplierAddress || ''}
							onChange={e => setSupplieraddress(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold uppercase">
							Contact Number
						</span>
						<Inputbox
							name="contact_number"
							placeholder="Contact Number"
							type="string"
							value={supplierContactNumber || ''}
							onChange={e => setSupplierContactNumber(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-row justify-center gap-1">
						<Button
							fill={'green'}
							className=""
							type="submit"
							// onClick={handleSubmit}
						>
							{isUpdate ? 'Update supplier' : 'Add supplier'}
						</Button>
						<Button
							fill={'red'}
							className=""
							onClick={onClose}
							type="reset"
						>
							Cancel
						</Button>
					</div>
				</div>
			</form>
			{isLoading && (
				<Modal isOpen={true} onClose={closeModal}>
					<div className="flex w-60 flex-col gap-5 p-5">
						<div className="flex justify-center">Loading</div>
						<div>
							<p>
								{`supplier ${formData.id} - ${formData.name} at ${formData.address}`}
							</p>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

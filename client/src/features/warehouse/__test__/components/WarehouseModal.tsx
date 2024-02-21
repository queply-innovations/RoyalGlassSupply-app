import { ModalTest } from '@/components/__test__/Modal/Modal';

interface WarehouseModalProps {
	isUpdate?: boolean;
}

export const WarehouseModal = ({ isUpdate }: WarehouseModalProps) => {
	return (
		<>
			<ModalTest title={`${isUpdate ? 'Edit Warehouse' : 'Add Warehouse'}`}>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<label htmlFor="name">Warehouse Name</label>
						<input
							type="text"
							id="name"
							placeholder="Warehouse Name"
							className="inputbox"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<label htmlFor="address">Warehouse Address</label>
						<input
							type="text"
							id="address"
							placeholder="Warehouse Address"
							className="inputbox"
						/>
					</div>
				</div>
			</ModalTest>
		</>
	);
};

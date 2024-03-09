import { ModalTest } from '@/components/__test__/Modal/Modal';

interface SupplierModalProps {
	isUpdate?: boolean;
}

export const SupplierModal = ({ isUpdate }: SupplierModalProps) => {
	return (
		<>
			<ModalTest title={`${isUpdate ? 'Edit Supplier' : 'Add Supplier'}`}>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<label htmlFor="name">Supplier Name</label>
						<input
							type="text"
							id="name"
							placeholder="Supplier Name"
							className="inputbox"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<label htmlFor="contact_no">Supplier Contact Number</label>
						<input
							type="text"
							id="contact_no"
							placeholder="Supplier Contact Number"
							className="inputbox"
						/>
					</div>
					
					<div className="flex flex-col gap-3">
						<label htmlFor="address">Supplier Address</label>
						<input
							type="text"
							id="address"
							placeholder="Supplier Address"
							className="inputbox"
						/>
					</div>
				</div>
			</ModalTest>
		</>
	);
};

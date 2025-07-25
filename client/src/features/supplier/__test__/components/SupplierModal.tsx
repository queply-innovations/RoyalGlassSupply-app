import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useSupplierMutation } from '../hooks';
import { UseModalProps } from '@/utils/Modal';
import { Button, Inputbox, Loading } from '@/components';

interface SupplierModalProps {
	onClose: UseModalProps['closeModal'];
	isUpdate: boolean;
}

export const SupplierModal = ({ onClose, isUpdate }: SupplierModalProps) => {
	const { supplier, newSupplier, isSubmitting, error, success, isChanged, handleChange, handleSubmit } = useSupplierMutation();
	success && setTimeout(() => {
		onClose();
	}, 1000);
	
	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<label htmlFor="name">Supplier Name</label>
						<Inputbox
							type="text"
							name="name"
							placeholder="Supplier Name"
							value={isUpdate ? (supplier.name || '') : (newSupplier.name || '')}
							className="inputbox rounded-md bg-slate-100"
							onChange={(e) => handleChange(e, isUpdate)}
							required
						/>
					</div>

					<div className="flex flex-col gap-3">
						<label htmlFor="contact_no">Supplier Contact Number</label>
						<Inputbox
							type="text"
							name="contact_no"
							placeholder="Supplier Contact Number"
							className="inputbox rounded-md bg-slate-100"
							value={isUpdate ? (supplier.contact_no || '') : (newSupplier.contact_no || '')}
							onChange={(e) => handleChange(e, isUpdate)}
							required
						/>
					</div>
					
					<div className="flex flex-col gap-3">
						<label htmlFor="address">Supplier Address</label>
						<Inputbox
							type="text"
							name="address"
							placeholder="Supplier Address"
							className="inputbox rounded-md bg-slate-100"
							value={isUpdate ? (supplier.address || '') : (newSupplier.address || '')}
							onChange={(e) => handleChange(e, isUpdate)}
							required
						/>
					</div>
				</div>

				<div className="flex flex-col mt-4 gap-5">
					<div className="flex flex-row justify-center gap-1">
						<div className="mt-3 grid w-full grid-flow-row grid-cols-10 gap-4 text-center">
							<div className="flex flex-col col-span-5 items-start">
								{success && (
									<div className="font-bold text-green-700">{success}</div>
								)}
								{error && (
									<div className="font-bold text-red-700">{error}</div>
								)}
								{!isSubmitting ? '' : 
									<div className="flex flex-col flex-wrap items-start"> 
										<Loading width={30} height={30} /> 
									</div>}
							</div>
							<div className="flex flex-col col-span-5 gap-3 items-end">
								<div className="flex flex-row">
									<Button
										type="reset"
										fill={'default'}
										className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
										onClick={onClose}
									>
										Cancel
									</Button>

									<Button
										type="submit"
										fill={isChanged ? 'green' : 'default'}
										disabled={isChanged ? false : true}
										onClick={() => handleSubmit(isUpdate)}
									>
										{!isSubmitting ? (isUpdate ? 'Edit Supplier' : 'Add Supplier') : 'Submitting'}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

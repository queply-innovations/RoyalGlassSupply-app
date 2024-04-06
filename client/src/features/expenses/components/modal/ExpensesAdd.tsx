import { UseModalProps } from '@/utils/Modal';
import { Button,  Inputbox, Loading } from '@/components';
import { Textarea } from '@/components/ui/textarea';
import { useExpensesAddition, useExpensesMutation } from '../../hooks';

interface ExpensesDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const ExpensesAdd = ({ onClose }: ExpensesDetailsProps) => {
	const { 
		expensesAdd,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		dateToday
	} = useExpensesAddition();

	success && setTimeout(() => {
		onClose();
	}, 1000);

	return (
		<>
			<form
				onSubmit={async e => {e.preventDefault();}}
			>
				<div className="flex flex-col gap-5">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="lastname">Date of Operation</label>
							<Inputbox
								type="text"
								name="date_of_operation"
								placeholder="2024-04-06"
								className="inputbox rounded-md"
								value={dateToday}
								disabled
								readOnly
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="firstname">Title</label>
							<Inputbox
								type="text"
								name="title"
								placeholder="Title"
								className="inputbox rounded-md bg-slate-100"
								value={expensesAdd.title || ''}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="email">Amount</label>
							<Inputbox
								type="number"
								name="amount"
								placeholder="₱500.00"
								className="inputbox rounded-md bg-slate-100"
								value={expensesAdd.amount || ''}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="flex flex-col col-span-12 gap-3">
							<label htmlFor="email">Notes</label>
							<Textarea
								name="notes"
								placeholder="Notes here...."
								className="text-base rounded-md bg-slate-100"
								value={expensesAdd.notes || ''}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4 text-center">
						<div className="flex flex-col col-span-3 gap-3">
							<Button
								type="submit"
								fill={isChanged ? 'green' : null}
								disabled={isChanged ? false : true}
								onClick={handleSubmit}
							>
								{!isSubmitting ? 'Add Expenses' : 'Submitting'}
							</Button>
						</div>
						<div className="flex flex-col col-span-6 items-start">
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
						<div className="flex flex-col col-span-3 gap-3 items-end">
							<Button
								type="reset"
								fill={'red'}
								onClick={onClose}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

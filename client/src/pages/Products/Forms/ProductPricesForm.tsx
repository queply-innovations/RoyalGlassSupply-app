import { Button, Inputbox } from '@/components';
import { Selectbox } from '@/components/Selectbox';
import { getDate } from '@/utils/timeUtils';

export const ProductPricesForm = () => {
	return (
		<>
			<form className="">
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">ID</span>
							<Inputbox
								name="id"
								value={''}
								type="number"
								disabled={true}
								className="rounded-full"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">
								Product ID
							</span>
							<Inputbox
								name="product_id"
								value={''}
								type="number"
								disabled={true}
								className="rounded-full"
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">Type</span>
							<Selectbox options={['single', 'bundle']} />{' '}
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">
								Quantity
							</span>
							<Inputbox
								name="quantity"
								value={''}
								type="number"
								className="rounded-full"
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">
								Capital Price
							</span>
							<Inputbox
								name="capital_price"
								value={''}
								type="number"
								className="rounded-full"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">
								Markup Price
							</span>
							<Inputbox
								name="markup_price"
								value={''}
								type="number"
								className="rounded-full"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold uppercase">
								Retail Price
							</span>
							<Inputbox
								name="retail_price"
								value={''}
								type="number"
								className="rounded-full"
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<Button fill="green">Confirm</Button>
					</div>
					<div>
						<span>{getDate()}</span>
					</div>
				</div>
			</form>
		</>
	);
};

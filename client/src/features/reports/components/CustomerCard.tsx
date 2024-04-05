import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CustomerChart } from './';

export const CustomerCard = () => {
	return (
		<>
			<Card className="flex-1">
				<CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="font-bold">Customers</CardTitle>
					<CardDescription className="!mt-1 font-bold uppercase"></CardDescription>
				</CardHeader>
				<CardContent className="py-2 pt-0">
					<span className="text-lg font-medium">
						Top Customer:
						{/* //TODO:  get the number of the invoices that the same customer has made to show the top customer
						 */}
					</span>
					<CustomerChart />
				</CardContent>
			</Card>
		</>
	);
};

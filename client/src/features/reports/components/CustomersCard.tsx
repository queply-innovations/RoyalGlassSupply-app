import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CustomersChart } from './CustomersChart';

export const CustomersCard = () => {
	return (
		<>
			<Card className="flex min-h-[24rem] flex-col gap-4">
				<CardHeader className="flex flex-none flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="text-base font-bold">Customers</CardTitle>
					<CardDescription className="text-sm font-medium">
						Shows new and returning customers for the selected date range
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1">
					<CustomersChart />
				</CardContent>
			</Card>
		</>
	);
};

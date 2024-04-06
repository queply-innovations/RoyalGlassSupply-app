import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ProductsChart } from '.';

export const TopProductsCard = () => {
	return (
		<>
			<Card className="flex-1">
				<CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="font-bold">Products</CardTitle>
					<CardDescription className="!mt-1 font-bold uppercase"></CardDescription>
				</CardHeader>
				<CardContent className="py-2 pt-0">
					<ProductsChart />
				</CardContent>
			</Card>
		</>
	);
};

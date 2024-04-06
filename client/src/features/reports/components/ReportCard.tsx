import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/utils/FormatCurrency';
import { getDateNowByMonth } from '@/utils/timeUtils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface ReportCardProps {
	title: string;
	date?: boolean;
	formatAmount?: boolean;
	children?: React.ReactNode;
	filter?: string[];
}

export const ReportCard = ({
	title,
	date,
	children,
	formatAmount,
	filter,
}: ReportCardProps) => {
	return (
		<>
			<Card className="w-full min-w-[320px] max-w-[460px]">
				<CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="text-xl font-bold">{title}</CardTitle>
					{date && (
						<>
							<CardDescription className="!mt-1 font-bold uppercase">
								{getDateNowByMonth()}
							</CardDescription>
						</>
					)}
				</CardHeader>
				<CardContent className="py-2 pt-0">
					{formatAmount && (
						<span className="text-lg font-medium">
							{formatCurrency(200000)}
						</span>
					)}

					{children && (
						<>
							<span className="text-lg font-medium">{children}</span>
						</>
					)}
				</CardContent>
				<CardFooter>
					<div className="flex w-full flex-row items-center justify-between gap-4">
						<div className="flex flex-row items-center gap-2">
							<ArrowUpRight className="text-green-500" size={20} />
							<span className="text-sm font-bold text-green-500">
								20%
							</span>
						</div>
						{filter && (
							<>
								<Select>
									<SelectTrigger className="max-w-[50%]">
										<SelectValue placeholder="filter by" />
									</SelectTrigger>
									<SelectContent>
										{filter.map((item, index) => {
											return (
												<SelectItem key={index} value={item}>
													{item}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</>
						)}
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

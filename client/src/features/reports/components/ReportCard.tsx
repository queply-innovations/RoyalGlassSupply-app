import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/utils/FormatCurrency';
import { getDateNowByMonth } from '@/utils/timeUtils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface ReportCardProps {
	title: string;
	date?: boolean;
	formatAmount?: boolean;
	children?: React.ReactNode;
}

export const ReportCard = ({
	title,
	date,
	children,
	formatAmount,
}: ReportCardProps) => {
	return (
		<>
			<Card className="min-w-[320px] max-w-[360px]">
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
						<span className="text-muted-foreground text-sm font-medium lowercase">
							vs yesterday
						</span>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

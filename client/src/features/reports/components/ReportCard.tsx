import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReportCardProps {
	title: string;
	children: React.ReactNode;
	description?: string;
	tooltip?: string;
	footer?: React.ReactNode;
	bgClassName?: string;
	textColorClassName?: string;
}

export const ReportCard = ({
	title,
	children,
	description,
	tooltip,
	footer,
	bgClassName,
	textColorClassName,
}: ReportCardProps) => {
	return (
		<>
			<TooltipProvider>
				<Card
					className={`w-full max-w-[460px] ${bgClassName ? bgClassName : 'bg-white'} ${textColorClassName ? textColorClassName : 'text-slate-800'} rounded-md border-0 shadow-none`}
				>
					<CardHeader className="px-5 pt-4">
						<CardTitle
							className={`text-sm font-semibold tracking-normal ${!description && 'mb-5'}`}
						>
							<span className="flex flex-row items-center justify-between gap-1">
								{title}{' '}
								{tooltip && (
									<Tooltip>
										<TooltipTrigger>
											<Info
												size={18}
												strokeWidth={2}
												className={`${textColorClassName ? textColorClassName : 'text-slate-800'} opacity-60`}
											/>
										</TooltipTrigger>

										<TooltipContent className="max-w-[40ch] font-medium">
											{tooltip}
										</TooltipContent>
									</Tooltip>
								)}
							</span>
						</CardTitle>
						{description && (
							<CardDescription
								className={`text-sm font-medium opacity-70 ${textColorClassName ? textColorClassName : 'text-slate-800'}`}
							>
								{description}
							</CardDescription>
						)}
					</CardHeader>
					<CardContent className="px-5 pb-4">{children}</CardContent>
					{footer && <CardFooter>{footer}</CardFooter>}
				</Card>
			</TooltipProvider>
		</>
	);
};

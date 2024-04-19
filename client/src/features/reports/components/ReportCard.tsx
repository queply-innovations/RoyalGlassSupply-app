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
import { HelpCircle } from 'lucide-react';

interface ReportCardProps {
	title: string;
	children: React.ReactNode;
	description?: string;
	tooltip?: string;
	footer?: React.ReactNode;
}

export const ReportCard = ({
	title,
	children,
	description,
	tooltip,
	footer,
}: ReportCardProps) => {
	return (
		<>
			<TooltipProvider>
				<Card className="w-full max-w-[460px]">
					<CardHeader>
						<CardTitle
							className={`text-base font-semibold tracking-normal text-slate-800 ${!description && 'mb-5'}`}
						>
							<span className="flex flex-row items-center gap-1">
								{title}{' '}
								{tooltip && (
									<Tooltip>
										<TooltipTrigger>
											<HelpCircle
												size={18}
												strokeWidth={2.5}
												className="text-gray-700/50"
											/>
										</TooltipTrigger>

										<TooltipContent className="max-w-[40ch]">
											{tooltip}
										</TooltipContent>
									</Tooltip>
								)}
							</span>
						</CardTitle>
						{description && (
							<CardDescription className="text-sm font-medium text-slate-600">
								{description}
							</CardDescription>
						)}
					</CardHeader>
					<CardContent className="text-slate-800">{children}</CardContent>
					{footer && <CardFooter>{footer}</CardFooter>}
				</Card>
			</TooltipProvider>
		</>
	);
};

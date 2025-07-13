import { useMemo } from 'react';
import { useReportAnalytics } from '../../context/ReportAnalyticsContext';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export const YearPicker = () => {
	const { year, setYear } = useReportAnalytics();
	const years = useMemo(() => {
		const currentYear = new Date().getFullYear();
		const startYear = 2020;
		const years = [];
		for (let year = startYear; year <= currentYear; year++) {
			years.push(year);
		}
		return years.sort((a, b) => b - a);
	}, []);

	return (
		<>
			<Select
				value={year.toString()}
				onValueChange={value => {
					setYear(Number(value));
				}}
			>
				<SelectTrigger className="w-32 flex-none">
					<SelectValue placeholder="Choose year...">
						<span className="text-slate-600">{year}</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{years.map(year => (
						<SelectItem
							key={`${year}-item`}
							value={year.toString()}
							className="text-sm font-medium"
						>
							{year}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
};

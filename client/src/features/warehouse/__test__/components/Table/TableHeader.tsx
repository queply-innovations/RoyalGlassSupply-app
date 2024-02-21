interface TableHeaderProps {
	header: string[];
}

export const TableHeader = ({ header }: TableHeaderProps) => {
	return (
		<>
			<thead className="table-head border-b border-black/10 bg-white ">
				<tr>
					{header.map(header => (
						<th key={header} className="py-5 text-xs font-bold uppercase">
							{header}
						</th>
					))}
				</tr>
			</thead>
		</>
	);
};

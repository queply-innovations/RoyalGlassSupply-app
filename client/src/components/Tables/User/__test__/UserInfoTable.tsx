import React from 'react';

export const UserInfoTable = () => {
	const userInfoTableHeader: string[] = [
		'Complete Name',
		'Role',
		'Username',
		'Contact',
		'Emergency #',
	];
	return (
		<table className="box-border w-full overflow-y-auto rounded-lg">
			<thead className="table-head bg-white ">
				<tr>
					{userInfoTableHeader.map(header => (
						<th className="py-5 text-xs font-bold uppercase ">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody className=""></tbody>
		</table>
	);
};

export default UserInfoTable;

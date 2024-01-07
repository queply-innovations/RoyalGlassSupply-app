import { FC } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';

export const TransferStatus: FC = () => {
	return (
		<div className="flex w-full flex-1 flex-col items-center gap-y-5 rounded-md border border-black/10 bg-white p-4">
			<h2 className="uppercase text-black">Transfer Status</h2>
			<div className="h-full w-full rounded-md border border-solid">
				<table className="w-full rounded-md">
					<tbody>
						<tr>
							<th className="border-b p-2 text-[15px]">Transfer ID</th>
							<th className="border-x border-b p-2 text-[15px]">
								Status
							</th>
							<th className="border-b p-2 text-[15px]">Action</th>
						</tr>
						<tr>
							<td id="Transfer_ID" className="table-data text-center">
								001
							</td>
							<td
								id="Transfer_Status"
								className="table-data border-x text-center"
							>
								Arrived at warehouse
							</td>
							<td
								id="Transfer_Action"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									<BsFillEyeFill className="text-[15px] text-black" />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TransferStatus;

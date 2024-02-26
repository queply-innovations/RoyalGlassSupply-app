export interface Transfer {
	id: number;
	created_by: number;
	source: number;
	destination: number;
	transfer_schedule: string;
	approval_status: string;
	approval_by: number;
	transfer_status: string;
	date_received: string;
	received_by: number;
	created_at: string;
	updated_at: string;
}
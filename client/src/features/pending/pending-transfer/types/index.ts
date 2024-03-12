export interface Transfer {
	id: number;
	code: string;
	created_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	source: {
		id: number;
		code: string;
		name: string;
	}
	destination: {
		id: number;
		code: string;
		name: string;
	}
	transfer_schedule: string;
	approval_status: string;
	approved_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	transfer_status: string;
	date_received: string;
	received_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	created_at: string;
	updated_at: string;
	notes: string;
}

export interface TransferAdd {
	code: string;
	created_by: number;
	source: number;
	destination: number;
	approval_status: string;
	transfer_schedule: string;
	notes: string;
}

export interface TransferEdit {
	id: number;
	code: string;
	created_by: number;
	source: number;
	destination: number;
	transfer_schedule: string;
	approval_status: string;
	approved_by: number | null;
	transfer_status: string | null;
	date_received: string | null;
	received_by: number | null;
	notes: string;
}